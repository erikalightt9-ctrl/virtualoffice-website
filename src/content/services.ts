/**
 * ============================================================================
 *  CAPSULE — SERVICES
 *  Each entry becomes its own page at /services/[slug].
 *  Add an entry and the page, the navigation and the sitemap update themselves.
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
  /** Which pricing block to show: address tiers, workspace, rooms, registration. */
  pricingBlock: "address" | "workspace" | "rooms" | "registration" | "none";
  /** Set for services our partner firms deliver, not Capsule directly. */
  deliveredByPartners: boolean;
};

export const services: Service[] = [
  {
    slug: "virtual-office",
    name: "Virtual Office",
    summary:
      "A professional Makati business address with mail handling, without the cost of a full-time office.",
    metaTitle: "Virtual Office in Makati | Business Address at 104 Paseo de Roxas",
    metaDescription:
      "A virtual office in Makati CBD with a real staffed office behind it. Business address, mail handling and meeting rooms at 104 Paseo de Roxas.",
    headline: "A Makati business address, without the Makati office lease.",
    intro:
      "A Capsule virtual office gives your company a credible business address in the Makati central business district, with mail received and logged by our own staff on the 5th floor of 104 Paseo de Roxas. It is the least expensive way to establish a professional presence in one of the country's principal business districts.",
    highlights: [
      "Business address at 104 Paseo de Roxas for correspondence and marketing",
      "Mail and parcels received by our reception during business hours",
      "Same-day notification whenever something arrives for you",
      "Meeting rooms on the same floor at member rates",
      "Upgrade to a registered address, a desk or a private office as you grow",
    ],
    sections: [
      {
        heading: "What makes this different from a mailbox",
        body: [
          "Most virtual office providers in Metro Manila are, in practice, forwarding addresses. Post arrives, someone scans it, and there is nobody there if a client or a government officer turns up.",
          "Capsule is a working office. There are 613 square metres of serviced floor space, a reception desk that is staffed through business hours, six bookable rooms and an administrative team on site. Your address is a place, not a redirect — which matters the moment anyone decides to check.",
        ],
      },
      {
        heading: "Who this is for",
        body: [
          "Freelancers and consultants who would rather not print a home address on an invoice. Remote and distributed teams that need a Philippine point of contact. Companies based elsewhere in the country that want a Makati address for client-facing material.",
          "If you intend to use the address for SEC, BIR or Mayor's Permit registration, you need the Registered tier instead — that is a different service with additional requirements.",
        ],
      },
      {
        heading: "How mail is handled",
        body: [
          "Every item is logged on arrival with the date, sender and type. You are notified the same day. Items are held securely at reception for collection, or forwarded on request.",
          "Government correspondence is treated as a separate category with its own protocol, because the consequences of a missed deadline sit with you rather than with us.",
        ],
      },
    ],
    pricingBlock: "address",
    deliveredByPartners: false,
  },

  {
    slug: "registered-business-address",
    name: "Registered Business Address",
    summary:
      "An address eligible for SEC, BIR and Mayor's Permit registration, with inspections accommodated on site.",
    metaTitle: "Registered Business Address in Makati | SEC, BIR & LGU | Capsule",
    metaDescription:
      "Use 104 Paseo de Roxas, Legaspi Village, Makati as your registered business address. Government mail handled, inspections accommodated. Subject to approval.",
    headline: "A registered address that holds up when someone comes to look.",
    intro:
      "Registering a Philippine company means naming a principal office address — and that address can be inspected, can receive a BIR letter of authority, and appears on your Articles of Incorporation for as long as the company exists. Capsule's Registered tier is built for exactly that responsibility.",
    highlights: [
      "Eligible for SEC, BIR, barangay and Mayor's Permit registration, subject to approval",
      "BIR and LGU ocular inspections accommodated at the premises",
      "Government correspondence handled under a documented protocol",
      "Staff physically present during business hours to receive officers and couriers",
      "Registration itself can be arranged through our partner firms",
    ],
    sections: [
      {
        heading: "Eligibility, plainly stated",
        body: [
          "Use of the address for government registration is not automatic and is not available on every tier. It requires the Registered tier or above, approval of your application, submission of company and identification documents, and a business activity that falls within our acceptable use policy.",
          "We say this clearly because the alternative — implying that anyone can register anything here — would be misleading, and it would put both of us at risk. Availability also remains subject to building rules and to applicable government regulations.",
        ],
      },
      {
        heading: "What happens when the BIR arrives",
        body: [
          "Ocular inspections are a normal part of BIR and LGU registration. Ours is a staffed, working office with your company's name on our records and our directory, and our administrative team is briefed to receive inspectors and verify tenancy.",
          "This is the single most common point of failure for companies registered at a low-cost virtual address. It is the reason this tier exists and the reason it is priced above a plain mailing address.",
        ],
      },
      {
        heading: "Government correspondence",
        body: [
          "Letters from the BIR, SEC or your local government unit are logged separately from ordinary mail and escalated to you immediately, by more than one channel.",
          "Our service agreement sets out who signs for what, how quickly you are notified, and what happens if we cannot reach you. Ask to see that section before you sign — if a provider cannot show you one, that tells you something.",
        ],
      },
    ],
    pricingBlock: "address",
    deliveredByPartners: false,
  },

  {
    slug: "mail-handling",
    name: "Mail Handling",
    summary:
      "Business correspondence received, logged, notified and held securely by our own staff.",
    metaTitle: "Business Mail Handling in Makati | Capsule",
    metaDescription:
      "Mail and parcel handling at 104 Paseo de Roxas, Legaspi Village, Makati. Received by staffed reception, logged on arrival and notified the same day.",
    headline: "Someone is actually there when the courier arrives.",
    intro:
      "Mail handling sounds like the least interesting thing we do until a bank statement, a summons or a BIR notice goes astray. Every item that arrives for a Capsule client is received by a person, recorded, and reported to you the same day.",
    highlights: [
      "Reception staffed through business hours to receive mail and couriers",
      "Every item logged with date, sender and type on arrival",
      "Same-day notification by email, with your preferred channel on request",
      "Secure holding for collection at the office",
      "Forwarding available on request",
      "Government correspondence escalated under a separate protocol",
    ],
    sections: [
      {
        heading: "The log is the service",
        body: [
          "Anyone can hold an envelope. What protects you is the record: what arrived, when, from whom, and when you were told. That log is what you fall back on if a deadline is disputed.",
          "You can request your mail history at any time.",
        ],
      },
      {
        heading: "What we will not do",
        body: [
          "We do not open your mail. We do not hold items indefinitely after a service ends — the agreement sets out a notice period and what happens to anything still on site.",
          "We also do not accept mail for a company that is not a registered Capsule client, which protects our other clients from having their address used as a drop.",
        ],
      },
    ],
    pricingBlock: "address",
    deliveredByPartners: false,
  },

  {
    slug: "company-registration",
    name: "Company Registration",
    summary:
      "SEC, BIR, barangay and Mayor's Permit registration, coordinated through our licensed partner firms.",
    metaTitle: "Company Registration in the Philippines | SEC & BIR | Capsule Makati",
    metaDescription:
      "Register a Philippine company from one place — SEC incorporation, BIR, barangay and Mayor's Permit, with a Makati business address included. Coordinated through licensed partner firms.",
    headline: "Registered, permitted and housed — arranged from one place.",
    intro:
      "Setting up a Philippine company means dealing with the SEC, the BIR, your barangay and your city hall, in the right order, with the right documents, at the right address. Capsule coordinates the whole sequence through licensed partner firms, and the registered address is ours — so the two halves of the problem are solved together.",
    highlights: [
      "Sole proprietorship, one person corporation, domestic corporation and foreign-owned entities",
      "SEC incorporation, BIR registration, barangay clearance and Mayor's Permit",
      "Registered business address at 104 Paseo de Roxas included",
      "Inspection accommodation handled by our on-site team",
      "Ongoing accounting, tax, payroll and corporate secretarial support available afterwards",
    ],
    sections: [
      {
        heading: "Why the address and the registration belong together",
        body: [
          "Most founders arrange these separately: a consultant handles the filings, and an address is rented from whoever is cheapest. Then the BIR schedules an inspection and nobody at the address knows who the company is.",
          "When Capsule holds both, the inspection is expected, the tenancy is verifiable and the correspondence goes to a team that already knows your file.",
        ],
      },
      {
        heading: "What we do and what our partners do",
        body: [
          "Capsule provides the address, the premises, the administrative support and the coordination. Registration, accounting, tax and corporate secretarial work are performed by licensed professional firms we work with — they carry the professional accountability for that work, as they should.",
          "You deal with us. We keep the sequence moving and tell you what is needed next.",
        ],
      },
      {
        heading: "What we cannot promise",
        body: [
          "No provider controls government timelines or outcomes. Approval depends on your documents, your business activity and the agencies concerned. Anyone guaranteeing an SEC approval date is guessing.",
          "What we can commit to is the process: what is required, in what order, and where your application currently stands.",
        ],
      },
    ],
    pricingBlock: "registration",
    deliveredByPartners: true,
  },

  {
    slug: "accounting-and-tax",
    name: "Accounting & Tax",
    summary:
      "Bookkeeping, BIR filings and annual financial statements on a monthly retainer.",
    metaTitle: "Accounting & Tax Compliance Services Philippines | Capsule Makati",
    metaDescription:
      "Bookkeeping, BIR filings and annual financial statements for Philippine companies, coordinated through licensed partner firms. Makati-based.",
    headline: "The filings that keep a Philippine company in good standing.",
    intro:
      "A registered Philippine company files whether or not it has traded. Monthly and quarterly BIR returns, annual financial statements, and the SEC filings that follow them. Capsule coordinates all of it through licensed accounting firms so it does not become your problem to track.",
    highlights: [
      "Bookkeeping and maintenance of books of account",
      "Monthly, quarterly and annual BIR filings",
      "Annual financial statements and audit coordination",
      "Compliance calendar so nothing arrives as a surprise",
      "Delivered by licensed partner firms",
    ],
    sections: [
      {
        heading: "Why this pairs with the address",
        body: [
          "BIR correspondence goes to your registered address. If the same team handles both the address and the filings, a notice does not have to travel between three parties before anyone acts on it.",
        ],
      },
      {
        heading: "Scope and pricing",
        body: [
          "Retainers depend on transaction volume, whether you have employees, your VAT status and whether an independent audit is required. We will give you a written scope and a fixed monthly fee before anything begins.",
        ],
      },
    ],
    pricingBlock: "registration",
    deliveredByPartners: true,
  },

  {
    slug: "payroll-and-hr",
    name: "Payroll & HR",
    summary:
      "Payroll processing, statutory contributions and HR administration for your Philippine staff.",
    metaTitle: "Payroll & HR Outsourcing Philippines | Capsule Makati",
    metaDescription:
      "Payroll processing, SSS, PhilHealth and Pag-IBIG contributions, and HR administration for Philippine employees. Coordinated through licensed partner firms.",
    headline: "Pay your Philippine team correctly, on time, every cut-off.",
    intro:
      "Philippine payroll carries its own rules: semi-monthly cut-offs, statutory contributions to three agencies, withholding tax, 13th month pay and final pay computations. Capsule coordinates payroll and HR administration through partner firms that do this daily.",
    highlights: [
      "Semi-monthly or monthly payroll processing",
      "SSS, PhilHealth and Pag-IBIG contributions and remittances",
      "Withholding tax computation and annualisation",
      "13th month pay, leave tracking and final pay computations",
      "Employment contracts and HR documentation support",
    ],
    sections: [
      {
        heading: "Useful when you have staff but no office",
        body: [
          "Foreign companies employing a small Philippine team are the common case: a handful of people, no HR department, and statutory obligations that do not scale down.",
          "This service, a registered address and a meeting room for interviews is often the entire local infrastructure a company needs for its first two years.",
        ],
      },
    ],
    pricingBlock: "registration",
    deliveredByPartners: true,
  },

  {
    slug: "corporate-secretarial",
    name: "Corporate Secretarial",
    summary:
      "Annual SEC filings, board minutes and the corporate housekeeping that is easy to forget.",
    metaTitle: "Corporate Secretarial Services Philippines | Capsule Makati",
    metaDescription:
      "General Information Sheet filings, board and stockholder minutes, and statutory registers for Philippine corporations. Coordinated through licensed partner firms.",
    headline: "The annual obligations nobody remembers until there is a penalty.",
    intro:
      "A Philippine corporation has continuing obligations that have nothing to do with trading: the General Information Sheet, minutes of annual meetings, statutory registers, and reporting any change of directors, officers or address. Missing them creates penalties and, eventually, problems with your standing at the SEC.",
    highlights: [
      "General Information Sheet preparation and filing",
      "Minutes for annual and special meetings of the board and stockholders",
      "Maintenance of statutory registers",
      "Filings for changes of directors, officers or registered address",
      "Delivered by licensed partner firms",
    ],
    sections: [
      {
        heading: "Particularly relevant for foreign-owned companies",
        body: [
          "If your directors are overseas, the meetings still have to happen and the minutes still have to exist. Our partner firms prepare the documentation and tell you what needs signing and when.",
        ],
      },
    ],
    pricingBlock: "registration",
    deliveredByPartners: true,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
