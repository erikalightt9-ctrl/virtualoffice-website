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

      <Section eyebrow="The steps" tone="bone">
        <div className="border-t border-rule-strong">
          {howItWorks.steps.map((step) => (
            <div
              key={step.n}
              className="grid grid-cols-[2.8rem_1fr] items-start gap-x-4 border-b border-rule py-6"
            >
              <span className="mt-1 font-mono text-[0.8rem] text-clay">
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

      <Section
        eyebrow="Why we screen"
        heading="The approval step is the point, not the friction"
        tone="surface"
      >
        <div className="flex max-w-[68ch] flex-col gap-4">
          <p className="text-body">
            A provider that accepts every applicant ends up with an address
            associated with whatever those applicants do — and that reflects on
            every other company registered there, including with banks and
            regulators.
          </p>
          <p className="text-body">
            So we ask for documents, we check them against our{" "}
            <a
              href="/acceptable-use"
              className="text-clay underline underline-offset-2"
            >
              acceptable use policy
            </a>
            , and we decline some applications. It adds a step for you. It is
            also the reason our address is worth registering at.
          </p>
        </div>
      </Section>

      <CtaBand
        headline="Not sure whether you qualify?"
        body="Tell us what your business does and we will tell you plainly, before you pay anything, whether we can offer you a registered address."
      />
    </>
  );
}
