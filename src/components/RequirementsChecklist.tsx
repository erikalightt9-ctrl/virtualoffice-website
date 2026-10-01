"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DOCUMENTS, PATHS } from "@/content/requirements";

/**
 * "Do I have what I need?" — the point of the requirements page.
 *
 * Pick your situation, tick what you hold, and it tells you either that you
 * are ready to apply or exactly what is outstanding. A prospect can qualify
 * themselves without contacting anyone, which is what the page exists for.
 *
 * State is deliberately not persisted. This is a thirty-second check, not a
 * form to come back to, and storing what documents someone claims to hold
 * would be personal data we have no reason to keep.
 */

export default function RequirementsChecklist() {
  const [pathId, setPathId] = useState(PATHS[0].id);
  const [held, setHeld] = useState<Record<string, boolean>>({});

  const path = PATHS.find((p) => p.id === pathId) ?? PATHS[0];

  /* Payment is not something you "have" in advance, so it is excluded from
     the tick list — it happens after approval, not before. */
  const checkable = useMemo(
    () => path.needs.filter((n) => n !== "Payment"),
    [path],
  );

  const missing = checkable.filter((n) => !held[n]);
  const ready = missing.length === 0;

  function choosePath(id: string) {
    setPathId(id);
    setHeld({}); // a different path asks for different things
  }

  return (
    <div className="flex flex-col gap-8">
      {/* ------------------------------------------------ pick a situation */}
      <fieldset className="flex flex-col gap-3 border-0 p-0">
        <legend className="label mb-1 text-body-faint">
          1 &middot; Which describes you?
        </legend>
        <div className="grid gap-px bg-rule sm:grid-cols-2">
          {PATHS.map((p) => {
            const active = p.id === pathId;
            return (
              <label
                key={p.id}
                className={`flex cursor-pointer flex-col gap-1 p-4 transition-colors ${
                  active ? "bg-clay-wash" : "glass-cell hover:bg-surface-2"
                }`}
              >
                <span className="flex items-start gap-2.5">
                  <input
                    type="radio"
                    name="applicant-path"
                    value={p.id}
                    checked={active}
                    onChange={() => choosePath(p.id)}
                    className="mt-1 accent-clay"
                  />
                  <span className="text-[0.92rem] font-semibold text-body">
                    {p.label}
                  </span>
                </span>
                <span className="pl-6 text-[0.84rem] text-body-soft">
                  {p.summary}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* --------------------------------------------- what that path needs */}
      <fieldset className="flex flex-col gap-3 border-0 p-0">
        <legend className="label mb-1 text-body-faint">
          2 &middot; Tick what you already have
        </legend>

        <ul className="flex flex-col gap-px bg-rule">
          {checkable.map((name) => {
            const doc = DOCUMENTS.find((d) => d.name === name);
            const checked = Boolean(held[name]);
            return (
              <li key={name} className="glass-cell">
                <label className="flex cursor-pointer items-start gap-3 p-4">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setHeld((prev) => ({ ...prev, [name]: !prev[name] }))
                    }
                    className="mt-1 accent-clay"
                  />
                  <span className="flex flex-col gap-1">
                    <span
                      className={`text-[0.95rem] font-semibold ${
                        checked ? "text-body-faint line-through" : "text-body"
                      }`}
                    >
                      {name}
                    </span>
                    {doc ? (
                      <span className="text-[0.85rem] leading-relaxed text-body-soft">
                        {doc.what}
                      </span>
                    ) : null}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <p className="text-[0.84rem] text-body-faint">
          Payment is not on this list — it comes after approval, not before.
        </p>
      </fieldset>

      {/* ------------------------------------------------------- the verdict */}
      <div
        role="status"
        aria-live="polite"
        className={`border-l-2 p-5 ${
          ready ? "border-teal bg-seafoam/20" : "border-clay bg-clay-wash"
        }`}
      >
        {ready ? (
          <>
            <h3 className="text-[1.05rem] font-semibold text-body">
              Your initial checklist is complete.
            </h3>
            <p className="mt-2 max-w-[60ch] text-[0.9rem] text-body-soft">
              {path.note ?? "Our team will confirm the final requirements for your package."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/contact?service=${
                  "other"
                }`}
                className="accent-fill border px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em]"
              >
                Start an application
              </Link>
              <Link
                href="/services"
                className="border border-rule-strong px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-body transition-colors hover:bg-bone"
              >
                Compare packages
              </Link>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-[1.05rem] font-semibold text-body">
              {missing.length === 1
                ? "One thing outstanding."
                : `${missing.length} things outstanding.`}
            </h3>
            <ul className="mt-2 flex flex-col gap-2">
              {missing.map((name) => {
                const doc = DOCUMENTS.find((d) => d.name === name);
                return (
                  <li key={name} className="text-[0.9rem] text-body-soft">
                    <strong className="font-semibold text-body">{name}</strong>
                    {doc?.where ? <> &mdash; {doc.where}</> : null}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 max-w-[60ch] text-[0.9rem] text-body-soft">
              You can still inquire. Tell us where you are in the process and we
              will tell you what we can activate now and what has to wait.
            </p>
            <div className="mt-4">
              <Link
                href="/contact?service=virtual-office"
                className="border border-rule-strong px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-body transition-colors hover:bg-bone"
              >
                Ask us about your situation
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
