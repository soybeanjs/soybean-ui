import path from 'node:path';
import process from 'node:process';
import type { DocsTarget } from '../shared/docs-targets';
import {
  parseTranslateCliOptions,
  printTranslateUsage,
  resolveTargetLocales,
  translateJsonLocaleFile
} from '../shared/translate';
import type { TranslateCliOptions } from '../shared/translate';

function printUsage() {
  printTranslateUsage(
    'sui gen changelog --translate',
    'Target locale, for example zh-CN or ja. If omitted, translates all available locales except the source locale.'
  );
}

async function translateLocale(target: DocsTarget, locale: string, options: TranslateCliOptions): Promise<void> {
  const localeDir = path.join(target.generatedDir, 'changelog-locales');
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
      console.log(`[${context.locale}] (${target.key}) pending changelog translations: ${context.pendingCount}`);
    },
    onBatchStart: context => {
      console.log(
        `[${context.locale}] (${target.key}) translated batch ${context.batchIndex + 1}/${context.batchCount}`
      );
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

export async function translateChangelogLocales(
  target: DocsTarget,
  argv: string[] = process.argv.slice(2)
): Promise<void> {
  const options = parseTranslateCliOptions(argv);

  if (options.help) {
    printUsage();
    return;
  }

  if (options.batchSize <= 0) {
    throw new Error('--batch-size must be greater than 0.');
  }

  if (!target.locales.includes(options.sourceLocale)) {
    throw new Error(`Unknown source locale: ${options.sourceLocale}`);
  }

  const targetLocales = resolveTargetLocales({
    availableLocales: target.locales,
    sourceLocale: options.sourceLocale,
    requestedLocale: options.locale,
    unsupportedLocaleMessage: locale => `Unknown target locale: ${locale}`
  });

  for (const locale of targetLocales) {
    await translateLocale(target, locale, options);
  }
}
