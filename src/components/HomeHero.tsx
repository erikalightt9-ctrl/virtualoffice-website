import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { publishedAddressTiers } from "@/content/pricing";
import { site } from "@/content/site";

/**
 * The homepage opening.
 *
 * This replaced a ten-scene carousel that rotated every 6.5 seconds. The
 * scenes largely restated the same promise, so a visitor had to wait through
 * motion to learn something they could have read at once — and anyone who
 * looked away mid-rotation came back to a different sentence. One fixed
 * message, legible the moment the page paints, is worth more than ten that
 * take a minute to cycle.
 *
 * NO MOTION AT ALL HERE, deliberately. The photograph is the visual interest.
 * Anything that moves in a hero competes with the sentence the hero exists to
 * deliver.
 *
 * The handwritten accent appears exactly once, on the second line. It was on
 * ten headlines before; at that frequency it stopped being an accent and
 * became the body face of the page.
 */

type Props = {
  /** Reception photograph, resolved by the page so this stays presentational. */
  image: string;
};

export default function HomeHero({ image }: Props) {
  /* The lowest published monthly price, read from the pricing data rather than
     written here — a number typed into a hero is a number that goes stale the
     first time rates change. */
  const monthly = publishedAddressTiers
    .map((t) => t.priceMonthly)
    .filter((p): p is number => typeof p === "number");
  const from = monthly.length ? Math.min(...monthly) : null;

  return (
    <section className="relative isolate overflow-hidden bg-ink text-on-dark">
      <Image
        src={image}
        alt="PDMN Virtual Office reception at 104 Paseo de Roxas, Makati"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      {/* Two scrims, not one. The horizontal pass keeps the left column dark
          enough for ivory text wherever the photograph is bright; the vertical
          pass seats the band on the section below it. A single flat overlay
          dark enough to guarantee contrast would have hidden the room.

          STACKING: the photograph is pushed to -z-10 and this sits at the
          default level, so it covers the image; the Container below is
          `relative`, which puts the type above both. Giving this scrim a
          negative z-index instead buries it UNDER the photograph, where it
          dims nothing and the body copy washes out — which is exactly what
          happened on the first pass. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgb(61 7 8 / 0.95) 0%, rgb(61 7 8 / 0.86) 38%, rgb(61 7 8 / 0.45) 72%, rgb(61 7 8 / 0.30) 100%), linear-gradient(to bottom, rgb(61 7 8 / 0.30), rgb(61 7 8 / 0.10) 45%, rgb(61 7 8 / 0.80))",
        }}
      />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-[46rem]">
          <p className="label text-gold">Virtual office in Makati</p>

          <h1 className="mt-5 text-[clamp(2.4rem,5.6vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            <span className="block">Your business.</span>
            <span className="script-accent mt-1 block font-normal leading-[1.25] tracking-normal text-[#FFFDF8]">
              A Makati address.
            </span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-[1.05rem] leading-[1.75] text-on-dark-soft">
            A professional business address at {site.address.line1},{" "}
            {site.address.village}, with on-site document receipt and
            registered-address options for eligible businesses.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/pricing"
              className="cta-shine inline-flex min-h-12 items-center justify-center rounded-lg border border-gold/45 bg-[#870507] px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.09em] text-on-dark hover:bg-[#A80407] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Compare packages
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-ivory/40 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.09em] text-on-dark transition-colors hover:border-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              style={{ borderColor: "rgb(253 251 247 / 0.4)" }}
            >
              Speak with our team
            </Link>
          </div>

          {from ? (
            <p className="mt-7 text-[0.92rem] text-on-dark-soft">
              <span className="tnum font-semibold text-on-dark">
                From ₱{from.toLocaleString("en-PH")} per month
              </span>
              {/* Tax treatment and billing frequency are NOT stated here yet,
                  because they have not been confirmed. Saying "+ VAT" or
                  "inclusive" wrongly on the homepage is worse than saying
                  neither. Replace this clause the moment they are settled. */}
              <span className="block text-body-faint">
                Billing terms and any applicable tax are confirmed in writing
                before activation.
              </span>
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
