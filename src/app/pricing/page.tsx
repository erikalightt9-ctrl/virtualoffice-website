import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PriceTable from "@/components/PriceTable";
import AddressTierCards from "@/components/AddressTierCards";
import PricingNote from "@/components/PricingNote";
import Section from "@/components/Section";
import { TERMS } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Published rates for the PDMN Virtual Office virtual office in Makati: business address packages, desks, private offices and meeting rooms at 104 Paseo de Roxas.",
};

export default function PricingPage() {
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
        intro="Rates shown are per month on a twelve-month term, with the rolling monthly rate beneath. Only the Registered package and above may be used as a registered business address."
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
        intro="Longer terms carry better rates. For clients using the address as a registered business address we recommend twelve months — an address that changes every few months creates avoidable work for you."
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

      <Section
        eyebrow="Workspace"
        heading="Desks, team space and private offices"
        intro="All workspace products include the Registered-address package, so the address you use is the one your people actually sit at."
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

      <CtaBand
        headline="Not sure which tier you need?"
        body="Tell us what you are trying to do — register a company, move an address, house a team — and we will tell you which package fits and what it will cost."
      />
    </>
  );
}
