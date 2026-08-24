import type { ReactNode } from "react";
import Container from "./Container";

type Props = {
  eyebrow?: string;
  headline: string;
  intro?: string;
  children?: ReactNode;
  /** Dark petrol band instead of the light ground. */
  tone?: "light" | "dark";
};

export default function PageHeader({
  eyebrow,
  headline,
  intro,
  children,
  tone = "light",
}: Props) {
  const dark = tone === "dark";

  return (
    <section
      className={
        dark
          ? "border-b border-rule-dark bg-ink text-on-dark"
          : "border-b border-rule bg-surface"
      }
    >
      <Container className="py-14 sm:py-20">
        {eyebrow ? (
          <p className={`label ${dark ? "text-on-dark-soft" : "text-clay"}`}>
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-4 max-w-[22ch] text-[clamp(2rem,5vw,3.3rem)]">
          {headline}
        </h1>
        {intro ? (
          <p
            className={`mt-5 max-w-[62ch] text-[1.05rem] ${
              dark ? "text-on-dark-soft" : "text-body-soft"
            }`}
          >
            {intro}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
