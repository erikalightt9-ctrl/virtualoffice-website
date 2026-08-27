/** Virtual-office services offered directly by The Grounds. */

export type ServiceSection = { heading: string; body: string[] };

export type Service = {
  slug: string;
  name: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  highlights: string[];
  sections: ServiceSection[];
  pricingBlock: "address" | "workspace" | "rooms" | "none";
  deliveredByPartners: boolean;
};

export const services: Service[] = [
  {
    slug: "virtual-office",
    name: "Virtual Office",
    summary: "A professional Makati business address with mail handling and access to a real staffed office.",
    metaTitle: "Virtual Office in Makati — 104 Paseo de Roxas",
    metaDescription: "Virtual office services in Makati with a professional business address, staffed reception, mail handling, meeting rooms and flexible workspace access.",
    headline: "A professional Makati presence, without a traditional office lease.",
    intro: "The Grounds gives your business a credible address at 104 Paseo de Roxas, supported by a staffed reception and an on-site administrative team. Use the address for business correspondence and client-facing materials, receive mail reliably and access professional space when you need it.",
    highlights: [
      "Professional business address at 104 Paseo de Roxas",
      "Mail and parcels received during business hours",
      "Prompt notification when correspondence arrives",
      "Meeting rooms and workspace available at member rates",
      "Flexible plans for independent professionals, startups and established companies",
    ],
    sections: [
      {
        heading: "A real office behind your address",
        body: [
          "The Grounds is not a mailbox or forwarding address. Reception and administrative staff are present during business hours, with meeting rooms and flexible workspace available on the same floor.",
          "That physical presence gives clients a more credible impression and gives you a practical place to meet, work and receive important business correspondence.",
        ],
      },
      {
        heading: "Designed for flexible businesses",
        body: [
          "A virtual office suits consultants, freelancers, remote teams, startups and companies that want a professional Makati presence without maintaining a full-time office.",
          "Start with an address and mail handling, then add meeting-room time, workspace days or a dedicated physical workspace as your needs change.",
        ],
      },
    ],
    pricingBlock: "address",
    deliveredByPartners: false,
  },
  {
    slug: "registered-business-address",
    name: "Registered Business Address",
    summary: "Address-use options for businesses that need an official Makati address, subject to eligibility and document review.",
    metaTitle: "Registered Business Address in Makati",
    metaDescription: "A staffed registered business address at 104 Paseo de Roxas, Makati, available on eligible virtual-office plans and subject to document review.",
    headline: "An official Makati address backed by a staffed office.",
    intro: "Eligible The Grounds plans may allow a client to use 104 Paseo de Roxas as its registered business address. Address use is subject to package eligibility, documentary requirements, acceptable-use rules and written approval. The Grounds does not prepare or file company registrations, permits, tax registrations or compliance returns.",
    highlights: [
      "Registered-address use on eligible plans",
      "Staffed reception during business hours",
      "Organized handling of government and business correspondence",
      "Meeting rooms available for scheduled visits",
      "Clear verification and acceptable-use requirements",
    ],
    sections: [
      {
        heading: "What The Grounds provides",
        body: [
          "The Grounds provides the physical address, staffed premises, mail handling and access to meeting space included in the selected plan.",
          "Clients remain responsible for their own SEC, BIR, local-government and other filings, either directly or through advisers they appoint independently.",
        ],
      },
      {
        heading: "Approval protects every client",
        body: [
          "We review the applicant, business activity and supporting documents before approving registered-address use. Some industries and activities are not accepted under our acceptable-use policy.",
          "This review protects the integrity of the address and the legitimate businesses that use it.",
        ],
      },
    ],
    pricingBlock: "address",
    deliveredByPartners: false,
  },
  {
    slug: "mail-handling",
    name: "Mail Handling",
    summary: "Business mail and parcels received by staffed reception, recorded and notified promptly.",
    metaTitle: "Business Mail Handling in Makati",
    metaDescription: "Mail and parcel handling at 104 Paseo de Roxas, Makati, with staffed reception, prompt notification, secure holding and optional forwarding.",
    headline: "Your business mail, received and handled professionally.",
    intro: "Our reception team receives business correspondence and parcels during office hours, records each item and notifies the authorized contact. Items are held securely until collection or handled according to the service instructions in your plan.",
    highlights: [
      "Reception during published business hours",
      "Prompt email or mobile notification",
      "Secure holding until collection",
      "Optional scanning or forwarding where agreed",
      "Documented handling for important correspondence",
    ],
    sections: [
      {
        heading: "A clear handling process",
        body: [
          "Mail is matched to the client record, logged and stored securely. Only authorized contacts may collect it or instruct us to forward or scan an item where that service is included.",
          "Government, legal and time-sensitive correspondence is escalated promptly through the contact channels on file. The client remains responsible for responding within any applicable deadline.",
        ],
      },
      {
        heading: "Privacy and control",
        body: [
          "We do not open or scan sealed correspondence unless the authorized client has asked us to do so and the selected service allows it.",
          "Identification may be required for collection, and all handling is subject to our privacy policy and service agreement.",
        ],
      },
    ],
    pricingBlock: "address",
    deliveredByPartners: false,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs = services.map((service) => service.slug);
