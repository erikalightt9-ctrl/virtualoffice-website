import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/Container";
import InquiryForm from "@/components/InquiryForm";
import PageHeader from "@/components/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Inquiries",
  description:
    "Inquire about Virtual Office Basic, Corporate or VIP at 104 Paseo de Roxas, Legaspi Village, Makati. Viber, WhatsApp or phone.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        headline="Discuss your business requirements."
        intro="Tell us your business activity, registration stage and whether you need a correspondence address, registered business address or physical facilities. Include any government application, inspection or warehouse/storage requirements. You can also contact us on Viber or WhatsApp."
      />

      <section className="border-b border-rule bg-bone">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_0.8fr] sm:py-18">
          <div className="flex flex-col gap-6">
            <h2 className="text-[1.4rem]">Send an inquiry</h2>
            <Suspense
              fallback={
                <p className="text-body-soft">Loading the inquiry form…</p>
              }
            >
              <InquiryForm />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 border border-rule glass-cell p-6">
              <h2 className="label text-accent-readable">Message our team</h2>
              <a
                href={site.contact.viberHref}
                className="accent-fill border px-4 py-3 text-center text-[0.8rem] font-semibold uppercase tracking-[0.09em] transition-colors"
              >
                Chat on Viber
              </a>
              <a
                href={site.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-rule-strong px-4 py-3 text-center text-[0.8rem] font-semibold uppercase tracking-[0.09em] text-body transition-colors hover:border-oak-light"
              >
                Chat on WhatsApp
              </a>
              {/* The number itself, in text. The buttons above carry it only
                  inside their hrefs, which is no use to someone without Viber
                  Desktop installed or anyone wanting to copy it or dial it. */}
              <p className="text-center text-[0.85rem] text-body-soft">
                Mobile, Viber and WhatsApp{" "}
                <a
                  href={site.contact.mobileHref}
                  className="tnum whitespace-nowrap text-accent-readable"
                >
                  {site.contact.mobile}
                </a>
              </p>
              <p className="text-[0.85rem] text-body-faint">
                Messages are answered during business hours.
              </p>
            </div>

            <div className="flex flex-col gap-3 border border-rule glass-cell p-6">
              <h2 className="label text-body-faint">Or reach us directly</h2>
              <dl className="flex flex-col gap-3 text-[0.92rem]">
                <div>
                  <dt className="text-body-faint">Telephone</dt>
                  <dd>
                    <a href={site.contact.landlineHref} className="text-accent-readable">
                      {site.contact.landline}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-body-faint">Email</dt>
                  <dd>
                    <a href={site.contact.emailHref} className="text-accent-readable">
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-body-faint">Office</dt>
                  <dd className="text-body-soft">
                    {site.address.floor}, {site.address.building}
                    <br />
                    {site.address.line1}, {site.address.village}
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
          </aside>
        </Container>
      </section>
    </>
  );
}
