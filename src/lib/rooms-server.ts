import fs from "node:fs";
import path from "node:path";
import type { ResolvedRoom } from "@/components/rooms/RoomShowcase";
import { formatPeso, meetingRooms } from "@/content/pricing";
import { showcaseRooms } from "@/content/rooms";
import { imageSize } from "./image-size";

/**
 * Joins the showcase copy (src/content/rooms.ts) to the rates
 * (src/content/pricing.ts) and reports which photographs are actually on disk.
 *
 * SERVER ONLY — it reads the filesystem. Import it from a page or a server
 * component, never from a "use client" module.
 *
 * Two things it deliberately does:
 *
 *  1. THROWS if a showcase room has no matching id in pricing.ts. A room card
 *     with a blank rate is worse than a failed build, because nobody notices
 *     it until a visitor does.
 *
 *  2. Checks each photograph rather than assuming it exists, so a missing file
 *     renders a labelled panel instead of a broken image. Drop the file into
 *     public/photos/rooms/ and it appears with no code change.
 */

function photoPath(file: string): string {
  return path.join(process.cwd(), "public", "photos", "rooms", file);
}

function photoExists(file: string): boolean {
  try {
    return fs.existsSync(photoPath(file));
  } catch {
    return false;
  }
}

/* Used when a photograph is missing, so the placeholder card still has a
   sensible shape and the composition does not collapse. */
const FALLBACK_ASPECT = "16 / 10";

/**
 * The CSS aspect-ratio for a card.
 *
 * Priority: an explicit `aspect` override, then the photograph's real
 * dimensions, then the fallback. Measuring the file is what stops a card from
 * cropping a photo it was never sized for.
 */
function cardAspect(room: (typeof showcaseRooms)[number], exists: boolean): string {
  if (room.aspect) return room.aspect.replace("/", " / ");
  if (!exists) return FALLBACK_ASPECT;
  const size = imageSize(photoPath(room.photo));
  return size ? `${size.width} / ${size.height}` : FALLBACK_ASPECT;
}

export function resolveShowcaseRooms(): ResolvedRoom[] {
  return showcaseRooms.map((room) => {
    const priced = meetingRooms.find((entry) => entry.id === room.id);

    if (!priced) {
      throw new Error(
        `Room "${room.id}" appears in src/content/rooms.ts but has no matching ` +
          `id in src/content/pricing.ts. Add it there (rates live in one place) ` +
          `or remove it from the showcase.`,
      );
    }

    const exists = photoExists(room.photo);

    return {
      room,
      name: priced.name,
      capacity: priced.capacity,
      rate: priced.rate === null ? null : `${formatPeso(priced.rate)} / hour`,
      memberRate: priced.memberRate === null ? null : formatPeso(priced.memberRate),
      hasPhoto: exists,
      aspect: cardAspect(room, exists),
    };
  });
}

/** How many showcase photographs are still missing — used by the page note. */
export function missingRoomPhotos(): string[] {
  return showcaseRooms
    .filter((room) => !photoExists(room.photo))
    .map((room) => room.photo);
}
