import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import {
  collectKeyedTextEntries,
  listFileBasenames,
  readJsonObject,
  runCliModule,
  syncLocaleTemplateFiles
} from './_shared';

const rootDir = process.cwd();
const apiDir = path.join(rootDir, 'apps/docs/src/generated/api');
const localeDir = path.join(rootDir, 'apps/docs/locales');
const outputDir = path.join(rootDir, 'apps/docs/src/generated/api-locales');
const defaultLocale = 'en';

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

async function collectApiDescriptionEntries(): Promise<Map<string, string>> {
  const jsonFilePaths = await listApiJsonFiles(apiDir);
  const collected = new Map<string, string>();

  for (const filePath of jsonFilePaths) {
    const document = await readJsonObject(filePath);
    collectDescriptionEntries(document, collected);
  }

  return collected;
}

export async function generateApiLocaleTemplates(): Promise<void> {
  const [entries, locales] = await Promise.all([collectApiDescriptionEntries(), listFileBasenames(localeDir, '.json')]);

  await mkdir(outputDir, { recursive: true });

  const { changedSourceKeys } = await syncLocaleTemplateFiles({
    entries,
    locales,
    outputDir,
    defaultLocale
  });

  console.log(
    `Generated API locale templates for ${locales.join(', ')} with ${entries.size} translation keys.` +
      ` Reset ${changedSourceKeys.size} changed source keys for non-default locales.`
  );
}

runCliModule(import.meta.url, generateApiLocaleTemplates);
