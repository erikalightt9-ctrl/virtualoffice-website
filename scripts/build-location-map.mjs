// Render the local map from OpenStreetMap data (ODbL).
// Source: https://api.openstreetmap.org/api/0.6/map?bbox=121.0168,14.5520,121.0238,14.5580
import { readFileSync, writeFileSync } from 'node:fs';

const xml = readFileSync('public/location-map-data.osm', 'utf8');
const attrs = (text) => Object.fromEntries([...text.matchAll(/([\w:]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const project = (lon, lat) => [(Number(lon) - 121.01729) / .006 * 800, (14.55725 - Number(lat)) / .0048 * 660];
const nodes = new Map([...xml.matchAll(/<node\b([^>]*?)\/?\s*>/g)].map((m) => {
  const a = attrs(m[1]);
  return [a.id, project(a.lon, a.lat)];
}));
const ways = [...xml.matchAll(/<way\b([^>]*)>([\s\S]*?)<\/way>/g)].map((m) => ({
  id: attrs(m[1]).id,
  tags: Object.fromEntries([...m[2].matchAll(/<tag\b([^>]*)\/>/g)].map((t) => { const a = attrs(t[1]); return [a.k, a.v]; })),
  points: [...m[2].matchAll(/<nd ref="(\d+)"\s*\/>/g)].map((n) => nodes.get(n[1])).filter(Boolean),
}));
const path = (points) => points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
const roads = ways.filter((w) => ['secondary', 'tertiary', 'residential', 'unclassified', 'service', 'pedestrian'].includes(w.tags.highway));
const width = (w) => ({ secondary: 15, tertiary: 10, service: 4, pedestrian: 4 }[w.tags.highway] || 8);
const buildings = ways.filter((w) => w.tags.building);
const green = ways.filter((w) => ['park', 'garden'].includes(w.tags.leisure));
const selectedNames = ['Paseo de Roxas', 'Ayala Avenue', 'Dela Rosa Street', 'Legazpi Street', 'Gamboa Street', 'Rada Street', 'Perea Street', 'Makati Avenue'];
const occupied = [{ x: 400, y: 270, w: 310, h: 150 }];
const labels = selectedNames.map((name) => {
  const segments = roads.filter((w) => w.tags.name === name).flatMap((w) => w.points.slice(1).map((b, i) => {
    const a = w.points[i];
    return { a, b, length: Math.hypot(b[0] - a[0], b[1] - a[1]) };
  })).sort((a, b) => b.length - a.length);
  for (const { a, b, length } of segments) {
    const x = (a[0] + b[0]) / 2, y = (a[1] + b[1]) / 2;
    if (length < 65 || x < 90 || x > 710 || y < 35 || y > 620) continue;
    if (occupied.some((r) => Math.abs(x - r.x) < r.w / 2 + 45 && Math.abs(y - r.y) < r.h / 2 + 24)) continue;
    let angle = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
    if (angle > 90) angle -= 180;
    if (angle < -90) angle += 180;
    occupied.push({ x, y, w: 100, h: 35 });
    return `<text transform="translate(${x},${y}) rotate(${angle})" text-anchor="middle" dy="-8" class="street">${name}</text>`;
  }
  return '';
}).join('');
const [px, py] = project(121.02029, 14.55485);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="660" viewBox="0 0 800 660">
<title>Salustiana D. Ty Tower, 104 Paseo de Roxas, Makati City</title>
<desc>Street map from OpenStreetMap data. The red pin marks the tower at latitude 14.55485, longitude 121.02029. North is up.</desc>
<defs><style>.street{font:600 15px Arial,sans-serif;fill:#6B2E28;paint-order:stroke;stroke:#FDFBF7;stroke-width:4;stroke-linejoin:round}</style></defs>
<rect width="800" height="660" fill="#EEE5D7"/>
${green.map((w) => `<path d="${path(w.points)}Z" fill="#CBD2B4"/>`).join('')}
${buildings.map((w) => `<path d="${path(w.points)}Z" fill="${w.id === '35677014' ? '#E0A94E' : '#D8C8B3'}" stroke="#C7B69F" stroke-width="1"/>`).join('')}
${roads.map((w) => `<path d="${path(w.points)}" fill="none" stroke="#CBBBA5" stroke-width="${width(w) + 3}" stroke-linejoin="round"/>`).join('')}
${roads.map((w) => `<path d="${path(w.points)}" fill="none" stroke="#FFFAF1" stroke-width="${width(w)}" stroke-linejoin="round"/>`).join('')}
${labels}
<g transform="translate(753 42)" fill="#6B2E28"><text text-anchor="middle" y="-12" font-family="Arial" font-size="14" font-weight="700">N</text><path d="M0 0L-7 20L0 16L7 20Z"/></g>
<circle cx="${px}" cy="${py}" r="24" fill="#A80407" opacity=".12"/>
<g transform="translate(${px} ${py})"><path d="M0 0C-7-11-20-24-20-38a20 20 0 1 1 40 0C20-24 7-11 0 0Z" fill="#A80407" stroke="#FFFAF1" stroke-width="3"/><circle cy="-38" r="7" fill="#FDFBF7"/></g>
<g transform="translate(${px - 157} ${py - 140})"><rect width="314" height="70" rx="6" fill="#3D0708" stroke="#E0A94E"/><text x="157" y="28" text-anchor="middle" fill="#FDFBF7" font-family="Arial" font-size="18" font-weight="700">104 Paseo de Roxas</text><text x="157" y="51" text-anchor="middle" fill="#F0D3A4" font-family="Arial" font-size="14">Salustiana D. Ty Tower · 5th Floor</text></g>
</svg>`;
writeFileSync('public/location-map.svg', svg);
