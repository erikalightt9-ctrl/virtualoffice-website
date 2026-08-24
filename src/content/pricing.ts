/**
 * ============================================================================
 *  CAPSULE — PRICING
 *
 *  THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE ANY PRICE ON THE SITE.
 *
 *  Every page that shows a price reads from here. Change a number below,
 *  save, and it updates on the homepage, the pricing page, every service
 *  page and the enquiry form.
 *
 *  HOW TO EDIT
 *  -----------
 *  1. Prices are plain numbers in pesos. No commas, no currency symbol.
 *       price12: 3900        ->  displays as "₱3,900"
 *  2. To hide a price and show "Enquire" instead, set the number to null.
 *       price12: null        ->  displays as "Enquire"
 *  3. To hide a whole tier or product from the site, set `published: false`.
 *  4. While prices are still provisional, leave PRICING_DISCLAIMER as it is.
 *     When they are final, set it to an empty string ("") and the notice
 *     disappears from every page.
 *
 *  Last reviewed: 24 August 2026 — provisional, pending partner fee schedule.
 * ============================================================================
 */

export const CURRENCY = "₱";

/**
 * Shown as a small notice wherever prices appear.
 * Set to "" when pricing is final.
 */
export const PRICING_DISCLAIMER =
  "Indicative rates. Final pricing subject to confirmation — please enquire for a formal quotation.";

/** Contract terms offered. `discountNote` is display copy only. */
export const TERMS = [
  { id: "monthly", label: "Monthly", discountNote: "Rolling, cancel anytime" },
  { id: "sixMonth", label: "6 months", discountNote: "Better value" },
  { id: "twelveMonth", label: "12 months", discountNote: "Best value" },
] as const;

/* ---------------------------------------------------------------------------
 *  1. BUSINESS ADDRESS TIERS  — the core recurring products
 * ------------------------------------------------------------------------- */

export type AddressTier = {
  id: string;
  name: string;
  bestFor: string;
  /** Monthly rate on a 12-month term. `null` shows "Enquire". */
  price12: number | null;
  /** Monthly rate on a rolling monthly term. */
  priceMonthly: number | null;
  /** Can this tier's address be used for SEC / BIR / LGU registration? */
  registrationEligible: boolean;
  /** Draws the highlighted border on pricing cards. Set on one tier only. */
  featured: boolean;
  published: boolean;
  features: string[];
};

export const addressTiers: AddressTier[] = [
  {
    id: "address",
    name: "Address",
    bestFor: "Freelancers, consultants and professionals who need a credible Makati address for correspondence.",
    price12: 1800,
    priceMonthly: 2300,
    registrationEligible: false,
    featured: false,
    published: true,
    features: [
      "Business address at 104 Paseo de Roxas for correspondence and marketing",
      "Mail and parcel receiving during business hours",
      "Same-day notification when mail arrives",
      "Member rates on all meeting rooms",
      "Access to member events at the office",
    ],
  },
  {
    id: "registered",
    name: "Registered",
    bestFor: "Startups and SMEs registering a company, or moving an existing registered address to Makati.",
    price12: 3900,
    priceMonthly: 4900,
    registrationEligible: true,
    featured: true,
    published: true,
    features: [
      "Everything in Address",
      "Address eligible for SEC, BIR and Mayor's Permit registration, subject to approval",
      "Government correspondence handled under a documented protocol",
      "BIR and LGU inspections accommodated at the premises",
      "5 meeting room hours per month",
      "2 workspace days per month",
      "Registration and compliance support coordinated through our partner firms",
    ],
  },
  {
    id: "corporate",
    name: "Corporate",
    bestFor: "Companies that need a stronger operational presence and hands-on administrative support.",
    price12: 8500,
    priceMonthly: 10500,
    registrationEligible: true,
    featured: false,
    published: true,
    features: [
      "Everything in Registered",
      "Dedicated mail and document handling",
      "15 meeting room hours per month",
      "5 workspace days per month",
      "Priority administrative support from our on-site team",
      "Ongoing compliance coordination with our partner firms",
      "Named account contact",
    ],
  },
];

/* ---------------------------------------------------------------------------
 *  2. WORKSPACE  — physical space on the 5th floor
 * ------------------------------------------------------------------------- */

export type WorkspaceProduct = {
  id: string;
  name: string;
  price: number | null;
  /** e.g. "per seat / month" */
  unit: string;
  bestFor: string;
  published: boolean;
  features: string[];
};

export const workspaceProducts: WorkspaceProduct[] = [
  {
    id: "dedicated-desk",
    name: "Dedicated Desk",
    price: 9500,
    unit: "per seat / month",
    bestFor: "Individuals and small teams who need a permanent seat in Makati.",
    published: true,
    features: [
      "Your own assigned workstation",
      "Access during business hours",
      "Registered-tier business address included",
      "5 meeting room hours per month",
      "Reception, mail handling and admin support on site",
    ],
  },
  {
    id: "team-space",
    name: "Team Space",
    price: 8500,
    unit: "per seat / month",
    bestFor: "Teams of four to fifteen who want a grouped area without a long lease.",
    published: true,
    features: [
      "Grouped or partitioned workstations",
      "Registered-tier business address included",
      "10 meeting room hours per month",
      "Reception and admin support on site",
      "Scale seats up or down as the team changes",
    ],
  },
  {
    id: "private-office",
    name: "Private Office",
    price: null,
    unit: "per seat / month",
    bestFor: "Companies that need an enclosed, lockable office of their own.",
    published: true,
    features: [
      "Enclosed private suite",
      "Registered-tier business address included",
      "Meeting room allocation by suite size",
      "Suitable for companies expecting client visits or inspections",
      "Availability limited — please enquire",
    ],
  },
  {
    id: "day-pass",
    name: "Day Pass",
    price: 600,
    unit: "per day",
    bestFor: "Visiting founders and staff who need a desk for the day.",
    published: true,
    features: [
      "Any available open workstation",
      "Full business-hours access",
      "Wi-Fi, coffee and use of the tea room",
      "Book by the day, no commitment",
    ],
  },
];

/* ---------------------------------------------------------------------------
 *  3. MEETING ROOMS  — the five bookable spaces
 * ------------------------------------------------------------------------- */

export type MeetingRoom = {
  id: string;
  name: string;
  capacity: string;
  /** Walk-in / non-member hourly rate. */
  rate: number | null;
  /** Rate for address and workspace members. */
  memberRate: number | null;
  published: boolean;
  note: string;
};

export const meetingRooms: MeetingRoom[] = [
  {
    id: "conference-a",
    name: "Conference Room A",
    capacity: "Up to 12",
    rate: 1200,
    memberRate: 900,
    published: true,
    note: "Our largest room. Suited to board meetings, presentations and client pitches.",
  },
  {
    id: "conference-b",
    name: "Conference Room B",
    capacity: "Up to 10",
    rate: 1200,
    memberRate: 900,
    published: true,
    note: "Full conference setup for meetings and workshops.",
  },
  {
    id: "conference-c",
    name: "Conference Room C",
    capacity: "Up to 8",
    rate: 1000,
    memberRate: 750,
    published: true,
    note: "A smaller conference room for team sessions and interviews.",
  },
  {
    id: "meeting-room",
    name: "Meeting Room",
    capacity: "Up to 6",
    rate: 800,
    memberRate: 600,
    published: true,
    note: "Comfortable for small group discussions and reviews.",
  },
  {
    id: "focus-room",
    name: "Focus Room",
    capacity: "Up to 4",
    rate: 700,
    memberRate: 500,
    published: true,
    note: "For one-to-one meetings, interviews and private calls.",
  },
  {
    id: "tea-room",
    name: "Tea Room",
    capacity: "Small groups",
    rate: null,
    memberRate: null,
    published: true,
    note: "An informal space for short meetings and refreshments. Available to members and room bookers.",
  },
];

/* ---------------------------------------------------------------------------
 *  4. REGISTRATION & COMPLIANCE  — one-time and retainer services
 *     Delivered through our licensed partner firms.
 * ------------------------------------------------------------------------- */

export type RegistrationService = {
  id: string;
  name: string;
  price: number | null;
  /** e.g. "one-time" or "per month" */
  unit: string;
  published: boolean;
  description: string;
};

export const registrationServices: RegistrationService[] = [
  {
    id: "sole-proprietorship",
    name: "Sole Proprietorship",
    price: 35000,
    unit: "one-time",
    published: true,
    description:
      "DTI registration, barangay clearance, Mayor's Permit and BIR registration for a single-owner business.",
  },
  {
    id: "one-person-corporation",
    name: "One Person Corporation",
    price: 44000,
    unit: "one-time",
    published: true,
    description:
      "SEC incorporation as an OPC, plus barangay, Mayor's Permit and BIR registration.",
  },
  {
    id: "domestic-corporation",
    name: "Domestic Corporation",
    price: 60000,
    unit: "one-time",
    published: true,
    description:
      "Full SEC incorporation for a Filipino-owned corporation, plus barangay, Mayor's Permit and BIR registration.",
  },
  {
    id: "foreign-corporation",
    name: "Foreign-Owned Corporation",
    price: 120000,
    unit: "one-time",
    published: true,
    description:
      "Structure advice, SEC registration, capital compliance, barangay, Mayor's Permit and BIR registration for foreign-owned entities and branches.",
  },
  {
    id: "accounting-tax",
    name: "Accounting & Tax Compliance",
    price: null,
    unit: "per month",
    published: true,
    description:
      "Bookkeeping, BIR filings and annual financial statements on a monthly retainer.",
  },
  {
    id: "payroll-hr",
    name: "Payroll & HR",
    price: null,
    unit: "per month",
    published: true,
    description:
      "Payroll processing, statutory contributions and HR administration on a monthly retainer.",
  },
  {
    id: "corporate-secretarial",
    name: "Corporate Secretarial",
    price: null,
    unit: "per year",
    published: true,
    description:
      "General information sheet filings, board minutes and ongoing corporate housekeeping.",
  },
];

/* ---------------------------------------------------------------------------
 *  5. BUNDLES  — the lead offer
 * ------------------------------------------------------------------------- */

export type Bundle = {
  id: string;
  name: string;
  headline: string;
  price: number | null;
  /** Sum of the components bought separately, for the saving line. */
  separatePrice: number | null;
  published: boolean;
  includes: string[];
};

export const bundles: Bundle[] = [
  {
    id: "capsule-launch",
    name: "Capsule Launch",
    headline: "Your company registered, and housed in Makati for a year.",
    price: 92000,
    separatePrice: 106800,
    published: true,
    includes: [
      "Domestic corporation registration — SEC, barangay, Mayor's Permit and BIR",
      "Twelve months of the Registered address tier",
      "Government correspondence handling throughout",
      "Inspection accommodation at the premises",
      "5 meeting room hours and 2 workspace days each month",
    ],
  },
];

/* ---------------------------------------------------------------------------
 *  Helpers — you should not need to change anything below this line.
 * ------------------------------------------------------------------------- */

/** Formats 3900 as "₱3,900". Returns the fallback when the price is null. */
export function formatPeso(
  amount: number | null,
  fallback = "Enquire",
): string {
  if (amount === null || Number.isNaN(amount)) return fallback;
  return `${CURRENCY}${amount.toLocaleString("en-PH")}`;
}

export const publishedAddressTiers = addressTiers.filter((t) => t.published);
export const publishedWorkspace = workspaceProducts.filter((p) => p.published);
export const publishedRooms = meetingRooms.filter((r) => r.published);
export const publishedRegistration = registrationServices.filter(
  (s) => s.published,
);
export const publishedBundles = bundles.filter((b) => b.published);

/** Lowest published monthly address rate, used for "from ₱X" copy. */
export const lowestAddressPrice: number | null = (() => {
  const prices = publishedAddressTiers
    .map((t) => t.price12)
    .filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
})();
