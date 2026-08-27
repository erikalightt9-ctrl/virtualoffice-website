/**
 * ============================================================================
 *  THE GROUNDS — FREQUENTLY ASKED QUESTIONS
 *  Shown on /faq, grouped by category, and the top ones appear on the homepage.
 *
 *  ⚠️  SCOPE: The Grounds is a virtual office. Answers must never suggest that we
 *  register companies, file with any agency, obtain permits, keep books,
 *  handle tax or payroll, or advise on setting up a business. Where a question
 *  touches those things, the honest answer is that they are the client's to
 *  handle with their own professional advisers.
 * ============================================================================
 */

export type Faq = {
  q: string;
  a: string[];
  category:
    | "The address"
    | "Registered address"
    | "Mail"
    | "Workspace & rooms"
    | "Signing up"
    | "Billing";
  /** Show this one on the homepage FAQ block. Aim for four or five. */
  featured: boolean;
};

export const faqs: Faq[] = [
  {
    category: "The address",
    featured: true,
    q: "What exactly does The Grounds provide?",
    a: [
      "A virtual office: a professional business address at 104 Paseo de Roxas in Makati, mail and parcel handling by our own staff, meeting rooms on the same floor, and workspace when you need it. Companies that need an address they can register can take our Registered package.",
      "That is the whole offer. We are not a corporate services firm and we do not act as one.",
    ],
  },
  {
    category: "The address",
    featured: false,
    q: "Can I use the address on my website, invoices and business cards?",
    a: [
      "Yes, on any package. That is the main reason most of our clients are here.",
    ],
  },
  {
    category: "The address",
    featured: false,
    q: "Is there really an office, or is this just a mailbox?",
    a: [
      "There is a real office. We occupy the 5th floor of 104 Paseo de Roxas, with a reception desk staffed through business hours, six bookable rooms, serviced workstations and an administrative team on site.",
      "Come and see it before you sign up — take a day pass, or book a visit through the contact page. Most of our clients looked at the floor first, and we would rather you did.",
    ],
  },

  {
    category: "Registered address",
    featured: true,
    q: "Can I use the address as my company's registered business address?",
    a: [
      "On the Registered package or above, and subject to approval. It requires an approved application, company and identification documents, and a business activity permitted under our acceptable use policy.",
      "It is not available on the entry-level Address package, which is for correspondence only. Availability also remains subject to building rules and applicable regulations.",
    ],
  },
  {
    category: "Registered address",
    featured: true,
    q: "Will The Grounds register my company or handle my filings?",
    a: [
      "No. We provide the address; we do not register companies, submit anything to any government agency, obtain permits, keep books, prepare or file taxes, run payroll, or advise on setting up a business in the Philippines.",
      "Those are yours to handle with your own accountant, lawyer or corporate services firm. We are simply the address they write on the form, and we will not claim otherwise.",
    ],
  },
  {
    category: "Registered address",
    featured: false,
    q: "Someone from a government agency may visit the address. What happens?",
    a: [
      "Our reception is staffed through business hours, your company appears in our directory and tenancy records, and our team can confirm that you are a client of ours at this address.",
      "What we cannot do is represent you, answer questions on your behalf, or handle any matter arising from the visit. We will tell you promptly that someone came.",
    ],
  },
  {
    category: "Registered address",
    featured: false,
    q: "Are there businesses you will not accept?",
    a: [
      "Yes. We maintain an acceptable use policy and decline applications that fall outside it. This protects our other clients, our landlord and our own standing.",
      "We publish that policy rather than keeping it private, so you can check before applying.",
    ],
  },

  {
    category: "Mail",
    featured: true,
    q: "How will I know when mail arrives for me?",
    a: [
      "Every item is logged on arrival with the date, sender and type, and you are notified the same business day. Anything that looks official is escalated immediately through more than one channel.",
      "Items are held securely at reception for collection, or forwarded on request.",
    ],
  },
  {
    category: "Mail",
    featured: false,
    q: "Do you open or scan my mail?",
    a: [
      "We do not open your mail. We record what arrived and from whom, and hold the item for you. If you would like a scanning arrangement, ask — it can be set up with your written authorisation.",
    ],
  },
  {
    category: "Mail",
    featured: false,
    q: "Can you receive couriers and deliveries?",
    a: [
      "Yes, during business hours. Reception is staffed Monday to Friday and can sign for and hold deliveries. We cannot accept perishable goods or items requiring special storage.",
    ],
  },

  {
    category: "Workspace & rooms",
    featured: false,
    q: "Can I see the office before signing up?",
    a: [
      "Please do. Book a visit through the contact page, or take a day pass and work here for a day.",
    ],
  },
  {
    category: "Workspace & rooms",
    featured: false,
    q: "How do I book a meeting room?",
    a: [
      "Address and workspace clients book through our reception at member rates, using their monthly allocation first. Non-members can book rooms directly — send an enquiry with the date, time and number of people.",
    ],
  },
  {
    category: "Workspace & rooms",
    featured: false,
    q: "What are the office hours?",
    a: [
      "Reception and administrative staff are on site Monday to Friday, 9:00am to 6:00pm. Saturday access is by arrangement. Workspace clients have access through business hours.",
    ],
  },

  {
    category: "Signing up",
    featured: true,
    q: "What documents do you need from me?",
    a: [
      "For an individual: a government-issued photo identification and proof of address. For a company: your company registration documents and identification for the authorised signatory.",
      "We ask for these to verify who you are before activating an address. We do not review them for any other purpose and we do not advise on them.",
    ],
  },
  {
    category: "Signing up",
    featured: false,
    q: "How long does it take to activate?",
    a: [
      "Once your documents are complete and approved, activation is usually within one to two business days.",
    ],
  },

  {
    category: "Billing",
    featured: false,
    q: "How do I pay?",
    a: [
      "Bank transfer, bank deposit, GCash, or international wire transfer for overseas clients. Invoices are issued in advance of each term.",
    ],
  },
  {
    category: "Billing",
    featured: false,
    q: "What terms do you offer?",
    a: [
      "Monthly, six-month and twelve-month terms. Twelve months carries the best rate, and for clients using the address as a registered business address we recommend it — an address that changes every few months creates avoidable work for you.",
    ],
  },
];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.category)));
export const featuredFaqs = faqs.filter((f) => f.featured);
