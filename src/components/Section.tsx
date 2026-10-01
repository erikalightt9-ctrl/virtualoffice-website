import type { ReactNode } from "react";
import Container from "./Container";

type Props = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  children: ReactNode;
  id?: string;
};

/**
 * A page section.
 *
 * It sets no ground of its own. Sections used to alternate between two tones
 * to separate visually; the shade shifter in globals.css now does that job
 * from document position, giving a continuous ramp down the page instead of a
 * two-tone stripe. Adding a background here would flatten that ramp.
 */
export default function Section({ eyebrow, heading, intro, children, id }: Props) {
  return (
    <section id={id} className="glass-veil">
      <Container className="py-14 sm:py-18">
        {eyebrow || heading || intro ? (
          <div className="mb-8 flex flex-col gap-3">
            {eyebrow ? <p className="label text-accent-readable">{eyebrow}</p> : null}
            {heading ? (
              <h2 className="max-w-[30ch] text-[clamp(1.5rem,3.3vw,2.2rem)]">
                {heading}
              </h2>
            ) : null}
            {intro ? (
              <p className="max-w-[64ch] text-body-soft">{intro}</p>
            ) : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
