/**
 * ============================================================================
 *  CAPSULE — SITE SETTINGS
 *  Brand details, contact channels, address and navigation.
 *
 *  ⚠️  ITEMS MARKED "TODO" ARE PLACEHOLDERS. Replace them before launch.
 * ============================================================================
 */

export const site = {
  name: "Capsule",
  wordmark: "CAPSULE",
  tagline: "Your Space. Your Business. Beyond Boundaries.",

  /** Used in page titles and the meta description. */
  description:
    "Virtual office services at 104 Paseo de Roxas, Legaspi Village, Makati, with a professional business address, mail handling, meeting rooms and flexible workspace.",

  /** TODO: replace with the live domain once registered. */
  url: "https://capsule.ph",

  /** The operator. Shown in the footer and on the About page. */
  operator: {
    name: "Philippine Dragon Media Network Corp.",
    /** TODO: add the SEC registration number — it is a strong credibility signal. */
    secRegistrationNo: "TODO",
    relationship:
      "Capsule is a virtual-office service operated by Philippine Dragon Media Network Corp., an SEC-registered Philippine corporation.",
  },

  /**
   * The single source of truth for the address. Every page, the footer, the
   * schema.org markup and the chatbot read from here — change it once.
   */
  address: {
    line1: "104 Paseo de Roxas",
    floor: "5th Floor",
    /** TODO: confirm the unit or suite number, if there is one. */
    unit: "",
    /** The district. */
    village: "Legaspi Village",
    /** The barangay. */
    barangay: "San Lorenzo",
    city: "Makati City",
    region: "Metro Manila",
    postcode: "1229",
    country: "Philippines",
    /** Full address on one line, for schema.org, the footer and the chatbot. */
    oneLine:
      "5th Floor, 104 Paseo de Roxas, Legaspi Village, San Lorenzo, Makati City",
    /** The same address plus region and country, for formal contexts. */
    oneLineFull:
      "5th Floor, 104 Paseo de Roxas, Legaspi Village, San Lorenzo, Makati City, Metro Manila, Philippines",
    /** What gets handed to the map embed. */
    mapQuery:
      "104 Paseo de Roxas, Legaspi Village, San Lorenzo, Makati City, Philippines",
  },

  contact: {
    /** TODO: replace all of these with the real channels. */
    landline: "+63 2 0000 0000",
    landlineHref: "tel:+63200000000",
    mobile: "+63 900 000 0000",
    viber: "+63 900 000 0000",
    viberHref: "viber://chat?number=%2B63900000000",
    whatsapp: "+63 900 000 0000",
    whatsappHref: "https://wa.me/63900000000",
    wechat: "TODO",
    email: "hello@capsule.ph",
    emailHref: "mailto:hello@capsule.ph",
  },

  hours: {
    weekdays: "Monday to Friday, 9:00am – 6:00pm",
    saturday: "Saturday by appointment",
    note: "Reception and administrative staff are on site during business hours.",
  },

  /** Headline facts used in the proof strip. Keep these literally true. */
  facts: [
    { value: "5th Floor", label: "104 Paseo de Roxas" },
    { value: "6 rooms", label: "bookable for meetings" },
    { value: "On-site", label: "reception and administration" },
    { value: "50+", label: "companies served" },
  ],
} as const;

/* --------------------------------------------------------------------------
 *  Navigation
 * ------------------------------------------------------------------------ */

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; note?: string }[];
};

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Virtual Office", href: "/services/virtual-office", note: "Business address and mail" },
      { label: "Registered Business Address", href: "/services/registered-business-address", note: "Address-use options" },
      { label: "Mail Handling", href: "/services/mail-handling", note: "Receiving and notification" },
    ],
  },
  {
    label: "Workspace",
    href: "/workspace",
    children: [
      { label: "Dedicated Desk", href: "/workspace/dedicated-desk" },
      { label: "Team Space", href: "/workspace/team-space" },
      { label: "Private Office", href: "/workspace/private-office" },
      { label: "Day Pass", href: "/workspace/day-pass" },
      { label: "Meeting Rooms", href: "/meeting-rooms" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Location", href: "/location" },
  { label: "About", href: "/about" },
];

export const footerNav: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Virtual Office", href: "/services/virtual-office" },
      { label: "Registered Business Address", href: "/services/registered-business-address" },
      { label: "Mail Handling", href: "/services/mail-handling" },
    ],
  },
  {
    heading: "Workspace",
    links: [
      { label: "Dedicated Desk", href: "/workspace/dedicated-desk" },
      { label: "Team Space", href: "/workspace/team-space" },
      { label: "Private Office", href: "/workspace/private-office" },
      { label: "Day Pass", href: "/workspace/day-pass" },
      { label: "Meeting Rooms", href: "/meeting-rooms" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Capsule", href: "/about" },
      { label: "Our Location", href: "/location" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Frequently Asked Questions", href: "/faq" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Acceptable Use Policy", href: "/acceptable-use" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];
