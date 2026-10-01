import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about Virtual Office Basic, Corporate and VIP, registered-address use, physical facilities and government registration support in Makati.",
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
        headline="Frequently Asked Questions"
      />

      <Section>
        <FaqList items={faqs} numbered />
      </Section>

      <CtaBand
        headline="Still have a question?"
        body="Contact our team for help with your package, documents or facility requirements."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
