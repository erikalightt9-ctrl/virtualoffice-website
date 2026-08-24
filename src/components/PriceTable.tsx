import Link from "next/link";
import {
  formatPeso,
  publishedRegistration,
  publishedRooms,
  publishedWorkspace,
} from "@/content/pricing";

type Row = {
  key: string;
  name: string;
  price: string;
  unit: string;
  detail: string;
  href?: string;
};

function rowsFor(kind: "workspace" | "rooms" | "registration"): Row[] {
  if (kind === "workspace") {
    return publishedWorkspace.map((p) => ({
      key: p.id,
      name: p.name,
      price: formatPeso(p.price),
      unit: p.price === null ? "" : p.unit,
      detail: p.bestFor,
      href: `/workspace/${p.id}`,
    }));
  }

  if (kind === "rooms") {
    return publishedRooms.map((r) => ({
      key: r.id,
      name: r.name,
      price: formatPeso(r.rate, "On request"),
      unit: r.rate === null ? "" : "per hour",
      detail:
        r.memberRate !== null
          ? `${r.capacity} · ${formatPeso(r.memberRate)} per hour for members. ${r.note}`
          : `${r.capacity} · ${r.note}`,
    }));
  }

  return publishedRegistration.map((s) => ({
    key: s.id,
    name: s.name,
    price: formatPeso(s.price),
    unit: s.price === null ? "" : s.unit,
    detail: s.description,
  }));
}

export default function PriceTable({
  kind,
}: {
  kind: "workspace" | "rooms" | "registration";
}) {
  const rows = rowsFor(kind);

  return (
    <div className="overflow-x-auto border border-rule bg-surface">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-rule-strong bg-surface-2">
            <th className="label px-4 py-3 font-medium text-body-faint">
              {kind === "rooms" ? "Room" : kind === "workspace" ? "Product" : "Service"}
            </th>
            <th className="label px-4 py-3 font-medium text-body-faint">
              {kind === "rooms" ? "Capacity and notes" : "Details"}
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
                    className="font-display text-[0.95rem] font-semibold text-ink underline decoration-rule-strong decoration-1 underline-offset-4 hover:decoration-clay"
                  >
                    {row.name}
                  </Link>
                ) : (
                  <span className="font-display text-[0.95rem] font-semibold text-ink">
                    {row.name}
                  </span>
                )}
              </td>
              <td className="max-w-[34rem] px-4 py-4 align-top text-[0.88rem] text-body-soft">
                {row.detail}
              </td>
              <td className="whitespace-nowrap px-4 py-4 align-top text-right">
                <span className="tnum font-mono text-[0.92rem] font-medium text-ink">
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
