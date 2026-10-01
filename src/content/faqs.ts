import { WORKSPACE_SCOPE } from "./scope";
export type Faq = { q: string; a: string[]; category: string; featured: boolean };
export const faqs: Faq[] = [
  {
    "q": "What is a Virtual Office?",
    "a": [
      "A Virtual Office provides a professional business address and basic document handling for businesses that work from another location."
    ],
    "category": "Frequently Asked Questions",
    "featured": true
  },
  {
    "q": "Who can apply?",
    "a": [
      "Freelancers, consultants, startups and companies are welcome, including foreign individuals and companies planning to establish or expand in the Philippines. Eligibility depends on your business activity and applicable requirements."
    ],
    "category": "Frequently Asked Questions",
    "featured": true
  },
  {
    "q": "Which package should I choose?",
    "a": [
      "Basic is for correspondence and business purposes. Corporate is for registered-address use. VIP adds physical-office and facility support for agreed registration and compliance requirements."
    ],
    "category": "Frequently Asked Questions",
    "featured": true
  },
  {
    "q": "Can I use the address for business registration?",
    "a": [
      "Corporate and VIP may be used for registration, subject to applicable requirements and approval of the relevant government agency. Confirm suitability with our team before using the address in an application. Government approval is not guaranteed."
    ],
    "category": "Frequently Asked Questions",
    "featured": true
  },
  {
    "q": "Do you offer a private office or regular workspace?",
    "a": [
      WORKSPACE_SCOPE
    ],
    "category": "Frequently Asked Questions",
    "featured": true
  },
  {
    "q": "What does VIP facility support cover?",
    "a": [
      "Facilities may support business registration, BOC, FDA, LTO-related requirements, inspections and verification. Warehouse or storage arrangements are subject to availability and applicable requirements. We confirm the scope for your business before activation."
    ],
    "category": "Frequently Asked Questions",
    "featured": false
  },
  {
    "q": "What document handling is included?",
    "a": [
      "All packages include receiving documents during office hours, notifying you of receipt, and holding them for collection by you or an authorized representative. Collection follows our operating hours and authorization procedures. You remain responsible for reviewing correspondence and meeting deadlines."
    ],
    "category": "Frequently Asked Questions",
    "featured": false
  },
  {
    "q": "Are meeting rooms or call handling included?",
    "a": [
      "No. Packages do not include meeting-room bookings, room hours, telephone answering or call-handling services."
    ],
    "category": "Frequently Asked Questions",
    "featured": false
  },
  {
    "q": "Where are you located, and can I visit?",
    "a": [
      "We are on the 5th Floor of Salustiana D. Ty Tower, 104 Paseo de Roxas, Legaspi Village, San Lorenzo, Makati City. Contact us to arrange a visit. Visits and VIP facility access follow the agreed arrangements; the office is not available for daily workspace use."
    ],
    "category": "Frequently Asked Questions",
    "featured": false
  },
  {
    "q": "What are the rates and commitment terms?",
    "a": [
      "Basic is ₱1,400/month and Corporate is ₱1,800/month. VIP starts at ₱5,000, with a quotation based on your purpose and facility requirements. The service term, payment arrangements and any upgrade are confirmed in your agreement."
    ],
    "category": "Frequently Asked Questions",
    "featured": false
  },
  {
    "q": "How do I get started?",
    "a": [
      "Contact us with your business activity, registration stage and intended address use. We confirm the required identification and business documents, package suitability and terms. Service starts after application approval, the agreement and payment are completed."
    ],
    "category": "Frequently Asked Questions",
    "featured": false
  },
  {
    "q": "Can I use the address on my website and business cards?",
    "a": [
      "Yes, for the business named in your agreement and for permitted purposes under your selected package."
    ],
    "category": "Frequently Asked Questions",
    "featured": false
  },
  {
    "q": "How is my information handled?",
    "a": [
      "We handle client information and correspondence in accordance with our privacy policy. Please keep your contact details current so we can reach you about received documents."
    ],
    "category": "Frequently Asked Questions",
    "featured": false
  }
];
