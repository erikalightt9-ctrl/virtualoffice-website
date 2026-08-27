/**
 * ============================================================================
 *  CAPSULE — SERVICES
 *  Each entry becomes its own page at /services/[slug].
 *  Add an entry and the page, the navigation and the sitemap update themselves.
 *
 *  ⚠️  SCOPE — READ BEFORE ADDING ANYTHING HERE
 *
 *  Capsule is a virtual-office service. That is the whole offer: a business
 *  address, mail and document handling, meeting rooms and workspace, with a
 *  registered-address option for companies that need one.
 *
 *  Capsule does NOT provide, coordinate, arrange, facilitate or advise on:
 *  SEC or BIR registration or filings, business permits, incorporation,
 *  bookkeeping, accounting, tax, payroll, corporate secretarial work, or
 *  market-entry and business-setup consulting.
 *
 *  Copy must never imply otherwise — not "we register your company", not "we
 *  handle your filings", not "through our partner firms". A client's
 *  government registrations, filings, permits, tax obligations and compliance
 *  are theirs to handle with their own professional advisers.
 * ============================================================================
 */

export type ServiceSection = { heading: string; body: string[] };

export type Service = {
  slug: string;
  name: string;
  /** Short line used on cards and in the services index. */
  summary: string;
  /** Page title and meta description for search engines. */
  metaTitle: string;
  metaDescription: string;
  /** The page's opening statement. */
  headline: string;
  intro: string;
  /** Bullet list shown near the top of the page. */
  highlights: string[];
  sections: ServiceSection[];
  /** Which pricing block to show: address tiers, workspace or rooms. */
  pricingBlock: "address" | "workspace" | "rooms" | "none";
};

export const services: Service[] = [
  {
    slug: "virtual-office",
    name: "Virtual Office",
    summary:
      "A professional Makati business address with mail handling, without the cost of a full-time office.",
    metaTitle: "Virtual Office in Makati — 104 Paseo de Roxas",
    metaDescription:
      "A virtual office in Makati CBD with a real staffed office behind it. Business address, mail handling and meeting rooms at 104 Paseo de Roxas, Legaspi Village.",
    headline: "A Makati business address, without the Makati office lease.",
    intro:
      "A Capsule virtual office gives your company a credible business address in the Makati central business district, with mail received and logged by our own staff on the 5th floor of 104 Paseo de Roxas. It is the least expensive way to establish a professional presence in one of the country's principal business districts.",
    highlights: [
      "Business address at 104 Paseo de Roxas for correspondence and marketing",
      "Mail and parcels received by our reception during business hours",
      "Same-day notification whenever something arrives for you",
      "Meeting rooms on the same floor at member rates",
      "Registered-address option available on eligible packages",
      "Add a desk or a private office when you need one",
    ],
    sections: [
      {
        heading: "What makes this different from a mailbox",
        body: [
          "Most virtual office providers in Metro Manila are, in practice, forwarding addresses. Post arrives, someone scans it, and there is nobody there if a client or a courier turns up.",
          "Capsule is a working office. There is a reception desk that is staffed through business hours, six bookable rooms, serviced workstations and an administrative team on site. Your address is a place, not a redirect — which matters the moment anyone decides to check.",
        ],
      },
      {
        heading: "Who this is for",
        body: [
          "Freelancers and consultants who would rather not print a home address on an invoice. Remote and distributed teams that need a Philippine point of contact. Companies based elsewhere in the country that want a Makati address for client-facing material. Overseas businesses that need a credible Philippine address.",
          "If you need an address you can name as your registered business address, that is our Registered package — a feature of the virtual office rather than a separate service.",
        ],
      },
      {
        heading: "How mail is handled",
        body: [
          "Every item is logged on arrival with the date, sender and type. You are notified the same day. Items are held securely at reception for collection, or forwarded on request.",
          "Correspondence that looks official is flagged to you immediately rather than sitting in a pile, because a missed deadline is your problem and we would rather you knew straight away.",
        ],
      },
      {
        heading: "What we do not do",
        body: [
          "We are a virtual office, and only that. We do not register companies, file anything with any government agency, process permits, keep books, prepare or file taxes, run payroll, or advise on setting up a business in the Philippines.",
          "If you need that work done, engage an accountant, a lawyer or a corporate services firm of your own choosing. We are happy to be the address they write on the form.",
        ],
      },
    ],
    pricingBlock: "address",
  },

  {
    slug: "registered-business-address",
    name: "Registered Address",
    summary:
      "An address you can name as your company's registered business address, offered as part of the virtual office.",
    metaTitle: "Registered Business Address in Makati",
    metaDescription:
      "A registered business address option at 104 Paseo de Roxas, Legaspi Village, Makati, offered as part of the Capsule virtual office. Subject to approval.",
    headline: "An address you can put on the form.",
    intro:
      "Some companies need more than a mailing address — they need one they can name as their registered business address, and that can stand up to being looked at. Capsule's Registered package is that option. It is a feature of the virtual office, not a separate service, and it does not include any filing or registration work on your behalf.",
    highlights: [
      "An address available for use as your registered business address, subject to approval",
      "Official correspondence flagged and escalated to you immediately",
      "Staff on site during business hours to receive visitors and couriers",
      "Your company recorded in our directory and tenancy records",
      "Everything included in the standard virtual office",
    ],
    sections: [
      {
        heading: "What this is",
        body: [
          "A real address, at a real staffed office, that you are permitted to use as your company's registered business address once your application is approved. We maintain the tenancy record, receive what arrives for you, and make sure anyone who comes looking finds a working office with your company on the directory.",
          "That is the service. It is a good deal more than a mailbox, and considerably less than a compliance provider.",
        ],
      },
      {
        heading: "What this is not",
        body: [
          "We do not register your company. We do not submit anything to the SEC, the BIR, your barangay or your city hall. We do not obtain permits, prepare returns, keep your books or run your payroll, and we do not advise on how any of it should be done.",
          "Your registrations, filings, permits and tax obligations remain entirely yours, to handle with your own accountant, lawyer or corporate services firm. We will not tell you we can do it for you, because we cannot.",
        ],
      },
      {
        heading: "Eligibility, plainly stated",
        body: [
          "Use of the address as a registered business address is not automatic and is not available on every package. It requires the Registered package or above, approval of your application, submission of company and identification documents, and a business activity that falls within our acceptable use policy.",
          "Availability also remains subject to building rules and to applicable regulations. We say this clearly because implying that anyone can register anything here would be misleading, and would put both of us at risk.",
        ],
      },
      {
        heading: "Official correspondence",
        body: [
          "Letters that appear to come from a government agency or a court are logged separately from ordinary mail and escalated to you immediately, through more than one channel. You remain responsible for reading them and responding within any deadline that applies.",
          "Our service agreement sets out who signs for what, how quickly you are notified, and what happens if we cannot reach you. Ask to see that section before you sign — if a provider cannot show you one, that tells you something.",
        ],
      },
    ],
    pricingBlock: "address",
  },

  {
    slug: "mail-handling",
    name: "Mail Handling",
    summary:
      "Business correspondence received, logged, notified and held securely by our own staff.",
    metaTitle: "Business Mail Handling in Makati",
    metaDescription:
      "Mail and parcel handling at 104 Paseo de Roxas, Legaspi Village, Makati. Received by staffed reception, logged on arrival and notified the same day.",
    headline: "Someone is actually there when the courier arrives.",
    intro:
      "Mail handling sounds like the least interesting part of a virtual office until a bank statement or an official notice goes astray. Every item that arrives for a Capsule client is received by a person, recorded, and reported to you the same day.",
    highlights: [
      "Reception staffed through business hours to receive mail and couriers",
      "Every item logged with date, sender and type on arrival",
      "Same-day notification by email, with your preferred channel on request",
      "Secure holding for collection at the office",
      "Forwarding available on request",
      "Anything that looks official escalated immediately",
    ],
    sections: [
      {
        heading: "The log is the service",
        body: [
          "Anyone can hold an envelope. What protects you is the record: what arrived, when, from whom, and when you were told. That log is what you fall back on if a date is ever disputed.",
          "You can request your mail history at any time.",
        ],
      },
      {
        heading: "What we will not do",
        body: [
          "We do not open your mail, and we do not act on it for you. We will tell you promptly that something has arrived and hold it safely — reading it, and deciding what to do about it, is yours.",
          "We do not hold items indefinitely after a service ends; the agreement sets out a notice period and what happens to anything still on site. We also do not accept mail for a company that is not a registered Capsule client, which protects our other clients from having their address used as a drop.",
        ],
      },
    ],
    pricingBlock: "address",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
