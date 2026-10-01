// Local preview of the exact files uploaded to Cloudflare Pages.
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';

const root = resolve('out');
const portIndex = process.argv.indexOf('--port');
const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : 3001);
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml', '.ico': 'image/x-icon' };

if (!existsSync(resolve(root, 'index.html'))) throw new Error('Run npm run build before starting the static preview.');

createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/meeting-rooms') {
      res.writeHead(301, { Location: '/services/virtual-office-vip' }).end();
      return;
    }
    const candidate = resolve(root, '.' + pathname);
    if (candidate !== root && !candidate.startsWith(root + sep)) {
      res.writeHead(403).end();
      return;
    }
    const file = [candidate, candidate + '.html', resolve(candidate, 'index.html')]
      .find((p) => existsSync(p) && statSync(p).isFile());
    const served = file || resolve(root, '404.html');
    res.writeHead(file ? 200 : 404, { 'Content-Type': types[extname(served)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    if (req.method === 'HEAD') res.end();
    else createReadStream(served).pipe(res);
  } catch {
    res.writeHead(400).end('Invalid request');
  }
}).listen(port, '127.0.0.1', () => console.log(`Static preview: http://localhost:${port}`));
