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
const changelogDir = path.join(rootDir, 'docs/src/generated/changelog');
const localeDir = path.join(rootDir, 'docs/locales');
const outputDir = path.join(rootDir, 'docs/src/generated/changelog-locales');
const defaultLocale = 'en';

function collectSummaryEntries(value: unknown, collected: Map<string, string>): void {
  collectKeyedTextEntries(value, collected, {
    keyField: 'summaryKey',
    valueField: 'summary'
  });
}

async function collectChangelogSummaryEntries(): Promise<Map<string, string>> {
  const fileNames = await readdir(changelogDir);
  const jsonFileNames = fileNames.filter(fileName => fileName.endsWith('.json') && fileName !== 'index.json');
  const collected = new Map<string, string>();

  for (const fileName of jsonFileNames) {
    const document = await readJsonObject(path.join(changelogDir, fileName));
    collectSummaryEntries(document, collected);
  }

  return collected;
}

export async function generateChangelogLocaleTemplates(): Promise<void> {
  const [entries, locales] = await Promise.all([
    collectChangelogSummaryEntries(),
    listFileBasenames(localeDir, '.yml')
  ]);

  await mkdir(outputDir, { recursive: true });

  const { changedSourceKeys } = await syncLocaleTemplateFiles({
    entries,
    locales,
    outputDir,
    defaultLocale
  });

  console.log(
    `Generated changelog locale templates for ${locales.join(', ')} with ${entries.size} translation keys.` +
      ` Reset ${changedSourceKeys.size} changed source keys for non-default locales.`
  );
}

runCliModule(import.meta.url, generateChangelogLocaleTemplates);
