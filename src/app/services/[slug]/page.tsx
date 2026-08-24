import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PriceTable from "@/components/PriceTable";
import AddressTierCards from "@/components/AddressTierCards";
import PricingNote from "@/components/PricingNote";
import Section from "@/components/Section";
import { getService, serviceSlugs } from "@/content/services";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader
        eyebrow={service.name}
        headline={service.headline}
        intro={service.intro}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={`/contact?service=${service.slug}`}>
            Enquire about this
          </Button>
          <Button href="/pricing" variant="outline">
            See pricing
          </Button>
        </div>
      </PageHeader>

      <Section eyebrow="In short" tone="bone">
        <ul className="grid gap-4 sm:grid-cols-2">
          {service.highlights.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.55rem] h-1 w-3 shrink-0 bg-clay"
              />
              <span className="text-[0.95rem] text-body-soft">{item}</span>
            </li>
          ))}
        </ul>

        {service.deliveredByPartners ? (
          <p className="mt-8 max-w-[66ch] border-l-2 border-clay bg-clay-wash px-4 py-3 text-[0.88rem] text-body-soft">
            This service is delivered by the licensed professional firms we work
            with, not by Capsule directly. We coordinate the engagement, provide
            the registered address, and remain your single point of contact.
          </p>
        ) : null}
      </Section>

      {service.sections.map((section, index) => (
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

      {service.pricingBlock !== "none" ? (
        <Section
          eyebrow="Pricing"
          heading={
            service.pricingBlock === "address"
              ? "Address tiers"
              : service.pricingBlock === "registration"
                ? "Registration and compliance services"
                : service.pricingBlock === "workspace"
                  ? "Workspace rates"
                  : "Meeting room rates"
          }
          tone="bone"
        >
          <div className="flex flex-col gap-5">
            {service.pricingBlock === "address" ? (
              <AddressTierCards />
            ) : (
              <PriceTable kind={service.pricingBlock} />
            )}
            <PricingNote />
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
