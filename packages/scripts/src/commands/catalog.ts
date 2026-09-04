import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { readSourceFile } from '../shared/ast';
import {
  collectCatalogGroups,
  emitComponentsModule,
  emitNamespacedModule,
  isFamilyExport,
  isStyledExport
} from '../shared/catalog';
import type { CatalogGroup, IsGroupExport } from '../shared/catalog';

export type CatalogTarget = 'headless' | 'ui';

interface CatalogDocument {
  /** output file, relative to the package src dir */
  file: string;
  code: string;
}

interface CatalogTargetConfig {
  /** package src dir that owns the barrel, relative to the repo root */
  srcDir: string;
  isGroupExport: IsGroupExport;
  buildDocuments: (groups: CatalogGroup[]) => CatalogDocument[];
}

const CONFIG: Record<CatalogTarget, CatalogTargetConfig> = {
  headless: {
    srcDir: 'packages/headless/src',
    isGroupExport: isFamilyExport,
    buildDocuments: groups => [
      { file: 'constants/components.ts', code: emitComponentsModule(groups) },
      { file: 'namespaced/index.ts', code: emitNamespacedModule(groups) }
    ]
  },
  ui: {
    srcDir: 'packages/ui/src',
    isGroupExport: isStyledExport,
    buildDocuments: groups => [{ file: 'constants/components.ts', code: emitComponentsModule(groups) }]
  }
};

/** Regenerates catalog files from the package barrel. Returns the written file paths. */
export async function generateCatalog(target: CatalogTarget, rootDir: string = process.cwd()): Promise<string[]> {
  const config = CONFIG[target];
  const srcDir = path.join(rootDir, config.srcDir);
  const groups = await collectCatalogGroups({
    index: await readSourceFile(path.join(srcDir, 'index.ts')),
    readComponentIndex: componentDir => readSourceFile(path.join(srcDir, 'components', componentDir, 'index.ts')),
    isGroupExport: config.isGroupExport
  });
  const documents = config.buildDocuments(groups);

  await Promise.all(
    documents.map(async document => {
      const outputPath = path.join(srcDir, document.file);

      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, document.code, 'utf8');
    })
  );

  return documents.map(document => path.join(srcDir, document.file));
}
