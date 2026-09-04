import path from 'node:path';
import process from 'node:process';

export type CatalogTarget = 'headless' | 'ui';

const OUTPUT_PATHS: Record<CatalogTarget, string[]> = {
  headless: ['packages/headless/src/constants/components.ts', 'packages/headless/src/namespaced/index.ts'],
  ui: ['packages/ui/src/constants/components.ts']
};

/** Regenerates component catalog files. Returns the written file paths. */
export async function generateCatalog(target: CatalogTarget, rootDir: string = process.cwd()): Promise<string[]> {
  if (target === 'headless') {
    const { generateHeadlessMetadata } = await import('./headless');

    await generateHeadlessMetadata();
  } else {
    const { generateUiMetadata } = await import('./ui');

    await generateUiMetadata();
  }

  return OUTPUT_PATHS[target].map(relativePath => path.join(rootDir, relativePath));
}
