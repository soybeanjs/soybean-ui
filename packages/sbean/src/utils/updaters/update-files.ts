import fs from 'fs/promises';
import path from 'path';
import type { RegistryItemFile } from '../../registry/schema';
import { transformImports, transformIcons } from '../transformers/transform-import';
import type { TransformContext } from '../transformers/transform-import';

export interface UpdateFilesOptions {
  overwrite: boolean;
  style: string;
  transformCtx: TransformContext;
  dryRun?: boolean;
  diff?: boolean;
  silent?: boolean;
}

interface ResolveTargetPathOptions {
  uiDir: string;
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
      uiDir: targetDir
    });

    // Apply transformers
    let content = file.content;
    content = transformImports(content, options.transformCtx, options.style);
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
 * Mirrors the source package structure: everything under `/ui/src/`
 * in the registry path is preserved as-is under the target `uiDir`.
 */
export function resolveTargetPath(file: RegistryItemFile, options: ResolveTargetPathOptions): string {
  if (file.target) {
    return path.join(options.uiDir, file.target);
  }

  const normalizedPath = normalizePath(file.path);

  // Preserve the full relative path within the UI source package
  // e.g. "${UI_SOURCE_PATH}/components/button/button.vue" → "components/button/button.vue"
  const uiSrcRelative = getRelativePathFromSegment(normalizedPath, '/ui/src/');
  if (uiSrcRelative) {
    return path.join(options.uiDir, uiSrcRelative);
  }

  // Fallback: use basename in uiDir
  return path.join(options.uiDir, path.basename(normalizedPath));
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
