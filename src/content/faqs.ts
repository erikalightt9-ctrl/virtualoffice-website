/**
 * ============================================================================
 *  CAPSULE — FREQUENTLY ASKED QUESTIONS
 *  Shown on /faq, grouped by category, and the top ones appear on the homepage.
 *  These also become the source material for the chatbot's knowledge base,
 *  so keep the answers accurate and specific.
 * ============================================================================
 */

export type Faq = {
  q: string;
  a: string[];
  category: "Address & registration" | "Mail" | "Workspace" | "Signing up" | "Billing";
  /** Show this one on the homepage FAQ block. Aim for four or five. */
  featured: boolean;
};

export const faqs: Faq[] = [
  {
    category: "Address & registration",
    featured: true,
    q: "Can I use the address to register my company with the SEC and BIR?",
    a: [
      "Yes, on the Registered tier or above, and subject to approval. Registration use requires an approved application, submission of company and identification documents, and a business activity permitted under our acceptable use policy.",
      "It is not available on the entry-level Address tier, which is for correspondence only. Availability also remains subject to building rules and applicable government regulations.",
    ],
  },
  {
    category: "Address & registration",
    featured: true,
    q: "What happens if the BIR or city hall wants to inspect the office?",
    a: [
      "We accommodate ocular inspections at the premises. Our administrative team is on site during business hours, your company appears on our records and directory, and staff are briefed to receive inspectors and verify your tenancy.",
      "This is the most common reason a cheap virtual address fails, and it is a large part of what the Registered tier pays for.",
    ],
  },
  {
    category: "Address & registration",
    featured: false,
    q: "Can I move my existing company's registered address to Capsule?",
    a: [
      "Yes. Changing a registered address requires filings with the SEC, the BIR and your local government unit, and the sequence matters. Our partner firms handle this regularly and can quote it as a defined piece of work.",
    ],
  },
  {
    category: "Address & registration",
    featured: false,
    q: "Are there businesses you will not accept?",
    a: [
      "Yes. We maintain an acceptable use policy and we decline applications that fall outside it. This protects our other clients, our landlord and our own standing.",
      "We publish that policy rather than keeping it private, so you can check before applying.",
    ],
  },
  {
    category: "Mail",
    featured: true,
    q: "How will I know when mail arrives for me?",
    a: [
      "Every item is logged on arrival with the date, sender and type, and you are notified the same business day. Government correspondence is escalated immediately through more than one channel.",
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
    category: "Workspace",
    featured: false,
    q: "Can I see the office before signing up?",
    a: [
      "Please do. Book a visit through the contact page, or take a day pass and work here for a day. Most of our clients looked at the floor first, and we would rather you did.",
    ],
  },
  {
    category: "Workspace",
    featured: false,
    q: "How do I book a meeting room?",
    a: [
      "Address and workspace clients book through our reception at member rates, using their monthly allocation first. Non-members can book rooms directly — send an enquiry with the date, time and number of people.",
    ],
  },
  {
    category: "Workspace",
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
      "For an individual: a government-issued photo identification and proof of address. For a company: your SEC or DTI registration, BIR certificate of registration where it exists, and identification for the authorised signatory.",
      "If you are registering a new company with us, we will tell you what is needed at each stage instead of asking for everything at once.",
    ],
  },
  {
    category: "Signing up",
    featured: false,
    q: "How long does it take to activate?",
    a: [
      "Once your documents are complete and approved, activation is usually within one to two business days. Company registration itself depends on government processing and is quoted separately with an indicative timeline.",
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
      "Monthly, six-month and twelve-month terms. Twelve months carries the best rate, and for registered-address clients we recommend it — a registered address that changes every few months creates avoidable problems with the SEC and the BIR.",
    ],
  },
];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.category)));
export const featuredFaqs = faqs.filter((f) => f.featured);
