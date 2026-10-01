"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./OfficePresentation.module.css";

const scenes = [
  { label: "Welcome to PDMN", title: "Your business.\nA presence that matters.", body: "A professional business address in the heart of Makati. A confident first impression, wherever you work.", image: "/photos/hero-primary.png", alt: "PDMN reception with a marble counter, natural wood finishes and company signage", detail: "104 Paseo de Roxas · Makati City", position: "65% center" },
  { label: "What is a virtual office?", title: "An address for business.\nFreedom to work your way.", body: "A professional business address and basic document handling, without maintaining a traditional office.", image: "/photos/office-collection/office-5.jpg", alt: "PDMN lounge with contemporary seating and warm wood finishes", detail: "Business presence, made simple", position: "center" },
  { label: "Professional business address", title: "Put your business\non the Makati map.", body: "Use 104 Paseo de Roxas for permitted business purposes. Choose Corporate if you need a registered business address, subject to applicable requirements and government approval.", image: "/photos/hero-primary.png", alt: "The reception at PDMN's Makati office", detail: "5th Floor · Salustiana D. Ty Tower", position: "75% center" },
  { label: "Business mail & correspondence", title: "A place for your\nbusiness correspondence.", body: "All packages include basic document handling: receipt during business hours, notification and holding for authorized collection, subject to our handling policies.", image: "/photos/office-collection/office-4.jpg", alt: "The entrance and reception area at PDMN", detail: "Receive · Notify · Collect", position: "65% center" },
  { label: "Build credibility", title: "A professional address.\nA confident introduction.", body: "Give clients and business partners a consistent address for your website, business cards and correspondence, subject to your agreement and applicable regulations.", image: "/photos/hero-primary.png", alt: "PDMN company signage behind the reception counter", detail: "A recognizable business presence", position: "75% center" },
  { label: "For startups & entrepreneurs", title: "Big ambitions.\nA practical beginning.", body: "Start with the address support you need. Basic suits freelancers and consultants; Corporate supports businesses needing a registered address, subject to requirements and approval.", image: "/photos/office-collection/office-5.jpg", alt: "Natural light and greenery in the PDMN office lounge", detail: "Choose the package that fits your business", position: "40% center" },
  { label: "For remote businesses & professionals", title: "Work where you need to.\nKeep a Makati presence.", body: "For local businesses and foreign individuals or companies establishing or expanding in the Philippines. Address use depends on your package and applicable requirements.", image: "/photos/office-collection/office-2.jpg", alt: "PDMN office interior with oak ceiling slats and glass partitions", detail: "Your work, wherever it takes you", position: "center" },
  { label: "Your business, professional presence", title: "Your ambition.\nOur Makati address.", body: "PDMN Virtual Office brings together a credible business address, basic document handling and VIP physical-facility support for agreed registration and compliance purposes.", image: "/photos/hero-primary.png", alt: "PDMN's branded reception and wood-paneled interior", detail: "PDMN Virtual Office", position: "70% center" },
  { label: "Why choose PDMN?", title: "The right support.\nClearly defined.", body: "Basic for correspondence. Corporate for a registered business address. VIP for actual physical facilities supporting agreed registration and compliance requirements, subject to availability and government approval.", image: "/photos/office-collection/office-2.jpg", alt: "Physical facilities at the PDMN office", detail: "Basic · Corporate · VIP", position: "70% center" },
  { label: "Your next chapter", title: "Make Makati part\nof your business story.", body: "Tell us about your business and what you need. We’ll help you choose the right virtual office package.", image: "/photos/hero-primary.png", alt: "The welcoming reception at PDMN Virtual Office", detail: "Let’s start with your requirements", position: "65% center" },
];

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

export default function OfficePresentation({ heroImage }: { heroImage: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);

  const [inView, setInView] = useState(true);
  const frame = useRef<HTMLElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
  const hidden = useSyncExternalStore(subscribeVisibility, () => document.hidden, () => false);
  const playing = !paused && !reduced && !hidden && !focused && inView;

  useEffect(() => {
    if (!frame.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % scenes.length), 6500);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  function goTo(index: number) {

    setActive((index + scenes.length) % scenes.length);
  }

  return (
    <section
      ref={frame}
      className={styles.presentation}
      data-playing={playing}
      aria-label="Discover PDMN Virtual Office"
      aria-roledescription="carousel"


      onFocusCapture={(event) => setFocused(Boolean(event.target.closest("article")))}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); goTo(active + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); goTo(active - 1); }
      }}
    >
      <h1 className="sr-only">PDMN Virtual Office — a professional business presence in Makati</h1>
      <div className={styles.stage}>
        {scenes.map((scene, index) => (
          <article key={scene.label} className={`${styles.scene} ${index === active ? styles.active : ""}`} aria-hidden={index !== active} inert={index !== active} aria-roledescription="slide" aria-label={`${index + 1} of 10: ${scene.label}`}>
            <div className={styles.photo}>
              <Image src={scene.image === "/photos/hero-primary.png" ? heroImage : scene.image} alt={scene.alt} fill sizes="100vw" loading={index === 0 ? "eager" : "lazy"} style={{ objectFit: "cover", objectPosition: scene.position }} />
            </div>
            <div className={styles.shade} />
            <div className={styles.copy}>
              <p className={styles.eyebrow}><span aria-hidden="true" />{scene.label}</p>
              <h2>{scene.title.split("\n").map((line, i) => <span key={line} className={i === 1 ? styles.titleSecond : undefined}>{line}</span>)}</h2>
              <p className={styles.body}>{scene.body}</p>
              <div className={styles.actions}>
                <Link href="/contact" className={styles.primary}>{index === 9 ? "Start your inquiry" : "Inquire now"}<span aria-hidden="true">↗</span></Link>
                <Link href="/services" className={styles.secondary}>Explore packages <span aria-hidden="true">→</span></Link>
              </div>
              <p className={styles.detail}>{scene.detail}</p>
            </div>

          </article>
        ))}
        <aside className={styles.addressCard} aria-label="Our Makati business address">
          <span>Your business presence</span>
          <strong>104 Paseo de Roxas</strong>
          <small>Legaspi Village · Makati City</small>
        </aside>
      </div>
      <div className="sr-only focus-within:not-sr-only">
      <div className={styles.controls}>
        <div className={styles.transport}>
          <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous scene">←</button>
          <button type="button" className={styles.play} disabled={reduced} onClick={() => { setPaused(!paused); setFocused(false); }} aria-label={reduced ? "Automatic playback disabled for reduced motion" : paused ? "Play presentation" : "Pause presentation"}>
            {reduced ? "Manual" : paused ? "Play" : "Pause"}
          </button>
          <button type="button" onClick={() => goTo(active + 1)} aria-label="Next scene">→</button>
        </div>
        <div className={styles.timeline} aria-label="Choose a scene">
          {scenes.map((scene, index) => <button key={scene.label} type="button" onClick={() => goTo(index)} aria-label={`Scene ${index + 1}: ${scene.label}`} aria-current={index === active ? "step" : undefined} className={index === active ? styles.current : ""}><span aria-hidden="true" /></button>)}
        </div>
        <p className="sr-only" aria-live={playing ? "off" : "polite"}>{scenes[active].label}</p>
      </div>
      </div>
      <div className={styles.scope}><span>Our service, clearly defined</span><p>No private offices, dedicated desks or workspaces for regular occupancy. VIP facility access is arranged only for agreed registration and compliance purposes.</p></div>
      <noscript><p className={styles.noScript}>Enable JavaScript to explore all ten scenes. You can still <Link href="/services">view our services</Link> or <Link href="/contact">contact us</Link>.</p></noscript>
    </section>
  );
}


