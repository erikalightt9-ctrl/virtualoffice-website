/* The gold CTA label must clear AA over every stop of its gradient. */
const hex = (h) => [1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const lum = ([r,g,b]) => { const f=c=>{c/=255;return c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4;}; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
const ratio=(a,b)=>{const[hi,lo]=[lum(hex(a)),lum(hex(b))].sort((x,y)=>y-x);return (hi+0.05)/(lo+0.05);};
const LABEL = "#3D0708";
const stops = { "rest  pale  #FFF1CD":"#FFF1CD", "rest  mid   #E0A94E":"#E0A94E", "rest  warm  #F7C679":"#F7C679",
                "hover pale  #FFF8E4":"#FFF8E4", "hover mid   #F0BB63":"#F0BB63", "hover warm  #FFD894":"#FFD894" };
console.log(`\n  label ${LABEL} on the gold gradient\n`);
for (const [n,v] of Object.entries(stops)) {
  const r = ratio(LABEL, v);
  console.log(`    ${n}   ${r.toFixed(2)}:1   ${r>=4.5?"AA":r>=3?"large only":"FAIL"}`);
}
console.log("");
