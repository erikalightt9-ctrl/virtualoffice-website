import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import RequirementsChecklist from "@/components/RequirementsChecklist";
import Section from "@/components/Section";
import {
  DOCUMENTS,
  PRE_ENTRY_BOUNDARY,
} from "@/content/requirements";

export const metadata: Metadata = {
  title: "What You Need to Sign Up",
  description:
    "Prepare an inquiry for Virtual Office Basic, Corporate or VIP. Requirements depend on business activity, registration stage and the relevant agency.",
};

export default function RequirementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Requirements"
        headline="Prepare your application."
        intro="Use this checklist to prepare your inquiry. Our team will confirm the documents and facilities required for your package, business activity and registration stage."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?service=virtual-office">Inquire now</Button>
          <Button href="/services" variant="outline">
            Compare packages
          </Button>
        </div>
      </PageHeader>

      {/* The interactive check comes first: it is the reason to be on this
          page, and it routes people to the right package on its own. */}
      <Section
        eyebrow="Check yourself"
        heading="Prepare for your inquiry"
        intro="Pick your situation and tick what you hold. Nothing is sent to us and nothing is saved."
      >
        <RequirementsChecklist />
      </Section>

      <Section><p className="max-w-[72ch] text-body-soft">{PRE_ENTRY_BOUNDARY}</p></Section>

      <Section
        eyebrow="The documents"
        heading="Information to prepare"
        intro="Share what you currently have. Our team may request further documents or facility details after reviewing your intended use."
      >
        <div className="flex flex-col gap-px bg-rule">
          {DOCUMENTS.map((doc) => (
            <div key={doc.name} className="flex flex-col gap-2 glass-cell p-6">
              <h3 className="text-[1.02rem] font-semibold text-body">
                {doc.name}
              </h3>
              <p className="max-w-[70ch] text-[0.9rem] leading-relaxed text-body-soft">
                {doc.what}
              </p>
              {doc.where ? (
                <p className="max-w-[70ch] text-[0.86rem] text-body-faint">
                  {doc.where}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Section>




      <CtaBand
        headline="Discuss your address and facility requirements."
        body="Tell us where you are in the process. We will confirm the appropriate package, requirements and activation arrangements."
      />
    </>
  );
}
