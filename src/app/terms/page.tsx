import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: terms.metaTitle,
  description: terms.metaDescription,
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
