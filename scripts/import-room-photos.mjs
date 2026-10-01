/**
 * Import the five room photographs.
 *
 *   node scripts/import-room-photos.mjs <folder>
 *   node scripts/import-room-photos.mjs a.jpg b.jpg c.jpg d.jpg e.jpg
 *
 * Give it a folder and it takes the five image files inside, sorted by name.
 * Give it five paths and it takes them in the order written.
 *
 * Either way the files are matched to rooms IN THE ORDER BELOW, then resized
 * to 2000px on the long edge at quality 80 and written into
 * public/photos/rooms/ under the names the site expects. Originals are left
 * untouched.
 *
 * The site sizes each card from the imported file, so whatever shape comes out
 * of here is the shape the card takes. The printed ratios are informational —
 * no code needs changing to match them.
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/* The order the photographs were supplied in. Change this if you hand the
   script a different order.
 *
 * `trim` removes a fraction of each edge BEFORE resizing — the crop is baked
 * into the imported file, so the site never has to compensate for it. Values
 * are fractions of the source dimension, so 0.18 means "take 18% off".
 * Anything not listed is imported whole.
 */
const ORDER = [
  { file: "siargao.jpg", describe: "Siargao — oak floor, timber battens, pendant lamps (10-12)" },
  { file: "palawan.jpg", describe: "Palawan — white/grey room, glass writing wall (6-8)" },
  { file: "tea-room.jpg", describe: "Tea Room — dark timber table and benches, slatted wall" },
  {
    file: "cubicle.jpg",
    describe: "Cubicle — the booth, orange seats, grey acoustic backs",
    /* The top fifth of this frame is background rather than booth: a mirrored
       strip, the pink wall beyond, a green cabinet and another room through
       the glass. Cutting it lands the top edge on the acoustic panels and
       makes the booth the whole subject. The bottom stays — the dark teal
       outer backs in the near corners are what frame the shot. */
    trim: { top: 0.18 },
  },
  { file: "boracay.jpg", describe: "Boracay — peach accent wall, light timber table (6-8)" },
];

const LONG_EDGE = 2000;
const QUALITY = 80;
const IMAGE_RE = /\.(jpe?g|png|webp|avif|tiff?|heic)$/i;

const OUT_DIR = path.join(process.cwd(), "public", "photos", "rooms");

async function collectInputs(args) {
  if (args.length === 0) {
    throw new Error(
      "Give me a folder containing the five photographs, or five file paths.",
    );
  }

  if (args.length === 1) {
    const target = path.resolve(args[0]);
    const stat = await fs.stat(target).catch(() => null);
    if (!stat) throw new Error(`Not found: ${target}`);
    if (!stat.isDirectory()) {
      throw new Error(
        "One argument must be a folder. Pass five file paths to import individual files.",
      );
    }
    const entries = (await fs.readdir(target))
      .filter((name) => IMAGE_RE.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (entries.length !== ORDER.length) {
      throw new Error(
        `Found ${entries.length} image file(s) in ${target}, expected ${ORDER.length}.\n` +
          `Files seen: ${entries.join(", ") || "(none)"}`,
      );
    }
    return entries.map((name) => path.join(target, name));
  }

  if (args.length !== ORDER.length) {
    throw new Error(`Expected ${ORDER.length} file paths, got ${args.length}.`);
  }
  return args.map((p) => path.resolve(p));
}

async function main() {
  const inputs = await collectInputs(process.argv.slice(2));
  await fs.mkdir(OUT_DIR, { recursive: true });

  console.log(`\nWriting into ${OUT_DIR}\n`);

  for (const [i, input] of inputs.entries()) {
    const { file, describe, trim } = ORDER[i];
    const out = path.join(OUT_DIR, file);

    console.log(`${file}`);

    /* .rotate() first so EXIF orientation is applied before we measure or
       crop; otherwise a phone photograph would be trimmed on the wrong edge. */
    const image = sharp(input).rotate();
    const meta = await image.metadata();

    if (trim) {
      const { width, height } = await image.clone().toBuffer({ resolveWithObject: true })
        .then(({ info }) => info);
      const left = Math.round(width * (trim.left ?? 0));
      const top = Math.round(height * (trim.top ?? 0));
      const cropWidth = Math.round(width * (1 - (trim.left ?? 0) - (trim.right ?? 0)));
      const cropHeight = Math.round(height * (1 - (trim.top ?? 0) - (trim.bottom ?? 0)));
      if (cropWidth < 1 || cropHeight < 1) {
        throw new Error(`Trim for ${file} removes the whole image.`);
      }
      image.extract({ left, top, width: cropWidth, height: cropHeight });
      console.log(
        `   crop  ${width}x${height} -> ${cropWidth}x${cropHeight}` +
          `  (trimmed ${Object.entries(trim).map(([k, v]) => `${Math.round(v * 100)}% ${k}`).join(", ")})`,
      );
    }

    await image
      .resize({
        width: LONG_EDGE,
        height: LONG_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(out);

    const after = await sharp(out).metadata();
    const { size } = await fs.stat(out);
    const ratio = (after.width / after.height).toFixed(2);
    const shape = after.width >= after.height ? "landscape" : "portrait";

    console.log(`   from  ${path.basename(input)}  (${meta.width}x${meta.height})`);
    console.log(
      `   to    ${after.width}x${after.height}  ${shape}  ratio ${ratio}  ${(size / 1024).toFixed(0)} KB`,
    );
    console.log(`   room  ${describe}\n`);
  }

  console.log(
    "Done. The cards take their shape from these files automatically, so the\n" +
      "ratios above are what the site will use — no code change needed.\n",
  );
}

main().catch((error) => {
  console.error(`\n${error.message}\n`);
  process.exitCode = 1;
});
