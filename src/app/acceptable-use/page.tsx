import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { acceptableUse } from "@/content/legal";

export const metadata: Metadata = {
  title: acceptableUse.metaTitle,
  description: acceptableUse.metaDescription,
};

export default function AcceptableUsePage() {
  return <LegalPage doc={acceptableUse} />;
}
