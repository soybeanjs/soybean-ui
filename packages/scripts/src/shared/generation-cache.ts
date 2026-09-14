import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Content fingerprint for one generator pass: what went in (`inputs`) and what
 * came out (`outputs`). A pass is skipped only when *both* still match:
 *
 * - a changed source, tsconfig, or lockfile changes `inputs`;
 * - a deleted or hand-edited generated file changes `outputs`.
 *
 * Either mismatch falls back to the full deterministic pass, so the skip can
 * never hide stale or hand-edited generated data.
 *
 * Fingerprints live outside the repository (under `node_modules/.cache`): CI and
 * fresh clones always run the full pass, and no cache metadata ever reaches the
 * committed generated data.
 */
export interface GenerationFingerprint {
  inputs: string;
  outputs: string;
}

/**
 * Extensions that can carry type information into a generated pass. `.vue` is
 * deliberately absent: the extraction sees SFCs through the `*.vue` shim, so
 * their contents cannot reach the output.
 */
const fingerprintExtensions = ['.ts', '.tsx', '.json'];

async function listDirectoryFiles(directoryPath: string): Promise<string[]> {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const filePaths: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      filePaths.push(...(await listDirectoryFiles(entryPath)));
      continue;
    }

    if (entry.isFile()) {
      filePaths.push(entryPath);
    }
  }

  return filePaths;
}

async function listFingerprintSourceFiles(directoryPath: string): Promise<string[]> {
  const filePaths = await listDirectoryFiles(directoryPath);

  return filePaths.filter(filePath => fingerprintExtensions.some(extension => filePath.endsWith(extension)));
}

async function collectFingerprintSourcePaths(entryPath: string): Promise<string[]> {
  let entryStat;

  try {
    entryStat = await stat(entryPath);
  } catch {
    // A missing entry contributes nothing rather than failing the whole pass.
    return [];
  }

  return entryStat.isFile() ? [entryPath] : listFingerprintSourceFiles(entryPath);
}

function createContentHash(): ReturnType<typeof createHash> {
  return createHash('sha256');
}

/** Hash a file list by relative path and content, independent of enumeration order. */
async function hashFilePaths(filePaths: string[], hashRootDir: string): Promise<string> {
  const hash = createContentHash();

  for (const filePath of [...filePaths].sort((left, right) => left.localeCompare(right))) {
    hash.update(path.relative(hashRootDir, filePath));
    hash.update(await readFile(filePath));
  }

  return hash.digest('hex');
}

/** Fingerprint every input that can reach a generated pass. */
export async function hashGenerationInputs(entryPaths: string[], rootDir: string): Promise<string> {
  const filePaths: string[] = [];

  for (const entryPath of entryPaths) {
    filePaths.push(...(await collectFingerprintSourcePaths(path.resolve(rootDir, entryPath))));
  }

  return hashFilePaths(filePaths, rootDir);
}

/** Fingerprint a generated directory, or `null` when it does not exist yet. */
export async function hashGenerationOutputs(directoryPath: string, rootDir: string): Promise<string | null> {
  try {
    return await hashFilePaths(await listDirectoryFiles(directoryPath), rootDir);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

async function collectAllFilePaths(entryPath: string): Promise<string[]> {
  let entryStat;

  try {
    entryStat = await stat(entryPath);
  } catch {
    return [];
  }

  return entryStat.isFile() ? [entryPath] : listDirectoryFiles(entryPath);
}

/**
 * Per-file content hashes for the given files or directories. Used to decide
 * whether regenerating the committed surfaces actually changes anything, which
 * is a stronger (and git-independent) answer than diffing against a revision.
 */
export async function hashPathContents(entryPaths: string[], rootDir: string): Promise<Map<string, string>> {
  const filePaths = (
    await Promise.all(entryPaths.map(entryPath => collectAllFilePaths(path.resolve(rootDir, entryPath))))
  ).flat();
  const contents = new Map<string, string>();

  for (const filePath of filePaths.sort((left, right) => left.localeCompare(right))) {
    const hash = createContentHash();

    hash.update(await readFile(filePath));
    contents.set(path.relative(rootDir, filePath), hash.digest('hex'));
  }

  return contents;
}

/** Relative paths whose content differs between two snapshots (changed, added, removed). */
export function diffPathContents(before: Map<string, string>, after: Map<string, string>): string[] {
  const drifted = new Set<string>();

  for (const [filePath, hash] of after) {
    if (before.get(filePath) !== hash) {
      drifted.add(filePath);
    }
  }

  for (const filePath of before.keys()) {
    if (!after.has(filePath)) {
      drifted.add(filePath);
    }
  }

  return Array.from(drifted).sort((left, right) => left.localeCompare(right));
}

export async function readGenerationFingerprint(cacheFilePath: string): Promise<GenerationFingerprint | null> {
  let content: string;

  try {
    content = await readFile(cacheFilePath, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }

    throw error;
  }

  try {
    const parsed = JSON.parse(content) as Partial<GenerationFingerprint>;

    if (typeof parsed.inputs === 'string' && typeof parsed.outputs === 'string') {
      return { inputs: parsed.inputs, outputs: parsed.outputs };
    }
  } catch {
    // A corrupt cache entry is a cache miss.
  }

  return null;
}

export async function writeGenerationFingerprint(
  cacheFilePath: string,
  fingerprint: GenerationFingerprint
): Promise<void> {
  await mkdir(path.dirname(cacheFilePath), { recursive: true });
  await writeFile(cacheFilePath, `${JSON.stringify(fingerprint, null, 2)}\n`, 'utf8');
}

/**
 * True when the previous run's inputs and the on-disk outputs are both intact,
 * i.e. re-running the generator would reproduce exactly what is already there.
 */
export async function isGenerationUpToDate(options: {
  cacheFilePath: string;
  inputHash: string;
  outputDirectory: string;
  rootDir: string;
}): Promise<boolean> {
  const previousFingerprint = await readGenerationFingerprint(options.cacheFilePath);

  if (previousFingerprint?.inputs !== options.inputHash) {
    return false;
  }

  const outputHash = await hashGenerationOutputs(options.outputDirectory, options.rootDir);

  return outputHash !== null && outputHash === previousFingerprint.outputs;
}
