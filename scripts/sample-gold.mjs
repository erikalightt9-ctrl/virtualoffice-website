import sharp from "sharp";
const hex = (r,g,b) => "#" + [r,g,b].map(c=>Math.round(c).toString(16).padStart(2,"0")).join("").toUpperCase();

for (const f of process.argv.slice(2)) {
  const meta = await sharp(f).metadata();
  const { data } = await sharp(f).resize(600, null, { fit: "inside" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const gold = new Map(), red = new Map();
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i+1], b = data[i+2];
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    const sat = max === 0 ? 0 : (max-min)/max;
    // gold proper: warm, mid-to-bright, clearly not white, green between red and blue
    if (r > 150 && r < 255 && g > 100 && g < 220 && b < 140 && sat > 0.35 && (r-g) < 90) {
      const k = `${r>>4},${g>>4},${b>>4}`;
      const e = gold.get(k) || {n:0,r:0,g:0,b:0}; e.n++; e.r+=r; e.g+=g; e.b+=b; gold.set(k,e);
    }
    // saturated reds, by frequency
    if (r > 120 && sat > 0.7 && g < r*0.4 && b < r*0.4) {
      const k = `${r>>4},${g>>4},${b>>4}`;
      const e = red.get(k) || {n:0,r:0,g:0,b:0}; e.n++; e.r+=r; e.g+=g; e.b+=b; red.set(k,e);
    }
  }
  const top = (m,n=4) => [...m.values()].sort((a,b)=>b.n-a.n).slice(0,n).map(t=>`${hex(t.r/t.n,t.g/t.n,t.b/t.n)} (${t.n})`);
  console.log(`\n  ${f.split(/[\/]/).pop()}  native ${meta.width}x${meta.height}`);
  console.log(`    gold, most common : ${top(gold).join("  ")}`);
  console.log(`    red,  most common : ${top(red).join("  ")}`);
}
