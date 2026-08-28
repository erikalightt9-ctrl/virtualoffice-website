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
        eyebrow="About PDMN Virtual Office"
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
          <Photo file="lounge.jpg" alt="The client lounge on the 5th floor" caption="The lounge, on the 5th floor." />
          <Photo file="reception.jpg" position="78% 45%" alt="Reception on the 5th floor, with the Philippine Dragon Media Network signage" caption="Reception, staffed through business hours." />
          <Photo file="meeting-room.jpg" alt="A meeting room on the 5th floor" caption="One of six bookable rooms." />
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
            PDMN Virtual Office provides a virtual office and nothing beyond it. Company
            registration, government filings, business permits, bookkeeping,
            accounting, tax, payroll and corporate secretarial work are not
            services we offer, coordinate or advise on.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
