import path from 'node:path';
import process from 'node:process';

import {
  parseTranslateCliOptions,
  printTranslateUsage,
  resolveTargetLocales,
  translateJsonLocaleFile,
  resolveAvailableLocalesFromI18nModule
} from './_translate';
import { runCliModule } from './_shared';
import type { TranslateCliOptions } from './_translate';

const rootDir = process.cwd();
const localeDir = path.join(rootDir, 'docs/src/generated/api-locales');
const i18nModulePath = path.join(rootDir, 'docs/src/modules/i18n.ts');

function printUsage() {
  printTranslateUsage(
    'sui api-translate --',
    'Target locale, for example zh-CN or ja. If omitted, translates all available locales except the source locale.'
  );
}

function createTranslationContext(locale: string): string {
  return [
    `Target locale: ${locale}.`,
    'Translate technical component API documentation.',
    'Preserve Markdown, punctuation, line breaks, code fences, and inline code.',
    'Do not translate identifiers inside backticks, component names, type names, prop keys, event names, or enum-like string literals unless they are ordinary prose.',
    'Keep the output natural for software documentation.'
  ].join(' ');
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
    sourceLanguage: process.env.DEEPL_SOURCE_LANG?.trim() || undefined,
    onPendingResolved: context => {
      if (!context.pendingCount) {
        console.log(`No pending translations for ${context.locale}.`);
        return;
      }

      console.log(`Found ${context.pendingCount} pending translations for ${context.locale}.`);
    },
    onBatchStart: context => {
      console.log(
        `Translating ${context.locale} batch ${context.batchIndex + 1}/${context.batchCount} (${context.entryCount} entries)...`
      );
    },
    onUpdated: context => {
      console.log(`Updated ${path.relative(rootDir, context.targetPath)} with ${context.pendingCount} translations.`);
    }
  });
}

export async function translateApiLocales(argv: string[] = process.argv.slice(2)): Promise<void> {
  const options = parseTranslateCliOptions(argv);

  if (options.help) {
    printUsage();
    return;
  }

  if (options.batchSize <= 0) {
    throw new Error('--batch-size must be greater than 0.');
  }

  const availableLocales = await resolveAvailableLocalesFromI18nModule(rootDir, i18nModulePath);
  const targetLocales = resolveTargetLocales({
    availableLocales,
    sourceLocale: options.sourceLocale,
    requestedLocale: options.locale
  });

  console.log(`Target locales: ${targetLocales.join(', ')}`);

  for (const locale of targetLocales) {
    await translateLocale(locale, options);
  }
}

runCliModule(import.meta.url, translateApiLocales);
