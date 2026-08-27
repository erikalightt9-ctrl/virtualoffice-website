import Link from "next/link";
import Container from "./Container";
import { footerNav, site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule-dark bg-ink text-on-dark">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div className="flex flex-col gap-5">
            <span className="flex items-center gap-3 font-display text-[1.25rem] font-semibold tracking-[0.2em]"><span className="grid h-9 w-6 place-items-center rounded-full border border-clay text-[0.65rem] text-clay">TG</span>{site.wordmark}</span>
            <p className="max-w-[26ch] text-[0.82rem] uppercase tracking-[0.08em] text-on-dark-soft">{site.tagline}</p>
            <address className="not-italic text-[0.92rem] leading-relaxed text-on-dark-soft">
              {site.address.floor}
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
            </address>
            <div className="flex flex-col gap-1 text-[0.92rem]">
              <a
                href={site.contact.landlineHref}
                className="text-on-dark-soft transition-colors hover:text-on-dark"
              >
                {site.contact.landline}
              </a>
              <a
                href={site.contact.emailHref}
                className="text-on-dark-soft transition-colors hover:text-on-dark"
              >
                {site.contact.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={site.contact.viberHref}
                className="border border-rule-dark px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.09em] transition-colors hover:border-on-dark"
              >
                Viber
              </a>
              <a
                href={site.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-rule-dark px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.09em] transition-colors hover:border-on-dark"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.heading} className="flex flex-col gap-3">
                <h2 className="label text-on-dark-soft">{group.heading}</h2>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.88rem] text-on-dark-soft transition-colors hover:text-on-dark"
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
          <p className="max-w-3xl">
            The Grounds is a virtual-office service. Address services are provided
            subject to package eligibility, documentary requirements, our
            acceptable use policy, building rules and applicable regulations.
            The Grounds does not provide, coordinate or advise on company
            registration, government filings, business permits, bookkeeping,
            accounting, tax, payroll or corporate secretarial services.
          </p>
          <p>
            © {year} {site.operator.name} All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
