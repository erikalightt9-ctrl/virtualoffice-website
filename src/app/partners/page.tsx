import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { partners } from "@/content/pages";

export const metadata: Metadata = {
  title: partners.metaTitle,
  description: partners.metaDescription,
};

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partner network"
        headline={partners.headline}
        intro={partners.intro}
        tone="dark"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?service=partner">Refer a client</Button>
          <Button href="/pricing" variant="onDark">
            See our rates
          </Button>
        </div>
      </PageHeader>

      <Section eyebrow="Working together" tone="bone">
        <div className="grid gap-px bg-rule sm:grid-cols-2">
          {partners.forPartners.map((item) => (
            <div key={item.heading} className="flex flex-col gap-2 bg-surface p-6">
              <h2 className="text-[1.15rem]">{item.heading}</h2>
              <p className="text-[0.92rem] text-body-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Tracked referrals"
        heading="How to make sure a referral is credited to your firm"
        tone="surface"
      >
        <div className="flex max-w-[68ch] flex-col gap-4">
          <p className="text-body">
            The simplest method is a tracked link. We issue your firm a link
            with a reference on the end, and any enquiry that arrives through it
            is recorded against you automatically:
          </p>
          <p className="overflow-x-auto border border-rule bg-surface-2 px-4 py-3 font-mono text-[0.85rem]">
            /contact?ref=your-firm-name
          </p>
          <p className="text-body">
            Alternatively, ask your client to name your firm in the enquiry, or
            send us their details directly and we will attribute it. Ask us for
            your link and we will set it up.
          </p>
        </div>
      </Section>

      <CtaBand
        headline="Send us a client, or ask us for terms."
        body="Tell us how your practice prefers to work — referral fee, wholesale rate, or bundled into your own engagement — and we will structure it around that."
      />
    </>
  );
}
