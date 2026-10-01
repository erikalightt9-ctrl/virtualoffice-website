import Link from "next/link";

/** Current package options. */
const parts = [
  {
    "title": "Virtual Office Basic",
    "body": "For freelancers, consultants and professionals who need a credible Makati business address for correspondence and business purposes.",
    "href": "/services/virtual-office"
  },
  {
    "title": "Virtual Office Corporate",
    "body": "For companies that need a professional address to use as their registered business address.",
    "href": "/services/registered-business-address"
  },
  {
    "title": "VIP Virtual Office",
    "body": "For companies that require an actual physical office and facilities for government registration and regulatory compliance.",
    "href": "/services/virtual-office-vip"
  }
];

export default function Ladder() {
  return (
    <div className="border-t border-rule-strong">
      {parts.map((part) => (
        <Link
          key={part.title}
          href={part.href}
          className="group grid grid-cols-[1fr_auto] items-start gap-x-4 border-b border-rule py-5 transition-colors hover:glass-cell"
        >
          <span className="flex flex-col gap-1">
            <span className="font-display text-[1.1rem] font-semibold text-body">
              {part.title}
            </span>
            <span className="max-w-[58ch] text-[0.92rem] text-body-soft">
              {part.body}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="mt-1.5 font-mono text-body-faint transition-transform duration-150 group-hover:translate-x-1 group-hover:text-accent-readable"
          >
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
