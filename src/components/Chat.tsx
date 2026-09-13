"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";

type Role = "user" | "assistant";
type Turn = { role: Role; content: string };

const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL ?? "";
const HISTORY_CAP = 8;
const MAX_CHARS = 800;

const PREFACE =
  "We can speak to what Sunrise Gen AI builds — agents, retrieval, data platforms, and how we put them in production.";
const DISCONNECTED = "chat is not connected yet";
const DOWN = "The desk is quiet. Try again shortly, or use the contact form.";
const BUSY_NOTE = "A moment — we are still writing.";
const PRIVACY_NOTE = "Questions you send are used to write a reply.";

function lastTurns(turns: Turn[]): Turn[] {
  return turns.slice(-HISTORY_CAP);
}

export function Chat() {
  const panelId = useId();
  const logId = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const connected = Boolean(API_URL.trim());

  useEffect(() => {
    if (!open) return;
    fieldRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, error, busy, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send() {
    const content = draft.trim();
    if (!connected || busy || !content) return;
    if (content.length > MAX_CHARS) {
      setError(`Keep it to ${MAX_CHARS} characters.`);
      return;
    }

    const nextTurns = lastTurns([...turns, { role: "user", content }]);
    setTurns(nextTurns);
    setDraft("");
    setError(null);
    setBusy(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextTurns }),
      });
      const data: unknown = await res.json().catch(() => null);
      const reply =
        data &&
        typeof data === "object" &&
        "reply" in data &&
        typeof (data as { reply: unknown }).reply === "string"
          ? (data as { reply: string }).reply.trim()
          : "";

      if (!res.ok || !reply) {
        setError(res.status === 429 ? "Slow the pace — try again in a while." : DOWN);
        return;
      }
      setTurns((prev) => lastTurns([...prev, { role: "assistant", content: reply }]));
    } catch {
      setError(DOWN);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send();
  }

  function onFieldKey(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  }

  return (
    <div className="chat-root" data-lenis-prevent>
      {open ? (
        <section
          className="chat-panel"
          id={panelId}
          role="dialog"
          aria-labelledby={`${panelId}-title`}
          aria-describedby={logId}
        >
          <header className="chat-head">
            <h2 id={`${panelId}-title`}>Chat with an agent</h2>
            <button
              type="button"
              className="chat-dismiss"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </header>
          <div className="chat-log" id={logId} ref={logRef} aria-live="polite">
            <p className="chat-note">{connected ? PREFACE : DISCONNECTED}</p>
            {turns.map((turn, index) => (
              <p
                className="chat-msg"
                data-role={turn.role}
                key={`${turn.role}-${index}-${turn.content.slice(0, 12)}`}
              >
                {turn.content}
              </p>
            ))}
            {busy ? <p className="chat-note">{BUSY_NOTE}</p> : null}
            {error ? (
              <p className="chat-err" id={`${panelId}-err`} role="alert">
                {error}
              </p>
            ) : null}
          </div>
          <form className="chat-compose" onSubmit={onSubmit}>
            <label className="chat-sr" htmlFor={`${panelId}-field`}>
              Your question
            </label>
            <textarea
              id={`${panelId}-field`}
              ref={fieldRef}
              rows={3}
              maxLength={MAX_CHARS}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onFieldKey}
              placeholder={connected ? "A question about what we build." : DISCONNECTED}
              disabled={!connected || busy}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${panelId}-err` : undefined}
            />
            <button
              type="submit"
              className="chat-send"
              disabled={!connected || busy || !draft.trim()}
            >
              Send
            </button>
            <p className="chat-privacy">
              {PRIVACY_NOTE}{" "}
              <a href="/privacy/">Privacy</a>
            </p>
          </form>
        </section>
      ) : null}
      <button
        type="button"
        className="chat-launch"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close the firm chat" : "Chat with an agent"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="chat-launch-rule" aria-hidden="true" />
        <span>{open ? "×" : "Chat with an agent"}</span>
      </button>
    </div>
  );
}
