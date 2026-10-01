/**
 * ============================================================================
 *  PDMN VIRTUAL OFFICE — SITE SETTINGS
 *  Brand details, contact channels, address and navigation.
 *
 *  ⚠️  ITEMS MARKED "TODO" ARE PLACEHOLDERS. Replace them before launch.
 * ============================================================================
 */

export const site = {
  name: "PDMN Virtual Office",
  wordmark: "PDMN",
  /** Sits under the wordmark. Kept separate so the header can stack them. */
  wordmarkSub: "VIRTUAL OFFICE",
  tagline: "Your business presence in Makati",

  /** Used in page titles and the meta description. */
  description:
    "Virtual office services at 104 Paseo de Roxas, Legaspi Village, Makati, with Basic, Corporate and VIP packages for business addresses and physical-office support for registration and compliance.",

  /** TODO: replace with the live domain once registered. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pdmn-virtual-office.erika-4d7.workers.dev",

  /** The operator. Shown in the footer and on the About page. */
  operator: {
    name: "Philippine Dragon Media Network Corp.",
    /** TODO: add the SEC registration number — it is a strong credibility signal. */
    secRegistrationNo: "TODO",
    relationship:
      "PDMN Virtual Office is operated by Philippine Dragon Media Network Corp., an SEC-registered Philippine corporation.",
  },

  /**
   * The single source of truth for the address. Every page, the footer, the
   * schema.org markup and the chatbot read from here — change it once.
   */
  address: {
    line1: "104 Paseo de Roxas",
    /** The tower. Named on PDMN's own company profile, and worth carrying:
        a named building reads as more established than a street number, and
        it is what a visitor looks for when they arrive. */
    building: "Salustiana D. Ty Tower",
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
      "5th Floor, Salustiana D. Ty Tower, 104 Paseo de Roxas, Legaspi Village, San Lorenzo, Makati City",
    /** The same address plus region and country, for formal contexts. */
    oneLineFull:
      "5th Floor, Salustiana D. Ty Tower, 104 Paseo de Roxas, Legaspi Village, San Lorenzo, Makati City, Metro Manila, Philippines",
    /** What gets handed to the map embed. */
    mapQuery:
      "Salustiana D. Ty Tower, 104 Paseo de Roxas, Legaspi Village, San Lorenzo, Makati City, Philippines",
  },

  contact: {
    landline: "(02) 7368-0000",
    landlineHref: "tel:+63273680000",
    /* One mobile number carries Viber and WhatsApp both. */
    mobile: "+63 917 311 3638",
    mobileHref: "tel:+639173113638",
    viber: "+63 917 311 3638",
    viberHref: "viber://chat?number=%2B639173113638",
    whatsapp: "+63 917 311 3638",
    whatsappHref: "https://wa.me/639173113638",
    wechat: "TODO",
    /** TODO: the only contact detail still a placeholder. Needs a real
        mailbox on a domain that exists before launch. */
    email: "virtualoffice@pdmn.ph",
    emailHref: "mailto:virtualoffice@pdmn.ph",
  },

  hours: {
    weekdays: "Monday to Friday, 9:00am – 6:00pm",
    saturday: "Saturday by appointment",
    note: "Reception and administrative staff are on site during business hours.",
  },

  /** Headline facts used in the proof strip. Keep these literally true. */
  facts: [
    { value: "5th Floor", label: "104 Paseo de Roxas" },
    { value: "Physical office", label: "inspected and verified on site" },
    { value: "On-site", label: "reception and administration" },
    { value: "Since 2013", label: "Philippine Dragon Media Network" },
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
      { label: "Virtual Office Basic", href: "/services/virtual-office", note: "Business correspondence" },
      { label: "Virtual Office Corporate", href: "/services/registered-business-address", note: "Registered business address" },
      { label: "VIP Virtual Office", href: "/services/virtual-office-vip", note: "Physical office and facilities" },
    ],
  },

  /* Pricing gets its own top-level entry rather than living only inside the
     Services dropdown. Price is the question a visitor most wants answered and
     the one they will not hunt for; burying it behind a hover menu costs
     enquiries. The two are genuinely different pages — Services explains what
     each package is for, Pricing compares what they cost. */
  { label: "Packages & Pricing", href: "/pricing" },
  { label: "Requirements", href: "/requirements" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Location", href: "/location" },
  { label: "About", href: "/about" },
];

export const footerNav: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Virtual Office Basic", href: "/services/virtual-office" },
      { label: "Virtual Office Corporate", href: "/services/registered-business-address" },
      { label: "VIP Virtual Office", href: "/services/virtual-office-vip" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About PDMN Virtual Office", href: "/about" },
      { label: "Our Location", href: "/location" },
      { label: "How It Works", href: "/how-it-works" },
    
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
