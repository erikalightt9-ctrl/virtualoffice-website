"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SERVICE_OPTIONS, inquirySchema, serviceLabel } from "@/lib/inquiry";
import { site } from "@/content/site";
import { publishedAddressTiers } from "@/content/pricing";
import PackageRate from "./PackageRate";

type Errors = Record<string, string>;


const inputClass =
  "w-full border border-rule-strong bg-surface px-3.5 py-3 text-[0.95rem] text-body outline-none transition-colors focus:border-clay";

export default function InquiryForm() {
  const params = useSearchParams();
  const requested = params.get("plan") ?? params.get("service") ?? "";
  const aliases: Record<string, string> = { "virtual-office": "basic", "registered-business-address": "corporate", "registered-address": "corporate", "virtual-office-vip": "vip", address: "basic", registered: "corporate" };
  const candidate = aliases[requested] ?? requested;
  const presetService = SERVICE_OPTIONS.some(option => option.value === candidate) ? candidate : "";
  const [selectedService, setSelectedService] = useState(presetService || SERVICE_OPTIONS[0].value);
  const selectedTier = publishedAddressTiers.find(tier => tier.id === selectedService);
  const plan = selectedTier?.id ?? "";
  const presetMessage = "";

  const [emailPrepared, setEmailPrepared] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailPrepared(false);
    setFormError(null);
    setErrors({});

    const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(form.entries());

    const result = inquirySchema.safeParse(body);
    if (!result.success) {
      const fieldErrors: Errors = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0] ?? "form");
        fieldErrors[field] ??= issue.message;
      }
      setErrors(fieldErrors);
      setFormError("Please check your details. Name, email and contact number are required; messages must be no longer than 3,000 characters.");
      return;
    }
    const data = result.data;
    if (data.website) return;
    const subject = `Virtual office inquiry — ${serviceLabel(data.service)}`;
    const message = [
      `Name: ${data.name}`, `Company: ${data.company || "—"}`,
      `Email: ${data.email}`, `Contact number: ${data.mobile}`,
      `Service: ${serviceLabel(data.service)}`, "", data.message || "",
    ].join("\r\n");
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    setEmailPrepared(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <input type="hidden" name="plan" value={plan} />

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="label text-body-soft">
            Your name <span className="text-accent-readable">*</span>
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
            <p id="name-error" className="text-[0.82rem] text-accent-readable">
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
            Email <span className="text-accent-readable">*</span>
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
            <p id="email-error" className="text-[0.82rem] text-accent-readable">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="mobile" className="label text-body-soft">
            Mobile, Viber or WhatsApp <span className="text-accent-readable">*</span>
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
            <p id="mobile-error" className="text-[0.82rem] text-accent-readable">
              {errors.mobile}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="service" className="label text-body-soft">
          What do you need? <span className="text-accent-readable">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          value={selectedService}
          onChange={event => setSelectedService(event.target.value)}
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
          <p className="text-[0.82rem] text-accent-readable">{errors.service}</p>
        ) : null}
      </div>

      {selectedTier ? <PackageRate tier={selectedTier} /> : null}

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
          defaultValue={presetMessage}
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
        <p className="text-[0.88rem] text-body-soft">
          This opens a prepared email in your email app. Review it and press Send there to contact us.
        </p>
        <button
          type="submit"
          className="accent-fill inline-flex items-center justify-center border px-6 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.09em] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue in email app
        </button>
        {emailPrepared ? (
          <p role="status" className="text-[0.88rem] text-body-soft">
            Your inquiry has not been sent by this website. Please send it from your email app.
            If no app opens, email {site.contact.email} directly or use Viber or WhatsApp. Your details remain in the form.
          </p>
        ) : null}
        <noscript>Please email {site.contact.email} directly or use the messaging links on this page.</noscript>
        <p className="max-w-[56ch] text-[0.8rem] text-body-faint">
          We use your details only to answer your inquiry. See our{" "}
          <a href="/privacy" className="text-accent-readable underline underline-offset-2">
            privacy policy
          </a>
          . Fields marked <span className="text-accent-readable">*</span> are required.
        </p>
      </div>
    </form>
  );
}
