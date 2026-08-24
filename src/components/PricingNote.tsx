import { PRICING_DISCLAIMER } from "@/content/pricing";

/**
 * Renders the pricing disclaimer wherever prices appear.
 * Set PRICING_DISCLAIMER to "" in content/pricing.ts and this disappears
 * from every page at once.
 */
export default function PricingNote({ className = "" }: { className?: string }) {
  if (!PRICING_DISCLAIMER) return null;

  return (
    <p
      className={`border-l-2 border-clay bg-clay-wash px-4 py-3 text-[0.85rem] text-body-soft ${className}`}
    >
      {PRICING_DISCLAIMER}
    </p>
  );
}
