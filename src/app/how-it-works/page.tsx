import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { howItWorks } from "@/content/pages";

export const metadata: Metadata = {
  title: howItWorks.metaTitle,
  description: howItWorks.metaDescription,
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        headline={howItWorks.headline}
        intro={howItWorks.intro}
      >
        <Button href="/contact">Start an application</Button>
      </PageHeader>

      <Section eyebrow="The steps">
        <div className="border-t border-rule-strong">
          {howItWorks.steps.map((step) => (
            <div
              key={step.n}
              className="grid grid-cols-[2.8rem_1fr] items-start gap-x-4 border-b border-rule py-6"
            >
              <span className="mt-1 font-mono text-[0.8rem] text-accent-readable">
                {step.n}
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="text-[1.25rem]">{step.title}</h2>
                <p className="max-w-[64ch] text-body-soft">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[66ch] border-l-2 border-clay bg-clay-wash px-4 py-3 text-[0.9rem] text-body-soft">
          {howItWorks.note}
        </p>
      </Section>



      <CtaBand
        headline="Ready to get started?"
        body="Share your business activity and intended address use so we can confirm the appropriate package."
      />
    </>
  );
}
