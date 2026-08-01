import fs from 'fs/promises';
import path from 'path';

/**
 * Scan a project's UI directory for installed components.
 *
 * Installed components live as subdirectories under `{uiDir}/components/`
 * (e.g. `src/ui/components/button/`), mirroring the source package structure
 * written by `addComponents` via `resolveTargetPath`.
 *
 * Returns the sorted set of installed component names. Returns an empty array
 * if the components directory does not exist yet (fresh project).
 */
export async function scanInstalledComponents(uiDir: string): Promise<string[]> {
  const componentsDir = path.join(uiDir, 'components');

  try {
    const entries = await fs.readdir(componentsDir, { withFileTypes: true });

    return entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .map(entry => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}
