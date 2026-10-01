import { packageRate, VIP_RATE_NOTE, type AddressTier } from "@/content/pricing";

export default function PackageRate({ tier }: { tier: AddressTier }) {
  return (
    <div className="flex flex-col gap-3 border-y border-rule py-4">
      <p className="tnum font-display text-[clamp(1.35rem,2.3vw,1.8rem)] font-semibold leading-tight text-gold">
        {packageRate(tier)}
      </p>
      {/* A tier carrying footnotes explains its own asterisk at the foot of the
          card, so repeating the note here would say the same thing twice. */}
      {tier.startingPrice !== undefined && !tier.footnotes?.length ? (
        <p className="text-[0.85rem] leading-relaxed text-body-soft">{VIP_RATE_NOTE}</p>
      ) : null}
    </div>
  );
}
