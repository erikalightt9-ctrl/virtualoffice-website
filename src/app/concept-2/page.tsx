import type { Metadata } from "next";
import Link from "next/link";
import { formatPeso, publishedAddressTiers } from "@/content/pricing";
import styles from "./concept.module.css";

export const metadata: Metadata = {
  title: "Dragon Orbit — CAPSULE Design Concept 02",
  description: "A futuristic corporate design direction for CAPSULE, your Philippine business gateway.",
  robots: { index: false, follow: false },
};

const audiences = [
  { code: "local", title: "Build here", label: "Philippine founders", text: "A credible Makati base, company formation support, and flexible room to grow." },
  { code: "international", title: "Enter here", label: "International companies", text: "A coordinated route into Philippine registration, compliance, and local operations." },
  { code: "established", title: "Expand here", label: "Established businesses", text: "Workspace, administration, and professional support without another long lease." },
];

const systems = [
  { number: "01", title: "Establish", text: "SEC, BIR, barangay, and Mayor’s Permit registration coordinated with the right Makati address from day one.", tags: ["Formation", "Permits", "Foreign support"] },
  { number: "02", title: "Locate", text: "A registered business presence at 104 Paseo de Roxas, backed by a real 613 sqm staffed facility.", tags: ["Virtual office", "Mail", "Inspections"] },
  { number: "03", title: "Operate", text: "Workstations, private offices, meeting rooms, document handling, and administrative support on demand.", tags: ["Workspace", "Meeting rooms", "Admin"] },
  { number: "04", title: "Scale", text: "Connected accounting, tax, payroll, corporate secretarial, consulting, and referral expertise.", tags: ["Compliance", "Advisory", "Partners"] },
];

function DragonConstellation() {
  return (
    <svg className={styles.dragon} viewBox="0 0 760 760" role="img" aria-label="Abstract dragon constellation orbiting the Capsule mark">
      <defs>
        <linearGradient id="dragonGradient" x1="0" x2="1">
          <stop offset="0" stopColor="#718eb2" /><stop offset="0.52" stopColor="#56d7e8" /><stop offset="1" stopColor="#d6c49a" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="380" cy="380" r="305" className={styles.orbitOuter} />
      <circle cx="380" cy="380" r="226" className={styles.orbitInner} />
      <path className={styles.dragonPath} filter="url(#glow)" d="M126 434 C78 292 174 117 348 93 C455 78 565 121 626 211 L559 190 L603 244 L526 228 C572 286 584 351 558 412 C535 468 485 497 427 491 C475 455 488 407 464 372 C439 336 391 328 355 350 C318 373 303 419 319 459 C338 507 384 544 437 562 C362 586 270 566 216 504 C186 470 165 435 126 434 Z" />
      <path className={styles.wingPath} d="M354 350 L251 212 L375 275 L451 163 L447 315" />
      <path className={styles.tailPath} d="M319 459 C244 513 171 536 110 495 C157 568 250 622 344 613" />
      <circle cx="380" cy="380" r="84" className={styles.coreRing} />
      <rect x="340" y="290" width="80" height="180" rx="40" className={styles.capsuleShape} />
      <text x="380" y="392" textAnchor="middle" className={styles.coreLetter}>C</text>
      <circle cx="126" cy="434" r="6" className={styles.signalNode} /><circle cx="348" cy="93" r="6" className={styles.signalNode} /><circle cx="626" cy="211" r="6" className={styles.signalNode} /><circle cx="437" cy="562" r="6" className={styles.signalNode} />
    </svg>
  );
}

export default function ConceptTwoPage() {
  return (
    <div className={styles.page}>
      <div className={styles.previewBar}><span>CAPSULE / DESIGN STUDY 02</span><Link href="/">Compare with Concept 01 ↗</Link></div>

      <section className={styles.hero}>
        <div className={styles.gridNoise} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <p className={styles.systemLabel}><i /> Your Philippine business gateway</p>
            <h1>Your next market<br />is within <span>reach.</span></h1>
            <p className={styles.heroText}>CAPSULE is the connected business gateway for entering, establishing, and scaling in the Philippines—from one strategic base in Makati.</p>
            <div className={styles.actions}><Link href="/contact" className={styles.primaryAction}>Initiate setup <b>↗</b></Link><Link href="#platform" className={styles.secondaryAction}>Explore the platform <b>↓</b></Link></div>
            <div className={styles.coordinates}><span>5th Floor, 104 Paseo de Roxas</span><span>Legaspi Village, San Lorenzo</span><span>Makati City</span></div>
          </div>
          <div className={styles.heroVisual}><DragonConstellation /><div className={styles.visualReadout}><small>CAPSULE MAKATI</small><strong>Business, established.</strong><span>104 PASEO DE ROXAS</span></div></div>
        </div>
        <div className={styles.dataRail}><div><small>Professional facility</small><strong>613 <em>sqm</em></strong></div><div><small>Meeting spaces</small><strong>6 <em>rooms</em></strong></div><div><small>Reception and administration</small><strong>On <em>site</em></strong></div><div><small>Strategic location</small><strong>Makati <em>CBD</em></strong></div></div>
      </section>

      <section className={styles.audienceSection}>
        <div className={styles.sectionIntro}><p className={styles.sectionCode}>Designed for every ambition</p><h2>Three starting points.<br /><span>One launch platform.</span></h2><p>Whatever stage you’re in, CAPSULE assembles the practical infrastructure for your next move.</p></div>
        <div className={styles.audienceGrid}>{audiences.map((audience) => <article key={audience.code}><div className={styles.cardTop}><span>{audience.label}</span><i /></div><div className={styles.audienceMark} aria-hidden="true">C</div><h3>{audience.title}</h3><p className={styles.cardText}>{audience.text}</p><Link href="/contact">Discuss your requirements <span>↗</span></Link></article>)}</div>
      </section>

      <section className={styles.platformSection} id="platform">
        <div className={styles.platformHeading}><p className={styles.sectionCode}>Integrated business services</p><h2>Everything required<br />to operate <span>in orbit.</span></h2><p>Four connected services. One accountable point of coordination.</p></div>
        <div className={styles.systemList}>{systems.map((system) => <article key={system.number}><span className={styles.systemNumber}>{system.number}</span><div><h3>{system.title}</h3><p>{system.text}</p></div><ul>{system.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><Link href="/services" aria-label={`Explore ${system.title}`}>↗</Link></article>)}</div>
      </section>

      <section className={styles.baseSection}>
        <div className={styles.baseVisual}><div className={styles.tower}><span>05</span><i /><b>CAPSULE</b></div><div className={styles.streetData}>PASEO DE ROXAS<br />MAKATI CENTRAL BUSINESS DISTRICT</div></div>
        <div className={styles.baseCopy}><p className={styles.sectionCode}>A real corporate address</p><h2>A digital-age gateway.<br /><span>Grounded in a real place.</span></h2><p>Behind every CAPSULE address is a working fifth-floor business environment—staffed, inspection-ready, and designed for professional operations.</p><div className={styles.baseFacts}><div><strong>104</strong><span>Paseo de Roxas</span></div><div><strong>613</strong><span>square metres</span></div><div><strong>6</strong><span>bookable rooms</span></div><div><strong>5F</strong><span>staffed facility</span></div></div><Link href="/location" className={styles.primaryAction}>Explore the Makati base <b>↗</b></Link></div>
      </section>

      <section className={styles.pricingSection}>
        <div className={styles.pricingHeading}><div><p className={styles.sectionCode}>Membership and presence</p><h2>Choose the foundation<br />for your business.</h2></div><p>Start with presence. Add registration eligibility, workspace, and operational support as you need them.</p></div>
        <div className={styles.pricingGrid}>{publishedAddressTiers.map((tier) => <article key={tier.id} className={tier.featured ? styles.featuredPrice : ""}><div className={styles.tierLine}><span>{tier.registrationEligible ? "Registered business presence" : "Professional business presence"}</span>{tier.featured && <b>Most selected</b>}</div><h3>{tier.name}</h3><p>{tier.bestFor}</p><div className={styles.priceLine}><strong>{formatPeso(tier.price12)}</strong><span>per month<br />12-month term</span></div><ul>{tier.features.slice(0, 4).map((feature) => <li key={feature}>{feature}</li>)}</ul><Link href={`/contact?service=${tier.id}`}>Request a consultation <span>↗</span></Link></article>)}</div>
        <div className={styles.pricingAssurance}><p><strong>Clear scope.</strong><span>Every engagement begins with documented inclusions and eligibility.</span></p><p><strong>Professional guidance.</strong><span>Our team will recommend the appropriate package for your setup.</span></p><Link href="/pricing">View complete pricing and terms ↗</Link></div>
      </section>

      <section className={styles.ecosystemSection}><div className={styles.ecosystemCopy}><p className={styles.sectionCode}>The GDS Capital ecosystem</p><h2>One constellation.<br /><span>Multiple capabilities.</span></h2><p>Managed by Philippine Dragon Media Network Corp. under GDS Capital Inc., CAPSULE connects physical infrastructure with business consulting, professional partners, and emerging AI capabilities.</p><Link href="/about">Explore the network ↗</Link></div><div className={styles.ecosystemMap} aria-label="GDS Capital business ecosystem"><div className={styles.ecoCore}>GDS<br /><span>CAPITAL</span></div><div className={styles.ecoNodeOne}>CAPSULE</div><div className={styles.ecoNodeTwo}>STARLIGHT</div><div className={styles.ecoNodeThree}>DRAGONAI</div><i /><i /><i /></div></section>

      <section className={styles.finalCta}><div><p className={styles.systemLabel}><i /> Begin your Philippine expansion</p><h2>Make the Philippines<br /><span>your next orbit.</span></h2><p>Start with a conversation. We’ll map the address, registration, workspace, and support your business actually needs.</p><Link href="/contact" className={styles.primaryAction}>Start with CAPSULE <b>↗</b></Link></div></section>
    </div>
  );
}
