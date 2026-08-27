/**
 * ============================================================================
 *  CAPSULE — CHATBOT: BROWSER-SAFE SETTINGS
 *
 *  Everything the chat widget needs, and nothing else. This file must NOT
 *  import the knowledge base or the system prompt — the widget is a client
 *  component, so anything it imports is shipped to the browser. Keeping the
 *  two apart means the knowledge base and the guardrails stay server-side.
 *
 *  Server-side settings (model, limits, system prompt) live in chat-config.ts.
 * ============================================================================
 */

/**
 * Master switch for the assistant.
 *
 * Currently OFF: the FAQ is being finalised, and the approved FAQ becomes the
 * chatbot's knowledge base. Until then the widget does not render and the
 * /api/chat endpoint refuses requests, so the site can be deployed safely.
 *
 * To turn it on, set this in the environment and restart:
 *     NEXT_PUBLIC_CHATBOT_ENABLED=true
 *
 * The NEXT_PUBLIC_ prefix is required — without it the value is not visible to
 * the widget in the browser and the switch appears to do nothing.
 */
export const CHATBOT_ENABLED =
  process.env.NEXT_PUBLIC_CHATBOT_ENABLED === "true";

/** The first thing a visitor sees when the panel opens. */
export const GREETING =
  "Hello — I can answer questions about Capsule's virtual office at 104 Paseo de Roxas, Legaspi Village, Makati: business addresses, mail handling, meeting rooms and workspace. What would you like to know?";

/** Shown as clickable starters. Keep them to real, answerable questions. */
export const SUGGESTED_QUESTIONS = [
  "What does a virtual office cost?",
  "Can I use the address as my registered business address?",
  "How is my mail handled?",
  "Do you have desks or private offices available?",
] as const;
