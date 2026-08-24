import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services — Business Address, Registration & Compliance",
  description:
    "Business address, registered address, mail handling, company registration, accounting, tax, payroll and corporate secretarial services from Makati CBD.",
};

export default function ServicesIndexPage() {
  const direct = services.filter((s) => !s.deliveredByPartners);
  const partnered = services.filter((s) => s.deliveredByPartners);

  return (
    <>
      <PageHeader
        eyebrow="Services"
        headline="Everything a Philippine company needs to exist, and keep existing."
        intro="Capsule provides the address, the premises and the administration from our own floor. Registration, accounting, tax, payroll and corporate secretarial work is delivered by the licensed firms we work with — and coordinated by us, so you deal with one team."
      />

      <Section
        eyebrow="Provided by Capsule"
        heading="From our own floor at 104 Paseo de Roxas"
        tone="bone"
      >
        <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {direct.map((service) => (
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
        eyebrow="Through our partner firms"
        heading="Regulated work, done by people accountable for it"
        intro="We are deliberate about this distinction. Professional services are performed by licensed firms who carry the responsibility for that work. Capsule coordinates the engagement and keeps the sequence moving."
        tone="surface"
      >
        <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {partnered.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col gap-3 bg-surface p-6 transition-colors hover:bg-surface-2"
            >
              <h2 className="text-[1.1rem]">{service.name}</h2>
              <p className="flex-1 text-[0.88rem] text-body-soft">
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

      <CtaBand />
    </>
  );
}
