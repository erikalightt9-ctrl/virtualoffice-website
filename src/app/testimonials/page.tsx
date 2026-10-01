import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import CtaBand from "@/components/CtaBand";
import Section from "@/components/Section";
import TestimonialCard from "@/components/TestimonialCard";
import { EMPTY_STATE, PROOF, published } from "@/content/testimonials";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Client Experience",
  description:
    "What it is like to be a PDMN Virtual Office client, and what you can verify for yourself before you commit — the operator, the office and the screening.",
};

export default function TestimonialsPage() {
  const hasTestimonials = published.length > 0;

  return (
    <>
      {/* The cinematic background earns its place here: this page is about
          trust, and a dark, quiet band reads as composure rather than sales. */}
      <section
        className="relative border-b border-rule-dark bg-ink text-on-dark"
        style={{
          backgroundImage: 'url("/backgrounds/luxury-smoke-2560.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container className="relative py-20 sm:py-28">
          <p className="label text-gold">Client experience</p>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(2rem,5vw,3.1rem)] font-semibold leading-[1.08] text-on-dark">
            {hasTestimonials
              ? "What our clients say."
              : "Judge us on what you can check."}
          </h1>
          <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-relaxed text-on-dark-soft">
            {hasTestimonials
              ? "Published with each client's permission, in their own words."
              : "We are a new service. Rather than publish praise we have not earned, here is everything about us you can verify without taking our word for it."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact?service=visit"
              className="inline-flex min-h-11 items-center border border-gold/60 bg-[#A80407] px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-on-dark transition-colors hover:bg-[#A80407] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Book a visit
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center border border-gold/40 px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-gold transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Who operates the service
            </Link>
          </div>
        </Container>
      </section>

      {hasTestimonials ? (
        <Section
          eyebrow="In their words"
          heading="What our clients say"
          intro="Every quote below is published with that client's written permission."
        >
          <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {published.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </Section>
      ) : (
        <Section eyebrow="Why there are no quotes here yet">
          <div className="max-w-[68ch]">
            <h2 className="text-[clamp(1.3rem,3vw,1.75rem)] font-semibold leading-snug text-body">
              {EMPTY_STATE.heading}
            </h2>
            <p className="mt-4 text-body-soft">{EMPTY_STATE.body}</p>
          </div>
        </Section>
      )}

      <Section
        eyebrow="Verifiable"
        heading="What you can check before you commit"
        intro="Six things that do not require you to trust us."
      >
        <ol className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {PROOF.map((item, index) => (
            <li key={item.title} className="flex flex-col gap-2 glass-cell p-6">
              <span className="font-mono text-[0.7rem] font-bold tracking-[0.1em] text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[1.02rem] font-semibold text-body">
                {item.title}
              </h3>
              <p className="text-[0.89rem] leading-relaxed text-body-soft">
                {item.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-[68ch] text-[0.92rem] text-body-soft">
          Come and see the floor at {site.address.floor},{" "}
          {site.address.building}, or read{" "}
          <Link href="/acceptable-use" className="text-gold underline">
            who we will not accept
          </Link>{" "}
          — the screening is what keeps the address worth having.
        </p>
      </Section>

      <CtaBand
        headline="The best reference we can offer is the office itself."
        body="Come and look at it, meet the people who will handle your correspondence, and ask us plainly what we can and cannot do."
      />
    </>
  );
}
