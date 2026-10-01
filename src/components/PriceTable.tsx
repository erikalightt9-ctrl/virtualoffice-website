import Link from "next/link";
import { formatPeso, publishedRooms } from "@/content/pricing";

type Row = {
  key: string;
  name: string;
  price: string;
  unit: string;
  detail: string;
  href?: string;
};

function rowsFor(kind: "rooms"): Row[] {
  if (kind === "rooms") {
    return publishedRooms.map((r) => ({
      key: r.id,
      name: r.name,
      price: formatPeso(r.rate, "On request"),
      unit: r.rate === null ? "" : "per hour",
      detail:
        r.memberRate !== null
          ? `${r.capacity} · ${formatPeso(r.memberRate)} per hour on Registered and Corporate. ${r.note}`
          : `${r.capacity} · ${r.note}`,
    }));
  }

  return [];
}

export default function PriceTable({
  kind,
}: {
  kind: "rooms";
}) {
  const rows = rowsFor(kind);

  return (
    <div className="overflow-x-auto border border-rule glass-cell">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-rule-strong bg-surface-2">
            <th className="label px-4 py-3 font-medium text-body-faint">
              {"Room"}
            </th>
            <th className="label px-4 py-3 font-medium text-body-faint">
              {"Capacity and notes"}
            </th>
            <th className="label px-4 py-3 text-right font-medium text-body-faint">
              Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-b border-rule last:border-b-0">
              <td className="px-4 py-4 align-top">
                {row.href ? (
                  <Link
                    href={row.href}
                    className="inline-block py-1 font-display text-[0.95rem] font-semibold text-body underline decoration-rule-strong decoration-1 underline-offset-4 hover:decoration-clay"
                  >
                    {row.name}
                  </Link>
                ) : (
                  <span className="font-display text-[0.95rem] font-semibold text-body">
                    {row.name}
                  </span>
                )}
              </td>
              <td className="max-w-[34rem] px-4 py-4 align-top text-[0.88rem] text-body-soft">
                {row.detail}
              </td>
              <td className="whitespace-nowrap px-4 py-4 align-top text-right">
                <span className="tnum font-mono text-[0.92rem] font-medium text-body">
                  {row.price}
                </span>
                {row.unit ? (
                  <span className="block font-mono text-[0.68rem] uppercase tracking-[0.06em] text-body-faint">
                    {row.unit}
                  </span>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
