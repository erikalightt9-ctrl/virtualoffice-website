import Link from "next/link";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { featuredFaqs } from "@/content/faqs";
import { formatPeso, publishedAddressTiers } from "@/content/pricing";

const gatewayStages = [
  { number: "01", title: "Enter", text: "Understand the Philippine market, choose the right entity, and plan your local setup with experienced support.", services: ["Foreign client support", "Business consulting"] },
  { number: "02", title: "Establish", text: "Put the legal and physical foundations in place—from SEC incorporation to a credible Makati address.", services: ["SEC, BIR & LGU", "Registered address"] },
  { number: "03", title: "Operate", text: "Run day-to-day business with workspace, meeting rooms, mail handling, and hands-on administrative support.", services: ["Flexible workspace", "Admin support"] },
  { number: "04", title: "Grow", text: "Expand with a connected network of accounting, payroll, corporate, and professional service partners.", services: ["Compliance partners", "Referral network"] },
];

const serviceGroups = [
  { code: "A", title: "Business Presence", text: "A prestigious Makati address backed by a real, staffed corporate environment—not a mailbox.", links: [["Virtual office", "/services/virtual-office"], ["Registered address", "/services/registered-business-address"], ["Mail & documents", "/services/mail-handling"]] },
  { code: "B", title: "Company Formation", text: "One coordinated path through the registrations and permits required to establish in the Philippines.", links: [["Company registration", "/services/company-registration"], ["Foreign companies", "/foreign-companies"], ["How it works", "/how-it-works"]] },
  { code: "C", title: "Workspace", text: "Professional rooms and workstations ready for focused work, client meetings, and on-site inspections.", links: [["Desks & offices", "/workspace"], ["Meeting rooms", "/meeting-rooms"], ["Visit the facility", "/location"]] },
  { code: "D", title: "Business Support", text: "Practical administrative and professional support that grows with your local operation.", links: [["Accounting & tax", "/services/accounting-and-tax"], ["Payroll & HR", "/services/payroll-and-hr"], ["Corporate secretarial", "/services/corporate-secretarial"]] },
] as const;

export default function HomePage() {
  return <>
    <section className="hero-shell">
      <div className="star-field" aria-hidden="true" />
      <Container className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow-light"><span /> Your Philippine business gateway</p>
          <h1>Launch in the Philippines.<br /><em>Land in Makati.</em></h1>
          <p className="hero-intro">CAPSULE brings your business address, company setup, workspace, and local support into one professionally managed base at 104 Paseo de Roxas.</p>
          <div className="hero-actions"><Link href="/contact" className="button-solar">Plan your setup <span>↗</span></Link><Link href="/services" className="button-ghost">Explore services <span>→</span></Link></div>
          <p className="hero-note">For Philippine founders, regional teams, and international companies.</p>
        </div>
        <div className="orbital-visual" aria-label="Capsule at the center of an integrated Philippine business network">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <div className="orbit-dot dot-one" /><div className="orbit-dot dot-two" /><div className="orbit-dot dot-three" />
          <div className="capsule-core"><span className="core-mark">C</span><span className="core-label">Makati<br />Base</span></div>
          <span className="orbit-label label-north">Company setup</span><span className="orbit-label label-east">Workspace</span><span className="orbit-label label-south">Business support</span>
        </div>
      </Container>
      <Container className="hero-proof">
        <div><strong>104</strong><span>Paseo de Roxas<br />Makati CBD</span></div><div><strong>613</strong><span>sqm professional<br />facility</span></div><div><strong>6</strong><span>meeting &amp;<br />conference rooms</span></div><div><strong>On-site</strong><span>reception &amp;<br />admin team</span></div>
      </Container>
    </section>

    <section className="gateway-section"><Container>
      <div className="section-heading split-heading"><div><p className="eyebrow-dark">The Capsule advantage</p><h2>More than an address.<br />A route into the market.</h2></div><p>CAPSULE connects the essential steps of building a Philippine presence, so each stage supports the next and nothing important falls between providers.</p></div>
      <div className="gateway-grid">{gatewayStages.map((stage) => <article className="gateway-card" key={stage.number}><span className="stage-number">{stage.number}</span><div className="stage-orbit" aria-hidden="true"><i /></div><h3>{stage.title}</h3><p>{stage.text}</p><ul>{stage.services.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
    </Container></section>

    <section className="services-section"><Container>
      <div className="section-heading split-heading light-heading"><div><p className="eyebrow-light"><span /> Integrated services</p><h2>One base. Every essential.</h2></div><Link href="/services" className="text-link-light">View all services <span>→</span></Link></div>
      <div className="service-grid">{serviceGroups.map((group) => <article className="service-card" key={group.code}><span className="service-code">{group.code}</span><h3>{group.title}</h3><p>{group.text}</p><ul>{group.links.map(([label, href]) => <li key={href}><Link href={href}>{label}<span>↗</span></Link></li>)}</ul></article>)}</div>
    </Container></section>

    <section className="location-feature"><Container className="location-grid">
      <div className="location-art" aria-label="Abstract architectural representation of the Capsule facility at 104 Paseo de Roxas"><div className="building-lines" /><div className="location-stamp"><small>Your base in</small><strong>Makati</strong><span>14.5547° N · 121.0244° E</span></div></div>
      <div className="location-copy"><p className="eyebrow-dark">A real place behind your presence</p><h2>Built for business,<br />not just registration.</h2><p>Set in the heart of the Makati CBD, our 613 sqm fifth-floor facility gives your company the professional environment clients, teams, and regulators expect.</p><ul className="feature-list"><li><span>01</span>Staffed reception during business hours</li><li><span>02</span>Workstations, team space, and private offices</li><li><span>03</span>Six bookable rooms for meetings and conferences</li><li><span>04</span>Inspection-ready premises and document handling</li></ul><Button href="/location" variant="outline">Explore 104 Paseo de Roxas</Button></div>
    </Container></section>

    <section className="pricing-preview"><Container>
      <div className="section-heading split-heading"><div><p className="eyebrow-dark">A base for every stage</p><h2>Start with what you need.<br />Expand when you’re ready.</h2></div><p>Clear recurring packages with workspace and professional services available as your Philippine operation develops.</p></div>
      <div className="pricing-grid">{publishedAddressTiers.map((tier) => <article className={`price-card${tier.featured ? " featured" : ""}`} key={tier.id}>{tier.featured && <span className="recommended">Most selected</span>}<p className="price-kicker">{tier.registrationEligible ? "Registration eligible" : "Business presence"}</p><h3>{tier.name}</h3><div className="price"><strong>{formatPeso(tier.price12)}</strong><span>/ month<br />12-month term</span></div><p>{tier.bestFor}</p><ul>{tier.features.slice(0, 4).map((feature) => <li key={feature}>{feature}</li>)}</ul><Link href={`/contact?service=${tier.id}`} className={tier.featured ? "button-solar" : "price-link"}>Choose {tier.name}<span>→</span></Link></article>)}</div>
      <p className="pricing-disclaimer">Indicative rates. Eligibility, documentary requirements, and final scope apply. <Link href="/pricing">See complete pricing and terms →</Link></p>
    </Container></section>

    <section className="network-section"><Container className="network-grid">
      <div><p className="eyebrow-light"><span /> Part of a wider constellation</p><h2>Local presence.<br />Connected expertise.</h2></div>
      <div className="network-copy"><p>CAPSULE is managed by Philippine Dragon Media Network Corp. under GDS Capital Inc., connecting clients to a broader ecosystem that includes Starlight Business Consulting Services, DragonAI, and a trusted professional partner network.</p><Link href="/about" className="text-link-light">Discover our network <span>→</span></Link></div>
      <div className="constellation" aria-hidden="true"><span className="node node-main">CAPSULE</span><span className="node node-a">GDS</span><span className="node node-b">Starlight</span><span className="node node-c">DragonAI</span><i className="line line-a"/><i className="line line-b"/><i className="line line-c"/></div>
    </Container></section>

    <section className="faq-preview"><Container className="faq-grid"><div><p className="eyebrow-dark">Before you launch</p><h2>Common questions,<br />clear answers.</h2><Link href="/faq" className="text-link-dark">View all FAQs →</Link></div><div className="faq-list-home">{featuredFaqs.slice(0, 4).map((faq, index) => <details key={faq.q} open={index === 0}><summary>{faq.q}<span>+</span></summary><p>{faq.a.join(" ")}</p></details>)}</div></Container></section>

    <section className="final-cta"><div className="cta-orbit" aria-hidden="true" /><Container className="cta-inner"><p className="eyebrow-light"><span /> Your next move starts here</p><h2>Ready to establish your<br /><em>Philippine presence?</em></h2><p>Tell us where your business is today. We’ll help map the most practical route forward.</p><Link href="/contact" className="button-solar">Start a conversation <span>↗</span></Link></Container></section>
  </>;
}
