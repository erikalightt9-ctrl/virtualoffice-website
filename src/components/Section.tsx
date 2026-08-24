import type { ReactNode } from "react";
import Container from "./Container";

type Props = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  children: ReactNode;
  /** Alternate ground so consecutive sections separate visually. */
  tone?: "bone" | "surface";
  id?: string;
};

export default function Section({
  eyebrow,
  heading,
  intro,
  children,
  tone = "bone",
  id,
}: Props) {
  return (
    <section
      id={id}
      className={`border-t border-rule ${tone === "surface" ? "bg-surface" : "bg-bone"}`}
    >
      <Container className="py-14 sm:py-18">
        {eyebrow || heading || intro ? (
          <div className="mb-8 flex flex-col gap-3">
            {eyebrow ? <p className="label text-clay">{eyebrow}</p> : null}
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
