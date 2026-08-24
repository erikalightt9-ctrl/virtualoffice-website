import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PriceTable from "@/components/PriceTable";
import PricingNote from "@/components/PricingNote";
import Section from "@/components/Section";
import { foreign } from "@/content/pages";

export const metadata: Metadata = {
  title: foreign.metaTitle,
  description: foreign.metaDescription,
};

export default function ForeignCompaniesPage() {
  return (
    <>
      <PageHeader
        eyebrow="For foreign companies"
        headline={foreign.headline}
        intro={foreign.intro}
        tone="dark"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?service=foreign-entry">
            Talk to us about market entry
          </Button>
          <Button href="/pricing" variant="onDark">
            See pricing
          </Button>
        </div>
      </PageHeader>

      <Section
        eyebrow="The sequence"
        heading="What establishing a Philippine presence actually involves"
        intro="It is the same order every time. Knowing it in advance is most of the battle."
        tone="bone"
      >
        <div className="border-t border-rule-strong">
          {foreign.sequence.map((item, index) => (
            <div
              key={item.step}
              className="grid grid-cols-[2.6rem_1fr] items-start gap-x-4 border-b border-rule py-5"
            >
              <span className="mt-1 font-mono text-[0.78rem] text-clay">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-[1.1rem]">{item.step}</h3>
                <p className="max-w-[62ch] text-[0.92rem] text-body-soft">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {foreign.sections.map((section, index) => (
        <Section
          key={section.heading}
          heading={section.heading}
          tone={index % 2 === 0 ? "surface" : "bone"}
        >
          <div className="flex flex-col gap-4">
            {section.body.map((para) => (
              <p key={para} className="max-w-[68ch] text-body">
                {para}
              </p>
            ))}
          </div>
        </Section>
      ))}

      <Section
        eyebrow="Pricing"
        heading="Registration and compliance"
        intro="Delivered by the licensed firms we work with, coordinated by us, with the registered address included."
        tone="surface"
      >
        <div className="flex flex-col gap-5">
          <PriceTable kind="registration" />
          <PricingNote />
          <p className="max-w-[68ch] text-[0.88rem] text-body-soft">
            Foreign-owned structures vary considerably in capital requirements
            and permitted activities, so we quote them individually after
            understanding what you intend to do in the Philippines. We will not
            guarantee a government timeline or outcome, because nobody can.
          </p>
        </div>
      </Section>

      <CtaBand
        headline="Tell us what you are trying to set up."
        body="Send an enquiry with your intended structure and activity, and we will come back with the sequence, the requirements and a written quotation. We work in English and Chinese."
      />
    </>
  );
}
