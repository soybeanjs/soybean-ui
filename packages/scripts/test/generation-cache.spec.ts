import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import {
  hashGenerationInputs,
  hashGenerationOutputs,
  isGenerationUpToDate,
  readGenerationFingerprint,
  writeGenerationFingerprint
} from '../src/shared/generation-cache';

async function createTemporaryDirectory(prefix: string): Promise<string> {
  return mkdtemp(path.join(tmpdir(), prefix));
}

async function createProject(
  rootDir: string
): Promise<{ sourceDir: string; outputDir: string; cacheFilePath: string }> {
  const sourceDir = path.join(rootDir, 'packages/ui/src');
  const outputDir = path.join(rootDir, 'apps/docs/src/generated/api');
  const cacheFilePath = path.join(rootDir, 'node_modules/.cache/sui/gen-api.json');

  await mkdir(sourceDir, { recursive: true });
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(sourceDir, 'button.ts'), 'export type ButtonProps = { size: string };\n', 'utf8');
  await writeFile(path.join(sourceDir, 'button.vue'), '<template><button /></template>\n', 'utf8');
  await writeFile(path.join(outputDir, 'button.json'), '{"component":"button"}\n', 'utf8');

  return { sourceDir, outputDir, cacheFilePath };
}

describe('shared/generation-cache', () => {
  describe('hashGenerationInputs', () => {
    it('is stable across runs', async () => {
      const rootDir = await createTemporaryDirectory('sui-generation-cache-');

      try {
        const { sourceDir } = await createProject(rootDir);
        const entryPaths = [path.relative(rootDir, sourceDir)];

        expect(await hashGenerationInputs(entryPaths, rootDir)).toBe(await hashGenerationInputs(entryPaths, rootDir));
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });

    it('changes when a source file changes', async () => {
      const rootDir = await createTemporaryDirectory('sui-generation-cache-');

      try {
        const { sourceDir } = await createProject(rootDir);
        const entryPaths = [path.relative(rootDir, sourceDir)];
        const before = await hashGenerationInputs(entryPaths, rootDir);

        await writeFile(path.join(sourceDir, 'button.ts'), 'export type ButtonProps = { size: number };\n', 'utf8');

        expect(await hashGenerationInputs(entryPaths, rootDir)).not.toBe(before);
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });

    it('changes when a source file is added', async () => {
      const rootDir = await createTemporaryDirectory('sui-generation-cache-');

      try {
        const { sourceDir } = await createProject(rootDir);
        const entryPaths = [path.relative(rootDir, sourceDir)];
        const before = await hashGenerationInputs(entryPaths, rootDir);

        await writeFile(path.join(sourceDir, 'input.ts'), 'export type InputProps = { value: string };\n', 'utf8');

        expect(await hashGenerationInputs(entryPaths, rootDir)).not.toBe(before);
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });

    it('ignores `.vue` contents, which extraction only sees through the shim', async () => {
      const rootDir = await createTemporaryDirectory('sui-generation-cache-');

      try {
        const { sourceDir } = await createProject(rootDir);
        const entryPaths = [path.relative(rootDir, sourceDir)];
        const before = await hashGenerationInputs(entryPaths, rootDir);

        await writeFile(path.join(sourceDir, 'button.vue'), '<template><button class="x" /></template>\n', 'utf8');

        expect(await hashGenerationInputs(entryPaths, rootDir)).toBe(before);
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });

    it('tolerates missing entries', async () => {
      const rootDir = await createTemporaryDirectory('sui-generation-cache-');

      try {
        await expect(hashGenerationInputs(['packages/does-not-exist', 'missing.json'], rootDir)).resolves.toEqual(
          expect.any(String)
        );
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });
  });

  describe('hashGenerationOutputs', () => {
    it('returns null when the output directory does not exist', async () => {
      const rootDir = await createTemporaryDirectory('sui-generation-cache-');

      try {
        expect(await hashGenerationOutputs(path.join(rootDir, 'missing'), rootDir)).toBeNull();
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });

    it('changes when a generated file changes', async () => {
      const rootDir = await createTemporaryDirectory('sui-generation-cache-');

      try {
        const { outputDir } = await createProject(rootDir);
        const before = await hashGenerationOutputs(outputDir, rootDir);

        await writeFile(path.join(outputDir, 'button.json'), '{"component":"button","edited":true}\n', 'utf8');

        expect(await hashGenerationOutputs(outputDir, rootDir)).not.toBe(before);
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });
  });

  describe('isGenerationUpToDate', () => {
    it('reports up to date only when inputs and outputs both match', async () => {
      const rootDir = await createTemporaryDirectory('sui-generation-cache-');

      try {
        const { sourceDir, outputDir, cacheFilePath } = await createProject(rootDir);
        const entryPaths = [path.relative(rootDir, sourceDir)];
        const storeFingerprint = async () =>
          writeGenerationFingerprint(cacheFilePath, {
            inputs: await hashGenerationInputs(entryPaths, rootDir),
            outputs: (await hashGenerationOutputs(outputDir, rootDir)) ?? ''
          });

        // No cache entry yet.
        expect(
          await isGenerationUpToDate({
            cacheFilePath,
            inputHash: await hashGenerationInputs(entryPaths, rootDir),
            outputDirectory: outputDir,
            rootDir
          })
        ).toBe(false);

        await storeFingerprint();

        expect(
          await isGenerationUpToDate({
            cacheFilePath,
            inputHash: await hashGenerationInputs(entryPaths, rootDir),
            outputDirectory: outputDir,
            rootDir
          })
        ).toBe(true);

        // A hand-edited or deleted generated file invalidates the entry.
        await writeFile(path.join(outputDir, 'button.json'), '{"component":"button","edited":true}\n', 'utf8');

        expect(
          await isGenerationUpToDate({
            cacheFilePath,
            inputHash: await hashGenerationInputs(entryPaths, rootDir),
            outputDirectory: outputDir,
            rootDir
          })
        ).toBe(false);

        await storeFingerprint();

        // A changed source invalidates the entry.
        await writeFile(path.join(sourceDir, 'button.ts'), 'export type ButtonProps = { size: number };\n', 'utf8');

        expect(
          await isGenerationUpToDate({
            cacheFilePath,
            inputHash: await hashGenerationInputs(entryPaths, rootDir),
            outputDirectory: outputDir,
            rootDir
          })
        ).toBe(false);
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });
  });

  describe('fingerprint file round trip', () => {
    it('reads back what it wrote', async () => {
      const rootDir = await createTemporaryDirectory('sui-generation-cache-');

      try {
        const cacheFilePath = path.join(rootDir, 'cache', 'gen-api.json');

        await writeGenerationFingerprint(cacheFilePath, { inputs: 'a', outputs: 'b' });

        expect(await readGenerationFingerprint(cacheFilePath)).toEqual({
          inputs: 'a',
          outputs: 'b'
        });
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });

    it('treats a missing or corrupt entry as a cache miss', async () => {
      const rootDir = await createTemporaryDirectory('sui-generation-cache-');

      try {
        const cacheFilePath = path.join(rootDir, 'gen-api.json');

        expect(await readGenerationFingerprint(cacheFilePath)).toBeNull();

        await writeFile(cacheFilePath, '{ not json', 'utf8');
        expect(await readGenerationFingerprint(cacheFilePath)).toBeNull();

        await writeFile(cacheFilePath, '{"inputs":"a"}', 'utf8');
        expect(await readGenerationFingerprint(cacheFilePath)).toBeNull();
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });
  });
});
