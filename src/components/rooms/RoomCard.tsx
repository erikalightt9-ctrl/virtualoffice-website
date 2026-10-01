"use client";

import Image from "next/image";
import { AVAILABILITY_LABEL, type ShowcaseRoom } from "@/content/rooms";
import styles from "./rooms.module.css";

/**
 * One floating photo card.
 *
 * It is a real <button>, so it is reachable and operable by keyboard and
 * announced as a control — the brief's accessibility requirement, and the
 * reason the whole card is not a bare <div> with an onClick.
 *
 * The float, rotation and parallax live on three different elements on
 * purpose: .slot carries the parallax (set from JS), .card the rotation and
 * hover lift, .float the idle drift. Sharing one element would make them
 * overwrite each other.
 */

type Props = {
  room: ShowcaseRoom;
  name: string;
  capacity: string;
  /** False when the photograph is not on disk yet. */
  hasPhoto: boolean;
  /** CSS aspect-ratio, resolved from the photograph by rooms-server. */
  aspect: string;
  /** Position in the composition, 1-indexed — drives the scatter geometry. */
  position: number;
  /** Larger cards get the bigger images; this feeds `sizes`. */
  sizes: string;
  onOpen: (rect: DOMRect) => void;
};

export default function RoomCard({
  room,
  name,
  capacity,
  hasPhoto,
  aspect,
  position,
  sizes,
  onOpen,
}: Props) {
  const badge =
    room.availability === "unknown" ? null : AVAILABILITY_LABEL[room.availability];

  const badgeClass = [
    styles.badge,
    room.availability === "limited" ? styles.badgeLimited : "",
    room.availability === "unavailable" ? styles.badgeUnavailable : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      className={`${styles.slot} ${styles[`pos${position}`]}`}
      /* Staggered so the five cards never drift in unison. */
      style={
        {
          "--float-duration": `${6.5 + position * 0.55}s`,
          "--float-delay": `${position * 0.4}s`,
        } as React.CSSProperties
      }
    >
      <button
        type="button"
        className={styles.card}
        onClick={(event) =>
          onOpen(event.currentTarget.getBoundingClientRect())
        }
        aria-label={`${name}, ${capacity} people — view details`}
      >
        <span className={`${styles.frame} ${styles.float}`}>
          <span
            className={styles.photo}
            style={{ "--aspect": aspect } as React.CSSProperties}
          >
            {hasPhoto ? (
              <Image
                src={`/photos/rooms/${room.photo}`}
                alt=""
                fill
                sizes={sizes}
                style={
                  room.photoPosition
                    ? { objectPosition: room.photoPosition }
                    : undefined
                }
              />
            ) : (
              <span className={styles.photoMissing}>
                <strong>{name}</strong>
                <span>photo to come</span>
              </span>
            )}

            {badge ? (
              <span className={badgeClass}>
                <i aria-hidden="true" />
                {badge}
              </span>
            ) : null}

            <span className={styles.plate}>
              <span className={styles.plateText}>
                <span className={styles.plateHead}>
                  <span className={styles.plateName}>{name}</span>
                  <span className={styles.plateCapacity}>{capacity} pax</span>
                </span>
                <span className={styles.plateBlurb}>{room.blurb}</span>
              </span>
              <span className={styles.plateCue} aria-hidden="true">
                View details
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                  <path
                    d="M0 4h12M9 1l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
              </span>
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}
