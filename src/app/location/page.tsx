import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import Section from "@/components/Section";
import { location } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: location.metaTitle,
  description: location.metaDescription,
};

export default function LocationPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    site.address.mapQuery,
  )}&output=embed`;

  return (
    <>
      <PageHeader
        eyebrow="Location"
        headline={location.headline}
        intro={location.intro}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?service=workspace">Book a visit</Button>
          <Button href="/workspace/day-pass" variant="outline">
            Take a day pass
          </Button>
        </div>
      </PageHeader>

      <Section eyebrow="The address" tone="bone">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <address className="not-italic">
              <span className="font-display text-[1.3rem] font-semibold text-ink">
                {site.address.floor}
              </span>
              <br />
              <span className="font-display text-[1.3rem] font-semibold text-ink">
                {site.address.line1}
              </span>
              <br />
              <span className="text-body-soft">
                {site.address.village}, {site.address.barangay}
                <br />
                {site.address.city} {site.address.postcode}
                <br />
                {site.address.region}, {site.address.country}
              </span>
            </address>
            <div className="flex flex-col gap-1 border-t border-rule pt-4 text-[0.92rem]">
              <p className="text-body-soft">{site.hours.weekdays}</p>
              <p className="text-body-soft">{site.hours.saturday}</p>
              <p className="mt-1 text-body-faint">{site.hours.note}</p>
            </div>
            <div className="flex flex-col gap-1 border-t border-rule pt-4 text-[0.92rem]">
              <a href={site.contact.landlineHref} className="text-clay">
                {site.contact.landline}
              </a>
              <a href={site.contact.emailHref} className="text-clay">
                {site.contact.email}
              </a>
            </div>
          </div>

          <div className="border border-rule bg-surface-2">
            <iframe
              title="Map showing 104 Paseo de Roxas, Legaspi Village, San Lorenzo, Makati City"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[340px] w-full lg:h-full lg:min-h-[380px]"
            />
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Facilities"
        heading="What is on the floor"
        intro="All on the 5th floor of 104 Paseo de Roxas."
        tone="surface"
      >
        <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {location.facilities.map((f) => (
            <div key={f.name} className="flex flex-col gap-1.5 bg-surface p-5">
              <h3 className="text-[1rem]">{f.name}</h3>
              <p className="text-[0.87rem] text-body-soft">{f.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Gallery" heading="The office itself" tone="bone">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {location.photoCaptions.map((photo) => (
            <Photo
              key={photo.file}
              file={photo.file}
              alt={photo.caption}
              caption={photo.caption}
            />
          ))}
        </div>
      </Section>

      <Section eyebrow="Getting here" heading="Finding the office" tone="surface">
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
        headline="Come and look at it."
        body="Book a visit and we will send precise directions, tell you where to park, and have someone meet you on the 5th floor."
      />
    </>
  );
}
