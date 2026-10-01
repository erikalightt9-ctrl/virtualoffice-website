/* Candidate palette sampled from the brand artwork, checked for WCAG before
   any of it is written into globals.css. */
const hex = (h) => [1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const lum = ([r,g,b]) => { const f=c=>{c/=255;return c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4;}; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
const ratio = (a,b) => { const [hi,lo]=[lum(hex(a)),lum(hex(b))].sort((x,y)=>y-x); return (hi+0.05)/(lo+0.05); };

const GROUNDS = {
  "crimson-1 deepest": "#3D0708",
  "crimson-2        ": "#560405",
  "crimson-3        ": "#7C0507",
  "crimson-4 signature": "#870507",
  "red       brighter": "#A80407",
};
const TEXT = {
  "ivory      ": "#FDFBF7",
  "ivory warm ": "#F6E8D8",
  "soft       ": "#EBD5BC",
  "faint      ": "#D8B894",
  "gold light ": "#F7C679",
  "gold       ": "#E0A94E",
  "gold deep  ": "#C77837",
};

console.log("\n  text contrast on each ground (AA needs 4.5 for body, 3.0 for large)\n");
const names = Object.keys(TEXT);
console.log("  ground".padEnd(22) + names.map(n=>n.trim().padStart(11)).join(""));
for (const [gn, gv] of Object.entries(GROUNDS)) {
  const row = names.map(n => {
    const r = ratio(TEXT[n], gv);
    const mark = r >= 4.5 ? " " : r >= 3 ? "*" : "!";
    return (r.toFixed(2) + mark).padStart(11);
  }).join("");
  console.log("  " + gn.padEnd(20) + row);
}
console.log("\n  blank = AA   * = large text only   ! = fails\n");
