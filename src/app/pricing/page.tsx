import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PriceTable from "@/components/PriceTable";
import AddressTierCards from "@/components/AddressTierCards";
import PricingNote from "@/components/PricingNote";
import Section from "@/components/Section";
import { TERMS, formatPeso, publishedBundles } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing — Business Address, Workspace & Registration",
  description:
    "Published rates for business addresses, desks, private offices, meeting rooms and company registration at 104 Paseo de Roxas, Legaspi Village, Makati.",
};

export default function PricingPage() {
  const bundle = publishedBundles[0];

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        headline="Our rates, in public."
        intro="Most providers in this market hide their pricing behind an enquiry form. We publish ours so you can compare properly, decide quickly, and only talk to us when you have a real question."
      />

      <Section
        eyebrow="Business address"
        heading="The three address tiers"
        intro="Rates shown are per month on a twelve-month term, with the rolling monthly rate beneath. Only the Registered tier and above may be used for government registration."
        tone="bone"
      >
        <div className="flex flex-col gap-6">
          <AddressTierCards />
          <PricingNote />
        </div>
      </Section>

      <Section
        eyebrow="Terms"
        heading="Monthly, six months or twelve"
        intro="Longer terms carry better rates. For registered-address clients we recommend twelve months — a registered address that changes every few months creates avoidable filings with the SEC, the BIR and your local government unit."
        tone="surface"
      >
        <div className="grid gap-px bg-rule sm:grid-cols-3">
          {TERMS.map((term) => (
            <div key={term.id} className="flex flex-col gap-1 bg-surface p-6">
              <span className="font-display text-[1.2rem] font-semibold text-ink">
                {term.label}
              </span>
              <span className="text-[0.88rem] text-body-soft">
                {term.discountNote}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {bundle ? (
        <Section
          eyebrow="Bundle"
          heading={bundle.name}
          intro={bundle.headline}
          tone="bone"
        >
          <div className="border border-rule-strong bg-surface p-7 sm:p-9">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex flex-col gap-4">
                <span className="tnum font-display text-[clamp(2.2rem,6vw,3rem)] font-bold leading-none text-clay">
                  {formatPeso(bundle.price)}
                </span>
                {bundle.separatePrice ? (
                  <p className="tnum text-[0.9rem] text-body-soft">
                    {formatPeso(bundle.separatePrice)} if bought separately.
                  </p>
                ) : null}
                <Button href="/contact?service=company-registration">
                  Enquire about {bundle.name}
                </Button>
              </div>
              <ul className="flex flex-col gap-3">
                {bundle.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.92rem]">
                    <span
                      aria-hidden="true"
                      className="mt-[0.5rem] h-1 w-3 shrink-0 bg-clay"
                    />
                    <span className="text-body-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ) : null}

      <Section
        eyebrow="Workspace"
        heading="Desks, team space and private offices"
        intro="All workspace products include the Registered address tier, so your company is registered where your people actually sit."
        tone="surface"
      >
        <div className="flex flex-col gap-5">
          <PriceTable kind="workspace" />
          <PricingNote />
        </div>
      </Section>

      <Section
        eyebrow="Meeting rooms"
        heading="Six bookable spaces on the floor"
        intro="Address and workspace clients use their monthly allocation first, then pay the member rate. Non-members are welcome to book directly."
        tone="bone"
      >
        <PriceTable kind="rooms" />
      </Section>

      <Section
        eyebrow="Registration & compliance"
        heading="One-time and retainer services"
        intro="These are delivered by the licensed professional firms we work with. Capsule coordinates the engagement and provides the registered address."
        tone="surface"
      >
        <div className="flex flex-col gap-5">
          <PriceTable kind="registration" />
          <p className="max-w-[66ch] text-[0.88rem] text-body-soft">
            Retainers depend on transaction volume, headcount, VAT status and
            whether an independent audit is required. You will receive a written
            scope and a fixed fee before any work begins. No provider controls
            government timelines or outcomes, and we will not pretend otherwise.
          </p>
        </div>
      </Section>

      <CtaBand
        headline="Not sure which tier you need?"
        body="Tell us what you are trying to do — register a company, move an address, house a team — and we will tell you which package fits and what it will cost."
      />
    </>
  );
}
