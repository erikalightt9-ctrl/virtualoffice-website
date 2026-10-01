import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import { WORKSPACE_SCOPE } from "@/content/scope";
import { DOCUMENT_HANDLING } from "@/content/pricing";
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
  if (slug === "mail-handling") permanentRedirect("/services/virtual-office");
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
            Inquire about this
          </Button>
          <Button href="/services" variant="outline">
            Compare packages
          </Button>
        </div>
      </PageHeader>

      <Section eyebrow="In short">
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

      </Section>

      {service.sections.map((section) => (
        <Section key={section.heading} heading={section.heading}>
          <div className="flex flex-col gap-4">
            {section.body.map((para) => (
              <p key={para} className="max-w-[68ch] text-body">
                {para}
              </p>
            ))}
          </div>
        </Section>
      ))}

      <Section heading="Included in every package">
        <p className="max-w-[72ch] text-body-soft">{DOCUMENT_HANDLING}</p>
        <p className="mt-4 max-w-[72ch] border-l-2 border-gold pl-5 text-body">{WORKSPACE_SCOPE}</p>
      </Section>

      <CtaBand />
    </>
  );
}
