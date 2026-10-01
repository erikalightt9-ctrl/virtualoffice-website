/** Virtual-office services offered directly by PDMN Virtual Office. */

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
  pricingBlock: "address" | "rooms" | "none";
  deliveredByPartners: boolean;
};

export const services: Service[] = [
  {
    "slug": "virtual-office",
    "name": "Virtual Office Basic",
    "summary": "For freelancers, consultants and professionals who need a credible Makati business address for correspondence and business purposes.",
    "metaTitle": "Virtual Office Basic in Makati",
    "metaDescription": "For freelancers, consultants and professionals who need a credible Makati business address for correspondence and business purposes.",
    "headline": "A credible Makati address for your professional presence.",
    "intro": "For freelancers, consultants and professionals who need a credible Makati business address for correspondence and business purposes.",
    "highlights": [
      "Makati address for business correspondence",
      "Basic document handling included"
    ],
    "sections": [
      {
        "heading": "When to choose Basic",
        "body": [
          "Use Basic for correspondence and a professional presence on your business materials. For a registered business address, choose Corporate; if physical facilities are required for an application, discuss VIP."
        ]
      }
    ],
    "pricingBlock": "address",
    "deliveredByPartners": false
  },
  {
    "slug": "registered-business-address",
    "name": "Virtual Office Corporate",
    "summary": "For companies that need a professional address to use as their registered business address.",
    "metaTitle": "Virtual Office Corporate in Makati",
    "metaDescription": "For companies that need a professional address to use as their registered business address.",
    "headline": "A professional address for your company registration.",
    "intro": "For companies that need a professional address to use as their registered business address. Subject to applicable requirements and approval of the relevant government agency.",
    "highlights": [
      "Makati address for company registration",
      "Basic document handling included"
    ],
    "sections": [
      {
        "heading": "Confirm address suitability",
        "body": [
          "We review your business activity and intended registration before agreeing address use. If the application requires physical facilities or an inspection, discuss VIP."
        ]
      }
    ],
    "pricingBlock": "address",
    "deliveredByPartners": false
  },
  {
    "slug": "virtual-office-vip",
    "name": "VIP Virtual Office",
    "summary": "For companies that require an actual physical office and facilities for government registration and regulatory compliance.",
    "metaTitle": "VIP Virtual Office in Makati",
    "metaDescription": "For companies that require an actual physical office and facilities for government registration and regulatory compliance.",
    "headline": "Physical facilities for registration and compliance.",
    "intro": "A business address with access to an actual physical office and facilities for agreed government registration, inspection and compliance requirements.",
    "highlights": [
      "Business address and basic document handling",
      "Physical facilities matched to your regulatory requirements"
    ],
    "sections": [
      {
        "heading": "What VIP can support",
        "body": [
          "Business registration, government applications, inspections and verification, including applicable BOC, FDA and LTO requirements.",
          "Warehouse/storage facilities may be arranged where required, subject to availability and applicable requirements."
        ]
      },
      {
        "heading": "Confirm your requirements",
        "body": [
          "Share your business activity and agency requirements so we can confirm suitable facilities and provide a quotation. Subject to applicable requirements and approval of the relevant government agency. PDMN does not guarantee government approval."
        ]
      }
    ],
    "pricingBlock": "address",
    "deliveredByPartners": false
  }
];
export const regulatorySupport = [
  "Business registration",
  "Government and regulatory applications",
  "Government inspections and verification",
  "BOC (Bureau of Customs) requirements",
  "LTO-related registration requirements",
  "FDA applications and related requirements",
  "Other applicable government registrations, permits and compliance requirements",
  "Physical office/facility requirements for regulatory purposes",
  "Warehouse/storage facilities where required for applicable BOC or regulatory requirements, subject to availability and applicable requirements"
];
export const approvalNote = "Subject to applicable requirements and approval of the relevant government agency.";
export function getService(slug: string): Service | undefined { return services.find(service => service.slug === slug); }
export const serviceSlugs = services.map(service => service.slug);
