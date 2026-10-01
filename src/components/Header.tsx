"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import headerLogo from "../../public/pdmn-logo-badge.png";
import { useState } from "react";
import { mainNav, site } from "@/content/site";

/* Shared by every desktop nav item so the row cannot drift apart.
   The hover colour brightens toward ivory rather than toward gold: the pane
   behind the label is gold now, so a gold label would be the one pairing this
   palette cannot make legible. */
const NAV_PILL =
  "nav-pill px-3.5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-on-dark-soft hover:text-on-dark";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  /* "/" only matches itself; everything else matches its own subtree, so
     /services/virtual-office still lights up the Services pill. */
  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="glass-bar sticky top-0 z-50 text-on-dark">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${site.name} — home`}
          onClick={() => setOpen(false)}
        >
          <Image
            src={headerLogo}
            alt="PDMN Virtual Office"
            priority
            sizes="(min-width: 640px) 224px, 192px"
            className="h-20 w-48 object-contain sm:h-24 sm:w-56"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-1.5 xl:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={`flex items-center gap-1.5 ${NAV_PILL}`}
                >
                  {item.label}
                  <svg
                    width="9"
                    height="6"
                    viewBox="0 0 9 6"
                    aria-hidden="true"
                    className="mt-px"
                  >
                    <path
                      d="M1 1l3.5 3.5L8 1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                </Link>
                <div className="glass-solid invisible absolute left-0 top-full w-72 overflow-hidden opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block border-b border-rule-dark px-4 py-3 last:border-b-0 hover:bg-ink-3"
                    >
                      <span className="block font-display text-[0.82rem] font-semibold text-on-dark">
                        {child.label}
                      </span>
                      {child.note ? (
                        <span className="mt-0.5 block text-[0.74rem] text-on-dark-soft">
                          {child.note}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={NAV_PILL}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Link
          href="/contact"
          className="accent-fill cta-shine ml-auto hidden shrink-0 rounded-lg border px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] xl:ml-3 xl:block"
        >
          Inquire now
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-10 w-10 items-center justify-center border border-rule-dark text-on-dark xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
            </svg>
          ) : (
            <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
              <path
                d="M0 1h18M0 6h18M0 11h18"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="glass-panel-strong border-t border-rule-dark xl:hidden"
        >
          <nav className="mx-auto max-w-6xl px-5 py-2 sm:px-8">
            {mainNav.map((item) => (
              <div key={item.href} className="border-b border-rule-dark last:border-b-0">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroup((g) => (g === item.href ? null : item.href))
                      }
                      className="flex w-full items-center justify-between py-3.5 text-left text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-on-dark"
                      aria-expanded={openGroup === item.href}
                    >
                      {item.label}
                      <span className="font-mono text-base text-body-faint">
                        {openGroup === item.href ? "−" : "+"}
                      </span>
                    </button>
                    {openGroup === item.href ? (
                      <div className="pb-3">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block py-2 pl-3 text-[0.85rem] text-accent-readable"
                        >
                          All {item.label.toLowerCase()}
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block py-2 pl-3 text-[0.85rem] text-on-dark-soft"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-on-dark"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 py-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="accent-fill border px-4 py-3 text-center text-[0.8rem] font-semibold uppercase tracking-[0.09em]"
              >
                Inquire now
              </Link>
              <a
                href={site.contact.viberHref}
                className="border border-rule-dark px-4 py-3 text-center text-[0.8rem] font-semibold uppercase tracking-[0.09em] text-on-dark"
              >
                Chat on Viber
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

