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
const apiDir = path.join(rootDir, 'docs/src/generated/api');
const localeDir = path.join(rootDir, 'docs/locales');
const outputDir = path.join(rootDir, 'docs/src/generated/api-locales');
const defaultLocale = 'en';

function collectDescriptionEntries(value: unknown, collected: Map<string, string>): void {
  collectKeyedTextEntries(value, collected, {
    keyField: 'descriptionKey',
    valueField: 'description'
  });
}

async function collectApiDescriptionEntries(): Promise<Map<string, string>> {
  const fileNames = await readdir(apiDir);
  const jsonFileNames = fileNames.filter(fileName => fileName.endsWith('.json') && fileName !== 'index.json');
  const collected = new Map<string, string>();

  for (const fileName of jsonFileNames) {
    const document = await readJsonObject(path.join(apiDir, fileName));
    collectDescriptionEntries(document, collected);
  }

  return collected;
}

export async function generateApiLocaleTemplates(): Promise<void> {
  const [entries, locales] = await Promise.all([collectApiDescriptionEntries(), listFileBasenames(localeDir, '.yml')]);

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
