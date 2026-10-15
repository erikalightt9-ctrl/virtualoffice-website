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

/* The onboarding checklist as supplied by the operator.
   -------------------------------------------------------------------------
   Two items differ from what this page previously published and the change
   is deliberate, not a transcription slip:

     - it asked for TWO valid IDs; this asks for one, with a passport for
       foreign applicants
     - "KYC form" is now "application form"

   If Operations actually still collects two IDs, this understates it and the
   second request will surprise an applicant mid-onboarding. Worth confirming.

   The initial payment states the two-month deposit because that figure is
   confirmed. It does NOT state refund mechanics or a setup-fee amount, both
   of which are still awaiting approval. */
export const DOCUMENTS: DocRequirement[] = [
  {
    "name": "Completed application form",
    "what": "Your full name, the business or proposed business name, the nature of the business, a contact number, an email address, your current address, and the package you want. We send you the form.",
  },
  {
    "name": "Valid government-issued ID",
    "what": "A clear copy of the ID of the owner or the authorised signatory.",
    "where": "Applying from outside the Philippines? Send a valid passport.",
  },
  {
    "name": "Business information and registration documents",
    "what": "If the business already exists, send its registration certificate — DTI or SEC, whichever applies. If you are still setting it up, send the proposed name, the intended activities and your own details; the registration documents follow once you have them.",
    "where": "You do not need documents you have not obtained yet. Tell us the stage you are at.",
  },
  {
    "name": "Proof of authority, where applicable",
    "what": "If you are subscribing or signing for a business rather than for yourself, send an authorisation letter, a Secretary’s Certificate or a board resolution, depending on the arrangement.",
  },
  {
    "name": "Signed service agreement",
    "what": "Confirms the package you chose, what the address may be used for, what the service includes, the fees, and the one-year minimum term.",
  },
  {
    "name": "Required initial payment",
    "what": "Two months’ security deposit, the agreed setup fee, and any initial service payment set out in your quotation. Package prices exclude VAT, so your quotation states the full amount payable.",
  },
];

/** Said before anyone pays: a subscription is not an approved registration. */
export const INTENDED_USE_NOTE =
  "Tell us what you intend to use the address for before you choose a package. A virtual-office subscription does not by itself guarantee that the address will be accepted for business registration — the arrangement has to meet the requirements of the agency you are registering with.";
export const PATHS: ApplicantPath[] = [
  {
    "id": "corporation",
    "label": "A registered Philippine corporation or partnership",
    "summary": "You have SEC registration already.",
    "packages": "Basic for correspondence; Corporate for registered-address use; VIP for actual physical-office and facility requirements.",
    "registeredNow": true,
    "needs": [
      "Business information and registration documents",
      "Completed application form",
      "Valid government-issued ID",
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
      "Business information and registration documents",
      "Completed application form",
      "Valid government-issued ID",
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
      "Completed application form",
      "Valid government-issued ID",
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
      "Business information and registration documents",
      "Completed application form",
      "Valid government-issued ID",
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
      "Completed application form",
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