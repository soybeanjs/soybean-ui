import fs from 'fs/promises';
import path from 'path';
import type { RegistryItemFile } from '../../registry/schema';
import { transformImports, transformIcons } from '../transformers/transform-import';
import type { TransformContext } from '../transformers/transform-import';

export interface UpdateFilesOptions {
  overwrite: boolean;
  style: string;
  transformCtx: TransformContext;
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

    const targetPath = resolveTargetPath(file, targetDir);

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
function resolveTargetPath(file: RegistryItemFile, targetDir: string): string {
  // If the file has an explicit target, use it
  if (file.target) {
    return path.join(targetDir, file.target);
  }

  // For ui components, place in ui directory
  if (file.type === 'registry:ui') {
    const fileName = path.basename(file.path);
    return path.join(targetDir, fileName);
  }

  // For style files
  if (file.type === 'registry:style') {
    const fileName = path.basename(file.path);
    return path.join(targetDir, 'styles', fileName);
  }

  // For lib/utils files
  if (file.type === 'registry:lib') {
    const fileName = path.basename(file.path);
    return path.join(targetDir, fileName);
  }

  // Default: preserve relative path
  return path.join(targetDir, file.path);
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
