import { site } from "@/content/site";

/**
 * The stacked text wordmark: PDMN over VIRTUAL OFFICE.
 *
 * Used in the header and the footer, so the lockup can never drift apart in
 * two places. The real Philippine Dragon Media Network artwork is a separate
 * concern — see BrandLogo.
 *
 * Three things make this a lockup rather than two stacked labels:
 *
 *  1. Each line gets its own leading, and a rule sits between them. The
 *     previous version set `leading-none` on both, which put the boxes flush
 *     and let Archivo's descenders land on the mono line's cap height — a
 *     measured 2.6px of ink collision.
 *
 *  2. The negative right margin cancels the trailing letter-space that CSS
 *     adds after the final glyph, so each box hugs its own ink. Without it the
 *     hairline runs past the letters and the block looks misaligned.
 *
 *  3. The tracking on each line is tuned so the two ink widths land within a
 *     few pixels of each other. That is what makes the pair read as one
 *     designed block; before, the descriptor was 84% wider than the name.
 *
 * If the wordmark text in site.ts ever changes length, re-measure and retune
 * the tracking values below — they are specific to "PDMN" over
 * "VIRTUAL OFFICE".
 */

type Props = {
  /** `sm` for the sticky header, `md` for the footer. */
  size?: "sm" | "md";
  className?: string;
};

const SIZES = {
  sm: { name: "1.5rem", nameTrack: "0.3em", sub: "0.5rem", subTrack: "0.13em" },
  md: { name: "1.7rem", nameTrack: "0.3em", sub: "0.56rem", subTrack: "0.14em" },
} as const;

export default function Wordmark({ size = "sm", className = "" }: Props) {
  const s = SIZES[size];

  return (
    <span className={`inline-flex w-fit flex-col ${className}`}>
      <span
        className="font-display font-semibold leading-[1.04] text-current"
        style={{ fontSize: s.name, letterSpacing: s.nameTrack, marginRight: `-${s.nameTrack}` }}
      >
        {site.wordmark}
      </span>

      <span aria-hidden="true" className="my-[0.3em] h-px w-full bg-current opacity-25" />

      <span
        className="font-mono uppercase leading-none text-current opacity-70"
        style={{ fontSize: s.sub, letterSpacing: s.subTrack, marginRight: `-${s.subTrack}` }}
      >
        {site.wordmarkSub}
      </span>
    </span>
  );
}
