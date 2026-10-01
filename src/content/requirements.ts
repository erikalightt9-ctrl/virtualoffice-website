/** Initial preparation checklist; final requirements are confirmed for each applicant. */
export type DocRequirement = {
  /** Short name as the client would recognise it. */
  name: string;
  /** What it actually is, for someone who has not heard the formal name. */
  what: string;
  /** Where they get it, if they do not have it. */
  where?: string;
};

export type ApplicantPath = {
  id: string;
  /** How the visitor would describe themselves. */
  label: string;
  /** One line confirming they are in the right place. */
  summary: string;
  /** Which package they can start on. */
  packages: string;
  /** Whether registered-address use is available to them now. */
  registeredNow: boolean;
  /** Documents required, by `name` from DOCUMENTS. */
  needs: string[];
  /** Anything specific to this path. */
  note?: string;
};

export const DOCUMENTS: DocRequirement[] = [
  {
    "name": "Business registration documents, where available",
    "what": "Share existing company or business registration documents. If you are preparing a new registration, tell us your current stage so we can confirm what is needed."
  },
  {
    "name": "Completed KYC form",
    "what": "A short know-your-client form covering who owns and controls the business and what it actually does. We send it to you."
  },
  {
    "name": "Two primary valid IDs",
    "what": "Identification for the authorised signatory. Our team will confirm the accepted documents for your situation, including overseas applicants.",
    "where": "If you hold something not on that list, or you are applying from overseas, tell us what you have and we will confirm whether it works."
  },
  {
    "name": "Home-country business registration, if applicable",
    "what": "For an existing foreign company, share its home-country registration documents and authorised representative details. Individuals without a company should discuss their planned activity with our team.",
    "where": "Issued by the companies registry in your home jurisdiction. We will tell you if a certified translation is needed."
  },
  {
    "name": "Payment",
    "what": "Invoiced in advance of the term, and payable by bank transfer, bank deposit, cheque (including post-dated) or cash. Clients paying from outside the Philippines use bank transfer."
  },
  {
    "name": "Business activity and facility requirements",
    "what": "Describe your intended address use and any government application, inspection, verification or warehouse/storage requirements. Include the relevant agency requirements where available."
  }
];
export const PATHS: ApplicantPath[] = [
  {
    "id": "corporation",
    "label": "A registered Philippine corporation or partnership",
    "summary": "You have SEC registration already.",
    "packages": "Basic for correspondence; Corporate for registered-address use; VIP for actual physical-office and facility requirements.",
    "registeredNow": true,
    "needs": [
      "Business registration documents, where available",
      "Completed KYC form",
      "Two primary valid IDs",
      "Payment",
      "Business activity and facility requirements"
    ],
    "note": "Our team will confirm the documents, package suitability and facility arrangements for your registration stage. Subject to applicable requirements and approval of the relevant government agency."
  },
  {
    "id": "sole-proprietor",
    "label": "A sole proprietor, freelancer or independent professional",
    "summary": "You are registered with the DTI.",
    "packages": "Basic for correspondence; Corporate for registered-address use; VIP for actual physical-office and facility requirements.",
    "registeredNow": true,
    "needs": [
      "Business registration documents, where available",
      "Completed KYC form",
      "Two primary valid IDs",
      "Payment",
      "Business activity and facility requirements"
    ],
    "note": "Our team will confirm the documents, package suitability and facility arrangements for your registration stage. Subject to applicable requirements and approval of the relevant government agency."
  },
  {
    "id": "incorporating",
    "label": "Not registered yet — you are incorporating now",
    "summary": "You are preparing a new business registration.",
    "packages": "Basic for correspondence; Corporate for registered-address use; VIP for actual physical-office and facility requirements.",
    "registeredNow": false,
    "needs": [
      "Completed KYC form",
      "Two primary valid IDs",
      "Payment",
      "Business activity and facility requirements"
    ],
    "note": "Our team will confirm the documents, package suitability and facility arrangements for your registration stage. Subject to applicable requirements and approval of the relevant government agency."
  },
  {
    "id": "foreign-registered",
    "label": "A foreign company already registered in the Philippines",
    "summary": "You have a Philippine branch, representative office or subsidiary with its own SEC registration.",
    "packages": "Basic for correspondence; Corporate for registered-address use; VIP for actual physical-office and facility requirements.",
    "registeredNow": true,
    "needs": [
      "Business registration documents, where available",
      "Completed KYC form",
      "Two primary valid IDs",
      "Payment",
      "Business activity and facility requirements"
    ],
    "note": "Our team will confirm the documents, package suitability and facility arrangements for your registration stage. Subject to applicable requirements and approval of the relevant government agency."
  },
  {
    "id": "foreign-pre-entry",
    "label": "A foreign company or individual, not yet Philippine-registered",
    "summary": "You are planning or preparing entry into the Philippines and have no local entity yet.",
    "packages": "Basic for correspondence; Corporate for registered-address use; VIP for actual physical-office and facility requirements.",
    "registeredNow": false,
    "needs": [
      "Home-country business registration, if applicable",
      "Completed KYC form",
      "Payment",
      "Business activity and facility requirements"
    ],
    "note": "Our team will confirm the documents, package suitability and facility arrangements for your registration stage. Subject to applicable requirements and approval of the relevant government agency."
  }
];
export const AFTER_SUBMITTING = [
  {
    "title": "We review your requirements",
    "body": "We confirm the appropriate package, supporting documents and facility availability."
  },
  {
    "title": "Confirm the scope and agreement",
    "body": "Address use, facilities, fees and terms are agreed before activation."
  },
  {
    "title": "Complete payment and activation",
    "body": "Our team confirms the activation arrangements. Activation does not mean a government application has been approved."
  }
];
export const PRE_ENTRY_BOUNDARY = "A correspondence address or service agreement does not itself register your business or authorise operations in the Philippines. Discuss your intended use and registration stage with our team. Address and facility use is subject to applicable requirements and approval of the relevant government agency.";