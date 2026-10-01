/* Shade-shifter contrast audit.
   Each band is a translucent wash over the body scrim over the smoke photo.
   Worst case = the brightest pixel of the photo, since that lifts the ground
   most and costs the most contrast. */
import sharp from "sharp";

const BG = "public/backgrounds/luxury-smoke-2560.webp";

const over = (fg, a, bg) => fg.map((c, i) => c * a + bg[i] * (1 - a));
const lum = ([r, g, b]) => {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

const { data } = await sharp(BG).removeAlpha().raw().toBuffer({ resolveWithObject: true });
let bright = [0, 0, 0], bl = -1;
for (let i = 0; i < data.length; i += 3) {
  const px = [data[i], data[i + 1], data[i + 2]];
  const l = lum(px);
  if (l > bl) { bl = l; bright = px; }
}
/* body scrim: linear-gradient(rgb(61 7 8 / .80), rgb(61 7 8 / .88)) — take .80, the weaker end */
const ground = over(hex("#3D0708"), 0.80, bright);

const TEXT = [["ivory", hex("#FDFBF7")], ["soft", hex("#F6E8D8")], ["faint", hex("#E3C9A8")], ["gold", hex("#F7C679")]];

/* candidate bands: [label, wash colour, alpha] */
const BANDS = [
  ["1 hero      espresso deepest", "#3D0708", 0.86],
  ["2 warmed espresso          ", "#560405", 0.80],
  ["3 oak shadow               ", "#7C0507", 0.76],
  ["4 burgundy                 ", "#870507", 0.80],
  ["5 rich red  (CTA band)     ", "#A80407", 0.88],
];

console.log(`\n  brightest photo pixel rgb(${bright.join(", ")})  ->  scrimmed ground rgb(${ground.map(Math.round).join(", ")})\n`);
for (const [label, h, a] of BANDS) {
  const bg = over(hex(h), a, ground);
  const line = TEXT.map(([n, fg]) => {
    const r = ratio(fg, bg);
    return `${n} ${r.toFixed(2)}${r >= 4.5 ? "" : r >= 3 ? "*" : "!"}`;
  }).join("   ");
  console.log(`  ${label}  rgb(${bg.map(Math.round).join(",").padEnd(11)})  ${line}`);
}
console.log("\n  blank = AA (4.5+)   * = large text only (3+)   ! = fails\n");

/* --- the page-header band -------------------------------------------------
   .executive-wood lays two washes over the shade band. Each one peaks in its
   own corner, so the band has two worst cases rather than one: the gold
   reflection lifts the top-left (where the gold eyebrow sits), and the
   burgundy pool deepens the bottom-right. Both are checked. */
const REFLECT = [199, 122, 58];
const BURGUNDY = [104, 28, 42];

const header = [
  ["hdr top-left   gold wash peak ", over(REFLECT, 0.14, over(hex("#3D0708"), 0.86, ground))],
  ["hdr bottom-rt  burgundy peak  ", over(BURGUNDY, 0.38, over(hex("#560405"), 0.80, ground))],
];

console.log("  page header (.executive-wood)\n");
for (const [label, bg] of header) {
  const line = TEXT.map(([n, fg]) => {
    const r = ratio(fg, bg);
    return `${n} ${r.toFixed(2)}${r >= 4.5 ? "" : r >= 3 ? "*" : "!"}`;
  }).join("   ");
  console.log(`  ${label}  rgb(${bg.map(Math.round).join(",").padEnd(11)})  ${line}`);
}
console.log("");
