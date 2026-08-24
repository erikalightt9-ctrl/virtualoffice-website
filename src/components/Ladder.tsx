import Link from "next/link";

/**
 * The progression a company actually moves along. This is a real sequence,
 * which is why it is numbered.
 */
const rungs = [
  {
    n: "01",
    title: "Business address",
    body: "A credible Makati address for correspondence, invoices and client-facing material.",
    href: "/services/virtual-office",
  },
  {
    n: "02",
    title: "Registered address",
    body: "The same address, eligible for SEC, BIR and Mayor's Permit registration, with inspections accommodated.",
    href: "/services/registered-business-address",
  },
  {
    n: "03",
    title: "Company registration",
    body: "SEC incorporation, BIR registration, barangay clearance and Mayor's Permit, through our partner firms.",
    href: "/services/company-registration",
  },
  {
    n: "04",
    title: "Ongoing compliance",
    body: "Bookkeeping, BIR filings, payroll, statutory contributions and annual corporate filings.",
    href: "/services/accounting-and-tax",
  },
  {
    n: "05",
    title: "A desk, then a floor",
    body: "When you hire, take workstations on the same floor. Your registered address never has to change.",
    href: "/workspace",
  },
];

export default function Ladder() {
  return (
    <div className="border-t border-rule-strong">
      {rungs.map((rung) => (
        <Link
          key={rung.n}
          href={rung.href}
          className="group grid grid-cols-[2.6rem_1fr_auto] items-start gap-x-4 border-b border-rule py-5 transition-colors hover:bg-surface"
        >
          <span className="mt-1 font-mono text-[0.78rem] text-clay">{rung.n}</span>
          <span className="flex flex-col gap-1">
            <span className="font-display text-[1.1rem] font-semibold text-ink">
              {rung.title}
            </span>
            <span className="max-w-[58ch] text-[0.92rem] text-body-soft">
              {rung.body}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="mt-1.5 font-mono text-body-faint transition-transform duration-150 group-hover:translate-x-1 group-hover:text-clay"
          >
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
