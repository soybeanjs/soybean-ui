import fs from 'fs/promises';
import path from 'path';
import type { RegistryItemFile } from '../../registry/schema';
import { transformImports, transformIcons } from '../transformers/transform-import';
import type { TransformContext } from '../transformers/transform-import';

export interface UpdateFilesOptions {
  overwrite: boolean;
  style: string;
  transformCtx: TransformContext;
  libDir: string;
}

interface ResolveTargetPathOptions {
  uiDir: string;
  libDir: string;
}

/**
 * Write registry item files to the user's project directory.
 */
export async function updateFiles(
  files: RegistryItemFile[],
  targetDir: string,
  options: UpdateFilesOptions
): Promise<string[]> {
  const written: string[] = [];

  for (const file of files) {
    if (!file.content) continue;

    const targetPath = resolveTargetPath(file, {
      uiDir: targetDir,
      libDir: options.libDir
    });

    // Check if file exists and handle overwrite
    const exists = await fileExists(targetPath);
    if (exists && !options.overwrite) {
      console.log(`  ⚠ Skipped (exists): ${path.basename(targetPath)}`);
      written.push(targetPath);
      continue;
    }

    // Apply transformers
    let content = file.content;
    content = transformImports(content, options.transformCtx, options.style);
    content = transformIcons(content, options.transformCtx.iconLibrary);

    // Ensure directory exists
    await fs.mkdir(path.dirname(targetPath), { recursive: true });

    // Write file
    await fs.writeFile(targetPath, content, 'utf-8');

    const action = exists ? 'Updated' : 'Created';
    console.log(`  ✔ ${action}: ${path.basename(targetPath)}`);
    written.push(targetPath);
  }

  return written;
}

/**
 * Resolve where a registry file should be placed in the user's project.
 */
export function resolveTargetPath(file: RegistryItemFile, options: ResolveTargetPathOptions): string {
  // If the file has an explicit target, use it
  if (file.target) {
    return path.join(options.uiDir, file.target);
  }

  const normalizedPath = normalizePath(file.path);
  const componentRelativePath = getRelativePathFromSegment(normalizedPath, '/components/');

  if (componentRelativePath) {
    return path.join(options.uiDir, componentRelativePath);
  }

  const styleRelativePath = getRelativePathFromSegment(normalizedPath, '/styles/');

  if (styleRelativePath) {
    return path.join(options.uiDir, 'styles', styleRelativePath);
  }

  const themeRelativePath = getRelativePathFromSegment(normalizedPath, '/theme/');

  if (themeRelativePath || file.type === 'registry:theme') {
    return path.join(options.uiDir, 'theme', themeRelativePath ?? path.basename(normalizedPath));
  }

  if (file.type === 'registry:style') {
    return path.join(options.uiDir, 'styles', path.basename(normalizedPath));
  }

  if (file.type === 'registry:lib') {
    return path.join(options.libDir, path.basename(normalizedPath));
  }

  if (file.type === 'registry:ui') {
    return path.join(options.uiDir, path.basename(normalizedPath));
  }

  // Default: preserve relative path
  return path.join(options.uiDir, normalizedPath);
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
