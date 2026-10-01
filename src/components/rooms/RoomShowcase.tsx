"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import RoomCard from "./RoomCard";
import RoomDetail from "./RoomDetail";
import styles from "./rooms.module.css";
import {
  availabilityHref,
  bookingHref,
  type ShowcaseRoom,
} from "@/content/rooms";

/**
 * "Spaces that work for you" — the floating room composition plus its detail
 * dialog.
 *
 * The room copy comes from src/content/rooms.ts and the rates from
 * src/content/pricing.ts; this component owns no content of its own. It is
 * handed a pre-joined list by the server page (see resolveShowcaseRooms) so
 * the price formatting stays in one place and a room with no matching rate
 * fails at build time rather than rendering blank.
 *
 * TO CONNECT A BOOKING SYSTEM: pass `onBook` and/or `onCheckAvailability`.
 * When given, they run instead of following the inquiry link, so a reservation
 * modal or a third-party widget drops in with no markup change.
 */

export type ResolvedRoom = {
  room: ShowcaseRoom;
  name: string;
  capacity: string;
  rate: string | null;
  memberRate: string | null;
  hasPhoto: boolean;
  /** CSS aspect-ratio for the card, measured from the photograph. */
  aspect: string;
};

type Props = {
  rooms: ResolvedRoom[];
  onBook?: (roomId: string) => void;
  onCheckAvailability?: (roomId: string) => void;
  /** Shown under the dialog actions — the indicative-pricing caveat. */
  note?: string;
};

/* The two widest cards get the biggest images; the rest are told they are
   roughly half-width, so no phone downloads a 1200px file it cannot use. */
const CARD_SIZES = [
  "(max-width: 680px) 92vw, (max-width: 1080px) 48vw, 45vw",
  "(max-width: 680px) 92vw, (max-width: 1080px) 48vw, 52vw",
  "(max-width: 680px) 92vw, (max-width: 1080px) 48vw, 38vw",
  "(max-width: 680px) 92vw, (max-width: 1080px) 48vw, 38vw",
  "(max-width: 680px) 92vw, (max-width: 1080px) 62vw, 30vw",
];

const MAX_PARALLAX = 12;

export default function RoomShowcase({
  rooms,
  onBook,
  onCheckAvailability,
  note,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [open, setOpen] = useState<{ index: number; rect: DOMRect } | null>(
    null,
  );

  /* ------------------------------------------------------ cursor parallax
     Written straight to CSS custom properties inside one rAF, so the pointer
     handler never triggers React work and the browser only ever animates a
     transform. Skipped entirely for reduced-motion and for pointers that
     cannot hover, which is what keeps this cheap on phones. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      frameRef.current = null;
      if (!pending) return;
      const { x, y } = pending;
      for (const slot of Array.from(
        stage.querySelectorAll<HTMLElement>(`.${styles.slot}`),
      )) {
        const depth = Number(
          getComputedStyle(slot).getPropertyValue("--depth") || 0,
        );
        slot.style.setProperty("--px", `${x * MAX_PARALLAX * depth}px`);
        slot.style.setProperty("--py", `${y * MAX_PARALLAX * depth * 0.6}px`);
      }
    };

    const onMove = (event: PointerEvent) => {
      const box = stage.getBoundingClientRect();
      pending = {
        x: (event.clientX - box.left) / box.width - 0.5,
        y: (event.clientY - box.top) / box.height - 0.5,
      };
      frameRef.current ??= requestAnimationFrame(apply);
    };

    const onLeave = () => {
      pending = { x: 0, y: 0 };
      frameRef.current ??= requestAnimationFrame(apply);
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleOpen = useCallback((index: number, rect: DOMRect) => {
    setOpen({ index, rect });
  }, []);

  const active = open ? rooms[open.index] : null;

  return (
    <div ref={stageRef} className={styles.stage}>
      <span className={styles.groundRule} aria-hidden="true" />
      <span className={styles.groundGlow} aria-hidden="true" />

      <ul className={styles.scatter}>
        {rooms.map((entry, index) => (
          <RoomCard
            key={entry.room.id}
            room={entry.room}
            name={entry.name}
            capacity={entry.capacity}
            hasPhoto={entry.hasPhoto}
            aspect={entry.aspect}
            position={index + 1}
            sizes={CARD_SIZES[index] ?? CARD_SIZES[0]}
            onOpen={(rect) => handleOpen(index, rect)}
          />
        ))}
      </ul>

      {active && open ? (
        <RoomDetail
          key={active.room.id}
          room={active.room}
          name={active.name}
          capacity={active.capacity}
          rate={active.rate}
          memberRate={active.memberRate}
          hasPhoto={active.hasPhoto}
          originRect={open.rect}
          bookHref={bookingHref(active.room.id)}
          availabilityHref={availabilityHref(active.room.id)}
          onBook={onBook}
          onCheckAvailability={onCheckAvailability}
          onClose={() => setOpen(null)}
          note={note}
        />
      ) : null}
    </div>
  );
}
