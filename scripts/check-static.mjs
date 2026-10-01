import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve('out');
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const files = walk(root);
assert(files.length <= 1000, 'Cloudflare dashboard upload supports at most 1,000 files.');
for (const file of files) assert(statSync(file).size <= 25 * 1024 * 1024, `File exceeds Cloudflare limit: ${file}`);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    if (match[1].startsWith('//')) continue;
    const asset = resolve(root, '.' + decodeURIComponent(match[1]));
    assert([asset, asset + '.html', join(asset, 'index.html')].some((p) => existsSync(p) && statSync(p).isFile()), `Missing local link/asset ${match[1]} in ${file}`);
  }
}
assert(!existsSync(join(root, 'api')), 'Export must not contain API endpoints.');
assert(files.filter((file) => file.endsWith('.js')).some((file) => readFileSync(file, 'utf8').includes('Continue in email app')));
assert(!readFileSync(join(root, 'location.html'), 'utf8').includes('The office itself'));
for (const file of files.filter((file) => /\.(html|js)$/.test(file))) {
  const text = readFileSync(file, 'utf8');
  assert(!text.includes('/api/inquiry') && !text.includes('/api/chat'), `Server dependency found in ${file}`);
}
console.log(`Static export verified: ${htmlFiles.length} HTML pages, ${files.length} files, all local links/assets present, no inquiry/chat API dependency. Cloudflare dashboard upload limits passed.`);
