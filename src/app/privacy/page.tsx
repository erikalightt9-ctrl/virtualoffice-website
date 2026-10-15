import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: privacy.metaTitle,
  description: privacy.metaDescription,
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
