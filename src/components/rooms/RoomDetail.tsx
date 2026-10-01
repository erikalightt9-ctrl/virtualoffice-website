"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import FeatureIcon from "./FeatureIcon";
import type { ShowcaseRoom } from "@/content/rooms";
import styles from "./rooms.module.css";

/**
 * The room detail dialog.
 *
 * It expands FROM the card the visitor clicked, using FLIP: the dialog renders
 * at its final size, we measure both rectangles, then play the photo from the
 * card's old position to the new one. That is what makes it read as the
 * photograph growing rather than a panel appearing over it.
 *
 * Accessibility, all of it load-bearing:
 *   - role="dialog" + aria-modal, labelled by the room name
 *   - focus moves to the close button on open and returns to the card on close
 *   - Tab is trapped inside the dialog
 *   - Escape closes, so does the backdrop
 *   - the page behind is scroll-locked, with the scrollbar width compensated
 *     so the layout does not jump
 *   - prefers-reduced-motion skips the flight and simply shows the dialog
 */

const DURATION = 420;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

type Props = {
  room: ShowcaseRoom;
  name: string;
  capacity: string;
  /** Pre-formatted, e.g. "₱1,200 / hour", or null when the rate is on request. */
  rate: string | null;
  memberRate: string | null;
  hasPhoto: boolean;
  /** Where the clicked card was, for the flight. Null skips the animation. */
  originRect: DOMRect | null;
  bookHref: string;
  availabilityHref: string;
  onBook?: (roomId: string) => void;
  onCheckAvailability?: (roomId: string) => void;
  onClose: () => void;
  /** Extra line under the actions, e.g. the indicative-pricing caveat. */
  note?: string;
};

export default function RoomDetail({
  room,
  name,
  capacity,
  rate,
  memberRate,
  hasPhoto,
  originRect,
  bookHref,
  availabilityHref,
  onBook,
  onCheckAvailability,
  onClose,
  note,
}: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const exitTimer = useRef<number | null>(null);
  const [closing, setClosing] = useState(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------- scroll lock */
  useEffect(() => {
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, []);

  /* --------------------------------- focus in, and back out on close */
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  /* ------------------------------------------------- the FLIP flight */
  useLayoutEffect(() => {
    const photo = photoRef.current;
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    if (!photo || !dialog || !backdrop) return;

    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: reduced ? 120 : 260,
      easing: "ease-out",
    });

    if (reduced || !originRect) return;

    const to = photo.getBoundingClientRect();
    if (!to.width || !to.height) return;

    photo.animate(
      [
        {
          transform: `translate(${originRect.left - to.left}px, ${
            originRect.top - to.top
          }px) scale(${originRect.width / to.width}, ${
            originRect.height / to.height
          })`,
        },
        { transform: "none" },
      ],
      { duration: DURATION, easing: EASING },
    );

    /* The text column trails the photo very slightly, so the eye follows the
       photograph first and the detail settles behind it. */
    dialog.animate(
      [
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: DURATION, easing: EASING },
    );
  }, [originRect, reduced]);

  /* ------------------------------------------- close, played backwards */
  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);

    const photo = photoRef.current;
    const backdrop = backdropRef.current;

    const duration = reduced ? 100 : 240;

    backdrop?.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration,
      easing: "ease-in",
      fill: "forwards",
    });

    if (!reduced && originRect && photo) {
      const from = photo.getBoundingClientRect();
      if (from.width && from.height) {
        photo.animate(
          [
            { transform: "none" },
            {
              transform: `translate(${originRect.left - from.left}px, ${
                originRect.top - from.top
              }px) scale(${originRect.width / from.width}, ${
                originRect.height / from.height
              })`,
            },
          ],
          { duration: 300, easing: "cubic-bezier(0.4, 0, 0.7, 0.2)", fill: "forwards" },
        );
      }
    }

    /* A timer, NOT the animation's `finished` promise.
     *
     * An Animation only progresses while the document timeline is advancing.
     * In a background tab, a hidden window, or anywhere the compositor is
     * throttled, `finished` never resolves — so awaiting it would leave the
     * dialog permanently open with the page scroll-locked behind it. A timer
     * fires either way, so the exit animation is decoration and closing is
     * guaranteed. */
    exitTimer.current = window.setTimeout(onClose, duration);
  }, [closing, onClose, originRect, reduced]);

  /* If we unmount mid-exit (route change, parent re-render), drop the timer. */
  useEffect(
    () => () => {
      if (exitTimer.current !== null) window.clearTimeout(exitTimer.current);
    },
    [],
  );

  /* --------------------------------------- Escape, and the focus trap */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const items = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  const titleId = `room-${room.id}-title`;

  return (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={close}
          aria-label={`Close ${name} details`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>

        <div ref={photoRef} className={styles.dialogPhoto}>
          {hasPhoto ? (
            <Image
              src={`/photos/rooms/${room.photo}`}
              alt={room.alt}
              fill
              sizes="(max-width: 1080px) 100vw, 560px"
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
        </div>

        <div className={styles.dialogBody}>
          <div className={styles.dialogHead}>
            <p className={styles.dialogEyebrow}>Bookable space</p>
            <h2 id={titleId} className={styles.dialogName}>
              {name}
            </h2>
            <p className={styles.dialogMeta}>
              <span>{capacity} pax</span>
              {rate ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span className={styles.dialogRate}>{rate}</span>
                  {memberRate ? (
                    <span className={styles.dialogRateMember}>
                      {memberRate} on Registered &amp; Corporate
                    </span>
                  ) : null}
                </>
              ) : (
                <>
                  <span aria-hidden="true">·</span>
                  <span className={styles.dialogRateMember}>
                    Rate on request
                  </span>
                </>
              )}
            </p>
          </div>

          <p className={styles.dialogBlurb}>{room.blurb}</p>

          <div>
            <h3 className={styles.groupTitle}>What&rsquo;s inside</h3>
            <ul className={styles.insideList}>
              {room.inside.map((feature) => (
                <li key={feature.label}>
                  <FeatureIcon name={feature.icon} className={styles.insideIcon} />
                  {feature.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.groupTitle}>What it offers</h3>
            <ul className={styles.offerList}>
              {room.offers.map((offer) => (
                <li key={offer}>{offer}</li>
              ))}
            </ul>
          </div>

          <div className={styles.dialogActions}>
            <a
              href={bookHref}
              className="accent-fill border px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em]"
              onClick={(event) => {
                if (!onBook) return;
                event.preventDefault();
                onBook(room.id);
              }}
            >
              Book this room
            </a>
            <a
              href={availabilityHref}
              className="border border-rule-strong px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-body transition-colors hover:bg-bone"
              onClick={(event) => {
                if (!onCheckAvailability) return;
                event.preventDefault();
                onCheckAvailability(room.id);
              }}
            >
              Check availability
            </a>
          </div>

          {note ? <p className={styles.dialogNote}>{note}</p> : null}
        </div>
      </div>
    </div>
  );
}
