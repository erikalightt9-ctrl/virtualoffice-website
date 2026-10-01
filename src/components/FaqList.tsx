"use client";

import { useState } from "react";
import type { Faq } from "@/content/faqs";

export default function FaqList({ items, numbered = false }: { items: Faq[]; numbered?: boolean }) {
  const [open, setOpen] = useState<string | null>(items[0]?.q ?? null);

  return (
    <div className="border-t border-rule-strong">
      {items.map((item, index) => {
        const isOpen = open === item.q;
        return (
          <div key={item.q} className="border-b border-rule">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item.q)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 py-4 text-left"
              >
                <span className="font-display text-[1rem] font-semibold text-body">
                  {numbered ? `${index + 1}. ` : ""}{item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 font-mono text-lg leading-none text-accent-readable"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            {isOpen ? (
              <div className="flex flex-col gap-3 pb-5 pr-8">
                {item.a.map((para) => (
                  <p key={para} className="max-w-[64ch] text-[0.95rem] text-body-soft">
                    {para}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
