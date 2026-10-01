/**
 * Fail when a GROUND token is used as a TEXT colour.
 *
 * --pdmn-ink / ink-2 / ink-3 / bone / surface / surface-2 are background
 * colours. Tailwind happily builds `text-ink` from them, and it paints text
 * the same near-black crimson as the surface behind it: invisible, with no
 * error from the build, the linter or the type checker.
 *
 * This shipped once — eight headings across the homepage, pricing cards and
 * testimonials were painted #3D0708 on a #3D0708 ground.
 *
 *   node scripts/check-ground-as-text.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";

const GROUNDS = ["ink", "ink-2", "ink-3", "bone", "surface", "surface-2", "crimson"];
const pattern = new RegExp(`\btext-(${GROUNDS.join("|")})\b`, "g");

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (/\.(tsx|ts|css)$/.test(e.name)) yield full;
  }
}

const hits = [];
for await (const f of walk("src")) {
  const text = await fs.readFile(f, "utf8");
  text.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(pattern)) {
      hits.push({ file: path.relative(process.cwd(), f), line: i + 1, cls: m[0] });
    }
  });
}

if (!hits.length) {
  console.log("\n  no ground token used as a text colour.\n");
} else {
  console.log("\n  A ground colour is being used for text — it will be invisible:\n");
  for (const h of hits) console.log(`    ${h.file}:${h.line}  ${h.cls}`);
  console.log("\n  Use text-body, text-body-soft or text-on-dark instead.\n");
  process.exitCode = 1;
}
