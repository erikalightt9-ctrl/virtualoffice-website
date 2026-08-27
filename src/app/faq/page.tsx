import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { faqCategories, faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers on registered address eligibility, BIR inspections, mail handling, workspace, documents required, terms and payment methods at The Grounds Makati.",
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        headline="Questions we are asked, answered properly."
        intro="If your question is not here, ask us. We would rather tell you now than have you find out after signing."
      />

      {faqCategories.map((category, index) => (
        <Section
          key={category}
          heading={category}
          tone={index % 2 === 0 ? "bone" : "surface"}
        >
          <FaqList items={faqs.filter((f) => f.category === category)} />
        </Section>
      ))}

      <CtaBand
        headline="Still have a question?"
        body="Send it to us. If it is a good one we will add it to this page, because someone else is probably wondering the same thing."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
