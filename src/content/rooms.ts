/**
 *  THE BOOKABLE SPACES — everything the showcase section renders.
 *  ---------------------------------------------------------------------------
 *  THIS IS THE ONLY FILE YOU EDIT to change what the rooms section says.
 *  It holds no layout and no styling: the floating arrangement lives in
 *  src/components/rooms/rooms.module.css, keyed by card position, so
 *  reordering this array rearranges the composition on its own.
 *
 *  Prices are NOT here. Each entry's `id` matches a room in
 *  src/content/pricing.ts, which stays the single source of truth for rates —
 *  see PDMN-DESIGN.md. If an id here has no match there, the build fails
 *  loudly rather than rendering a room with no price.
 *
 *  TO CHANGE SOMETHING:
 *    a name, capacity or rate ....... src/content/pricing.ts
 *    a photo ........................ swap the file in public/photos/rooms/
 *    what is inside a room .......... the `inside` array below
 *    what a room is good for ........ the `offers` array below
 *    availability ................... the `availability` field below
 *    where the booking button goes .. bookingHref() / availabilityHref() below
 */

import type { FeatureIconName } from "@/components/rooms/FeatureIcon";

/* --------------------------------------------------------------------------
 *  Availability
 *
 *  There is no live calendar yet, so every room ships as "unknown" and no
 *  badge is drawn. When a booking system arrives, set these from it (or feed
 *  the component an availability map) and the badges appear with no other
 *  change. Never set "available" by hand — a stale green badge is worse than
 *  no badge, because a visitor will read it as a promise.
 * ------------------------------------------------------------------------ */
export type RoomAvailability = "available" | "limited" | "unavailable" | "unknown";

export const AVAILABILITY_LABEL: Record<
  Exclude<RoomAvailability, "unknown">,
  string
> = {
  available: "Available today",
  limited: "Limited slots today",
  unavailable: "Fully booked today",
};

export type RoomFeature = {
  icon: FeatureIconName;
  label: string;
};

export type ShowcaseRoom = {
  /** Must match a MeetingRoom id in src/content/pricing.ts. */
  id: string;
  /** File in public/photos/rooms/. Missing files fall back to a labelled panel. */
  photo: string;
  alt: string;
  /**
   * OPTIONAL crop override for the card.
   *
   * Leave it off and the card takes the photograph's real shape, measured from
   * the file at build time — so nothing is ever cropped and swapping in a
   * differently proportioned photo needs no code change. Set it only when you
   * deliberately want a crop that differs from the source.
   */
  aspect?: "16/9" | "16/10" | "4/3" | "5/4" | "3/4";
  /** object-position for the card crop, when the subject is off-centre. */
  photoPosition?: string;
  /** One line on the card. Keep it to roughly 90 characters. */
  blurb: string;
  /** "What's inside" — icon plus a short label. Six to eight reads best. */
  inside: RoomFeature[];
  /** "What it offers" — what the space is actually for. */
  offers: string[];
  availability: RoomAvailability;
};

/* Shared kit, so a change to the wifi or aircon wording happens once. */
const WIFI: RoomFeature = { icon: "wifi", label: "High-speed Wi-Fi" };
const AIRCON: RoomFeature = { icon: "aircon", label: "Air-conditioning" };
const POWER: RoomFeature = { icon: "power", label: "Power outlets at the table" };

const CONFERENCE_OFFERS = [
  "Client meetings",
  "Team meetings",
  "Presentations",
  "Training sessions",
  "Board and business discussions",
];

export const showcaseRooms: ShowcaseRoom[] = [
  {
    id: "palawan",
    photo: "palawan.jpg",
    alt: "Palawan: a long white table with mesh chairs, a wall-mounted display and a glass writing wall",
    blurb: "A bright room with a glass writing wall, for presentations and client meetings.",
    inside: [
      { icon: "table", label: "Eight-seat conference table" },
      { icon: "chair", label: "Ergonomic mesh chairs" },
      { icon: "screen", label: "Wall-mounted display" },
      { icon: "whiteboard", label: "Full-wall glass writing board" },
      WIFI,
      AIRCON,
      POWER,
      { icon: "privacy", label: "Fully enclosed and private" },
    ],
    offers: CONFERENCE_OFFERS,
    availability: "unknown",
  },
  {
    id: "boracay",
    photo: "boracay.jpg",
    alt: "Boracay: a light timber conference table with mesh chairs, a display and a whiteboard against a warm accent wall",
    blurb: "A quieter corner room with a whiteboard, for team sessions and interviews.",
    inside: [
      { icon: "table", label: "Twelve-seat conference table" },
      { icon: "chair", label: "High-back executive chairs" },
      { icon: "screen", label: "Large wall-mounted display" },
      { icon: "window", label: "Natural light on two sides" },
      WIFI,
      AIRCON,
      POWER,
      { icon: "privacy", label: "Glass-partitioned and private" },
    ],
    offers: CONFERENCE_OFFERS,
    availability: "unknown",
  },
  {
    id: "siargao",
    photo: "siargao.jpg",
    alt: "Siargao: a conference table with high-back chairs on an oak floor, under timber ceiling battens and pendant lights",
    blurb: "Our largest room — oak floors, pendant lighting and daylight on two sides.",
    inside: [
      { icon: "table", label: "Eight-seat timber table" },
      { icon: "chair", label: "Ergonomic mesh chairs" },
      { icon: "screen", label: "Wall-mounted display" },
      { icon: "whiteboard", label: "Whiteboard" },
      WIFI,
      AIRCON,
      POWER,
      { icon: "privacy", label: "Fully enclosed and private" },
    ],
    offers: CONFERENCE_OFFERS,
    availability: "unknown",
  },
  {
    id: "cubicle",
    photo: "cubicle.jpg",
    alt: "The Cubicle: two facing upholstered benches with high acoustic backs and a timber table between them",
    blurb: "An upholstered booth with high acoustic sides, for a private conversation.",
    inside: [
      { icon: "table", label: "Table between facing benches" },
      { icon: "chair", label: "Upholstered bench seating for four" },
      { icon: "privacy", label: "High acoustic sides" },
      WIFI,
      POWER,
      AIRCON,
    ],
    offers: [
      "Two to four person meetings",
      "Private client conversations",
      "Interviews and one-to-ones",
      "Short informal discussions",
    ],
    availability: "unknown",
  },
  {
    id: "tea-room",
    photo: "tea-room.jpg",
    alt: "The Tea Room: a dark timber table with bench seating, a tea service and a shelf of teaware against a slatted timber wall",
    blurb: "A long wooden table with bench seating, for meals and unhurried conversations.",
    inside: [
      { icon: "table", label: "Long dining and meeting table" },
      { icon: "chair", label: "Bench seating for four to six" },
      { icon: "tea", label: "Tea service and teaware" },
      { icon: "window", label: "Natural light" },
      WIFI,
      AIRCON,
    ],
    offers: [
      "Casual meetings",
      "Small team discussions",
      "Meals over a meeting",
      "Informal business conversations",
    ],
    availability: "unknown",
  },
];

/* --------------------------------------------------------------------------
 *  Booking
 *
 *  There is no reservation system yet, so both actions route to the inquiry
 *  form with the room and intent pre-filled — a real path a visitor can
 *  complete today, not a dead button. InquiryForm reads `room` and `intent`
 *  and pre-writes the message.
 *
 *  TO CONNECT A REAL SYSTEM: change these two functions, or pass `onBook` /
 *  `onCheckAvailability` into <RoomShowcase>. The component prefers the props
 *  when they are given, so a booking modal or a Calendly embed drops in
 *  without touching any markup.
 * ------------------------------------------------------------------------ */

export function bookingHref(roomId: string): string {
  const params = new URLSearchParams({
    service: "meeting-room",
    room: roomId,
    intent: "book",
  });
  return `/contact?${params.toString()}`;
}

export function availabilityHref(roomId: string): string {
  const params = new URLSearchParams({
    service: "meeting-room",
    room: roomId,
    intent: "availability",
  });
  return `/contact?${params.toString()}`;
}
