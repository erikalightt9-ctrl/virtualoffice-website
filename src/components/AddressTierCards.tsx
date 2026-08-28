import Link from "next/link";
import { formatPeso, publishedAddressTiers } from "@/content/pricing";

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

          <div className="flex flex-col gap-1 border-y border-rule py-4">
            <div className="flex items-baseline gap-1.5">
              <span className="tnum font-display text-[2.1rem] font-bold leading-none text-ink">
                {formatPeso(tier.price12)}
              </span>
              {tier.price12 !== null ? (
                <span className="text-[0.85rem] text-body-faint">/ month</span>
              ) : null}
            </div>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-body-faint">
              {tier.price12 !== null
                ? "on a 12-month term"
                : "priced on application"}
            </span>
            {tier.priceMonthly !== null ? (
              <span className="tnum mt-1 text-[0.82rem] text-body-soft">
                {formatPeso(tier.priceMonthly)} / month, rolling monthly
              </span>
            ) : null}
          </div>

          <div className="flex items-start gap-2">
            <span
              className={`mt-0.5 shrink-0 border px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] ${
                tier.registrationEligible
                  ? "border-clay text-clay"
                  : "border-rule-strong text-body-faint"
              }`}
            >
              {tier.registrationEligible ? "Registered address available" : "Correspondence only"}
            </span>
          </div>

          {showAllFeatures ? (
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
                : "border border-rule-strong text-ink hover:border-ink"
            }`}
          >
            Enquire about {tier.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
