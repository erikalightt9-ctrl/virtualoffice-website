/**
 * Abstract cinematic background — dark espresso brown and burnt amber.
 *
 *   node scripts/make-hero-background.mjs
 *
 * Writes an SVG and renders PNGs from it:
 *   public/backgrounds/luxury-smoke.svg        vector source, ~4 KB
 *   public/backgrounds/luxury-smoke.png        2560x1440 lossless master
 *   public/backgrounds/luxury-smoke-2560.webp  for the web
 *   public/backgrounds/luxury-smoke-1920.webp  for the web
 *   public/backgrounds/luxury-smoke-1920.jpg   fallback
 *
 * Built as vector on purpose. The whole image is gradients, blur and a few
 * hairlines, so vector stays sharp at any size, weighs almost nothing, and
 * every value below can be adjusted without repainting anything.
 *
 * TUNING — the knobs worth touching are all in CONFIG:
 *   horizon      where the floor meets the atmosphere (fraction of height)
 *   beam         angle, width, softness and strength of the diagonal light
 *   glow         the amber bloom sitting on the horizon
 *   floorLines   how many perspective streaks converge on the vanishing point
 *   vignette     how hard the outer edges fall away
 *   grain        film grain, which is what stops dark gradients banding
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const W = 2560;
const H = 1440;

const CONFIG = {
  horizon: 0.63,

  /* Palette: espresso base, copper mid, golden amber highlight. */
  colour: {
    deepest: "#150A06",
    espresso: "#3D0708",
    brown: "#7C0507",
    copper: "#C77837",
    amber: "#F7C679",
    amberBright: "#DCBE84",
    burgundy: "#870507",
    red: "#A80407",
  },

  beam: {
    angle: -32,        // degrees; negative sweeps down-left
    width: 760,        // cross-axis thickness before blur
    blur: 130,
    opacity: 0.55,
  },

  glow: { rx: 0.42, ry: 0.13, blur: 90, opacity: 0.55 },

  floorLines: { count: 17, spread: 2.6, opacity: 0.16, blur: 2.2 },

  vignette: { inner: 0.42, opacity: 0.88 },

  grain: { frequency: 0.9, opacity: 0.055 },
};

function buildSvg() {
  const c = CONFIG.colour;
  const horizonY = Math.round(H * CONFIG.horizon);
  const cx = Math.round(W * 0.5);

  /* Perspective streaks: every line starts at the vanishing point on the
     horizon and runs to the bottom edge, so they converge by construction
     rather than by eye. */
  const vpX = cx;
  const lines = [];
  for (let i = 0; i < CONFIG.floorLines.count; i++) {
    const t = i / (CONFIG.floorLines.count - 1) - 0.5; // -0.5 .. 0.5
    const endX = vpX + t * W * CONFIG.floorLines.spread;
    /* Fade the fan out towards its edges so it reads as light, not as a grid. */
    const falloff = 1 - Math.abs(t) * 1.7;
    if (falloff <= 0) continue;
    const op = (CONFIG.floorLines.opacity * falloff).toFixed(3);
    lines.push(
      `<line x1="${vpX}" y1="${horizonY}" x2="${endX.toFixed(0)}" y2="${H}" stroke="url(#streak)" stroke-width="${(1.6 + Math.abs(t) * 3).toFixed(1)}" opacity="${op}"/>`,
    );
  }

  const beam = CONFIG.beam;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Atmosphere: warm centre, falling to near-black at the edges. Offset
         right of centre so the upper-left stays the darkest quadrant. -->
    <radialGradient id="base" cx="60%" cy="52%" r="80%">
      <stop offset="0%"   stop-color="${c.brown}"/>
      <stop offset="38%"  stop-color="${c.espresso}"/>
      <stop offset="100%" stop-color="${c.deepest}"/>
    </radialGradient>

    <!-- The diagonal beam, bright along its spine and gone at its edges. -->
    <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${c.amber}" stop-opacity="0"/>
      <stop offset="42%"  stop-color="${c.amberBright}" stop-opacity="0.85"/>
      <stop offset="58%"  stop-color="${c.amber}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="${c.copper}" stop-opacity="0"/>
    </linearGradient>

    <!-- Amber bloom resting on the horizon. -->
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="${c.amberBright}" stop-opacity="0.95"/>
      <stop offset="45%"  stop-color="${c.copper}" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="${c.copper}" stop-opacity="0"/>
    </radialGradient>

    <!-- Floor: catches light at the horizon, falls to black at the bottom. -->
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${c.brown}" stop-opacity="0.62"/>
      <stop offset="22%"  stop-color="${c.espresso}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${c.deepest}" stop-opacity="1"/>
    </linearGradient>

    <!-- The reflection hanging below the glow. Strongest just under the
         horizon and dissolving downward, the way a polished floor behaves. -->
    <linearGradient id="reflect" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${c.amberBright}" stop-opacity="0.5"/>
      <stop offset="30%"  stop-color="${c.copper}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${c.copper}" stop-opacity="0"/>
    </linearGradient>

    <linearGradient id="horizonBand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${c.copper}" stop-opacity="0"/>
      <stop offset="50%"  stop-color="${c.copper}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${c.copper}" stop-opacity="0"/>
    </linearGradient>

    <linearGradient id="streak" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${c.amberBright}" stop-opacity="0"/>
      <stop offset="14%"  stop-color="${c.amberBright}" stop-opacity="0.55"/>
      <stop offset="55%"  stop-color="${c.copper}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${c.copper}" stop-opacity="0"/>
    </linearGradient>

    <radialGradient id="vignette" cx="50%" cy="50%" r="72%">
      <stop offset="0%"                       stop-color="#000" stop-opacity="0"/>
      <stop offset="${CONFIG.vignette.inner * 100}%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%"                     stop-color="#000" stop-opacity="${CONFIG.vignette.opacity}"/>
    </radialGradient>

    <filter id="beamBlur" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="${beam.blur}"/>
    </filter>
    <filter id="smokeBlur" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="210"/>
    </filter>
    <filter id="glowBlur" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="${CONFIG.glow.blur}"/>
    </filter>
    <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${CONFIG.floorLines.blur}"/>
    </filter>

    <!-- Grain. Dark smooth gradients band badly on 8-bit displays; a little
         monochrome noise breaks the banding up and reads as film. -->
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${CONFIG.grain.frequency}" numOctaves="3" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="${c.deepest}"/>
  <rect width="${W}" height="${H}" fill="url(#base)"/>

  <!-- Burgundy and red smoke. Very large, very soft, and deliberately off-axis
       from the gold beam so the two never stack into a muddy centre. -->
  <g filter="url(#smokeBlur)">
    <ellipse cx="${W*0.20}" cy="${H*0.30}" rx="${W*0.34}" ry="${H*0.30}" fill="${c.burgundy}" opacity="0.50"/>
    <ellipse cx="${W*0.80}" cy="${H*0.70}" rx="${W*0.30}" ry="${H*0.26}" fill="${c.red}" opacity="0.32"/>
    <ellipse cx="${W*0.52}" cy="${H*0.86}" rx="${W*0.40}" ry="${H*0.20}" fill="${c.burgundy}" opacity="0.34"/>
    <ellipse cx="${W*0.90}" cy="${H*0.16}" rx="${W*0.22}" ry="${H*0.20}" fill="${c.red}" opacity="0.20"/>
  </g>

  <!-- Diagonal beam, upper-right to centre-left. -->
  <g filter="url(#beamBlur)" opacity="${beam.opacity}">
    <g transform="translate(${W * 0.62} ${H * 0.30}) rotate(${beam.angle})">
      <rect x="${-W}" y="${-beam.width / 2}" width="${W * 2.2}" height="${beam.width}" fill="url(#beamGrad)"/>
    </g>
  </g>

  <!-- Horizon bloom. -->
  <ellipse cx="${cx}" cy="${horizonY}" rx="${W * CONFIG.glow.rx}" ry="${H * CONFIG.glow.ry}"
           fill="url(#glow)" filter="url(#glowBlur)" opacity="${CONFIG.glow.opacity}"/>

  <!-- Softens the seam where the floor meets the atmosphere. Without this the
       floor rect reads as a pasted rectangle right across the frame. -->
  <rect x="0" y="${horizonY - 90}" width="${W}" height="180" fill="url(#horizonBand)" filter="url(#glowBlur)" opacity="0.5"/>

  <!-- Reflective floor. -->
  <rect x="0" y="${horizonY}" width="${W}" height="${H - horizonY}" fill="url(#floor)"/>

  <!-- Perspective streaks converging on the vanishing point. -->
  <g filter="url(#softBlur)">
    ${lines.join("\n    ")}
  </g>

  <!-- Amber reflection falling from the centre. -->
  <ellipse cx="${cx}" cy="${horizonY + (H - horizonY) * 0.34}"
           rx="${W * 0.26}" ry="${(H - horizonY) * 0.62}"
           fill="url(#reflect)" filter="url(#glowBlur)" opacity="0.8"/>

  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="${CONFIG.grain.opacity}" style="mix-blend-mode:overlay"/>
</svg>`;
}

async function main() {
  const dir = path.join(process.cwd(), "public", "backgrounds");
  await fs.mkdir(dir, { recursive: true });

  const svg = buildSvg();
  const svgPath = path.join(dir, "luxury-smoke.svg");
  await fs.writeFile(svgPath, svg, "utf8");

  const buf = Buffer.from(svg);

  /* PNG is a poor fit for a smooth gradient — it cannot dither a 24-bit ramp
     cheaply, so it lands near a megabyte. WebP and JPEG are an order of
     magnitude smaller here with no visible loss, and the SVG itself is smaller
     again. PNG is kept only as a lossless master for editing. */
  const targets = [
    ["luxury-smoke.png", W, "png"],
    ["luxury-smoke-2560.webp", W, "webp"],
    ["luxury-smoke-1920.webp", 1920, "webp"],
    ["luxury-smoke-1920.jpg", 1920, "jpeg"],
  ];

  for (const [name, width, format] of targets) {
    const out = path.join(dir, name);
    let pipe = sharp(buf, { density: 96 }).resize({ width });
    if (format === "png") pipe = pipe.png({ compressionLevel: 9 });
    if (format === "webp") pipe = pipe.webp({ quality: 88, effort: 6 });
    if (format === "jpeg") pipe = pipe.jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" });
    await pipe.toFile(out);
    const { size } = await fs.stat(out);
    const meta = await sharp(out).metadata();
    console.log(`  ${name.padEnd(28)} ${meta.width}x${meta.height}  ${(size / 1024).toFixed(0)} KB`);
  }

  const { size } = await fs.stat(svgPath);
  console.log(`  ${"luxury-smoke.svg".padEnd(28)} vector       ${(size / 1024).toFixed(1)} KB`);
}

main().catch((e) => {
  console.error(`\n${e.message}\n`);
  process.exitCode = 1;
});
