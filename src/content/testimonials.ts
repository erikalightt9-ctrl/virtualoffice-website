/**
 *  CLIENT TESTIMONIALS
 *  ---------------------------------------------------------------------------
 *  THE ARRAY IS EMPTY ON PURPOSE. Do not fill it with examples, samples,
 *  placeholders or "representative" quotes, not even temporarily.
 *
 *  A testimonial is a statement of fact about a real client's experience. An
 *  invented one is a fabricated review: it is dishonest, it collapses the first
 *  time a prospect asks to speak to a reference, and in the Philippines it
 *  exposes the business under consumer-protection rules. It would also
 *  contradict the rest of this site, which is deliberately built on saying only
 *  what is true — including that the service is new.
 *
 *  The page renders correctly with zero testimonials. Until there are real
 *  ones it shows verifiable proof instead (see PROOF below), which is the
 *  honest substitute and is worth more than invented praise.
 *
 *  ── HOW TO ADD A REAL ONE ──────────────────────────────────────────────────
 *  1. Ask the client. The 60-day mark works well: long enough to have an
 *     opinion, recent enough to remember why.
 *  2. Get written permission to publish their words, their name, their role
 *     and their company. Record when and how they gave it — this is personal
 *     data, and the Data Privacy Act applies.
 *  3. Add an entry below with `consent` filled in. The build FAILS if a
 *     testimonial has no recorded consent, so a quote cannot be published by
 *     accident.
 *  4. Quote them accurately. Trim for length if you must, never for meaning,
 *     and never rewrite their words into marketing copy.
 *
 *  Anonymous is allowed — some clients will not want to be named, and
 *  "Managing Director, logistics company" is still true. What is not allowed is
 *  a quote nobody actually said.
 */

export type Testimonial = {
  id: string;
  /** Their words. Trim for length if needed; never rewrite the meaning. */
  quote: string;
  /** Leave undefined if they asked not to be named. */
  name?: string;
  /** e.g. "Managing Director". Useful even when the name is withheld. */
  role?: string;
  /** Leave undefined if they asked for the company not to be named. */
  company?: string;
  /** e.g. "Logistics" — gives an anonymous quote useful context. */
  industry?: string;
  /** Which package they hold, if they are happy for it to be shown. */
  service?: "Basic" | "Corporate" | "VIP";
  /** Proof of permission to publish. Required — the build checks for it. */
  consent: {
    /** ISO date the client gave permission. */
    date: string;
    /** How it was given, e.g. "email", "signed release", "Viber message". */
    method: string;
  };
  /** Show this one first, larger. Set on at most one or two. */
  featured?: boolean;
};

export const testimonials: Testimonial[] = [];

/**
 * Guard: a quote without recorded consent must never reach the site.
 *
 * This runs at module load, so it fails the build rather than shipping. It is
 * deliberately strict — the cost of a false alarm is a build error, the cost of
 * missing one is publishing someone's name without permission.
 */
for (const t of testimonials) {
  if (!t.consent?.date || !t.consent?.method) {
    throw new Error(
      `Testimonial "${t.id}" has no recorded consent. Add consent.date and ` +
        `consent.method, or remove the entry. Publishing a client's words ` +
        `without permission is not something this site will do silently.`,
    );
  }
  if (t.quote.trim().length < 40) {
    throw new Error(
      `Testimonial "${t.id}" is too short to be a real testimonial (${t.quote.trim().length} chars). ` +
        `If it is genuinely this brief, inline it elsewhere rather than as a card.`,
    );
  }
}

export const published = testimonials;
export const featured = testimonials.filter((t) => t.featured);

/**
 * What the page shows while there are no testimonials yet.
 *
 * Every line here is checkable. That is the point: a prospect weighing up a
 * new service does not need praise, they need things they can verify without
 * taking anyone's word for it.
 */
export const PROOF = [
  {
    title: "The company is older than the service",
    body: "Philippine Dragon Media Network Corp. has operated in the Philippines since 2013. The Virtual Office is its newer service, and we say so rather than borrowing the parent's track record.",
  },
  {
    title: "The operator's authority is documented",
    body: "PDMN is an SEC-registered Philippine corporation whose Articles of Incorporation include leasing and subleasing among its stated purposes. We will show you the documents before you commit to anything.",
  },
  {
    title: "The office is real, and named",
    body: "5th Floor, Salustiana D. Ty Tower, 104 Paseo de Roxas, Legaspi Village, Makati. A named building on a principal business street, not a mailbox at an unspecified address.",
  },
  {
    title: "You can inspect it before you sign",
    body: "Come and see the floor, meet the people who will handle your correspondence, and ask what we can and cannot do. Most of our clients looked first, and we would rather you did.",
  },
  {
    title: "We screen who shares the address",
    body: "Every applicant is reviewed against a published acceptable use policy, and some are declined. An address is only as credible as the businesses using it.",
  },
  {
    title: "We are plain about what we do not do",
    body: "No company registration, filings, permits, bookkeeping, accounting, tax or payroll, and no partner firms doing it on our behalf. A provider willing to tell you what it will not do is telling you the truth about what it will.",
  },
];

/** Shown where testimonials will eventually sit. Honest, not apologetic. */
export const EMPTY_STATE = {
  heading: "We would rather show you the office than a wall of quotes.",
  body: "PDMN Virtual Office is a new service, and we are not going to publish testimonials we have not earned yet. As clients reach their first few months we will ask them what they think, publish it with their permission, and name them where they are happy to be named. Until then, here is what you can check for yourself.",
};
