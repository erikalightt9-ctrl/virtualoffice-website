import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import Section from "@/components/Section";
import ProofStrip from "@/components/ProofStrip";
import { about } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: about.metaTitle,
  description: about.metaDescription,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Capsule"
        headline={about.headline}
        intro={about.intro}
      />

      <ProofStrip />

      {about.sections.map((section, index) => (
        <Section
          key={section.heading}
          heading={section.heading}
          tone={index % 2 === 0 ? "bone" : "surface"}
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

      <Section eyebrow="The office" heading="Where we are" tone="bone">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Photo file="building.jpg" alt="104 Paseo de Roxas" caption="104 Paseo de Roxas, Makati City." />
          <Photo file="reception.jpg" alt="Reception on the 5th floor" caption="Reception, staffed through business hours." />
          <Photo file="floor.jpg" alt="The 5th floor" caption="Approximately 613 sqm on the 5th floor." />
        </div>
      </Section>

      <Section eyebrow="The operator" tone="surface">
        <div className="max-w-[68ch] border border-rule bg-bone p-6">
          <h2 className="text-[1.2rem]">{site.operator.name}</h2>
          <p className="mt-3 text-body-soft">
            {site.operator.relationship}
          </p>
          {site.operator.secRegistrationNo !== "TODO" ? (
            <p className="mt-2 font-mono text-[0.85rem] text-body-faint">
              SEC registration no. {site.operator.secRegistrationNo}
            </p>
          ) : null}
          <p className="mt-3 text-[0.9rem] text-body-soft">
            Registration, accounting, tax, payroll and corporate secretarial
            services are delivered by independent licensed partner firms rather
            than by Capsule directly.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
