import path from 'node:path';
import process from 'node:process';

import {
  parseTranslateCliOptions,
  printTranslateUsage,
  resolveTargetLocales,
  translateJsonLocaleFile,
  resolveAvailableLocalesFromI18nModule
} from './_translate';
import type { TranslateCliOptions } from './_translate';

const rootDir = process.cwd();
const localeDir = path.join(rootDir, 'docs/src/generated/changelog-locales');
const i18nModulePath = path.join(rootDir, 'docs/src/modules/i18n.ts');

function printUsage() {
  printTranslateUsage(
    'translate:changelog:i18n',
    'Target locale, for example zh-CN or ja. If omitted, translates all available locales except the source locale.'
  );
}

async function translateLocale(locale: string, options: TranslateCliOptions): Promise<void> {
  const sourcePath = path.join(localeDir, `${options.sourceLocale}.json`);
  const targetPath = path.join(localeDir, `${locale}.json`);
  await translateJsonLocaleFile({
    sourcePath,
    targetPath,
    sourceLocale: options.sourceLocale,
    targetLocale: locale,
    batchSize: options.batchSize,
    overwrite: options.overwrite,
    limit: options.limit,
    dryRun: options.dryRun,
    createContext: () => createTranslationContext(locale),
    apiKeyErrorMessage: 'DEEPL_API_KEY is required to translate changelog locale messages.',
    retryCountEnvName: 'DEEPL_RETRY_COUNT',
    retryDelayEnvName: 'DEEPL_RETRY_DELAY_MS',
    onPendingResolved: context => {
      console.log(`[${context.locale}] pending changelog translations: ${context.pendingCount}`);
    },
    onBatchStart: context => {
      console.log(`[${context.locale}] translated batch ${context.batchIndex + 1}/${context.batchCount}`);
    }
  });
}

function createTranslationContext(locale: string): string {
  return [
    `Target locale: ${locale}.`,
    'Translate concise changelog summaries for a Vue component library.',
    'Keep component names, versions, Markdown, punctuation, and inline code unchanged.',
    'Prefer short release-note wording.'
  ].join(' ');
}

async function main(): Promise<void> {
  const options = parseTranslateCliOptions(process.argv.slice(2));

  if (options.help) {
    printUsage();
    return;
  }

  if (options.batchSize <= 0) {
    throw new Error('--batch-size must be greater than 0.');
  }

  const availableLocales = await resolveAvailableLocalesFromI18nModule(rootDir, i18nModulePath);

  if (!availableLocales.includes(options.sourceLocale)) {
    throw new Error(`Unknown source locale: ${options.sourceLocale}`);
  }

  const targetLocales = resolveTargetLocales({
    availableLocales,
    sourceLocale: options.sourceLocale,
    requestedLocale: options.locale,
    unsupportedLocaleMessage: locale => `Unknown target locale: ${locale}`
  });

  for (const locale of targetLocales) {
    await translateLocale(locale, options);
  }
}

await main();
