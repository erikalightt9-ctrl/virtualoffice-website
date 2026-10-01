"use client";

import { useEffect, useRef, useState } from "react";
import { CHATBOT_ENABLED, GREETING, SUGGESTED_QUESTIONS } from "@/lib/chat-ui";
import { site } from "@/content/site";

type Message = { role: "user" | "assistant"; content: string };

/**
 * The floating assistant. Answers only from the site's own content — see
 * src/lib/knowledge.ts for why it cannot invent a price.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view as it streams in.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    setError(null);
    setInput("");

    const next: Message[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setBusy(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        setError(
          data?.error ??
            "Something went wrong. Please message the team on Viber and they will help straight away.",
        );
        setBusy(false);
        return;
      }

      // Open an empty assistant message, then fill it as the stream arrives.
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: copy[copy.length - 1].content + chunk,
          };
          return copy;
        });
      }
    } catch {
      setError(
        "I could not reach the server. Please check your connection, or message the team on Viber.",
      );
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  }

  const showSuggestions = messages.length === 0;

  // On hold until the FAQ is approved — render nothing at all.
  if (!CHATBOT_ENABLED) return null;

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="pdmn-chat-panel"
        className="accent-fill fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 border px-4 py-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] shadow-lg transition-all hover:shadow-xl sm:bottom-7 sm:right-7"
      >
        {open ? (
          <>
            <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
              />
            </svg>
            Close
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M1.5 3.2A1.7 1.7 0 013.2 1.5h9.6a1.7 1.7 0 011.7 1.7v6.3a1.7 1.7 0 01-1.7 1.7H6.4L3 14.5v-3.3h-.2A1.7 1.7 0 011.5 9.5z"
                fill="currentColor"
              />
            </svg>
            Ask us
          </>
        )}
      </button>

      {/* Panel */}
      {open ? (
        <div
          id="pdmn-chat-panel"
          ref={panelRef}
          role="dialog"
          aria-label="Ask us"
          className="fixed inset-x-3 bottom-20 z-[59] flex max-h-[min(640px,78vh)] flex-col border border-rule-dark bg-ink shadow-2xl sm:inset-x-auto sm:right-7 sm:bottom-24 sm:w-[400px]"
        >
          {/* Header */}
          <div className="flex items-start gap-3 border-b border-rule-dark px-4 py-3.5">
            <div className="flex flex-col gap-0.5">
              <span className="font-display text-[0.82rem] font-semibold tracking-[0.04em] text-on-dark">
                Ask us
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-on-dark-soft">
                Answers from our published information
              </span>
            </div>
          </div>

          {/* Transcript */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4"
            aria-live="polite"
            aria-atomic="false"
          >
            <div className="flex flex-col gap-4">
              <p className="text-[0.86rem] leading-relaxed text-on-dark-soft">
                {GREETING}
              </p>

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.role === "user"
                      ? "self-end max-w-[85%] border border-clay bg-clay/15 px-3 py-2"
                      : "max-w-[92%]"
                  }
                >
                  <span
                    className={
                      message.role === "user"
                        ? "block whitespace-pre-wrap text-[0.86rem] leading-relaxed text-on-dark"
                        : "block whitespace-pre-wrap text-[0.86rem] leading-relaxed text-on-dark"
                    }
                  >
                    {message.content}
                    {message.role === "assistant" &&
                    busy &&
                    index === messages.length - 1 ? (
                      <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-clay align-text-bottom" />
                    ) : null}
                  </span>
                </div>
              ))}

              {busy && messages[messages.length - 1]?.role === "user" ? (
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-on-dark-soft">
                  Thinking…
                </span>
              ) : null}

              {error ? (
                <p
                  role="alert"
                  className="border-l-2 border-clay bg-clay/10 px-3 py-2 text-[0.82rem] text-oak-light"
                >
                  {error}
                </p>
              ) : null}

              {showSuggestions ? (
                <div className="flex flex-col gap-2 pt-1">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void send(question)}
                      className="border border-rule-dark px-3 py-2.5 text-left text-[0.82rem] text-on-dark-soft transition-colors hover:border-clay hover:text-on-dark"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-rule-dark px-4 py-3">
            <div className="flex items-end gap-2">
              <label htmlFor="pdmn-chat-input" className="sr-only">
                Your question
              </label>
              <textarea
                id="pdmn-chat-input"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                maxLength={2000}
                placeholder="Ask about packages, address use or VIP facilities…"
                className="max-h-28 min-h-[42px] flex-1 resize-none border border-rule-dark bg-ink-2 px-3 py-2.5 text-[0.86rem] text-on-dark outline-none transition-colors placeholder:text-on-dark-soft focus:border-clay"
              />
              <button
                type="button"
                onClick={() => void send(input)}
                disabled={busy || !input.trim()}
                className="accent-fill grid h-[42px] w-[42px] shrink-0 place-items-center border transition-colors disabled:cursor-not-allowed disabled:border-rule-dark disabled:bg-none disabled:bg-transparent disabled:text-on-dark-soft"
                aria-label="Send question"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M1 8h12M8 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    fill="none"
                  />
                </svg>
              </button>
            </div>

            <p className="mt-2.5 text-[0.68rem] leading-relaxed text-on-dark-soft">
              For a quotation or to check eligibility, message us on Viber at{" "}
              <a
                href={site.contact.viberHref}
                className="text-accent-readable underline underline-offset-2"
              >
                {site.contact.viber}
              </a>
              .
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
