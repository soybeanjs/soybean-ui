import fs from 'fs/promises';
/**
 * Local HTTP server that serves registry JSON fixtures for testing.
 *
 * Mirrors the remote registry API:
 *   GET /registry.json        → catalog
 *   GET /{name}.json          → single item
 *
 * Supports ETags and conditional requests (If-None-Match → 304).
 */
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = path.join(__dirname, '..', 'fixtures', 'registry');

export interface TestServer {
  url: string;
  server: http.Server;
  close: () => Promise<void>;
}

/**
 * Start a local HTTP server serving registry fixture files.
 */
export async function startRegistryServer(port = 0): Promise<TestServer> {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', `http://localhost:${port}`);

    try {
      // Strip leading slash for file lookup
      const fileName = url.pathname.slice(1) || 'registry.json';
      const filePath = path.join(FIXTURES_DIR, fileName);

      // Security: block path traversal
      if (!filePath.startsWith(FIXTURES_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      const content = await fs.readFile(filePath, 'utf-8');

      // Generate ETag from content hash
      const etag = `"${simpleHash(content)}"`;

      // Check If-None-Match for conditional 304
      const ifNoneMatch = req.headers['if-none-match'];
      if (ifNoneMatch === etag) {
        res.writeHead(304, {
          ETag: etag,
          'Access-Control-Allow-Origin': '*'
        });
        res.end();
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'application/json',
        ETag: etag,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600'
      });
      res.end(content);
    } catch {
      res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(port, '127.0.0.1', () => {
      const addr = server.address();
      if (!addr || typeof addr === 'string') {
        reject(new Error('Failed to get server address'));
        return;
      }
      const url = `http://127.0.0.1:${addr.port}`;
      resolve({
        url,
        server,
        close: () =>
          new Promise<void>(resClose => {
            server.close(() => resClose());
          })
      });
    });

    server.on('error', reject);
  });
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}
