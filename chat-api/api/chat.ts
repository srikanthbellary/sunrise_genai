import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const config = {
  maxDuration: 30,
  includeFiles: "prompt/**/*.md",
};

const ALLOWED_ORIGINS = new Set([
  "https://sunrisegenai.com",
  "https://www.sunrisegenai.com",
  "http://localhost:3000",
]);

const NOVITA_URL = "https://api.novita.ai/openai/v1/chat/completions";
const MODEL = "meta-llama/llama-3.1-8b-instruct";
const MAX_MESSAGES = 8;
const MAX_USER_CHARS = 800;
const RATE_MAX = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000;

type Role = "user" | "assistant";
type ChatMessage = { role: Role; content: string };

type NodeReq = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
};

type NodeRes = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => NodeRes;
  json: (body: unknown) => void;
  end: () => void;
};

const buckets = new Map<string, number[]>();
let promptCache: string | null = null;

function header(req: NodeReq, name: string): string {
  const raw = req.headers[name] ?? req.headers[name.toLowerCase()];
  if (Array.isArray(raw)) return raw[0] ?? "";
  return raw ?? "";
}

export function allowedOrigin(origin: string): boolean {
  return ALLOWED_ORIGINS.has(origin);
}

export function clientIp(req: NodeReq): string {
  const forwarded = header(req, "x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const real = header(req, "x-real-ip").trim();
  if (real) return real;
  return req.socket?.remoteAddress ?? "unknown";
}

export function rateLimited(ip: string, now = Date.now()): boolean {
  const fresh = (buckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (fresh.length >= RATE_MAX) {
    buckets.set(ip, fresh);
    return true;
  }
  fresh.push(now);
  buckets.set(ip, fresh);
  return false;
}

export function validateMessages(input: unknown): ChatMessage[] | string {
  if (!input || typeof input !== "object" || !("messages" in input)) {
    return "Expected { messages }.";
  }
  const raw = (input as { messages: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return "messages must be a non-empty array.";
  if (raw.length > MAX_MESSAGES) return "Too many messages.";

  const out: ChatMessage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") return "Invalid message.";
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") return "Invalid role.";
    if (typeof content !== "string") return "Invalid content.";
    const text = content.trim();
    if (!text) return "Empty message.";
    if (role === "user" && text.length > MAX_USER_CHARS) return "Message too long.";
    out.push({ role, content: text });
  }
  if (out[out.length - 1]?.role !== "user") return "Last message must be from the visitor.";
  return out;
}

function promptDir(): string {
  const here = typeof __dirname === "string" ? __dirname : "";
  const candidates = [
    join(process.cwd(), "prompt"),
    join(process.cwd(), "chat-api", "prompt"),
    here ? join(here, "..", "prompt") : "",
    here ? join(here, "..", "..", "prompt") : "",
  ].filter(Boolean);

  for (const dir of candidates) {
    if (existsSync(join(dir, "system.md")) && existsSync(join(dir, "context.md"))) {
      return dir;
    }
  }
  throw new Error("Prompt files are missing.");
}

export function loadSystemPrompt(): string {
  if (promptCache) return promptCache;
  const dir = promptDir();
  const system = readFileSync(join(dir, "system.md"), "utf8").trim();
  const context = readFileSync(join(dir, "context.md"), "utf8").trim();
  promptCache = `${system}\n\n---\n\n${context}`;
  return promptCache;
}

function applyCors(res: NodeRes, origin: string | null) {
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
  if (origin) res.setHeader("Access-Control-Allow-Origin", origin);
}

function json(res: NodeRes, origin: string | null, status: number, body: unknown) {
  applyCors(res, origin);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(status).json(body);
}

function readOrigin(req: NodeReq): string {
  return header(req, "origin").trim();
}

export default async function handler(req: NodeReq, res: NodeRes) {
  const origin = readOrigin(req);
  const originOk = origin ? allowedOrigin(origin) : false;
  const corsOrigin = originOk ? origin : null;

  if (origin && !originOk) {
    json(res, null, 403, { error: "Origin not allowed." });
    return;
  }

  if (req.method === "OPTIONS") {
    applyCors(res, corsOrigin);
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    json(res, corsOrigin, 405, { error: "Method not allowed." });
    return;
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    json(res, corsOrigin, 429, { error: "Too many requests." });
    return;
  }

  const key = process.env.NOVITA_API_KEY?.trim();
  if (!key) {
    json(res, corsOrigin, 503, { error: "Chat is not configured." });
    return;
  }

  let payload: unknown = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      json(res, corsOrigin, 400, { error: "Invalid JSON." });
      return;
    }
  }

  const messages = validateMessages(payload);
  if (typeof messages === "string") {
    json(res, corsOrigin, 400, { error: messages });
    return;
  }

  let system: string;
  try {
    system = loadSystemPrompt();
  } catch {
    json(res, corsOrigin, 500, { error: "Prompt files are missing." });
    return;
  }

  try {
    const upstream = await fetch(NOVITA_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: system }, ...messages],
        max_tokens: 400,
        temperature: 0.4,
      }),
    });

    if (!upstream.ok) {
      json(res, corsOrigin, 502, { error: "Upstream failed." });
      return;
    }

    const data = (await upstream.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      json(res, corsOrigin, 502, { error: "Empty reply." });
      return;
    }

    json(res, corsOrigin, 200, { reply });
  } catch {
    json(res, corsOrigin, 502, { error: "Upstream failed." });
  }
}
