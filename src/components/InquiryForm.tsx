"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SERVICE_OPTIONS } from "@/lib/inquiry";

type Errors = Record<string, string>;

const inputClass =
  "w-full border border-rule-strong bg-surface px-3.5 py-3 text-[0.95rem] text-body outline-none transition-colors focus:border-clay";

export default function InquiryForm() {
  const params = useSearchParams();
  const plan = params.get("plan") ?? "";
  const partner = params.get("ref") ?? "";
  const presetService = params.get("service") ?? "";

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFormError(null);
    setErrors({});

    const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setErrors(result.fieldErrors ?? {});
        setFormError(
          result.error ?? "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setFormError(
        "We could not reach the server. Please check your connection, or message us on Viber.",
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-rule bg-surface p-7">
        <p className="label text-clay">Enquiry received</p>
        <h3 className="mt-3 text-[1.4rem]">Thank you — we have it.</h3>
        <p className="mt-3 max-w-[52ch] text-body-soft">
          A member of our team will come back to you during business hours. If
          it is urgent, message us on Viber or call the office and we will pick
          it up straight away.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <input type="hidden" name="plan" value={plan} />
      <input type="hidden" name="referrer" value={partner} />

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="label text-body-soft">
            Your name <span className="text-clay">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p id="name-error" className="text-[0.82rem] text-clay">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="label text-body-soft">
            Company <span className="normal-case tracking-normal text-body-faint">(if you have one)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="label text-body-soft">
            Email <span className="text-clay">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="text-[0.82rem] text-clay">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="mobile" className="label text-body-soft">
            Mobile, Viber or WhatsApp <span className="text-clay">*</span>
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
            aria-invalid={Boolean(errors.mobile)}
            aria-describedby={errors.mobile ? "mobile-error" : undefined}
          />
          {errors.mobile ? (
            <p id="mobile-error" className="text-[0.82rem] text-clay">
              {errors.mobile}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="service" className="label text-body-soft">
          What do you need? <span className="text-clay">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue={presetService || SERVICE_OPTIONS[0].value}
          className={inputClass}
          aria-invalid={Boolean(errors.service)}
        >
          {SERVICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.service ? (
          <p className="text-[0.82rem] text-clay">{errors.service}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="label text-body-soft">
          Anything else{" "}
          <span className="normal-case tracking-normal text-body-faint">
            (optional)
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClass}
          placeholder="Tell us about your business, your timeline, or the question you need answered."
        />
      </div>

      {formError ? (
        <p
          role="alert"
          className="border-l-2 border-clay bg-clay-wash px-4 py-3 text-[0.88rem] text-body"
        >
          {formError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="accent-fill inline-flex items-center justify-center border px-6 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.09em] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="max-w-[56ch] text-[0.8rem] text-body-faint">
          We use your details only to answer your enquiry. See our{" "}
          <a href="/privacy" className="text-clay underline underline-offset-2">
            privacy policy
          </a>
          . Fields marked <span className="text-clay">*</span> are required.
        </p>
      </div>
    </form>
  );
}
