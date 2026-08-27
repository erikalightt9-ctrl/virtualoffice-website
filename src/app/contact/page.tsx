import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/Container";
import InquiryForm from "@/components/InquiryForm";
import PageHeader from "@/components/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description:
    "Enquire about a virtual office, workspace or meeting room at 104 Paseo de Roxas, Legaspi Village, Makati. Viber, WhatsApp or phone.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        headline="Tell us what you need. We will tell you if we can do it."
        intro="Three fields and one question is all we need to start. If you would rather talk, message us on Viber or WhatsApp — for most enquiries that is faster."
      />

      <section className="border-b border-rule bg-bone">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_0.8fr] sm:py-18">
          <div className="flex flex-col gap-6">
            <h2 className="text-[1.4rem]">Send an enquiry</h2>
            <Suspense
              fallback={
                <p className="text-body-soft">Loading the enquiry form…</p>
              }
            >
              <InquiryForm />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 border border-rule bg-surface p-6">
              <h2 className="label text-clay">Faster: message us</h2>
              <a
                href={site.contact.viberHref}
                className="border border-clay bg-clay px-4 py-3 text-center text-[0.8rem] font-semibold uppercase tracking-[0.09em] text-white transition-colors hover:bg-clay-dark"
              >
                Chat on Viber
              </a>
              <a
                href={site.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-rule-strong px-4 py-3 text-center text-[0.8rem] font-semibold uppercase tracking-[0.09em] text-ink transition-colors hover:border-ink"
              >
                Chat on WhatsApp
              </a>
              <p className="text-[0.85rem] text-body-faint">
                Messages are answered during business hours.
              </p>
            </div>

            <div className="flex flex-col gap-3 border border-rule bg-surface p-6">
              <h2 className="label text-body-faint">Or reach us directly</h2>
              <dl className="flex flex-col gap-3 text-[0.92rem]">
                <div>
                  <dt className="text-body-faint">Telephone</dt>
                  <dd>
                    <a href={site.contact.landlineHref} className="text-clay">
                      {site.contact.landline}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-body-faint">Email</dt>
                  <dd>
                    <a href={site.contact.emailHref} className="text-clay">
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-body-faint">Office</dt>
                  <dd className="text-body-soft">
                    {site.address.floor}, {site.address.line1}
                    <br />
                    {site.address.village}, {site.address.barangay}
                    <br />
                    {site.address.city} {site.address.postcode}
                  </dd>
                </div>
                <div>
                  <dt className="text-body-faint">Hours</dt>
                  <dd className="text-body-soft">
                    {site.hours.weekdays}
                    <br />
                    {site.hours.saturday}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border-l-2 border-clay bg-clay-wash px-4 py-3">
              <p className="text-[0.85rem] text-body-soft">
                Referred by an accountant or lawyer? Mention their firm in your
                enquiry so we can credit the introduction.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
