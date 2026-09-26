import handler, { allowedOrigin, loadSystemPrompt, validateMessages } from "./api/chat.ts";

type FakeRes = {
  code: number;
  body: unknown;
  headers: Record<string, string>;
  setHeader: (name: string, value: string) => void;
  status: (code: number) => FakeRes;
  json: (body: unknown) => void;
  end: () => void;
};

function fakeRes(): FakeRes {
  const res: FakeRes = {
    code: 0,
    body: null,
    headers: {},
    setHeader(name, value) {
      res.headers[name] = value;
    },
    status(code) {
      res.code = code;
      return res;
    },
    json(body) {
      res.body = body;
    },
    end() {},
  };
  return res;
}

const cases: [string, boolean][] = [
  ["https://sunrisegenai.com", true],
  ["https://www.sunrisegenai.com", true],
  ["http://localhost:3000", true],
  ["https://srikanthbellary.com", false],
  ["https://evil.example", false],
  ["http://localhost:8080", false],
];

let failed = 0;

for (const [origin, expect] of cases) {
  const got = allowedOrigin(origin);
  if (got !== expect) {
    failed += 1;
    console.error(`origin ${origin}: expected ${expect}, got ${got}`);
  }
}

const tooLong = "x".repeat(801);
const checks: [string, unknown, boolean][] = [
  ["ok pair", { messages: [{ role: "user", content: "What do you build?" }] }, true],
  ["empty", { messages: [] }, false],
  ["too many", { messages: Array.from({ length: 9 }, () => ({ role: "user", content: "hi" })) }, false],
  ["long user", { messages: [{ role: "user", content: tooLong }] }, false],
  ["last assistant", { messages: [{ role: "assistant", content: "Hello." }] }, false],
];

for (const [label, body, ok] of checks) {
  const result = validateMessages(body);
  const passed = ok ? Array.isArray(result) : typeof result === "string";
  if (!passed) {
    failed += 1;
    console.error(`validate ${label}: unexpected`, result);
  }
}

const prompt = loadSystemPrompt();
if (!prompt.includes("We only answer questions about what Sunrise Gen AI builds.")) {
  failed += 1;
  console.error("system prompt was not loaded");
}
if (!prompt.includes("Florida, United States")) {
  failed += 1;
  console.error("context prompt was not concatenated");
}
if (!prompt.includes("support@sunrisegenai.com")) {
  failed += 1;
  console.error("prompt files are missing the public support mailbox");
}
if (/sbellary@/i.test(prompt)) {
  failed += 1;
  console.error("prompt files contain a personal mailbox");
}
if (prompt.includes("NOVITA") || /sk-[a-zA-Z0-9]{10,}/.test(prompt)) {
  failed += 1;
  console.error("prompt files must not contain keys");
}
if (
  prompt.includes("West" + " Palm") ||
  prompt.includes("Welling" + "ton") ||
  prompt.includes("33" + "414") ||
  /\b\d{5}(?:-\d{4})?\b/.test(prompt) ||
  /\d+\s+[A-Za-z0-9.'\s]{0,40}\b(Street|St\.|Avenue|Ave\.|Road|Rd\.|Drive|Dr\.|Boulevard|Blvd\.|Lane|Ln\.)\b/i.test(
    prompt,
  ) ||
  /srikanthbellary01@gmail|440-340-8383/.test(prompt)
) {
  failed += 1;
  console.error("prompt files contain a forbidden city, street, ZIP, or locked personal facts");
}

delete process.env.NOVITA_API_KEY;

const rejected = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "https://evil.example" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  },
  rejected,
);
if (rejected.code !== 403) {
  failed += 1;
  console.error(`expected 403 for foreign origin, got ${rejected.code}`);
}

const preflight = fakeRes();
await handler(
  {
    method: "OPTIONS",
    headers: { origin: "https://sunrisegenai.com" },
  },
  preflight,
);
if (preflight.code !== 204 || preflight.headers["Access-Control-Allow-Origin"] !== "https://sunrisegenai.com") {
  failed += 1;
  console.error("preflight failed", preflight);
}

const unconfigured = fakeRes();
await handler(
  {
    method: "POST",
    headers: { origin: "http://localhost:3000" },
    body: { messages: [{ role: "user", content: "What do you build?" }] },
  },
  unconfigured,
);
if (unconfigured.code !== 503) {
  failed += 1;
  console.error(`expected 503 without key, got ${unconfigured.code}`, unconfigured.body);
}

if (failed) {
  console.error(`Guard check failed (${failed}).`);
  process.exit(1);
}

console.log("Guard check passed.");
