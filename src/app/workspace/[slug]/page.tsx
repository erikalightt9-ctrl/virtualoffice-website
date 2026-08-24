import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import PricingNote from "@/components/PricingNote";
import Section from "@/components/Section";
import { getWorkspacePage, workspaceSlugs } from "@/content/workspace";
import { formatPeso, publishedWorkspace } from "@/content/pricing";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return workspaceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getWorkspacePage(slug);
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function WorkspaceDetailPage({ params }: Params) {
  const { slug } = await params;
  const page = getWorkspacePage(slug);
  if (!page) notFound();

  const product = publishedWorkspace.find((p) => p.id === page.pricingId);

  return (
    <>
      <PageHeader
        eyebrow={page.name}
        headline={page.headline}
        intro={page.intro}
      >
        <div className="flex flex-wrap items-center gap-5">
          {product ? (
            <div className="flex items-baseline gap-2">
              <span className="tnum font-display text-[2rem] font-bold leading-none text-ink">
                {formatPeso(product.price)}
              </span>
              {product.price !== null ? (
                <span className="text-[0.85rem] text-body-faint">
                  {product.unit}
                </span>
              ) : null}
            </div>
          ) : null}
          <Button href={`/contact?service=workspace&plan=${page.slug}`}>
            Enquire about {page.name}
          </Button>
        </div>
      </PageHeader>

      {product ? (
        <Section eyebrow="Included" heading="What comes with it" tone="bone">
          <div className="flex flex-col gap-6">
            <ul className="grid gap-4 sm:grid-cols-2">
              {product.features.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55rem] h-1 w-3 shrink-0 bg-clay"
                  />
                  <span className="text-[0.95rem] text-body-soft">{item}</span>
                </li>
              ))}
            </ul>
            <PricingNote className="max-w-[66ch]" />
          </div>
        </Section>
      ) : null}

      {page.sections.map((section, index) => (
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

      <CtaBand />
    </>
  );
}
