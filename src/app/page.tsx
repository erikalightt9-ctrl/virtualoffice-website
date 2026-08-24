import Link from "next/link";
import Button from "@/components/Button";
import Container from "@/components/Container";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import Ladder from "@/components/Ladder";
import Photo from "@/components/Photo";
import AddressTierCards from "@/components/AddressTierCards";
import PricingNote from "@/components/PricingNote";
import ProofStrip from "@/components/ProofStrip";
import Section from "@/components/Section";
import { featuredFaqs } from "@/content/faqs";
import { formatPeso, publishedBundles } from "@/content/pricing";
import { site } from "@/content/site";
import { howItWorks } from "@/content/pages";

export default function HomePage() {
  const bundle = publishedBundles[0];

  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <section className="border-b border-rule bg-surface">
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <p className="label text-clay">
              {site.address.floor}, {site.address.line1}, {site.address.city}
            </p>
            <h1 className="max-w-[20ch] text-[clamp(2.1rem,5.6vw,3.6rem)]">
              Register your company in Makati. Then actually have an office
              there.
            </h1>
            <p className="max-w-[54ch] text-[1.08rem] text-body-soft">
              A business address at 104 Paseo de Roxas with a real 5th-floor
              office behind it — staffed reception, six meeting rooms, and
              company registration support through our licensed partner firms.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/pricing">See packages &amp; pricing</Button>
              <Button href={site.contact.viberHref} variant="outline" external>
                Talk to us on Viber
              </Button>
            </div>
            <p className="max-w-[52ch] text-[0.85rem] text-body-faint">
              Registration use of the address is available on eligible packages
              and subject to approval, documentary requirements and applicable
              government regulations.
            </p>
          </div>

          <Photo
            file="reception.jpg"
            alt="Capsule reception on the 5th floor"
            ratio="aspect-[4/3]"
            priority
          />
        </Container>
      </section>

      <ProofStrip />

      {/* ------------------------------------------------------- PRICING */}
      <Section
        eyebrow="Packages"
        heading="Three tiers, with the prices published."
        intro="Most providers in this market put their rates behind an enquiry form. We would rather you could compare us properly."
        tone="bone"
      >
        <div className="flex flex-col gap-6">
          <AddressTierCards />
          <PricingNote />
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/pricing" variant="outline">
              Full pricing, including workspace
            </Button>
            <Link
              href="/services/registered-business-address"
              className="text-[0.92rem] text-clay underline underline-offset-4"
            >
              What does &ldquo;registration eligible&rdquo; actually mean?
            </Link>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------- BUNDLE */}
      {bundle ? (
        <Section tone="surface">
          <div className="border border-rule-strong bg-bone p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div className="flex flex-col gap-4">
                <p className="label text-clay">{bundle.name}</p>
                <h2 className="max-w-[22ch] text-[clamp(1.5rem,3.4vw,2.2rem)]">
                  {bundle.headline}
                </h2>
                <div className="flex items-baseline gap-3">
                  <span className="tnum font-display text-[clamp(2.2rem,6vw,3.2rem)] font-bold leading-none text-clay">
                    {formatPeso(bundle.price)}
                  </span>
                  {bundle.separatePrice ? (
                    <span className="tnum text-[0.9rem] text-body-faint">
                      {formatPeso(bundle.separatePrice)} bought separately
                    </span>
                  ) : null}
                </div>
                <Button href="/contact?service=company-registration">
                  Enquire about {bundle.name}
                </Button>
              </div>
              <ul className="flex flex-col gap-3">
                {bundle.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.92rem]">
                    <span
                      aria-hidden="true"
                      className="mt-[0.5rem] h-1 w-3 shrink-0 bg-clay"
                    />
                    <span className="text-body-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ) : null}

      {/* -------------------------------------------------------- LADDER */}
      <Section
        eyebrow="The ladder"
        heading="Start with an address. Add what you need, when you need it."
        intro="Most of our clients arrive needing one thing and stay for several. Nothing has to be renegotiated as you move up, and your registered address never has to change."
        tone="bone"
      >
        <Ladder />
      </Section>

      {/* --------------------------------------------------------- OFFICE */}
      <Section
        eyebrow="The office"
        heading="613 square metres on the 5th floor, staffed every business day."
        intro="This is the part competitors selling mailbox services cannot reproduce, and the reason a BIR inspection is not something you need to worry about."
        tone="surface"
      >
        <div className="flex flex-col gap-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Photo
              file="conference-a.jpg"
              alt="Conference Room A"
              caption="Conference Room A — our largest meeting space."
            />
            <Photo
              file="workstations.jpg"
              alt="Serviced workstations"
              caption="Forty to fifty serviced workstations."
            />
            <Photo
              file="meeting-room.jpg"
              alt="Meeting room seating six to seven"
              caption="A meeting room seating six to seven."
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/location" variant="outline">
              See the location
            </Button>
            <Button href="/workspace" variant="outline">
              Desks &amp; private offices
            </Button>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------- HOW IT WORKS */}
      <Section
        eyebrow="How it works"
        heading={howItWorks.headline}
        intro={howItWorks.intro}
        tone="bone"
      >
        <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step) => (
            <div
              key={step.n}
              className="flex flex-col gap-2 bg-surface p-6"
            >
              <span className="font-mono text-[0.78rem] text-clay">
                {step.n}
              </span>
              <h3 className="text-[1.05rem]">{step.title}</h3>
              <p className="text-[0.89rem] text-body-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ FAQ */}
      <Section
        eyebrow="Questions"
        heading="The things people ask before they sign."
        tone="surface"
      >
        <div className="flex flex-col gap-6">
          <FaqList items={featuredFaqs} />
          <Link
            href="/faq"
            className="text-[0.92rem] text-clay underline underline-offset-4"
          >
            All frequently asked questions
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
