import fs from 'fs/promises';
import path from 'path';
import type { RegistryItemFile } from '../../registry/schema';
import { transformImports, transformIcons } from '../transformers/transform-import';
import type { TransformContext } from '../transformers/transform-import';

export interface UpdateFilesOptions {
  overwrite: boolean;
  transformCtx: TransformContext;
  dryRun?: boolean;
  diff?: boolean;
  silent?: boolean;
  /** Per-package output dirs (EC-E03): package namespace → absolute dir. */
  packages?: Record<string, string>;
  /** Owning package namespace for this batch of files (e.g. `ui`, `ui-x`). */
  package?: string;
}

interface ResolveTargetPathOptions {
  /** Core ui output directory. */
  uiDir: string;
  /** Per-package output directories: package namespace → absolute dir. */
  packages?: Record<string, string>;
  /** The owning package namespace, e.g. `ui`, `ui-x`, `admin`. */
  package?: string;
}

/**
 * Write registry item files to the user's project directory.
 *
 * Supports multiple modes:
 * - Normal: write files to disk
 * - dryRun: preview what would be written
 * - diff: show differences between new and existing files
 * - silent: suppress console output
 */
export async function updateFiles(
  files: RegistryItemFile[],
  targetDir: string,
  options: UpdateFilesOptions
): Promise<string[]> {
  const written: string[] = [];
  const dryRun = options.dryRun ?? false;
  const diff = options.diff ?? false;
  const silent = options.silent ?? false;

  for (const file of files) {
    if (!file.content) continue;

    const targetPath = resolveTargetPath(file, {
      uiDir: targetDir,
      packages: options.packages,
      package: options.package
    });

    // Apply transformers
    let content = file.content;
    content = transformImports(content, options.transformCtx);
    content = transformIcons(content, options.transformCtx.iconLibrary);

    // Check if file exists
    const exists = await fileExists(targetPath);

    // Handle diff mode
    if (diff && exists) {
      const existingContent = await fs.readFile(targetPath, 'utf-8');
      if (existingContent !== content) {
        if (!silent) {
          console.log(`\n📝 Diff for: ${path.relative(targetDir, targetPath)}`);
          console.log('━'.repeat(60));
          printSimpleDiff(existingContent, content);
          console.log('━'.repeat(60));
        }
      } else if (!silent) {
        console.log(`  ✔ No changes: ${path.basename(targetPath)}`);
      }
      written.push(targetPath);
      continue;
    }

    // Handle existing file without overwrite
    if (exists && !options.overwrite) {
      if (!silent) {
        console.log(`  ⚠ Skipped (exists): ${path.basename(targetPath)}`);
      }
      written.push(targetPath);
      continue;
    }

    // Handle dry-run mode
    if (dryRun) {
      written.push(targetPath);
      continue;
    }

    // Ensure directory exists
    await fs.mkdir(path.dirname(targetPath), { recursive: true });

    // Write file
    await fs.writeFile(targetPath, content, 'utf-8');

    if (!silent) {
      const action = exists ? 'Updated' : 'Created';
      console.log(`  ✔ ${action}: ${path.basename(targetPath)}`);
    }
    written.push(targetPath);
  }

  return written;
}

/**
 * Print a simple line-based diff.
 */
function printSimpleDiff(oldContent: string, newContent: string): void {
  const oldLines = oldContent.split('\n');
  const newLines = newContent.split('\n');

  const maxLines = Math.max(oldLines.length, newLines.length);
  let diffCount = 0;

  for (let i = 0; i < Math.min(maxLines, 10); i++) {
    const oldLine = oldLines[i] ?? '';
    const newLine = newLines[i] ?? '';

    if (oldLine !== newLine) {
      if (oldLine) console.log(`  - ${oldLine}`);
      if (newLine) console.log(`  + ${newLine}`);
      diffCount++;
    }
  }

  if (maxLines > 10) {
    console.log(`  ... and ${maxLines - 10} more lines`);
  }
}

/**
 * Resolve where a registry file should be placed in the user's project.
 *
 * Resolution order (EC-E03, shadcn-vue ala v4.7):
 *   1. `file.target` starting with an alias prefix (`#ui/`, `@/ui/` etc.) →
 *      resolved via the `packages` map to the corresponding package dir.
 *   2. `file.target` (plain) → `{uiDir}/{target}`.
 *   3. Source path contains `packages/<pkg>/src/` → resolved to `{packages[pkg]}/{relative}`.
 *   4. Source path contains `/ui/src/` → `{uiDir}/{relative}` (legacy core ui).
 *   5. Fallback → `{uiDir}/basename`.
 */
export function resolveTargetPath(file: RegistryItemFile, options: ResolveTargetPathOptions): string {
  const baseDir = options.packages?.[options.package ?? 'ui'] ?? options.uiDir;

  if (file.target) {
    // Alias-aware target (shadcn v4.7, issue #8169): `#ui-x/foo/bar.vue` →
    // resolve the alias prefix to a package directory.
    const aliasMatch = /^(#|@\/)?([a-z][a-z0-9-]*)\//.exec(file.target);
    if (aliasMatch) {
      const pkg = aliasMatch[2];
      const suffix = file.target.slice(aliasMatch[0].length);

      if (options.packages?.[pkg]) {
        return path.join(options.packages[pkg], suffix);
      }
    }

    // Plain target → write under the package base dir.
    return path.join(baseDir, file.target);
  }

  const normalizedPath = normalizePath(file.path);

  // `packages/<pkg>/src/` → packages[pkg] + relative
  const pkgSrcMatch = /^packages\/([a-z][a-z0-9-]*)\/src\//.exec(normalizedPath);
  if (pkgSrcMatch) {
    const pkg = pkgSrcMatch[1];
    const relative = normalizedPath.slice(pkgSrcMatch[0].length);
    const pkgDir = options.packages?.[pkg] ?? options.uiDir;
    return path.join(pkgDir, relative);
  }

  // Legacy: `/ui/src/` → uiDir
  const uiSrcRelative = getRelativePathFromSegment(normalizedPath, '/ui/src/');
  if (uiSrcRelative) {
    return path.join(options.uiDir, uiSrcRelative);
  }

  // Fallback: basename in the owning package dir
  return path.join(baseDir, path.basename(normalizedPath));
}

function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, '/');
}

function getRelativePathFromSegment(filePath: string, segment: string): string | null {
  const segmentIndex = filePath.indexOf(segment);

  if (segmentIndex < 0) {
    return null;
  }

  return filePath.slice(segmentIndex + segment.length);
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
