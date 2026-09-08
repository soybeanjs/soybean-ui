import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { defaultLocale } from '../shared/docs-targets';
import type { DocsTarget } from '../shared/docs-targets';
import { collectKeyedTextEntries, readJsonObject, syncLocaleTemplateFiles } from '../shared/json';

function collectDescriptionEntries(value: unknown, collected: Map<string, string>): void {
  collectKeyedTextEntries(value, collected, {
    keyField: 'descriptionKey',
    valueField: 'description'
  });
}

async function listApiJsonFiles(directoryPath: string): Promise<string[]> {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const jsonFilePaths: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      jsonFilePaths.push(...(await listApiJsonFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'index.json') {
      jsonFilePaths.push(fullPath);
    }
  }

  return jsonFilePaths;
}

async function collectApiDescriptionEntries(apiDir: string): Promise<Map<string, string>> {
  const jsonFilePaths = await listApiJsonFiles(apiDir);
  const collected = new Map<string, string>();

  for (const filePath of jsonFilePaths) {
    const document = await readJsonObject(filePath);
    collectDescriptionEntries(document, collected);
  }

  return collected;
}

export async function generateApiLocaleTemplates(target: DocsTarget): Promise<void> {
  const apiDir = path.join(target.generatedDir, 'api');
  const outputDir = path.join(target.generatedDir, 'api-locales');
  const entries = await collectApiDescriptionEntries(apiDir);

  await mkdir(outputDir, { recursive: true });

  const { changedSourceKeys } = await syncLocaleTemplateFiles({
    entries,
    locales: target.locales,
    outputDir,
    defaultLocale
  });

  console.log(
    `Generated API locale templates (${target.key}) for ${target.locales.join(', ')} with ${entries.size} translation keys.` +
      ` Reset ${changedSourceKeys.size} changed source keys for non-default locales.`
  );
}
