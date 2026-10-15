import {
  formatPeso,
  packageRate,
  VIP_RATE_NOTE,
  withVat,
  type AddressTier,
} from "@/content/pricing";

/**
 * A package's price, with VAT shown separately.
 *
 * The confirmed term is that displayed prices are VAT-EXCLUSIVE, that the 12%
 * is shown separately, and that the total payable is disclosed before payment.
 * A bare "₱1,800/month" satisfies none of that — a buyer reading it budgets
 * ₱1,800 and is invoiced ₱2,016.
 *
 * A quoted tier shows the rate it starts from and the tax basis, but NOT a
 * computed total: its final figure comes from a quotation, so any total shown
 * here would be a number nobody has agreed to.
 */
export default function PackageRate({ tier }: { tier: AddressTier }) {
  const monthly = tier.priceMonthly;
  const quoted = tier.startingPrice !== undefined;
  const breakdown = typeof monthly === "number" ? withVat(monthly) : null;

  return (
    <div className="flex flex-col gap-2 border-y border-rule py-4">
      <p className="tnum font-display text-[clamp(1.35rem,2.3vw,1.8rem)] font-semibold leading-tight text-gold">
        {packageRate(tier)}
      </p>

      {breakdown ? (
        <p className="tnum text-[0.84rem] leading-relaxed text-body-soft">
          + {formatPeso(breakdown.vat)} VAT ·{" "}
          <span className="font-semibold text-body">
            {formatPeso(breakdown.gross)}/month
          </span>{" "}
          total
        </p>
      ) : (
        <p className="text-[0.84rem] leading-relaxed text-body-soft">
          Excludes 12% VAT
        </p>
      )}

      {quoted && !tier.footnotes?.length ? (
        <p className="text-[0.85rem] leading-relaxed text-body-soft">
          {VIP_RATE_NOTE}
        </p>
      ) : null}
    </div>
  );
}
