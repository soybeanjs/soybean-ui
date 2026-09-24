import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { writeGeneratedJsonDirectory, writeJsonFile } from '../src/shared/json';

async function createTemporaryDirectory(prefix: string): Promise<string> {
  return mkdtemp(path.join(tmpdir(), prefix));
}

describe('shared/json generatedAt stability', () => {
  describe('writeJsonFile', () => {
    it('writes a missing document and reports the write', async () => {
      const rootDir = await createTemporaryDirectory('sui-generated-json-');

      try {
        const filePath = path.join(rootDir, 'index.json');
        const written = await writeJsonFile(filePath, {
          generatedAt: '2026-01-01T00:00:00.000Z',
          value: 'a'
        });

        expect(written).toBe(true);
        expect(JSON.parse(await readFile(filePath, 'utf8'))).toEqual({
          generatedAt: '2026-01-01T00:00:00.000Z',
          value: 'a'
        });
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });

    it('keeps the previous generatedAt when the payload is unchanged', async () => {
      const rootDir = await createTemporaryDirectory('sui-generated-json-');

      try {
        const filePath = path.join(rootDir, 'accordion.json');
        const previousContent = `${JSON.stringify({ generatedAt: '2026-01-01T00:00:00.000Z', versions: [] }, null, 2)}\n`;

        await writeFile(filePath, previousContent, 'utf8');

        const written = await writeJsonFile(
          filePath,
          { generatedAt: '2026-02-02T00:00:00.000Z', versions: [] },
          { preserveGeneratedAt: true }
        );

        expect(written).toBe(false);
        expect(await readFile(filePath, 'utf8')).toBe(previousContent);
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });

    it('refreshes generatedAt when the payload changed', async () => {
      const rootDir = await createTemporaryDirectory('sui-generated-json-');

      try {
        const filePath = path.join(rootDir, 'accordion.json');

        await writeFile(
          filePath,
          `${JSON.stringify({ generatedAt: '2026-01-01T00:00:00.000Z', count: 1 }, null, 2)}\n`,
          'utf8'
        );

        const written = await writeJsonFile(
          filePath,
          { generatedAt: '2026-02-02T00:00:00.000Z', count: 2 },
          { preserveGeneratedAt: true }
        );

        expect(written).toBe(true);
        expect(JSON.parse(await readFile(filePath, 'utf8'))).toEqual({
          generatedAt: '2026-02-02T00:00:00.000Z',
          count: 2
        });
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });

    it('treats a key-order-only difference as unchanged', async () => {
      const rootDir = await createTemporaryDirectory('sui-generated-json-');

      try {
        const filePath = path.join(rootDir, 'accordion.json');

        await writeFile(
          filePath,
          `${JSON.stringify({ generatedAt: '2026-01-01T00:00:00.000Z', a: 1, b: 2 }, null, 2)}\n`,
          'utf8'
        );

        const written = await writeJsonFile(
          filePath,
          { b: 2, generatedAt: '2026-02-02T00:00:00.000Z', a: 1 },
          { preserveGeneratedAt: true }
        );

        expect(written).toBe(false);
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });
  });

  describe('writeGeneratedJsonDirectory', () => {
    it('skips unchanged documents, rewrites changed ones, and prunes stale files', async () => {
      const rootDir = await createTemporaryDirectory('sui-generated-dir-');
      const outputDir = path.join(rootDir, 'out');
      const retiredDir = path.join(rootDir, 'retired');

      try {
        await mkdir(outputDir, { recursive: true });
        await mkdir(retiredDir, { recursive: true });

        const unchangedContent = `${JSON.stringify(
          { generatedAt: '2026-01-01T00:00:00.000Z', component: 'accordion' },
          null,
          2
        )}\n`;
        const changedContent = `${JSON.stringify(
          { generatedAt: '2026-01-01T00:00:00.000Z', component: 'alert', count: 1 },
          null,
          2
        )}\n`;

        await writeFile(path.join(outputDir, 'accordion.json'), unchangedContent, 'utf8');
        await writeFile(path.join(outputDir, 'alert.json'), changedContent, 'utf8');
        await writeFile(path.join(outputDir, 'removed.json'), '{}\n', 'utf8');
        await writeFile(path.join(retiredDir, 'legacy.json'), '{}\n', 'utf8');

        const result = await writeGeneratedJsonDirectory({
          outputDir,
          resetPaths: [retiredDir],
          documents: [
            {
              fileName: 'accordion.json',
              value: { generatedAt: '2026-02-02T00:00:00.000Z', component: 'accordion' }
            },
            {
              fileName: 'alert.json',
              value: { generatedAt: '2026-02-02T00:00:00.000Z', component: 'alert', count: 2 }
            }
          ]
        });

        expect(result.written).toEqual(['alert.json']);
        expect(result.unchanged).toEqual(['accordion.json']);
        expect(await readFile(path.join(outputDir, 'accordion.json'), 'utf8')).toBe(unchangedContent);
        expect(JSON.parse(await readFile(path.join(outputDir, 'alert.json'), 'utf8'))).toEqual({
          generatedAt: '2026-02-02T00:00:00.000Z',
          component: 'alert',
          count: 2
        });

        await expect(readFile(path.join(outputDir, 'removed.json'), 'utf8')).rejects.toThrow();
        await expect(readFile(path.join(retiredDir, 'legacy.json'), 'utf8')).rejects.toThrow();
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });

    it('creates the output directory when it does not exist yet', async () => {
      const rootDir = await createTemporaryDirectory('sui-generated-dir-');
      const outputDir = path.join(rootDir, 'nested', 'out');

      try {
        const result = await writeGeneratedJsonDirectory({
          outputDir,
          documents: [{ fileName: 'index.json', value: { generatedAt: '2026-02-02T00:00:00.000Z' } }]
        });

        expect(result.written).toEqual(['index.json']);
        expect(JSON.parse(await readFile(path.join(outputDir, 'index.json'), 'utf8'))).toEqual({
          generatedAt: '2026-02-02T00:00:00.000Z'
        });
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });
  });
});
