import { site } from "@/content/site";

/**
 * Concrete, verifiable facts. No adjectives.
 * A referred visitor is checking whether we are real — this is that check.
 */
export default function ProofStrip() {
  return (
    <section className="border-y border-rule bg-surface-2">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-rule lg:grid-cols-4">
        {site.facts.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-col gap-1 glass-cell px-5 py-6 sm:px-8"
          >
            <span className="tnum font-display text-[1.6rem] font-bold leading-none text-body">
              {fact.value}
            </span>
            <span className="text-[0.85rem] text-body-soft">{fact.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
