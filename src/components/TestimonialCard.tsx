import type { Testimonial } from "@/content/testimonials";

/**
 * One client testimonial.
 *
 * Uses <blockquote> and <cite> rather than styled divs: a testimonial is a
 * quotation, and marking it up as one is what lets a screen reader announce it
 * as somebody else's words rather than ours.
 *
 * Attribution degrades gracefully. Some clients will agree to be quoted but not
 * named, so the card reads sensibly with any combination of name, role, company
 * and industry — and shows nothing rather than "Anonymous", which reads as
 * something withheld.
 */

type Props = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial: t }: Props) {
  /* "Maria Santos, Managing Director, Northwind Logistics" — with whichever
     parts the client agreed to, in that order. */
  const attribution = [t.name, t.role, t.company].filter(Boolean).join(", ");
  const context = !t.company && t.industry ? `${t.industry} company` : null;

  return (
    <figure
      className={`flex flex-col gap-4 glass-cell p-6 ${
        t.featured ? "sm:col-span-2" : ""
      }`}
    >
      <span aria-hidden="true" className="font-display text-[2rem] leading-none text-gold">
        &ldquo;
      </span>

      {/* The accent face belongs here: a testimonial is a person speaking in
          their own words, and these run a sentence or two at display size.
          The attribution below stays in the brand sans — a name, a role and a
          company are reference information, not voice. */}
      <blockquote
        className={`script-accent flex-1 leading-relaxed text-body ${
          t.featured ? "text-[1.22rem]" : "text-[1.06rem]"
        }`}
      >
        {t.quote}
      </blockquote>

      {attribution || context ? (
        <figcaption className="flex flex-col gap-1 border-t border-rule pt-4">
          {attribution ? (
            <cite className="not-italic text-[0.9rem] font-semibold text-body">
              {attribution}
            </cite>
          ) : null}
          {context ? (
            <span className="text-[0.85rem] text-body-soft">{context}</span>
          ) : null}
          {t.service ? (
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-gold">
              Virtual Office {t.service}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
