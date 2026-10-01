/* Pull the PDMN Virtual Office lockup out of the supplied key visual.
   The badge sits in a white rounded panel across the top of the artwork. */
import sharp from "sharp";
const src = process.argv[2];
const meta = await sharp(src).metadata();
console.log(`  source ${meta.width}x${meta.height}`);

/* Scan the top third for the bright panel: rows whose pixels are mostly near-white. */
const { data, info } = await sharp(src).extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.15) })
  .removeAlpha().raw().toBuffer({ resolveWithObject: true });

const bright = (x, y) => {
  const i = (y * info.width + x) * 3;
  return data[i] > 225 && data[i + 1] > 215 && data[i + 2] > 205;
};
let top = null, bottom = null, left = info.width, right = 0;
for (let y = 0; y < info.height; y++) {
  let n = 0, lo = info.width, hi = 0;
  for (let x = 0; x < info.width; x++) if (bright(x, y)) { n++; if (x < lo) lo = x; if (x > hi) hi = x; }
  if (n > info.width * 0.25) {
    if (top === null) top = y;
    bottom = y;
    if (lo < left) left = lo;
    if (hi > right) right = hi;
  }
}
console.log(`  white panel: x ${left}-${right}, y ${top}-${bottom}`);
if (top === null) { console.log("  no panel found"); process.exit(1); }
const pad = 4;
await sharp(src)
  .extract({ left: left + pad, top: top + pad, width: right - left - pad * 2, height: bottom - top - pad * 2 })
  .png()
  .toFile("public/brand-logo-source.png");
const out = await sharp("public/brand-logo-source.png").metadata();
console.log(`  cropped -> public/brand-logo-source.png  ${out.width}x${out.height}`);
