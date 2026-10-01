import { WORKSPACE_SCOPE } from "@/content/scope";
import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { location } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: location.metaTitle,
  description: location.metaDescription,
};

export default function LocationPage() {
  // Salustiana D. Ty Tower footprint: OpenStreetMap way 35677014.
  const mapPosition = "14.55485,121.02029";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapPosition}`;

  return (
    <>
      <PageHeader
        eyebrow="Our Makati address"
        headline={site.address.line1}
        intro={`${site.address.floor}, ${site.address.building} · ${site.address.village}, ${site.address.city}`}
      />

      <Section eyebrow="The address">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <address className="flex flex-col gap-4 border border-gold/40 border-l-4 border-l-gold glass-cell p-6 not-italic sm:p-8">
              <span className="label text-gold">Visit us at</span>
              <span className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-gold">
                {site.address.line1}
              </span>
              <span className="font-display text-[1.1rem] font-semibold text-body">
                {site.address.floor}, {site.address.building}
              </span>
              <span className="text-[1rem] text-body-soft">
                {site.address.village}, {site.address.barangay}
                <br />
                {site.address.city} {site.address.postcode}
                <br />
                {site.address.region}, {site.address.country}
              </span>
            </address>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="accent-fill inline-flex min-h-12 items-center justify-center gap-3 border px-6 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Get directions in Google Maps <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <div className="flex flex-col gap-1 border-t border-rule pt-4 text-[0.92rem]">
              <p className="text-body-soft">{site.hours.weekdays}</p>
              <p className="text-body-soft">{site.hours.saturday}</p>
              <p className="mt-1 text-body-faint">{site.hours.note}</p>
            </div>
            <div className="flex flex-col gap-1 border-t border-rule pt-4 text-[0.92rem]">
              <a href={site.contact.landlineHref} className="text-accent-readable">
                {site.contact.landline}
              </a>
              <a href={site.contact.emailHref} className="text-accent-readable">
                {site.contact.email}
              </a>
            </div>
          </div>

          <figure className="flex min-w-0 flex-col overflow-hidden border border-gold/40 glass-cell">
            <div className="flex flex-1 flex-col justify-center bg-[#FDFBF7]">
              <Image
                src="/location-map.svg"
                alt="Street map with a red pin marking Salustiana D. Ty Tower at 104 Paseo de Roxas, Makati City. North is up."
                width={800}
                height={660}
                unoptimized
                loading="eager"
                className="block h-auto w-full"
              />
              <p className="mt-auto px-3 py-2 text-right font-sans text-xs text-[#8A3520]">
                Map data © <a className="underline" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>
              </p>
            </div>
            <figcaption className="order-first flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-4">
              <div>
                <p className="font-display text-[0.95rem] font-semibold text-gold">
                  {site.address.building}
                </p>
                <p className="mt-1 text-[0.85rem] text-body-soft">
                  {site.address.floor} · {site.address.line1}
                </p>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-gold/60 px-4 py-2 text-[0.85rem] font-semibold text-gold hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                Get directions <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section
        eyebrow="Facilities"
        heading="Facilities for agreed compliance purposes"
        intro={WORKSPACE_SCOPE}
      >
        <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {location.facilities.map((f) => (
            <div key={f.name} className="flex flex-col gap-1.5 glass-cell p-5">
              <h3 className="text-[1rem]">{f.name}</h3>
              <p className="text-[0.87rem] text-body-soft">{f.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Getting here" heading="Finding the office">
        <div className="grid gap-6 sm:grid-cols-3">
          {location.gettingHere.map((item) => (
            <div key={item.heading} className="flex flex-col gap-2">
              <h3 className="text-[1.05rem]">{item.heading}</h3>
              <p className="text-[0.91rem] text-body-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        headline="Arrange a visit"
        body="Contact us to confirm a suitable time and any access arrangements before visiting."
      />
    </>
  );
}
