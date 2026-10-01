import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import AddressTierCards from "@/components/AddressTierCards";
import Button from "@/components/Button";
import { WORKSPACE_SCOPE } from "@/content/scope";
import { approvalNote } from "@/content/services";
import { DOCUMENT_HANDLING } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Virtual Office Services & Packages",
  description: "Compare Basic, Corporate and VIP virtual office services and rates in Makati. Business addresses, basic document handling and facilities for agreed compliance purposes.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <>
    <PageHeader eyebrow="Services & packages" headline="Choose the presence your business requires." intro="A professional Makati business address for local businesses and foreign individuals or companies establishing or expanding in the Philippines." />
    <Section heading="Compare our packages">
      <AddressTierCards />
      <div className="mt-8 max-w-[80ch] border-l-2 border-gold/50 pl-5">
        <h3 className="text-lg">Included in every package</h3>
        <p className="mt-3 text-body-soft">{DOCUMENT_HANDLING}</p>
      </div>
    </Section>
    <Section heading="VIP facilities & service scope">
      <div className="flex max-w-[80ch] flex-col gap-5 text-body-soft">
        {/* The list of what VIP caters to lives on its card above. Repeating it
            here is how the two drift apart, so this section carries only what
            the card does not: the warehouse caveat and the scope limits. */}
        <p>Warehouse and storage facilities are subject to availability and applicable requirements.</p>
        <p>{approvalNote} Government approval is not guaranteed.</p>
        <p className="border-l-2 border-gold pl-5 text-body">{WORKSPACE_SCOPE}</p>
      </div>
      <div className="mt-7"><Button href="/contact">Discuss your requirements</Button></div>
    </Section>
  </>;
}