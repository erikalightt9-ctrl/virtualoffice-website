/**
 * ============================================================================
 *  CAPSULE — WORKSPACE PAGES
 *  Each entry becomes a page at /workspace/[slug].
 *  Prices come from pricing.ts — the `pricingId` links the two.
 * ============================================================================
 */

export type WorkspacePage = {
  slug: string;
  /** Must match an id in workspaceProducts in pricing.ts. */
  pricingId: string;
  name: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

export const workspacePages: WorkspacePage[] = [
  {
    slug: "dedicated-desk",
    pricingId: "dedicated-desk",
    name: "Dedicated Desk",
    summary: "Your own permanent workstation on the 5th floor, with the address included.",
    metaTitle: "Dedicated Desk in Makati | Coworking at 104 Paseo de Roxas | Capsule",
    metaDescription:
      "A permanent assigned desk in Makati CBD with a registered business address included. Staffed reception, meeting rooms and admin support on the same floor.",
    headline: "A desk that is yours, in the middle of Makati.",
    intro:
      "The same desk every day, in a serviced office with reception, meeting rooms and administrative staff on the floor. Your registered business address is included, which means your company is registered where you actually sit — the simplest possible answer to any question about your principal office.",
    sections: [
      {
        heading: "What is included",
        body: [
          "An assigned workstation, business-hours access, the Registered address tier, five meeting room hours a month, and the use of our reception, mail handling and administrative support.",
          "Coffee, tea and the tea room come with it. So does the ability to bring a client into a proper conference room rather than a coffee shop.",
        ],
      },
      {
        heading: "How this compares",
        body: [
          "Serviced desks in comparable Makati buildings generally start above twelve thousand pesos a seat. We are deliberately below that. We would rather fill the floor than hold out for a premium we have not yet earned.",
          "What you give up is a global brand on the lobby directory. What you get is the same district, a staffed office, and a team that also handles your registration and compliance.",
        ],
      },
    ],
  },
  {
    slug: "team-space",
    pricingId: "team-space",
    name: "Team Space",
    summary: "A grouped area for four to fifteen people, without signing a lease.",
    metaTitle: "Team Office Space for Rent in Makati | 4–15 Seats | Capsule",
    metaDescription:
      "Flexible grouped workspace for teams of four to fifteen in Makati CBD. Registered business address included, no long lease, scale seats as you grow.",
    headline: "Room for the team, without the five-year lease.",
    intro:
      "A grouped or partitioned area of the floor for your people, sized to the team you have now and adjustable as that changes. It is the middle ground between everyone working from home and committing to a conventional office fit-out.",
    sections: [
      {
        heading: "Sized to the team, not the decade",
        body: [
          "A conventional Makati lease asks you to predict your headcount years ahead, then pay for the space whether you fill it or not. Team Space is priced per seat and adjusted as the team changes.",
          "Seats can be added when you hire and released when a project ends, with notice.",
        ],
      },
      {
        heading: "What comes with it",
        body: [
          "The Registered address tier for the company, ten meeting room hours a month, reception, mail handling and administrative support.",
          "Larger teams and longer terms are quoted individually — tell us the headcount and the timeframe and we will price it.",
        ],
      },
    ],
  },
  {
    slug: "private-office",
    pricingId: "private-office",
    name: "Private Office",
    summary: "An enclosed, lockable suite for companies that need a door.",
    metaTitle: "Private Office for Rent in Makati | Serviced Suites | Capsule",
    metaDescription:
      "Enclosed private office suites at 104 Paseo de Roxas, Makati. Registered business address included, suitable for client visits and government inspections.",
    headline: "When your company needs a door that closes.",
    intro:
      "An enclosed suite of your own, within a serviced floor. For companies handling confidential work, taking client meetings regularly, or wanting an unambiguous answer when a government officer asks to see the office.",
    sections: [
      {
        heading: "Why foreign-owned companies choose this",
        body: [
          "A company registering in the Philippines for the first time is often asked to demonstrate a real operating presence. An enclosed office with your name on the door answers that question in a way a shared desk does not.",
          "It also gives visiting directors somewhere to work and somewhere to receive people.",
        ],
      },
      {
        heading: "Availability",
        body: [
          "Suite availability is limited and configurations vary, so private offices are quoted individually. Tell us the number of seats and the term you have in mind and we will tell you what is available.",
        ],
      },
    ],
  },
  {
    slug: "day-pass",
    pricingId: "day-pass",
    name: "Day Pass",
    summary: "A desk for the day, with no commitment.",
    metaTitle: "Day Office & Hot Desk in Makati | Day Pass | Capsule",
    metaDescription:
      "A workstation in Makati CBD for a single day. Wi-Fi, coffee and business-hours access at 104 Paseo de Roxas. No membership required.",
    headline: "A desk for today.",
    intro:
      "For visiting founders, staff passing through Manila, or anyone who needs somewhere professional to work for a few hours. Take any open workstation for the business day.",
    sections: [
      {
        heading: "Useful before you commit",
        body: [
          "It is also the easiest way to see the office before signing up for anything. Spend a day here, use a meeting room, meet the team that would be handling your mail and your registration.",
          "Most of our address clients looked at the floor first.",
        ],
      },
    ],
  },
];

export function getWorkspacePage(slug: string): WorkspacePage | undefined {
  return workspacePages.find((p) => p.slug === slug);
}

export const workspaceSlugs = workspacePages.map((p) => p.slug);
