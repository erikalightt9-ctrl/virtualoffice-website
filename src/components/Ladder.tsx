import Link from "next/link";

/**
 * What the virtual office actually consists of. Deliberately not a "ladder"
 * towards registration or compliance services — PDMN Virtual Office does not offer those.
 * These are the parts of one service, in the order people tend to need them.
 */
const parts = [
  {
    title: "A business address",
    body: "A credible Makati address for correspondence, invoices and client-facing material.",
    href: "/services/virtual-office",
  },
  {
    title: "Mail handled by people",
    body: "Received at a staffed reception, logged on arrival, and reported to you the same day.",
    href: "/services/mail-handling",
  },
  {
    title: "A registered-address option",
    body: "For companies that need an address they can name as their registered business address. Subject to approval.",
    href: "/services/registered-business-address",
  },
  {
    title: "Rooms when you need them",
    body: "Six bookable spaces on the same floor, from a four-person room to a full conference room.",
    href: "/meeting-rooms",
  },
  {
    title: "Somewhere to actually work",
    body: "A desk for the day, a permanent workstation, space for a team, or an enclosed private office.",
    href: "/workspace",
  },
];

export default function Ladder() {
  return (
    <div className="border-t border-rule-strong">
      {parts.map((part) => (
        <Link
          key={part.title}
          href={part.href}
          className="group grid grid-cols-[1fr_auto] items-start gap-x-4 border-b border-rule py-5 transition-colors hover:bg-surface"
        >
          <span className="flex flex-col gap-1">
            <span className="font-display text-[1.1rem] font-semibold text-ink">
              {part.title}
            </span>
            <span className="max-w-[58ch] text-[0.92rem] text-body-soft">
              {part.body}
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
