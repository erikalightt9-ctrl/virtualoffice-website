/**
 * Pre-launch audit. Crawls the running dev server and reports problems.
 *
 *   node scripts/audit.mjs [baseUrl]
 *
 * Checks, per page: status, <title> length, meta description length, exactly
 * one <h1>, heading-level skips, images missing alt, and every internal link
 * resolving. Then a repo-wide sweep for placeholder values that must not ship.
 *
 * Dev-only. Nothing here runs in the app.
 */

import fs from "node:fs/promises";
import path from "node:path";

const BASE = (process.argv[2] ?? "http://localhost:3002").replace(/\/$/, "");

const problems = [];
const note = (severity, page, message) =>
  problems.push({ severity, page, message });

async function sitemapRoutes() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .sort();
}

function textOf(html, re) {
  const m = html.match(re);
  return m ? m[1].replace(/\s+/g, " ").trim() : null;
}

async function auditPage(route) {
  const res = await fetch(`${BASE}${route}`);
  if (!res.ok) {
    note("high", route, `returned HTTP ${res.status}`);
    return { html: "", links: [] };
  }
  const html = await res.text();

  /* ---------------------------------------------------------- title */
  const title = textOf(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title) note("high", route, "no <title>");
  else if (title.length > 60)
    note("low", route, `title is ${title.length} chars (>60 truncates in search): "${title}"`);

  /* ---------------------------------------------------- description */
  const desc = textOf(html, /<meta name="description" content="([^"]*)"/i);
  if (!desc) note("medium", route, "no meta description");
  else if (desc.length > 160)
    note("low", route, `meta description is ${desc.length} chars (>160 truncates)`);
  else if (desc.length < 50)
    note("low", route, `meta description is only ${desc.length} chars`);

  /* --------------------------------------------------------- headings */
  const headings = [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map(
    (m) => ({ level: Number(m[1]), text: m[2].replace(/<[^>]+>/g, "").trim() }),
  );
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) note("medium", route, "no <h1>");
  if (h1s.length > 1)
    note("medium", route, `${h1s.length} <h1> elements (should be one)`);

  let previous = 0;
  for (const h of headings) {
    if (previous && h.level > previous + 1) {
      note(
        "low",
        route,
        `heading jumps h${previous} to h${h.level} ("${h.text.slice(0, 40)}")`,
      );
    }
    previous = h.level;
  }

  /* ------------------------------------------------------------ images */
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  for (const img of imgs) {
    if (!/\balt=/.test(img)) {
      const src = img.match(/src="([^"]*)"/)?.[1] ?? "(unknown)";
      note("medium", route, `<img> with no alt attribute: ${src.slice(0, 70)}`);
    }
  }

  /* ------------------------------------------------------------- links */
  const links = [...html.matchAll(/href="(\/[^"#?]*)"/g)]
    .map((m) => m[1])
    .filter((href) => !href.startsWith("//") && !/\.(xml|txt|svg|png|jpe?g|ico)$/.test(href));

  return { html, links: [...new Set(links)] };
}

async function main() {
  console.log(`\nAuditing ${BASE}\n`);

  const routes = await sitemapRoutes();
  console.log(`Sitemap lists ${routes.length} routes.\n`);

  const linkTargets = new Set();
  for (const route of routes) {
    const { links } = await auditPage(route);
    links.forEach((l) => linkTargets.add(l));
  }

  /* --------------------------------- every internal link must resolve */
  const checked = new Map();
  for (const target of [...linkTargets].sort()) {
    if (checked.has(target)) continue;
    const res = await fetch(`${BASE}${target}`, { method: "GET" });
    checked.set(target, res.status);
    if (res.status >= 400) {
      note("high", target, `internal link target returns HTTP ${res.status}`);
    }
  }
  console.log(`Checked ${checked.size} distinct internal link targets.\n`);

  /* ------------------------------ orphans: in the sitemap, linked nowhere */
  for (const route of routes) {
    if (route === "/") continue;
    if (!linkTargets.has(route)) {
      note("medium", route, "in the sitemap but not linked from any page");
    }
  }

  /* ----------------------------------------------- placeholder sweep */
  const PLACEHOLDERS = [
    { pattern: /\+63 2 0000 0000/, label: "placeholder landline (+63 2 0000 0000)" },
    { pattern: /hello@pdmnvirtualoffice\.ph/, label: "placeholder email address" },
    { pattern: /pdmnvirtualoffice\.ph/, label: "unregistered domain" },
    { pattern: /secRegistrationNo:\s*"TODO"/, label: "SEC registration number still TODO" },
  ];
  const contentDir = path.join(process.cwd(), "src", "content");
  for (const file of await fs.readdir(contentDir)) {
    const body = await fs.readFile(path.join(contentDir, file), "utf8");
    for (const { pattern, label } of PLACEHOLDERS) {
      if (pattern.test(body)) note("blocker", `src/content/${file}`, label);
    }
  }

  /* room photographs */
  const roomsDir = path.join(process.cwd(), "public", "photos", "rooms");
  const expected = ["palawan.jpg", "boracay.jpg", "siargao.jpg", "cubicle.jpg", "tea-room.jpg"];
  const present = await fs.readdir(roomsDir).catch(() => []);
  const missingPhotos = expected.filter((f) => !present.includes(f));
  if (missingPhotos.length) {
    note("blocker", "public/photos/rooms", `${missingPhotos.length} room photo(s) missing: ${missingPhotos.join(", ")}`);
  }

  /* brand artwork */
  const pub = await fs.readdir(path.join(process.cwd(), "public")).catch(() => []);
  if (!pub.some((f) => /^pdmn-logo\.(svg|png)$/.test(f))) {
    note("medium", "public/", "no pdmn-logo.svg or .png — footer and About render no logo");
  }

  /* indexing + chatbot switches */
  const env = await fs.readFile(path.join(process.cwd(), ".env.local"), "utf8").catch(() => "");
  if (!/NEXT_PUBLIC_ALLOW_INDEXING=true/.test(env)) {
    note("info", ".env.local", "search indexing is BLOCKED (NEXT_PUBLIC_ALLOW_INDEXING not true)");
  }
  if (!/NEXT_PUBLIC_CHATBOT_ENABLED=true/.test(env)) {
    note("info", ".env.local", "chatbot is off (NEXT_PUBLIC_CHATBOT_ENABLED not true)");
  }
  if (!/INQUIRY_WEBHOOK_URL=/.test(env)) {
    note("blocker", ".env.local", "INQUIRY_WEBHOOK_URL unset — enquiry submissions go nowhere");
  }

  /* ------------------------------------------------------------ report */
  const order = ["blocker", "high", "medium", "low", "info"];
  const counts = Object.fromEntries(order.map((s) => [s, 0]));
  problems.forEach((p) => counts[p.severity]++);

  for (const severity of order) {
    const items = problems.filter((p) => p.severity === severity);
    if (!items.length) continue;
    console.log(`${severity.toUpperCase()}  (${items.length})`);
    for (const { page, message } of items) console.log(`   ${page}\n      ${message}`);
    console.log("");
  }

  console.log(
    `Totals: ${order.map((s) => `${counts[s]} ${s}`).join(", ")}\n`,
  );
}

main().catch((error) => {
  console.error(`\n${error.message}\n`);
  process.exitCode = 1;
});
