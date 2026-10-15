/** Current approved package rates. VIP has no published billing period. */
export const CURRENCY = "₱";
export const PRICING_DISCLAIMER = "";
export const TERMS = [] as const;
export const DOCUMENT_HANDLING = "Basic document handling is included in all packages: receiving documents during office hours, notifying you of receipt, and holding them for collection by you or an authorized representative.";
export type AddressTier = {
  id: string;
  name: string;
  bestFor: string;
  /** Monthly rate on a 12-month term. `null` shows "Inquire". */
  price12: number | null;
  /** Monthly rate on a rolling monthly term. */
  priceMonthly: number | null;
  startingPrice?: number;
  /** May this package's address be used as a registered business address? */
  registrationEligible: boolean;
  /** Draws the highlighted border on pricing cards. Set on one tier only. */
  featured: boolean;
  published: boolean;
  features: string[];

  /* The fields below exist for VIP, which is quoted rather than priced and so
     needs more structure than a flat feature list. They are optional: a tier
     that omits them renders exactly as before. */

  /** One sentence on what the package contains, shown under an "Includes" head. */
  includes?: string;
  /** The purposes the facilities serve. NOT a list of work we perform. */
  catersTo?: string[];
  /** What we need from the enquirer to quote accurately. */
  quotationPrompt?: string;
  /** Qualifiers set in fine print beneath the card. */
  footnotes?: string[];
};


export const addressTiers: AddressTier[] = [
  {
    "id": "basic",
    "name": "Virtual Office Basic",
    "bestFor": "For freelancers, consultants and professionals who need a credible Makati business address for correspondence and business purposes.",
    "registrationEligible": false,
    "features": [
      "Professional Makati business address",
      "Basic document handling",
      "For correspondence and business purposes",
      "Choose Corporate if you need a registered business address"
    ],
    "price12": null,
    "priceMonthly": 1400,
    "featured": false,
    "published": true
  },
  {
    "id": "corporate",
    "name": "Virtual Office Corporate",
    "bestFor": "For businesses that require a professional business address for registration and corporate purposes.",
    "registrationEligible": true,
    "features": [
      "Professional Makati business address",
      "Basic document handling",
      "Registered business address use, subject to applicable requirements"
    ],
    "price12": null,
    "priceMonthly": 1800,
    "featured": false,
    "published": true
  },
  {
    "id": "vip",
    "name": "VIP Virtual Office",
    "bestFor": "For businesses needing an address and physical facilities for registration and compliance.",
    "registrationEligible": true,

    /* Copy supplied by the operator as the authoritative VIP card.
       ---------------------------------------------------------------------
       Note the construction of catersTo: it lists what the FACILITIES are
       for, not work we carry out. "Business registration" there means the
       premises serve a registration, in the same way a warehouse caters to
       storage. That distinction is the whole reason the last footnote stays
       on the card: a reader scanning the bullets could otherwise conclude we
       file the application, which we have confirmed we do not. */
    "includes": "A business address and an actual physical office and facilities, matched to your business purpose and requirements.",
    "catersTo": [
      "Business registration",
      "Bureau of Customs (BOC) requirements",
      "Food and Drug Administration (FDA) requirements",
      "Land Transportation Office (LTO) requirements",
      "Inspections and other applicable compliance requirements"
    ],
    "quotationPrompt": "Tell us what type of business you are registering, which government requirements you need to meet, and what facilities you need.",
    /* Operator's own two qualifiers. A third line stating that we do not
       prepare or file applications was removed at the operator's instruction;
       that boundary is still set out in the terms, in the chatbot guardrail
       and in PDMN-DESIGN.md. */
    "footnotes": [
      "The final rate depends on your specific business purpose, government requirements, and facilities needed.",
      "Subject to facility availability, applicable requirements, and approval of the relevant government agency."
    ],

    /* Kept so any view still rendering a flat list stays accurate. */
    "features": [
      "A business address and an actual physical office and facilities",
      "Matched to your business purpose and requirements",
      "Caters to business registration, BOC, FDA, LTO and inspection requirements",
      "Final rate by quotation"
    ],
    "price12": null,
    "priceMonthly": null,
    "startingPrice": 5000,
    "featured": false,
    "published": true
  }
];
export type MeetingRoom = {
  id: string;
  name: string;
  capacity: string;
  /** Hourly rate for additional use, on packages without an allocation. */
  rate: number | null;
  /** Reduced hourly rate on the Registered and Corporate packages. */
  memberRate: number | null;
  published: boolean;
  note: string;
};


/** Legacy room components are retained but no room products are published. */
export const meetingRooms: MeetingRoom[] = [];
export function formatPeso(
  amount: number | null,
  fallback = "Inquire",
): string {
  if (amount === null || Number.isNaN(amount)) return fallback;
  return `${CURRENCY}${amount.toLocaleString("en-PH")}`;
}

export const VIP_RATE_NOTE = "Final VIP pricing depends on your business activity, government requirements and facilities needed. Contact us for a quotation.";

export function packageRate(tier: AddressTier): string {
  if (tier.startingPrice === undefined) return `${formatPeso(tier.priceMonthly)}/month`;
  /* The asterisk is only honest if something explains it. It appears when the
     tier carries footnotes, which is where the explanation lives. */
  const mark = tier.footnotes?.length ? "*" : "";
  return `Starting at ${formatPeso(tier.startingPrice)}${mark}`;
}

export const publishedAddressTiers = addressTiers.filter((t) => t.published);
export const publishedRooms = meetingRooms.filter((r) => r.published);

/** Lowest published monthly address rate, used for "from ₱X" copy. */
export const lowestAddressPrice: number | null = (() => {
  const prices = publishedAddressTiers
    .map((t) => t.priceMonthly)
    .filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
})();

/* ===========================================================================
   COMMERCIAL TERMS — confirmed items only.

   Published here because they were given as settled:
     - prices are VAT-EXCLUSIVE, with the 12% shown separately and the total
       payable disclosed before payment
     - one-year minimum term
     - one month's written notice of non-renewal before expiry

   DELIBERATELY NOT PUBLISHED, because the source document marks them as
   proposals awaiting approval and says they "should only be published once
   the billing option and setup fee are approved":

     - the setup fee AMOUNT and what it covers (no figure exists yet)
     - billing frequency (monthly default vs annual prepayment)
     - the refund policy and the early-termination charge
     - whether renewal is automatic or requires written confirmation
     - any activation turnaround ("same-day", "24-hour", etc.)

   Publishing an unapproved commercial term is worse than publishing none:
   it is quotable by a client and contradicts the signed agreement. Add each
   one here as it is approved.
   ========================================================================= */

/** Philippine VAT on taxable service charges. */
export const VAT_RATE = 0.12;

export type VatBreakdown = { net: number; vat: number; gross: number };

export function withVat(net: number): VatBreakdown {
  const vat = Math.round(net * VAT_RATE);
  return { net, vat, gross: net + vat };
}

/** One line stating the tax basis. Shown wherever a price is shown. */
export const VAT_NOTE =
  "Service prices exclude VAT. The 12% VAT is shown separately and your quotation states the total payable before activation.";

/** Term commitments, as confirmed. */
export const COMMITMENT_TERMS = [
  "One-year minimum term, counted from the written service activation date.",
  "To end the arrangement at expiry, give written notice at least one month before the expiry date.",
  "A security deposit and a one-time setup fee apply. Both are confirmed in your quotation before activation.",
  "Services are activated after approval, completed documents, a signed agreement, and confirmation that payment has cleared.",
];
