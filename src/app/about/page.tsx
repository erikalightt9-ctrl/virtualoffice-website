import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import Section from "@/components/Section";
import { site } from "@/content/site";
import { WORKSPACE_SCOPE } from "@/content/scope";
export const metadata: Metadata = { title: "About PDMN Virtual Office", description: "Professional business addresses, basic document handling and VIP compliance facilities in Makati." };
export default function AboutPage() { return <>
  <PageHeader eyebrow="About PDMN Virtual Office" headline="A professional business presence in Makati." intro="We support local businesses and foreign individuals or companies establishing or expanding in the Philippines." />
  <Section heading="What we do"><div className="grid gap-8 lg:grid-cols-2"><div className="flex flex-col gap-5 text-body-soft"><p>We provide a Makati business address and basic document handling. Corporate supports registered-address use, while VIP provides physical facilities for agreed registration and compliance requirements.</p><p className="border-l-2 border-gold pl-5 text-body">{WORKSPACE_SCOPE}</p><p>We confirm package suitability, facility availability and terms before activation. Government use is subject to applicable requirements and approval of the relevant agency; approval is not guaranteed.</p><Button href="/services" variant="outline">Compare packages</Button></div><Photo file="about-reception.png" ratio="aspect-[1672/941]" alt="PDMN reception with marble and wooden counters and company signage" caption="Our reception at 104 Paseo de Roxas, Makati City." /></div></Section>
  <Section heading="Our operator"><BrandLogo height={76} className="mb-5" /><p className="max-w-[68ch] text-body-soft">{site.operator.relationship}</p><p className="mt-4 max-w-[68ch] text-body-soft">Our team reviews each application and confirms the services appropriate for your business activity. Contact us to discuss your requirements.</p><div className="mt-6"><Button href="/contact">Talk to our team</Button></div></Section>
</>; }
