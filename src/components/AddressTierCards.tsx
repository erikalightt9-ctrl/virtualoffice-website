import Link from "next/link";
import PackageRate from "./PackageRate";
import { publishedAddressTiers } from "@/content/pricing";

/**
 * The three business address tiers. Prices come from content/pricing.ts.
 */
export default function AddressTierCards({
  showAllFeatures = true,
}: {
  showAllFeatures?: boolean;
}) {
  return (
    <div className="grid gap-px bg-rule md:grid-cols-3">
      {publishedAddressTiers.map((tier) => (
        <div
          key={tier.id}
          className={`relative flex flex-col gap-5 bg-surface p-6 sm:p-7 ${
            tier.featured ? "ring-2 ring-inset ring-clay" : ""
          }`}
        >
          {tier.featured ? (
            <span className="accent-fill label absolute right-0 top-0 px-3 py-1.5">
              Most chosen
            </span>
          ) : null}

          <div className="flex flex-col gap-2">
            <h3 className="text-[1.5rem]">{tier.name}</h3>
            <p className="text-[0.9rem] text-body-soft">{tier.bestFor}</p>
          </div>

          <PackageRate tier={tier} />

          {/* A quoted tier carries its own structure — what it includes, what
              the facilities cater to, and what we need in order to quote. A
              priced tier is a flat feature list. Both end up the same height
              because the wrapper is flex-1. */}
          {showAllFeatures && tier.catersTo?.length ? (
            <div className="flex flex-1 flex-col gap-5 text-[0.88rem]">
              {tier.includes ? (
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-[0.95rem] font-semibold text-body">Includes</h4>
                  <p className="leading-relaxed text-body-soft">{tier.includes}</p>
                </div>
              ) : null}

              <div className="flex flex-col gap-2">
                <h4 className="text-[0.95rem] font-semibold text-body">
                  What this package caters to
                </h4>
                <ul className="flex flex-col gap-2">
                  {tier.catersTo.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-[0.45rem] h-1 w-2.5 shrink-0 bg-gold"
                      />
                      <span className="text-body-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {tier.quotationPrompt ? (
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-[0.95rem] font-semibold text-body">
                    Request an accurate quotation
                  </h4>
                  <p className="leading-relaxed text-body-soft">{tier.quotationPrompt}</p>
                </div>
              ) : null}
            </div>
          ) : showAllFeatures ? (
            <ul className="flex flex-1 flex-col gap-2.5 text-[0.88rem]">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[0.45rem] h-1 w-2.5 shrink-0 bg-clay" />
                  <span className="text-body-soft">{f}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <Link
            href={`/contact?plan=${tier.id}`}
            className={`mt-auto inline-flex items-center justify-center px-4 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.09em] transition-colors ${
              tier.featured
                ? "accent-fill border"
                : "border border-rule-strong text-body hover:border-oak-light"
            }`}
          >
            Inquire about {tier.name}
          </Link>

          {/* Fine print sits below the action, not above it: these are the
              qualifiers on the rate and the scope, and the last of them is the
              line that stops "Business registration" in the list above being
              read as work we perform. */}
          {tier.footnotes?.length ? (
            <ul className="note-panel flex flex-col gap-2">
              {tier.footnotes.map((note, i) => (
                <li key={note}>
                  {i === 0 ? <span aria-hidden="true">*</span> : null}
                  {i === 0 ? " " : null}
                  {note}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}
