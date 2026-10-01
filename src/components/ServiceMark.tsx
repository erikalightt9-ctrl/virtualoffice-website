/**
 * Line-art watermarks for the four homepage service cards.
 *
 * These replace the identical ring-with-a-dot icons that sat on every card.
 * Two reasons they had to go: they said nothing about the service they
 * labelled, and a ring with a dot on it is an orbit — a motif PDMN-DESIGN.md
 * retired with the rest of the cosmic language. The old marks also put the
 * clay accent on a decorative dot, and the accent is reserved for actions.
 *
 * Each mark is drawn from the thing it names and rests on a ground line, per
 * the "nothing floats" rule. Stroke is currentColor so the card controls the
 * tone and opacity; nothing here hardcodes a palette value.
 */

export type ServiceMarkKind =
  | "address"
  | "registered"
  | "rooms"
  | "mail";

type Props = {
  kind: ServiceMarkKind;
  className?: string;
};

const GROUND = <line x1="6" y1="106" x2="114" y2="106" />;

const MARKS: Record<ServiceMarkKind, React.ReactNode> = {
  /* The building itself: an address is a real place on a real street. */
  address: (
    <>
      {GROUND}
      <path d="M34 106V30l26-14 26 14v76" />
      <path d="M60 16v90" strokeOpacity="0.45" />
      <g strokeOpacity="0.55">
        <path d="M42 44h12M66 44h12M42 60h12M66 60h12M42 76h12M66 76h12" />
      </g>
      <path d="M52 106V92h16v14" />
    </>
  ),

  /* A sheet of paper with a seal: the address as it appears on the record. */
  registered: (
    <>
      {GROUND}
      <path d="M30 106V22h38l14 14v70" />
      <path d="M68 22v14h14" strokeOpacity="0.55" />
      <g strokeOpacity="0.55">
        <path d="M40 50h32M40 62h32M40 74h20" />
      </g>
      <circle cx="84" cy="82" r="16" />
      <circle cx="84" cy="82" r="9" strokeOpacity="0.45" />
    </>
  ),

  /* A boardroom table in plan, seats around it. */
  rooms: (
    <>
      {GROUND}
      <rect x="30" y="44" width="60" height="34" rx="17" />
      <g strokeOpacity="0.6">
        <path d="M42 30h10M58 30h10M74 30h10" />
        <path d="M42 92h10M58 92h10M74 92h10" />
        <path d="M18 56v10M102 56v10" />
      </g>
    </>
  ),

  /* An envelope, with a second piece behind it in the tray. */
  mail: (
    <>
      {GROUND}
      <path d="M38 34h56v22" strokeOpacity="0.45" />
      <rect x="26" y="46" width="68" height="46" />
      <path d="M26 46l34 24 34-24" />
    </>
  ),
};

export default function ServiceMark({ kind, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      {MARKS[kind]}
    </svg>
  );
}
