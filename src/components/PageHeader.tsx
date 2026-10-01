import type { ReactNode } from "react";
import Container from "./Container";

type Props = {
  eyebrow?: string;
  headline: string;
  intro?: string;
  children?: ReactNode;
};

/**
 * The band at the top of a page.
 *
 * It carries no ground of its own. As the first section it sits at the deepest
 * point of the shade ramp (see globals.css), which is where gold reads best —
 * 6.99:1 for the eyebrow. The former light/dark `tone` prop is gone: every
 * ground on the site is dark now, so there was no light variant left to pick.
 */
export default function PageHeader({ eyebrow, headline, intro, children }: Props) {
  return (
    <section className="executive-wood border-b border-rule-dark text-on-dark">
      <Container className="py-14 sm:py-20">
        {eyebrow ? (
          <p className="label text-accent-readable">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 max-w-[22ch] text-[clamp(2rem,5vw,3.3rem)]">
          {headline}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-[62ch] text-[1.05rem] text-on-dark-soft">
            {intro}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
