/* Pulls the real palette out of the supplied brand artwork.
   Buckets pixels, reports the most common colours, and separately finds the
   richest red and the brightest gold so the tokens come from the artwork
   rather than from an eyeballed guess. */
import sharp from "sharp";

const files = process.argv.slice(2);
const hex = (r, g, b) => "#" + [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("").toUpperCase();

for (const f of files) {
  const { data, info } = await sharp(f).resize(400, null, { fit: "inside" }).removeAlpha().raw()
    .toBuffer({ resolveWithObject: true });

  const buckets = new Map();
  let bestRed = null, bestGold = null;

  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const key = `${r >> 4},${g >> 4},${b >> 4}`;
    const e = buckets.get(key) || { n: 0, r: 0, g: 0, b: 0 };
    e.n++; e.r += r; e.g += g; e.b += b;
    buckets.set(key, e);

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    /* red: red channel dominant, green and blue both low and close */
    if (r > 90 && sat > 0.6 && g < r * 0.45 && b < r * 0.45) {
      const score = r * sat;
      if (!bestRed || score > bestRed.score) bestRed = { score, c: [r, g, b] };
    }
    /* gold: warm, bright, green well above blue */
    if (r > 150 && g > 110 && b < g * 0.75 && sat > 0.3) {
      const score = (r + g) / 2;
      if (!bestGold || score > bestGold.score) bestGold = { score, c: [r, g, b] };
    }
  }

  const top = [...buckets.values()].sort((a, b) => b.n - a.n).slice(0, 8);
  const px = info.width * info.height;
  console.log(`\n  ${f.split(/[\/]/).pop()}  (${info.width}x${info.height})\n`);
  for (const t of top) {
    console.log(`    ${hex(t.r / t.n, t.g / t.n, t.b / t.n)}   ${((t.n / px) * 100).toFixed(1).padStart(5)}% of frame`);
  }
  if (bestRed) console.log(`\n    richest red   ${hex(...bestRed.c)}`);
  if (bestGold) console.log(`    brightest gold ${hex(...bestGold.c)}`);
}
