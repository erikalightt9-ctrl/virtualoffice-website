import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatPeso, publishedAddressTiers } from "@/content/pricing";
import { site } from "@/content/site";
import styles from "./home.module.css";

// The homepage title comes from the root layout's template default, so it is
// not repeated here. Indexing is governed centrally by
// NEXT_PUBLIC_ALLOW_INDEXING in src/app/robots.ts and the root layout.
export const metadata: Metadata = {
  description: site.description,
};

const services = [
  { number: "01", title: "Virtual Office", text: "Build credibility with a professional Makati business address and a real team behind it.", href: "/services/virtual-office" },
  { number: "02", title: "Registered Address", text: "Explore address-use options for an existing or newly formed business, subject to package eligibility and review.", href: "/services/registered-business-address" },
  { number: "03", title: "Workspace", text: "Workstations, team spaces, and private offices available when your business needs them.", href: "/workspace" },
  { number: "04", title: "Meeting Rooms", text: "Professional rooms for client meetings, interviews, presentations, and focused work.", href: "/meeting-rooms" },
  { number: "05", title: "Mail & Administration", text: "Reliable mail handling, document coordination, and on-site administrative support.", href: "/services/mail-handling" },
  { number: "06", title: "Day Office Access", text: "Use a professional place to work or meet without committing to a traditional office lease.", href: "/workspace/day-pass" },
];

const steps = [
  ["Tell us what you need", "Share your business activity and the kind of presence you are after."],
  ["Choose your package", "We confirm which address, workspace and room allocation fits, and whether the registered-address option is available to you."],
  ["Complete verification", "Submit the required company and identification documents for review."],
  ["Start using the address", "Your address goes live and our on-site team begins handling your mail."],
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Premium virtual office solutions in Makati</p>
            <h1>A professional space<br />for business <em>without boundaries.</em></h1>
            <p>A professional business address at 104 Paseo de Roxas, with a staffed reception, mail handled by our own team, meeting rooms and workspace on the same floor.</p>
            <div className={styles.actions}><Link href="/contact" className={styles.primary}>Find your solution <span>↗</span></Link><Link href="/pricing" className={styles.secondary}>View packages <span>→</span></Link></div>
            <div className={styles.heroTrust}><span>Professional Makati address</span><span>Staffed reception</span><span>Flexible workspace access</span></div>
          </div>
          <div className={styles.officeVisual}>
            <Image src="/photos/reception.jpg" fill priority sizes="(max-width: 1000px) 100vw, 50vw" alt="The reception at The Grounds, with the Philippine Dragon Media Network signage behind the desk" />
            <div className={styles.officePanel}><small>YOUR BUSINESS PRESENCE</small><strong>104 Paseo de Roxas</strong><span>Legaspi Village · Makati City</span></div><div className={styles.groundMotif} aria-hidden="true"><i /><b /></div>
          </div>
        </div>
        <div className={styles.factBar}><div><strong>Makati CBD</strong><span>professional business address</span></div><div><strong>6 rooms</strong><span>meetings &amp; conferences</span></div><div><strong>5th floor</strong><span>104 Paseo de Roxas</span></div><div><strong>On-site team</strong><span>reception &amp; administration</span></div></div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.introTitle}><p className={styles.eyebrow}>What the virtual office includes</p><h2>More than a business address.</h2></div>
        <div className={styles.introCopy}><p>THE GROUNDS gives businesses the professional infrastructure of an established office without the cost and restriction of maintaining a traditional workplace.</p><p>Use a professional address. Receive business mail. Meet clients. Work on site when needed. Expand into a more complete workspace as your business grows.</p></div>
      </section>

      <section className={styles.officeGallery}>
        <div className={styles.galleryLead}><Image src="/photos/lounge.jpg" fill sizes="(max-width: 900px) 100vw, 56vw" alt="The lounge at The Grounds, with warm wood, greenery and comfortable seating" /><span>Welcome lounge</span></div>
        <div className={styles.galleryStack}><div><Image src="/photos/workspace.jpg" fill sizes="(max-width: 900px) 100vw, 44vw" alt="Serviced workspace at The Grounds, with ergonomic chairs and glass partitions" /><span>Serviced workspace</span></div><div><Image src="/photos/pantry.jpg" fill sizes="(max-width: 900px) 100vw, 44vw" alt="The communal pantry and tea room at The Grounds" /><span>Community space</span></div></div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Solutions for modern business</p><h2>Everything your professional presence needs.</h2></div><Link href="/services">Explore all services ↗</Link></div>
        <div className={styles.serviceGrid}>{services.map((service) => <article key={service.number}><span>{service.number}</span><div className={styles.serviceIcon} aria-hidden="true"><i /><b /></div><h3>{service.title}</h3><p>{service.text}</p><Link href={service.href} aria-label={`Learn about ${service.title}`}>Learn more <span>→</span></Link></article>)}</div>
      </section>

      <section className={styles.locationSection}>
        <div className={styles.locationVisual}><Image src="/photos/meeting-room.jpg" fill sizes="(max-width: 1000px) 100vw, 53vw" alt="A meeting room at The Grounds, with its oak-slat ceiling" /><div className={styles.locationBadge}><small>Makati CBD</small><strong>A real place<br />behind your presence.</strong></div></div>
        <div className={styles.locationCopy}><p className={styles.eyebrow}>A real office behind your address</p><h2>Professional presence starts with a professional place.</h2><p>Our fifth-floor office at 104 Paseo de Roxas gives your virtual office a credible physical base, with staffed reception, organized mail handling, flexible workstations and professional meeting rooms.</p><ul><li><span>01</span>Established Makati CBD address</li><li><span>02</span>Reception staffed every business day</li><li><span>03</span>Flexible workstations and private spaces</li><li><span>04</span>Six bookable meeting and conference rooms</li></ul><Link href="/location" className={styles.textLink}>Explore the location ↗</Link></div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.processIntro}><p className={styles.eyebrow}>Simple to establish</p><h2>Your business presence,<br />set up properly.</h2><p>Our team keeps the process clear from your first enquiry through activation.</p></div>
        <ol>{steps.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </section>

      <section className={styles.pricingSection}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Clear virtual office packages</p><h2>Choose the presence your business requires.</h2></div><p>Start with a professional address, add the registered-address option, or take a fuller presence with more room hours and workspace days.</p></div>
        <div className={styles.pricingGrid}>{publishedAddressTiers.map((tier) => <article key={tier.id} className={tier.featured ? styles.featured : ""}>{tier.featured && <span className={styles.recommended}>Most selected</span>}<p className={styles.packageType}>{tier.registrationEligible ? "Registered address available" : "Business correspondence"}</p><h3>{tier.name}</h3><div className={styles.price}><strong>{formatPeso(tier.price12)}</strong><span>per month<br />12-month term</span></div><p className={styles.bestFor}>{tier.bestFor}</p><ul>{tier.features.slice(0, 5).map((feature) => <li key={feature}>{feature}</li>)}</ul><Link href={`/contact?service=${tier.id}`}>Request a consultation <span>→</span></Link></article>)}</div>
        <div className={styles.priceFooter}><span>Indicative rates. Final scope and eligibility are confirmed in writing.</span><Link href="/pricing">Compare complete pricing and terms ↗</Link></div>
      </section>

      <section className={styles.supportSection}>
        <div className={styles.supportMark}>
          <Image src="/the-grounds-mark.svg" width={260} height={228} alt="" aria-hidden="true" />
        </div>
        <div><p className={styles.eyebrow}>The company behind The Grounds</p><h2>Professionally managed in Makati.</h2><p>The Grounds is a virtual-office service operated by Philippine Dragon Media Network Corp. Our on-site team manages the business address, reception, mail handling, meeting-room access and day-to-day client support.</p><Link href="/about" className={styles.textLink}>About The Grounds ↗</Link></div>
      </section>

      <section className={styles.finalCta}>
        <Image src="/the-grounds-logo-inverse.svg" width={462} height={105} alt="The Grounds — a destination for business, ideas and connection" />
        <h2>Give your business<br />the space to move forward.</h2><p>Tell us what you are building. We’ll help create the right professional presence around it.</p><Link href="/contact" className={styles.primary}>Speak with our team <span>↗</span></Link>
      </section>
    </div>
  );
}
