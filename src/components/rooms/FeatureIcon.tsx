/**
 * The icon set for "What's inside" a room.
 *
 * Line art on a 24-unit grid, stroked in currentColor so each context sets its
 * own tone. Kept deliberately plain — these sit next to six or eight short
 * labels and are read at 18px, where anything decorative turns to mud.
 *
 * No circles-as-orbits, and no accent colour: per PDMN-DESIGN.md the clay red
 * belongs to actions, which here means the booking button and nothing else.
 */

export type FeatureIconName =
  | "table"
  | "chair"
  | "screen"
  | "whiteboard"
  | "wifi"
  | "aircon"
  | "power"
  | "privacy"
  | "window"
  | "tea";

const PATHS: Record<FeatureIconName, React.ReactNode> = {
  /* A table in elevation: top, two legs. */
  table: (
    <>
      <path d="M2.5 9h19" />
      <path d="M5.5 9v10M18.5 9v10" />
    </>
  ),
  /* An office chair: back, seat, post, base. */
  chair: (
    <>
      <path d="M7 3.5h10v7H7z" />
      <path d="M5.5 13.5h13" />
      <path d="M12 13.5v5" />
      <path d="M8 20.5h8" />
    </>
  ),
  /* A display on a stand. */
  screen: (
    <>
      <path d="M2.5 4.5h19v12h-19z" />
      <path d="M9 20.5h6M12 16.5v4" />
    </>
  ),
  /* A board with a marker tray. */
  whiteboard: (
    <>
      <path d="M2.5 4.5h19v13h-19z" />
      <path d="M6 20.5h12" />
      <path d="M6.5 13.5c2.5-4 5-4 7.5 0" />
    </>
  ),
  /* Signal arcs over a point. */
  wifi: (
    <>
      <path d="M4 10.5a11 11 0 0 1 16 0" />
      <path d="M7.5 14a6.5 6.5 0 0 1 9 0" />
      <path d="M11.25 17.5h1.5v1.5h-1.5z" />
    </>
  ),
  /* A wall unit with louvres and a draught. */
  aircon: (
    <>
      <path d="M2.5 5.5h19v7h-19z" />
      <path d="M6 9h12" strokeOpacity="0.55" />
      <path d="M7 16v3M12 16v4M17 16v3" strokeOpacity="0.7" />
    </>
  ),
  /* A socket faceplate. */
  power: (
    <>
      <path d="M4.5 3.5h15v17h-15z" />
      <path d="M9.5 9v2.5M14.5 9v2.5" />
      <path d="M9 15.5h6" strokeOpacity="0.6" />
    </>
  ),
  /* A closed door: privacy is a door you can shut. */
  privacy: (
    <>
      <path d="M5.5 2.5h13v19h-13z" />
      <path d="M15 12h1.5" />
      <path d="M5.5 21.5h13" strokeOpacity="0.6" />
    </>
  ),
  /* A window with light falling through it. */
  window: (
    <>
      <path d="M4.5 3.5h15v15h-15z" />
      <path d="M12 3.5v15M4.5 11h15" strokeOpacity="0.55" />
      <path d="M7 21.5h10" strokeOpacity="0.7" />
    </>
  ),
  /* A teapot with a spout and a rising curl of steam. */
  tea: (
    <>
      <path d="M4.5 10.5h13v6a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3z" />
      <path d="M17.5 12.5l3 2-3 2" />
      <path d="M8 10.5V9a3 3 0 0 1 6 0v1.5" strokeOpacity="0.6" />
      <path d="M11 5.5c1.2-1 1.2-2 0-3" strokeOpacity="0.6" />
    </>
  ),
};

type Props = {
  name: FeatureIconName;
  className?: string;
};

export default function FeatureIcon({ name, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
