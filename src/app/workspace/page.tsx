import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import PriceTable from "@/components/PriceTable";
import PricingNote from "@/components/PricingNote";
import Section from "@/components/Section";
import { workspacePages } from "@/content/workspace";
import { formatPeso, publishedWorkspace } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Workspace in Makati",
  description:
    "Dedicated desks, team space, private offices and day passes on the 5th floor of 104 Paseo de Roxas, Legaspi Village, Makati. Virtual office included.",
};

export default function WorkspaceIndexPage() {
  const priceFor = (id: string) =>
    publishedWorkspace.find((p) => p.id === id) ?? null;

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        headline="An address is useful. A desk in the same building is better."
        intro="Our floor has serviced workstations, six bookable rooms and administrative staff on site. Take a desk for the day, a permanent workstation, a grouped area for your team, or an enclosed office of your own."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?service=workspace">Enquire about space</Button>
          <Button href="/location" variant="outline">
            See the floor
          </Button>
        </div>
      </PageHeader>

      <Section
        eyebrow="Products"
        heading="Four ways to use the floor"
        intro="Every workspace product includes the Registered-address package, so the address you use is the one your people actually sit at."
        tone="bone"
      >
        <div className="grid gap-px bg-rule sm:grid-cols-2">
          {workspacePages.map((page) => {
            const price = priceFor(page.pricingId);
            return (
              <Link
                key={page.slug}
                href={`/workspace/${page.slug}`}
                className="group flex flex-col gap-3 bg-surface p-6 transition-colors hover:bg-surface-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-[1.25rem]">{page.name}</h2>
                  {price ? (
                    <span className="shrink-0 text-right">
                      <span className="tnum block font-mono text-[0.95rem] font-medium text-ink">
                        {formatPeso(price.price)}
                      </span>
                      {price.price !== null ? (
                        <span className="block font-mono text-[0.65rem] uppercase tracking-[0.06em] text-body-faint">
                          {price.unit}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                </div>
                <p className="flex-1 text-[0.9rem] text-body-soft">
                  {page.summary}
                </p>
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-clay">
                  Read more{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="The floor" heading="What it actually looks like" tone="surface">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Photo file="workspace.jpg" alt="Serviced workstations" caption="Serviced workstations on the main floor." />
          <Photo file="meeting-room.jpg" alt="A meeting room" caption="Six bookable rooms on the same floor." />
          <Photo file="pantry.jpg" alt="The tea room and pantry" caption="The tea room, for informal meetings." />
        </div>
      </Section>

      <Section eyebrow="Rates" heading="Workspace pricing" tone="bone">
        <div className="flex flex-col gap-5">
          <PriceTable kind="workspace" />
          <PricingNote />
        </div>
      </Section>

      <CtaBand
        headline="Take a day pass and try the floor first."
        body="It is the easiest way to see the office, use a meeting room, and meet the team that would be handling your mail and your registration."
      />
    </>
  );
}
