import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import {
  CHATBOT_ENABLED,
  CHAT_EFFORT,
  CHAT_MODEL,
  LIMITS,
  MAX_OUTPUT_TOKENS,
  SYSTEM_PROMPT,
} from "@/lib/chat-config";
import { KB_ESTIMATED_TOKENS } from "@/lib/knowledge";

/**
 * ============================================================================
 *  CAPSULE — CHATBOT ENDPOINT
 *
 *  Streams a grounded answer from the knowledge base built out of the site's
 *  own content files.
 *
 *  SETUP: set ANTHROPIC_API_KEY in your environment. Without it this route
 *  returns a friendly message pointing the visitor at Viber, so the widget
 *  degrades gracefully instead of erroring at them.
 *
 *  Optional: CHAT_TRANSCRIPT_WEBHOOK_URL receives each completed exchange,
 *  so conversations become a lead source and a queue of new FAQ material.
 * ============================================================================
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(LIMITS.maxMessageChars),
});

const chatSchema = z.object({
  messages: z.array(messageSchema).min(1).max(LIMITS.maxHistoryMessages),
});

/**
 * Rate limiting, held in memory.
 *
 * NOTE: this is per server instance. On a single deployment that is fine.
 * If the site is ever scaled to several instances, move this to a shared
 * store (Upstash, Redis) or a platform rate limiter — otherwise the real
 * limit becomes the number below multiplied by the instance count.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - LIMITS.rateLimitWindowMs;
  const recent = (hits.get(ip) ?? []).filter((t) => t > cutoff);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => t <= cutoff)) hits.delete(key);
    }
  }

  return recent.length > LIMITS.rateLimitRequests;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Sends a completed exchange onward, so conversations are not lost. */
async function recordTranscript(
  messages: { role: string; content: string }[],
  reply: string,
): Promise<void> {
  const record = {
    recordedAt: new Date().toISOString(),
    turns: messages.length,
    conversation: [...messages, { role: "assistant", content: reply }],
  };

  const webhook = process.env.CHAT_TRANSCRIPT_WEBHOOK_URL;
  if (!webhook) return;

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
  } catch (error) {
    // Never let transcript logging break the visitor's conversation.
    console.error("[chat] transcript webhook failed", error);
  }
}

const FALLBACK_MESSAGE =
  "I am not able to answer right now. Please message the team on Viber or use the enquiry form at /contact and someone will come straight back to you.";

export async function POST(request: Request) {
  // On hold until the FAQ is approved. See CHATBOT_ENABLED in chat-config.ts.
  if (!CHATBOT_ENABLED) {
    return Response.json(
      {
        error:
          "Our assistant is not available yet. Please message the team on Viber or use the enquiry form at /contact.",
      },
      { status: 503 },
    );
  }

  const ip = clientIp(request);

  if (rateLimited(ip)) {
    return Response.json(
      {
        error:
          "That is a lot of questions at once. Please wait a moment, or message the team on Viber for a faster answer.",
      },
      { status: 429 },
    );
  }

  // Validate the request before checking credentials, so a malformed message
  // gets an accurate error rather than being masked as a service outage.
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Could not read that message." }, { status: 400 });
  }

  const parsed = chatSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      {
        error:
          "That message was too long or malformed. Please try a shorter question.",
      },
      { status: 422 },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn(
      "[chat] ANTHROPIC_API_KEY is not set — the assistant cannot answer. Set it to enable the chatbot.",
    );
    return Response.json({ error: FALLBACK_MESSAGE }, { status: 503 });
  }

  // Keep only the most recent turns, so a long conversation cannot grow the
  // request without limit. The cached system prompt is unaffected.
  const history = parsed.data.messages.slice(-LIMITS.maxHistoryMessages);

  const client = new Anthropic();

  try {
    const stream = client.messages.stream({
      model: CHAT_MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      output_config: { effort: CHAT_EFFORT },
      // The knowledge base is large and identical on every request, so it is
      // cached. Verify it is working by checking that
      // usage.cache_read_input_tokens is non-zero on the second request.
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: history.map((m) => ({ role: m.role, content: m.content })),
    });

    const encoder = new TextEncoder();
    let full = "";

    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              full += event.delta.text;
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }

          const finalMessage = await stream.finalMessage();

          if (finalMessage.stop_reason === "refusal") {
            const note =
              "I am not able to help with that one. For anything about Capsule's services, ask me here — otherwise the team is on Viber.";
            controller.enqueue(encoder.encode(note));
            full = note;
          }

          const usage = finalMessage.usage;
          console.log(
            `[chat] ${history.length} turns · in ${usage.input_tokens} · out ${usage.output_tokens} · ` +
              `cache write ${usage.cache_creation_input_tokens ?? 0} · cache read ${usage.cache_read_input_tokens ?? 0} · kb ~${KB_ESTIMATED_TOKENS}`,
          );

          controller.close();
          void recordTranscript(history, full);
        } catch (error) {
          console.error("[chat] stream failed", error);
          // The visitor may already have partial text; append a recovery line
          // rather than tearing the response down mid-sentence.
          controller.enqueue(
            encoder.encode(
              full
                ? "\n\nSorry — I lost my train of thought there. Please ask again, or message the team on Viber."
                : FALLBACK_MESSAGE,
            ),
          );
          controller.close();
        }
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      console.error("[chat] rate limited by the API", error);
      return Response.json(
        {
          error:
            "We are handling a lot of questions right now. Please try again shortly, or message the team on Viber.",
        },
        { status: 429 },
      );
    }

    if (error instanceof Anthropic.AuthenticationError) {
      console.error("[chat] ANTHROPIC_API_KEY is invalid or expired", error);
      return Response.json({ error: FALLBACK_MESSAGE }, { status: 503 });
    }

    if (error instanceof Anthropic.APIConnectionError) {
      console.error("[chat] could not reach the API", error);
      return Response.json({ error: FALLBACK_MESSAGE }, { status: 503 });
    }

    console.error("[chat] unexpected failure", error);
    return Response.json({ error: FALLBACK_MESSAGE }, { status: 500 });
  }
}
