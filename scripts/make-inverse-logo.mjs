/**
 * Build a light-on-dark variant of the PDMN Virtual Office lockup.
 *
 *   node scripts/make-inverse-logo.mjs
 *
 * The supplied artwork sets "VIRTUAL OFFICE" in near-black, which disappears
 * against the dark header and footer grounds. This lifts only those dark,
 * desaturated pixels to a light tone and leaves the gold and red of the mark
 * and the "PDMN" wordmark untouched.
 *
 * Reads   public/pdmn-logo.png
 * Writes  public/pdmn-logo-inverse.png
 *
 * The original is never modified. Re-run it after replacing the source file.
 * If PDMN supplies a real inverse lockup, drop it in at that path and delete
 * this script — hand-made artwork beats a recolour every time.
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.join(process.cwd(), "public", "pdmn-logo.png");
const OUT = path.join(process.cwd(), "public", "pdmn-logo-inverse.png");

/* A pixel is "dark type" when it is dark and close to neutral. Gold sits around
   (200,160,70) and red around (190,30,40) — both far from neutral, so both are
   left alone. */
const MAX_LUMA = 140;      // 0-255; the grey type measures well under this
const MAX_CHROMA = 34;     // max(r,g,b) - min(r,g,b); neutral greys are tiny
const TARGET = [242, 239, 233]; // the site's --pdmn-on-dark

async function main() {
  const src = sharp(SRC).ensureAlpha();
  const { width, height } = await src.metadata();
  const { data } = await src.raw().toBuffer({ resolveWithObject: true });

  let recoloured = 0;
  let opaque = 0;

  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a < 8) continue;
    opaque++;

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);

    if (luma <= MAX_LUMA && chroma <= MAX_CHROMA) {
      /* Set the colour outright rather than blending by darkness.
         The artwork sits on a transparent background, so the type's
         anti-aliasing is carried entirely by the ALPHA channel — every glyph
         pixel is roughly the same dark grey, and softness comes from alpha,
         which we do not touch. Blending by darkness (the first attempt) left
         solid glyph interiors at mid-grey, still unreadable on a dark ground. */
      data[i] = TARGET[0];
      data[i + 1] = TARGET[1];
      data[i + 2] = TARGET[2];
      recoloured++;
    }
  }

  await sharp(data, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  const { size } = await fs.stat(OUT);
  const pct = ((recoloured / opaque) * 100).toFixed(1);

  console.log(`\n${path.basename(OUT)}`);
  console.log(`   ${width}x${height}  ${(size / 1024).toFixed(0)} KB`);
  console.log(`   recoloured ${recoloured.toLocaleString()} of ${opaque.toLocaleString()} opaque pixels (${pct}%)`);
  console.log(
    pct > 40
      ? "   WARNING: that is a large share — check the gold and red survived.\n"
      : "   Gold and red left untouched.\n",
  );
}

main().catch((error) => {
  console.error(`\n${error.message}\n`);
  process.exitCode = 1;
});
