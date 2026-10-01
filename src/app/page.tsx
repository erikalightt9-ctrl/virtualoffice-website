import type { Metadata } from "next";
import Image from "next/image";
import logo from "../../public/pdmn-logo-badge.png";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import AddressTierCards from "@/components/AddressTierCards";
import Container from "@/components/Container";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import HomeHero from "@/components/HomeHero";
import OfficeGallery from "@/components/OfficeGallery";
import ProofStrip from "@/components/ProofStrip";
import Section from "@/components/Section";
import { faqs } from "@/content/faqs";
import { howItWorks } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = { description: site.description };

/**
 * The homepage is ordered as a buying decision, not as a brochure.
 *
 *   hero          what we offer, and where
 *   proof strip   that we are real
 *   packages      which option fits, and what it costs
 *   mail          how correspondence actually reaches you
 *   how it works  what happens after you enquire
 *   premises      evidence the office exists
 *   faqs          the objections that stop a decision
 *   inquiry       one next step
 *
 * The previous order put office photographs and company history before any
 * mention of price, so a visitor ready to buy had to leave the page to find
 * out what it costs.
 */
export default function HomePage() {
  const heroImage = existsSync(join(process.cwd(), "public/photos/hero-primary.png"))
    ? "/photos/hero-primary.png"
    : "/photos/reception.jpg";

  /* The objections that actually stop a decision, in the order they occur. */
  const essentialFaqs = faqs.filter((f) => f.featured).slice(0, 5);

  return (
    <div data-liquid-home>
      <HomeHero image={heroImage} />

      <ProofStrip />

      <Section
        id="packages"
        eyebrow="Packages"
        heading="Three ways to hold a Makati address."
        intro="Document handling is the same on every package. What changes is what you may use the address for, and whether you need a physical office an agency can inspect."
      >
        <AddressTierCards />
        <p className="mt-8 text-[0.95rem] text-body-soft">
          <Link href="/pricing" className="text-gold underline underline-offset-4">
            See the full comparison
          </Link>{" "}
          — or{" "}
          <Link href="/requirements" className="text-gold underline underline-offset-4">
            check what you need to apply
          </Link>
          .
        </p>
      </Section>

      {/* NOTE FOR THE OPERATOR: this section states only what is confirmed —
          receipt, notification, and collection. Scanning, forwarding, courier
          and parcel policy, retention period and what happens to mail after
          cancellation are NOT settled yet, and competitors publish theirs. As
          soon as those are decided they belong here, because for an overseas
          client this is the section that decides whether the service is
          usable at all. Do not invent them in the meantime. */}
      <Section
        eyebrow="Your correspondence"
        heading="How your documents reach you."
        intro="What we do with post addressed to your business, and what stays your responsibility."
      >
        <div className="grid gap-px bg-rule sm:grid-cols-3">
          {[
            {
              t: "We receive it",
              b: "Documents addressed to your business are received by on-site staff during office hours.",
            },
            {
              t: "We tell you",
              b: "We notify you that something has arrived, so nothing sits unseen.",
            },
            {
              t: "You collect it",
              b: "Held for collection by you or an authorised representative, following our operating hours and authorisation procedures.",
            },
          ].map((s) => (
            <div key={s.t} className="flex flex-col gap-2 glass-cell p-6">
              <h3 className="text-[1.02rem] font-semibold text-body">{s.t}</h3>
              <p className="text-[0.9rem] leading-relaxed text-body-soft">{s.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-7 max-w-[70ch] text-[0.92rem] text-body-soft">
          Reviewing your correspondence and meeting any deadline in it remains
          your responsibility. If you are based overseas, tell us at enquiry how
          you would like documents handled and we will confirm what is available
          for your package before you commit.
        </p>
      </Section>

      <Section
        eyebrow="How it works"
        heading={howItWorks.headline}
        intro={howItWorks.intro}
      >
        <ol className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.slice(0, 4).map((step) => (
            <li key={step.n} className="flex flex-col gap-2 glass-cell p-6">
              <span className="font-mono text-[0.7rem] font-bold tracking-[0.1em] text-gold">
                {step.n}
              </span>
              <h3 className="text-[1.02rem] font-semibold text-body">{step.title}</h3>
              <p className="text-[0.89rem] leading-relaxed text-body-soft">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[0.95rem]">
          <Link href="/how-it-works" className="text-gold underline underline-offset-4">
            The full process
          </Link>
        </p>
      </Section>

      <OfficeGallery />

      <Section
        eyebrow="Before you ask"
        heading="The questions that come up most."
      >
        <FaqList items={essentialFaqs} />
        <p className="mt-8 text-[0.95rem]">
          <Link href="/faq" className="text-gold underline underline-offset-4">
            All frequently asked questions
          </Link>
        </p>
      </Section>

      <div className="home-closing">
        <div className="home-logo-panel">
          <Image src={logo} alt="PDMN Virtual Office" sizes="(max-width: 540px) 280px, 420px" />
        </div>
      <CtaBand
        headline="Establish your business presence in Makati."
        body="Tell us your business activity, registration stage and how you need to use the address. We will confirm the right package and what it involves before anything is agreed."
      />
      </div>

      <Container className="py-10">
        <p className="max-w-[70ch] text-[0.9rem] text-body-soft">
          PDMN Virtual Office is operated by {site.operator.name}{" "}
          <Link href="/about" className="text-gold underline underline-offset-4">
            About the operator
          </Link>
        </p>
      </Container>
    </div>
  );
}
