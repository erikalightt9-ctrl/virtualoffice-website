/**
 * ============================================================================
 *  CAPSULE — STANDALONE PAGE CONTENT
 *  Location, About, Foreign Companies, Partners and How It Works.
 * ============================================================================
 */

/* ---------------------------------------------------------------- LOCATION */

export const location = {
  metaTitle: "Our Location | 104 Paseo de Roxas, Makati City | Capsule",
  metaDescription:
    "Capsule occupies 613 sqm on the 5th floor of 104 Paseo de Roxas, Makati City — staffed reception, six bookable rooms and serviced workstations in the Makati CBD.",
  headline: "Put Makati on your business card. Then come and see it.",
  intro:
    "Capsule occupies approximately 613 square metres on the 5th floor of 104 Paseo de Roxas, in the Makati central business district. Paseo de Roxas is one of the district's principal business streets, and the building holds a current occupancy permit.",

  facilities: [
    { name: "Conference rooms", detail: "Three rooms for meetings, presentations and board sessions." },
    { name: "Meeting room", detail: "A comfortable room seating six to seven people." },
    { name: "Focus room", detail: "A smaller room for up to four — interviews, one-to-ones and private calls." },
    { name: "Tea room", detail: "An informal space for short meetings and refreshments." },
    { name: "Workstations", detail: "Forty to fifty serviced desks available for dedicated and day use." },
    { name: "Staffed reception", detail: "Reception attended through business hours to receive mail, couriers and visitors." },
    { name: "Administrative team", detail: "Six to seven administrative staff on site during business hours." },
    { name: "Landline", detail: "A business landline for the office." },
  ],

  gettingHere: [
    {
      heading: "By car",
      body: "Paseo de Roxas runs through the heart of the Makati CBD. Building parking and nearby commercial parking are available — ask us when you book a visit and we will tell you the current arrangement.",
    },
    {
      heading: "By public transport",
      body: "The Makati CBD is served by extensive bus and jeepney routes along Ayala Avenue and Paseo de Roxas, and by ride-hailing throughout. We will send precise directions with your visit confirmation.",
    },
    {
      heading: "Finding us in the building",
      body: "Take the lifts to the 5th floor. Our reception is on the floor and staffed during business hours.",
    },
  ],

  /**
   * TODO: replace these captions once the professional photographs are added.
   * Photo files go in /public/photos/ and are referenced in components/Photo.tsx.
   */
  photoCaptions: [
    { file: "reception.jpg", caption: "Reception on the 5th floor, staffed through business hours." },
    { file: "conference-a.jpg", caption: "Conference Room A, our largest meeting space." },
    { file: "workstations.jpg", caption: "Serviced workstations on the main floor." },
    { file: "meeting-room.jpg", caption: "The meeting room, seating six to seven." },
    { file: "tea-room.jpg", caption: "The tea room, for informal meetings." },
    { file: "building.jpg", caption: "104 Paseo de Roxas, Makati City." },
  ],
};

/* ------------------------------------------------------------------- ABOUT */

export const about = {
  metaTitle: "About Capsule | Business Address & Workspace in Makati",
  metaDescription:
    "Capsule provides business addresses, workspace and business establishment support at 104 Paseo de Roxas, Makati. Managed by Philippine Dragon Media Network Corp.",
  headline: "A real office, run by a company you can look up.",
  intro:
    "Capsule exists because the gap between a mailbox and a Makati office lease is where most young companies actually live — and because too much of this market is addresses without offices behind them.",

  sections: [
    {
      heading: "Who operates Capsule",
      body: [
        "Capsule is managed by Philippine Dragon Media Network Corp., an SEC-registered Philippine corporation whose Articles of Incorporation include leasing and subleasing among its purposes.",
        "That matters more than it sounds. When you register a company at an address, you are relying on the operator's authority to provide it. Ours is documented, and we are happy to show you.",
      ],
    },
    {
      heading: "What we actually do",
      body: [
        "We provide business addresses, mail and document handling, meeting rooms and serviced workspace from our own floor at 104 Paseo de Roxas. We coordinate company registration, accounting, tax, payroll and corporate secretarial services through licensed partner firms.",
        "We are careful about that distinction. Regulated professional work is performed by professionals accountable for it. What we provide is the premises, the administration and the coordination — and a single point of contact so you are not managing four relationships.",
      ],
    },
    {
      heading: "Who we serve",
      body: [
        "More than fifty companies to date, most of them introduced by the business consultants and professional firms we work with. Startups and newly incorporated companies, freelancers and consultants, remote and distributed teams, established Philippine companies wanting a Makati presence, and foreign companies entering the market.",
      ],
    },
    {
      heading: "How we decide who to accept",
      body: [
        "We vet applicants and we decline some. There is a published acceptable use policy, a documentary requirement, and an approval step before any address is activated.",
        "A provider that accepts everyone is a provider whose address will eventually be associated with something you would rather not share. The screening is for your benefit as much as ours.",
      ],
    },
  ],
};

/* -------------------------------------------------------- FOREIGN COMPANIES */

export const foreign = {
  metaTitle: "Philippine Market Entry for Foreign Companies | Capsule Makati",
  metaDescription:
    "Establish your Philippine presence from Makati — company registration, registered business address, accounting, payroll and workspace for foreign companies entering the Philippines.",
  headline: "Entering the Philippines? Start with an address that holds up.",
  intro:
    "Foreign companies establishing in the Philippines face the same sequence every time: choose a structure, register with the SEC, register with the BIR, secure barangay and city permits, then keep it all compliant. Every step requires an address, and most of those steps involve someone verifying it.",

  sequence: [
    { step: "Structure", detail: "Decide between a domestic corporation, a branch, a representative office or a regional headquarters. The choice affects capital requirements, tax treatment and what you are allowed to do." },
    { step: "SEC registration", detail: "Incorporation or licence to do business, with the registered address named in the filing." },
    { step: "Address", detail: "A registered business address that can receive government correspondence and accommodate inspection." },
    { step: "BIR registration", detail: "Certificate of registration, books of account and official receipts, usually with an ocular inspection." },
    { step: "Local permits", detail: "Barangay clearance and Mayor's Permit from the local government unit." },
    { step: "Ongoing compliance", detail: "Monthly and annual BIR filings, payroll and statutory contributions, annual SEC filings." },
  ],

  sections: [
    {
      heading: "Why the address is the part that goes wrong",
      body: [
        "Most foreign companies arrange registration through a consultant and rent the cheapest available address separately. Then the BIR schedules an inspection, an officer arrives, and nobody at the address has heard of the company.",
        "Capsule provides both. The address is our own floor, your company is on our records, and our administrative team expects the visit.",
      ],
    },
    {
      heading: "You do not need an office yet — but you may need one soon",
      body: [
        "Start with a registered address. When you hire your first Philippine employees, take desks on the same floor. When you need somewhere to put a country manager and receive clients, take a private office.",
        "Nothing has to be renegotiated and your registered address never changes, which saves you a round of SEC, BIR and LGU filings each time you grow.",
      ],
    },
    {
      heading: "Working across languages and time zones",
      body: [
        "Capsule is operated by Philippine Dragon Media Network Corp., which has served the Chinese-speaking business community in the Philippines for years. We can work with clients in English and Chinese, and we are equipped to support enquiries from across the region.",
        "We serve companies of every nationality. What we bring to overseas clients specifically is people who have done this before with founders who are not in the country yet.",
      ],
    },
  ],
};

/* ---------------------------------------------------------------- PARTNERS */

export const partners = {
  metaTitle: "Partner & Referral Network | Capsule Makati",
  metaDescription:
    "Capsule works with business consultants, accounting firms and corporate service providers who refer clients needing a Makati business address, workspace or registration support.",
  headline: "For consultants, accountants and corporate service providers.",
  intro:
    "Most of our clients arrive through professional firms — consultants arranging a registration who need a compliant address, accountants whose client is outgrowing a home address, lawyers setting up a foreign-owned entity. If that is your practice, this page is for you.",

  forPartners: [
    {
      heading: "What your client gets",
      body: "A registered address at 104 Paseo de Roxas backed by a real staffed office, government correspondence handled properly, inspections accommodated, and meeting rooms and workspace on the same floor when they need them.",
    },
    {
      heading: "What you get",
      body: "A provider that will not embarrass you at the inspection stage, one point of contact, and clear commercial terms. Tell us how you prefer to work — referral, wholesale rate, or bundled into your own engagement — and we will structure it.",
    },
    {
      heading: "How referrals are tracked",
      body: "Send your client with your firm's name on the enquiry, or use a tracked referral link we issue you. Either way the introduction is recorded against your firm so nothing is lost or double-counted.",
    },
    {
      heading: "Where we hand back to you",
      body: "We do not compete with our partners. Registration, accounting, tax and corporate secretarial work is delivered by licensed firms — if you are one, we would rather route the work to you than to someone else.",
    },
  ],
};

/* ------------------------------------------------------------ HOW IT WORKS */

export const howItWorks = {
  metaTitle: "How It Works | Signing Up with Capsule Makati",
  metaDescription:
    "Four steps to a Capsule business address: choose your plan, submit documents for verification, sign and pay, and activate. Registration use is subject to approval.",
  headline: "Four steps, and one of them is us checking you out.",
  intro:
    "We screen applicants before activating an address. It adds a step, and it is the reason our address is worth registering at.",

  steps: [
    {
      n: "01",
      title: "Choose your plan",
      body: "Pick the tier that matches what you need. If you intend to register a company at the address, you need the Registered tier or above — tell us and we will confirm eligibility before you pay anything.",
    },
    {
      n: "02",
      title: "Submit your documents",
      body: "Government-issued identification for the authorised signatory, and your company registration documents where the company already exists. If you are incorporating with us, we will ask for things in stages rather than all at once.",
    },
    {
      n: "03",
      title: "Approval, agreement and payment",
      body: "We review your application against our acceptable use policy and confirm approval. You receive the service agreement, which sets out mail handling, government correspondence, address use limits and termination. Then we invoice — bank transfer, deposit, GCash or international wire.",
    },
    {
      n: "04",
      title: "Activation",
      body: "Your address goes live, usually within one to two business days of approved documents and payment. You receive a welcome pack with the mail protocol, room booking process and your account contact.",
    },
  ],

  note: "Company registration runs alongside this on its own timeline, which depends on government processing. We will give you an indicative schedule and tell you where your application stands.",
};
