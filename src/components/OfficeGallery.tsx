"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const photos = [
  "Wood-finished interior at our Makati office",
  "Conference area at our Makati office",
  "Pantry and dining area at our Makati office",
  "Entrance to our Makati office",
  "Lounge at our Makati office",
  "Office interior at our Makati address",
];

export default function OfficeGallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const source = (index: number) => `/photos/office-collection/office-${index + 1}.jpg`;

  return (
    <section aria-labelledby="office-gallery-heading" className="grid border-t border-rule bg-ink text-on-dark lg:grid-cols-2">
      <div className="bg-[#7C0507] px-6 py-10 sm:px-12 sm:py-14">
        <div className="mx-auto grid max-w-[620px] grid-cols-2 gap-4 sm:gap-6">
          {photos.map((description, index) => (
            <a key={description} href={source(index)} aria-label={`View larger photo: ${description}`} onClick={(event) => {
              event.preventDefault();
              setSelected(index);
              dialog.current?.showModal();
            }} className="group relative block aspect-[4/3] overflow-hidden rounded-sm shadow-[0_3px_10px_rgba(61, 7, 8,0.12)] ring-1 ring-inset ring-[#FDFBF7]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
              <Image src={`/photos/office-collection/office-${index + 1}-card.webp`} alt={description} fill unoptimized sizes="(max-width: 1023px) 44vw, 300px" className="object-cover" />
              <span className="absolute bottom-2 right-2 rounded-sm bg-[#FDFBF7]/90 px-2 py-1 text-xs text-[#3D0708] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <p className="mt-6 text-center text-xs leading-6 text-on-dark-soft"><span className="mr-3 uppercase tracking-widest text-gold">Inside PDMN</span>104 Paseo de Roxas · Makati City</p>
      </div>
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <p className="label text-gold">A real office behind your address</p>
        <h2 id="office-gallery-heading" className="mt-5 max-w-[650px] text-[clamp(2rem,3.5vw,3.5rem)] font-normal leading-[1.12] tracking-tight" style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}>Professional presence starts with a professional place.</h2>
        <p className="mt-6 max-w-[60ch] leading-8 text-on-dark-soft">Our fifth-floor office at 104 Paseo de Roxas gives your business a credible physical base. Our VIP package offers facilities for agreed registration and compliance purposes, subject to suitability and government approval.</p>
        <ul className="mt-7 divide-y divide-rule border-b border-rule text-sm">
          {["Established Makati CBD address", "Reception staffed during business hours", "Physical facilities for applicable regulatory purposes", "Facility suitability confirmed for your requirements"].map((benefit) => <li key={benefit} className="py-4"><span className="mr-3 text-gold" aria-hidden="true">✦</span>{benefit}</li>)}
        </ul>
        <p className="mt-5 max-w-[60ch] text-sm leading-6 text-on-dark-soft">Photos show our premises. Private offices, dedicated desks and workspaces for regular occupancy are not included.</p>
        <Link href="/location" className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 border-b border-gold/50 text-xs font-semibold uppercase tracking-widest text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">Explore the location <span aria-hidden="true">↗</span></Link>
      </div>
      <dialog ref={dialog} aria-label="Office photo viewer" className="fixed inset-0 m-auto max-h-[94dvh] w-[min(1100px,94vw)] max-w-none overflow-auto rounded-lg border border-gold/40 bg-[#3D0708] p-4 text-on-dark shadow-2xl backdrop:bg-[#3D0708]/90" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm">{photos[selected]}</p>
          <button type="button" autoFocus onClick={() => dialog.current?.close()} className="min-h-11 shrink-0 rounded border border-gold/50 px-4 text-sm text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Close ×</button>
        </div>
        <div className="relative h-[70dvh]">
          <Image src={source(selected)} alt={photos[selected]} fill sizes="94vw" className="object-contain" />
        </div>
      </dialog>
    </section>
  );
}
