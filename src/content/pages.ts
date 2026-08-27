/**
 * ============================================================================
 *  THE GROUNDS — STANDALONE PAGE CONTENT
 *  Location, About, Foreign Companies, Partners and How It Works.
 * ============================================================================
 */

/* ---------------------------------------------------------------- LOCATION */

export const location = {
  metaTitle: "Our Location — 104 Paseo de Roxas, Makati",
  metaDescription:
    "A virtual office on the 5th floor of 104 Paseo de Roxas, Legaspi Village, Makati — staffed reception, six bookable rooms and serviced workstations.",
  headline: "Put Makati on your business card. Then come and see it.",
  intro:
    "The Grounds occupies the 5th floor of 104 Paseo de Roxas, Legaspi Village, San Lorenzo, Makati City, in the Makati central business district. Paseo de Roxas is one of the district's principal business streets.",

  facilities: [
    { name: "Conference rooms", detail: "Three rooms for meetings, presentations and board sessions." },
    { name: "Meeting room", detail: "A comfortable room seating six to seven people." },
    { name: "Focus room", detail: "A smaller room for up to four — interviews, one-to-ones and private calls." },
    { name: "Tea room", detail: "An informal space for short meetings and refreshments." },
    { name: "Workstations", detail: "Serviced desks available for dedicated and day use." },
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
    { file: "lounge.jpg", caption: "The lounge, where clients wait and members read." },
    { file: "workspace.jpg", caption: "Serviced workstations on the main floor." },
    { file: "meeting-room.jpg", caption: "One of six bookable rooms." },
    { file: "pantry.jpg", caption: "The tea room, for informal meetings." },
  ],
};

/* ------------------------------------------------------------------- ABOUT */

export const about = {
  metaTitle: "About — A Virtual Office in Makati",
  metaDescription:
    "The Grounds is a virtual-office service at 104 Paseo de Roxas, Legaspi Village, Makati, operated by Philippine Dragon Media Network Corp.",
  headline: "A real office, run by a company you can look up.",
  intro:
    "The Grounds exists because the gap between a mailbox and a Makati office lease is where most young companies actually live — and because too much of this market is addresses without offices behind them.",

  sections: [
    {
      heading: "Who operates The Grounds",
      body: [
        "The Grounds is a virtual-office service operated by Philippine Dragon Media Network Corp., an SEC-registered Philippine corporation whose Articles of Incorporation include leasing and subleasing among its purposes.",
        "That matters more than it sounds. When you use an address, you are relying on the operator's authority to provide it. Ours is documented, and we are happy to show you.",
      ],
    },
    {
      heading: "What we do",
      body: [
        "We provide a business address, mail and document handling, meeting rooms and serviced workspace from our own floor at 104 Paseo de Roxas. Companies that need an address they can name as their registered business address can take our Registered package.",
        "That is the entire service, deliberately. We are good at running an office and looking after what arrives in it.",
      ],
    },
    {
      heading: "What we do not do",
      body: [
        "We do not register companies. We do not file anything with the SEC, the BIR, a barangay or a city hall. We do not obtain permits, keep books, prepare or file taxes, run payroll, or advise on how to set up or structure a business in the Philippines.",
        "Plenty of providers blur this line. We would rather be plainly useful at one thing than vaguely responsible for several. Engage your own accountant, lawyer or corporate services firm for that work — we are simply the address on the paperwork.",
      ],
    },
    {
      heading: "Who we serve",
      body: [
        "More than fifty companies to date. Freelancers and consultants, startups and small companies, remote and distributed teams, established Philippine companies wanting a Makati presence, and overseas businesses that need a credible Philippine address.",
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

/* ---------------------------------------------------------------- PARTNERS */

export const partners = {
  metaTitle: "Referral Programme for Professionals",
  metaDescription:
    "For accountants, lawyers and corporate service providers whose clients need a credible Makati business address. Refer a client to the The Grounds virtual office.",
  headline: "For professionals whose clients need an address.",
  intro:
    "Accountants, lawyers and corporate service providers send us a good share of our clients. If your client needs a credible Makati business address — or one they can name as their registered business address — that is exactly what we do, and nothing beyond it.",

  forPartners: [
    {
      heading: "What your client gets",
      body: "A business address at 104 Paseo de Roxas backed by a real staffed office, mail received and logged by our own team, official correspondence escalated immediately, and meeting rooms and workspace on the same floor when they need them.",
    },
    {
      heading: "We stay in our lane",
      body: "We provide the address and the office. We do not register companies, file with any agency, obtain permits, keep books, handle tax or payroll, or advise on business setup. Your engagement with your client is not something we will ever encroach on — we are the address, you are the adviser.",
    },
    {
      heading: "Clear commercial terms",
      body: "Tell us how your practice prefers to work — a referral arrangement, a wholesale rate, or simply pointing your client at our published pricing — and we will put it in writing.",
    },
    {
      heading: "How referrals are tracked",
      body: "Send your client with your firm's name on the enquiry, or use a tracked referral link we issue you. Either way the introduction is recorded against your firm so nothing is lost or double-counted.",
    },
  ],
};

/* ------------------------------------------------------------ HOW IT WORKS */

export const howItWorks = {
  metaTitle: "How It Works — Signing Up",
  metaDescription:
    "Four steps to a virtual office at The Grounds: choose your package, submit documents for verification, sign and pay, and activate. Registered-address use is subject to approval.",
  headline: "Four steps, and one of them is us checking you out.",
  intro:
    "We screen applicants before activating an address. It adds a step, and it is the reason our address is worth registering at.",

  steps: [
    {
      n: "01",
      title: "Choose your plan",
      body: "Pick the package that matches what you need. If you intend to use the address as your registered business address, you need the Registered package or above — tell us and we will confirm eligibility before you pay anything.",
    },
    {
      n: "02",
      title: "Submit your documents",
      body: "Government-issued identification for the authorised signatory, and your company registration documents where the company already exists. We ask for these only to verify who you are.",
    },
    {
      n: "03",
      title: "Approval, agreement and payment",
      body: "We review your application against our acceptable use policy and confirm approval. You receive the service agreement, which sets out mail handling, official correspondence, address use limits and termination. Then we invoice — bank transfer, deposit, GCash or international wire.",
    },
    {
      n: "04",
      title: "Activation",
      body: "Your address goes live, usually within one to two business days of approved documents and payment. You receive a welcome pack with the mail protocol, room booking process and your account contact.",
    },
  ],

  note: "If you are also registering a company or dealing with permits, that runs on its own timeline with your own advisers. We are not involved in it and cannot speak to where it stands — but the address will be ready when you need it.",
};
