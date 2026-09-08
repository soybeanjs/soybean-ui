import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { defaultLocale } from '../shared/docs-targets';
import type { DocsTarget } from '../shared/docs-targets';
import { collectKeyedTextEntries, readJsonObject, syncLocaleTemplateFiles } from '../shared/json';

function collectSummaryEntries(value: unknown, collected: Map<string, string>): void {
  collectKeyedTextEntries(value, collected, {
    keyField: 'summaryKey',
    valueField: 'summary'
  });
}

async function collectChangelogSummaryEntries(changelogDir: string): Promise<Map<string, string>> {
  const fileNames = await readdir(changelogDir);
  const jsonFileNames = fileNames.filter(fileName => fileName.endsWith('.json') && fileName !== 'index.json');
  const collected = new Map<string, string>();

  for (const fileName of jsonFileNames) {
    const document = await readJsonObject(path.join(changelogDir, fileName));
    collectSummaryEntries(document, collected);
  }

  return collected;
}

export async function generateChangelogLocaleTemplates(target: DocsTarget): Promise<void> {
  const changelogDir = path.join(target.generatedDir, 'changelog');
  const outputDir = path.join(target.generatedDir, 'changelog-locales');
  const entries = await collectChangelogSummaryEntries(changelogDir);

  await mkdir(outputDir, { recursive: true });

  const { changedSourceKeys } = await syncLocaleTemplateFiles({
    entries,
    locales: target.locales,
    outputDir,
    defaultLocale
  });

  console.log(
    `Generated changelog locale templates (${target.key}) for ${target.locales.join(', ')} with ${entries.size} translation keys.` +
      ` Reset ${changedSourceKeys.size} changed source keys for non-default locales.`
  );
}
