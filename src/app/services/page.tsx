import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "What the Virtual Office Includes",
  description:
    "The The Grounds virtual office: a Makati business address, mail and document handling, meeting rooms and workspace, with a registered-address option on eligible packages.",
};

export default function ServicesIndexPage() {

  return (
    <>
      <PageHeader
        eyebrow="Services"
        headline="One service, done properly."
        intro="The Grounds is a virtual office. A business address at 104 Paseo de Roxas, mail and documents handled by our own staff, meeting rooms and workspace on the same floor, and a registered-address option for companies that need one. We do not register companies, make filings, obtain permits, or handle accounting, tax or payroll — that work stays with your own advisers."
      />

      <Section
        eyebrow="What is included"
        heading="From our own floor at 104 Paseo de Roxas"
        tone="bone"
      >
        <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col gap-3 bg-surface p-6 transition-colors hover:bg-surface-2"
            >
              <h2 className="text-[1.2rem]">{service.name}</h2>
              <p className="flex-1 text-[0.9rem] text-body-soft">
                {service.summary}
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
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Also on the floor"
        heading="Rooms and workspace"
        intro="Available to address clients at member rates, and bookable directly by anyone else."
        tone="surface"
      >
        <div className="grid gap-px bg-rule sm:grid-cols-2">
          <Link href="/meeting-rooms" className="group flex flex-col gap-3 bg-surface p-6 transition-colors hover:bg-surface-2">
            <h2 className="text-[1.2rem]">Meeting Rooms</h2>
            <p className="flex-1 text-[0.9rem] text-body-soft">Six bookable spaces, from a four-person room to a full conference room.</p>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-clay">See the rooms →</span>
          </Link>
          <Link href="/workspace" className="group flex flex-col gap-3 bg-surface p-6 transition-colors hover:bg-surface-2">
            <h2 className="text-[1.2rem]">Workspace</h2>
            <p className="flex-1 text-[0.9rem] text-body-soft">A desk for the day, a permanent workstation, team space, or an enclosed private office.</p>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-clay">See workspace →</span>
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
