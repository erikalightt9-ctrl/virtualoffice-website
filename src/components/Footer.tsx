import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import Container from "./Container";
import { footerNav, site } from "@/content/site";

/**
 * Official brand artwork for the messaging apps, if it has been supplied.
 *
 * Viber and WhatsApp marks are third-party trademarks. Both owners publish
 * brand kits and both require the mark be used as issued — not redrawn, not
 * recoloured, not reproportioned. So nothing here approximates them: if the
 * official file is present it is used, and if it is not, a plain generic glyph
 * stands in its place.
 *
 * To use the real marks, drop the files supplied by each brand into
 * public/brand-icons/ as viber.svg (or .png) and whatsapp.svg (or .png).
 * They are picked up on the next build with no code change.
 */
function officialIcon(name: "viber" | "whatsapp"): string | null {
  for (const ext of ["svg", "png", "webp"]) {
    const rel = `brand-icons/${name}.${ext}`;
    if (existsSync(join(process.cwd(), "public", rel))) return `/${rel}`;
  }
  return null;
}

/* Generic stand-ins, drawn here rather than imitating either brand: a handset
   for the call-and-message app, a speech bubble for the chat app. */
function HandsetGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1Z" />
    </svg>
  );
}

/* Contact glyphs. Simple original shapes — a pin, a handset, an envelope —
   sized to sit on the first line of the text they label. */
function PinGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className="contact-icon contact-pin"
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className="contact-icon contact-phone"
    >
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1Z" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className="contact-icon contact-mail"
    >
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8.1 8-5.1H4Z" />
    </svg>
  );
}

function BubbleGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 3C6.9 3 2.8 6.5 2.8 10.8c0 2.4 1.3 4.6 3.4 6L5 21l4.6-2a11 11 0 0 0 2.4.26c5.1 0 9.2-3.5 9.2-7.8S17.1 3 12 3Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  /* Resolved at build time: this is a server component and the site is a
     static export, so the filesystem check costs nothing at runtime. */
  const viberIcon = officialIcon("viber");
  const whatsappIcon = officialIcon("whatsapp");

  return (
    <footer className="footer-glass text-on-dark">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div className="flex flex-col gap-5">
            <BrandLogo inverse height={78} />
            <p className="max-w-[26ch] text-[0.82rem] uppercase tracking-[0.08em] text-on-dark-soft">{site.tagline}</p>
            <address className="contact-row not-italic text-[0.92rem] leading-relaxed text-on-dark-soft">
              <PinGlyph />
              <span>
                {site.address.floor}, {site.address.building}
                <br />
                {site.address.line1}
                <br />
                {site.address.village}
                <br />
                {site.address.barangay}
                <br />
                {site.address.city} {site.address.postcode}
                <br />
                {site.address.country}
              </span>
            </address>
            <div className="flex flex-col gap-1 text-[0.92rem]">
              {/* The glyph sits inside the link so it animates on hover with
                  the text, and is aria-hidden so the row still announces as
                  just the number. */}
              <a
                href={site.contact.landlineHref}
                className="contact-row -mx-1 rounded px-1 py-1.5 text-on-dark-soft transition-colors hover:text-on-dark"
              >
                <PhoneGlyph />
                <span>{site.contact.landline}</span>
              </a>
              <a
                href={site.contact.emailHref}
                className="contact-row -mx-1 rounded px-1 py-1.5 text-on-dark-soft transition-colors hover:text-on-dark"
              >
                <MailGlyph />
                <span>{site.contact.email}</span>
              </a>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={site.contact.viberHref}
                className="gold-fill inline-flex min-h-11 items-center gap-2 px-4 py-2 text-[0.72rem] uppercase tracking-[0.09em]"
              >
                {viberIcon ? (
                  <Image src={viberIcon} alt="" width={16} height={16} aria-hidden="true" />
                ) : (
                  <HandsetGlyph />
                )}
                Viber
              </a>
              <a
                href={site.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-fill inline-flex min-h-11 items-center gap-2 px-4 py-2 text-[0.72rem] uppercase tracking-[0.09em]"
              >
                {whatsappIcon ? (
                  <Image src={whatsappIcon} alt="" width={16} height={16} aria-hidden="true" />
                ) : (
                  <BubbleGlyph />
                )}
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.heading} className="flex flex-col gap-3">
                <h2 className="label text-on-dark-soft">{group.heading}</h2>
                <ul className="flex flex-col gap-0.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="-mx-1 inline-block rounded px-1 py-1.5 text-[0.88rem] text-on-dark-soft transition-colors hover:text-on-dark"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-rule-dark pt-6 text-[0.82rem] text-on-dark-soft">
          <p className="max-w-3xl">
            {site.operator.relationship}
            {site.operator.secRegistrationNo !== "TODO" ? (
              <> SEC registration no. {site.operator.secRegistrationNo}.</>
            ) : null}
          </p>
          {/* The operator is already named in the line above, from
              site.operator.relationship. Repeating it here read as a stutter. */}
          <p className="max-w-3xl">
            Virtual office services do not include private offices or dedicated workspaces for regular occupancy.
          </p>
          <p>
            © {year} {site.operator.name} All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
