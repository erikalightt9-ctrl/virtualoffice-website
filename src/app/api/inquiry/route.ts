import { NextResponse } from "next/server";
import { inquirySchema, serviceLabel } from "@/lib/inquiry";

/**
 * Receives enquiries from the contact form.
 *
 * WHERE THE LEADS GO
 * ------------------
 * Set INQUIRY_WEBHOOK_URL in your environment and every enquiry is POSTed
 * there as JSON. That endpoint can be a shared inbox service, a CRM, a
 * Google Sheet webhook, or a Viber/Slack notification — whatever the team
 * actually watches.
 *
 * If the variable is not set, enquiries are written to the server log so
 * nothing is lost during development, and the visitor still gets a
 * confirmation. Set it before launch.
 */

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that submission. Please try again." },
      { status: 400 },
    );
  }

  const parsed = inquirySchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // The honeypot was filled in — accept silently so the bot learns nothing.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    company: data.company || null,
    service: data.service,
    serviceLabel: serviceLabel(data.service),
    plan: data.plan || null,
    referrer: data.referrer || null,
    message: data.message || null,
  };

  const webhook = process.env.INQUIRY_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        console.error(
          `[inquiry] webhook responded ${response.status}`,
          JSON.stringify(lead),
        );
        return NextResponse.json(
          {
            ok: false,
            error:
              "We could not record your enquiry just now. Please message us on Viber or call the office and we will pick it up straight away.",
          },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error("[inquiry] webhook failed", error, JSON.stringify(lead));
      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not record your enquiry just now. Please message us on Viber or call the office and we will pick it up straight away.",
        },
        { status: 502 },
      );
    }
  } else {
    console.warn(
      "[inquiry] INQUIRY_WEBHOOK_URL is not set — logging the lead instead:",
      JSON.stringify(lead),
    );
  }

  return NextResponse.json({ ok: true });
}
