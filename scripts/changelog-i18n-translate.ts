import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

type JsonPrimitive = boolean | null | number | string;
type JsonValue = JsonArray | JsonObject | JsonPrimitive;

interface JsonArray extends Array<JsonValue> {}

interface JsonObject {
  [key: string]: JsonValue;
}

type CliOptions = {
  locale: string;
  sourceLocale: string;
  batchSize: number;
  limit: number | null;
  overwrite: boolean;
  dryRun: boolean;
  help: boolean;
};

type TranslationEntry = {
  key: string;
  source: string;
};

type DeepLTranslation = {
  detected_source_language?: string;
  text?: string;
};

type DeepLTranslateResponse = {
  message?: string;
  detail?: string;
  translations?: DeepLTranslation[];
};

const rootDir = process.cwd();
const localeDir = path.join(rootDir, 'docs/src/generated/changelog-locales');
const i18nModulePath = path.join(rootDir, 'docs/src/modules/i18n.ts');
const defaultBaseUrl = 'https://api-free.deepl.com/v2';
const defaultRetryCount = 3;
const defaultRetryDelayMs = 1500;
const deepLLanguageMap = new Map<string, string>([
  ['bg', 'BG'],
  ['cs', 'CS'],
  ['da', 'DA'],
  ['de', 'DE'],
  ['el', 'EL'],
  ['en', 'EN'],
  ['en-gb', 'EN-GB'],
  ['en-us', 'EN-US'],
  ['es', 'ES'],
  ['et', 'ET'],
  ['fi', 'FI'],
  ['fr', 'FR'],
  ['hu', 'HU'],
  ['id', 'ID'],
  ['it', 'IT'],
  ['ja', 'JA'],
  ['ko', 'KO'],
  ['lt', 'LT'],
  ['lv', 'LV'],
  ['nb', 'NB'],
  ['nl', 'NL'],
  ['pl', 'PL'],
  ['pt', 'PT-PT'],
  ['pt-br', 'PT-BR'],
  ['pt-pt', 'PT-PT'],
  ['ro', 'RO'],
  ['ru', 'RU'],
  ['sk', 'SK'],
  ['sl', 'SL'],
  ['sv', 'SV'],
  ['tr', 'TR'],
  ['uk', 'UK'],
  ['zh', 'ZH'],
  ['zh-cn', 'ZH'],
  ['zh-hans', 'ZH'],
  ['zh-sg', 'ZH'],
  ['zh-tw', 'ZH'],
  ['zh-hant', 'ZH'],
  ['zh-hk', 'ZH']
]);

function printUsage() {
  console.log(`Usage: pnpm translate:changelog:i18n -- [--locale <locale>] [options]

Options:
  --locale <locale>         Target locale, for example zh-CN or ja. If omitted, translates all available locales except the source locale.
  --source-locale <locale>  Source locale file, default: en
  --batch-size <number>     Number of entries per translation request, default: 20
  --limit <number>          Only translate the first N pending entries
  --overwrite               Re-translate entries that already have a target value
  --dry-run                 Show pending translation counts without writing files
  --help                    Show this help message

Environment:
  DEEPL_API_KEY             Required. DeepL API key
  DEEPL_BASE_URL            Optional. Defaults to https://api-free.deepl.com/v2
  TRANSLATE_API_KEY         Optional fallback for DEEPL_API_KEY
  TRANSLATE_BASE_URL        Optional fallback for DEEPL_BASE_URL
`);
}

function parseCliOptions(argv: string[]): CliOptions {
  const options: CliOptions = {
    locale: '',
    sourceLocale: 'en',
    batchSize: 20,
    limit: null,
    overwrite: false,
    dryRun: false,
    help: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const nextArg = argv[index + 1];

    switch (arg) {
      case '--locale':
        options.locale = nextArg ?? '';
        index += 1;
        break;
      case '--source-locale':
        options.sourceLocale = nextArg ?? options.sourceLocale;
        index += 1;
        break;
      case '--batch-size':
        options.batchSize = Number(nextArg) || options.batchSize;
        index += 1;
        break;
      case '--limit':
        options.limit = Number(nextArg) || null;
        index += 1;
        break;
      case '--overwrite':
        options.overwrite = true;
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
      default:
        break;
    }
  }

  return options;
}

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

async function resolveAvailableLocales(): Promise<string[]> {
  const moduleContent = await readFile(i18nModulePath, 'utf8');
  const localesGlobMatch = moduleContent.match(/import\.meta\.glob\('([^']*locales\/\*\.yml)'\)/u);

  if (!localesGlobMatch) {
    throw new Error(`Unable to resolve availableLocales from ${path.relative(rootDir, i18nModulePath)}.`);
  }

  const localesGlobPath = localesGlobMatch[1];
  const localesDirectory = path.resolve(path.dirname(i18nModulePath), path.dirname(localesGlobPath));
  const fileNames = await readdir(localesDirectory);

  return fileNames
    .filter(fileName => fileName.endsWith('.yml'))
    .map(fileName => fileName.replace(/\.yml$/u, ''))
    .sort((left, right) => left.localeCompare(right));
}

async function readJsonObject(filePath: string): Promise<JsonObject> {
  try {
    const content = await readFile(filePath, 'utf8');
    const parsed = JSON.parse(content) as unknown;

    return isJsonObject(parsed) ? parsed : {};
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return {};
    }

    throw error;
  }
}

function flattenLocaleMessages(messages: JsonObject, prefix: string = ''): Map<string, string> {
  const flattened = new Map<string, string>();

  for (const [key, value] of Object.entries(messages)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      flattened.set(nextKey, value);
      continue;
    }

    if (isJsonObject(value)) {
      for (const [nestedKey, nestedValue] of flattenLocaleMessages(value, nextKey)) {
        flattened.set(nestedKey, nestedValue);
      }
    }
  }

  return flattened;
}

function setNestedValue(messages: JsonObject, key: string, value: string): void {
  const segments = key.split('.');
  const lastSegment = segments.pop();

  if (!lastSegment) {
    return;
  }

  let current = messages;

  for (const segment of segments) {
    const existingValue = current[segment];

    if (!isJsonObject(existingValue)) {
      current[segment] = {};
    }

    current = current[segment] as JsonObject;
  }

  current[lastSegment] = value;
}

function sortJsonValue(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map(item => sortJsonValue(item as JsonValue));
  }

  if (!isJsonObject(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
      .map(([key, item]) => [key, sortJsonValue(item)])
  );
}

function chunkEntries(entries: TranslationEntry[], batchSize: number): TranslationEntry[][] {
  const chunks: TranslationEntry[][] = [];

  for (let index = 0; index < entries.length; index += batchSize) {
    chunks.push(entries.slice(index, index + batchSize));
  }

  return chunks;
}

function getPendingEntries(
  sourceMessages: Map<string, string>,
  targetMessages: Map<string, string>,
  overwrite: boolean,
  limit: number | null
): TranslationEntry[] {
  const pendingEntries = Array.from(sourceMessages.entries())
    .filter(([, source]) => source.trim())
    .filter(([key]) => overwrite || !targetMessages.get(key)?.trim())
    .map(([key, source]) => ({ key, source }));

  return limit ? pendingEntries.slice(0, limit) : pendingEntries;
}

function getEnvNumber(name: string, fallback: number): number {
  const value = Number(process.env[name]?.trim());

  if (!Number.isFinite(value) || value < 0) {
    return fallback;
  }

  return value;
}

function shouldRetryRequest(status: number): boolean {
  return status === 429 || status >= 500;
}

function getRetryDelay(attempt: number, retryDelayMs: number): number {
  return retryDelayMs * 2 ** attempt;
}

async function wait(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

async function readResponseText(response: Response): Promise<string> {
  try {
    return (await response.text()).trim();
  } catch {
    return '';
  }
}

function toDeepLLanguage(locale: string): string {
  const normalizedLocale = locale.trim().replace(/_/gu, '-').toLowerCase();

  const mappedLanguage = deepLLanguageMap.get(normalizedLocale);

  if (mappedLanguage) {
    return mappedLanguage;
  }

  const [language, region] = normalizedLocale.split('-');

  if (!region) {
    return language.toUpperCase();
  }

  return `${language.toUpperCase()}-${region.toUpperCase()}`;
}

async function translateBatch(
  batch: TranslationEntry[],
  sourceLocale: string,
  targetLocale: string,
  apiKey: string,
  baseUrl: string,
  retryCount: number,
  retryDelayMs: number
): Promise<string[]> {
  const endpoint = `${baseUrl.replace(/\/$/u, '')}/translate`;
  const body = new URLSearchParams();

  body.set('source_lang', toDeepLLanguage(sourceLocale));
  body.set('target_lang', toDeepLLanguage(targetLocale));

  for (const entry of batch) {
    body.append('text', entry.source);
  }

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString()
    });

    if (response.ok) {
      const payload = (await response.json()) as DeepLTranslateResponse;
      const translations = payload.translations?.map(item => item.text?.trim() ?? '') ?? [];

      if (translations.length !== batch.length) {
        throw new Error(`DeepL returned ${translations.length} translations for a batch of ${batch.length} entries.`);
      }

      return translations;
    }

    const responseText = await readResponseText(response);

    if (attempt < retryCount && shouldRetryRequest(response.status)) {
      await wait(getRetryDelay(attempt, retryDelayMs));
      continue;
    }

    throw new Error(`DeepL request failed with status ${response.status}.${responseText ? ` ${responseText}` : ''}`);
  }

  throw new Error('DeepL request failed after exhausting retries.');
}

async function translateLocale(
  locale: string,
  sourceLocale: string,
  batchSize: number,
  limit: number | null,
  overwrite: boolean,
  dryRun: boolean
): Promise<void> {
  const sourcePath = path.join(localeDir, `${sourceLocale}.json`);
  const targetPath = path.join(localeDir, `${locale}.json`);
  const [sourceMessagesJson, targetMessagesJson] = await Promise.all([
    readJsonObject(sourcePath),
    readJsonObject(targetPath)
  ]);
  const sourceMessages = flattenLocaleMessages(sourceMessagesJson);
  const targetMessages = flattenLocaleMessages(targetMessagesJson);
  const pendingEntries = getPendingEntries(sourceMessages, targetMessages, overwrite, limit);

  console.log(`[${locale}] pending changelog translations: ${pendingEntries.length}`);

  if (!pendingEntries.length || dryRun) {
    return;
  }

  const apiKey = process.env.DEEPL_API_KEY?.trim() || process.env.TRANSLATE_API_KEY?.trim();

  if (!apiKey) {
    throw new Error('DEEPL_API_KEY is required to translate changelog locale messages.');
  }

  const baseUrl = process.env.DEEPL_BASE_URL?.trim() || process.env.TRANSLATE_BASE_URL?.trim() || defaultBaseUrl;
  const retryCount = getEnvNumber('DEEPL_RETRY_COUNT', defaultRetryCount);
  const retryDelayMs = getEnvNumber('DEEPL_RETRY_DELAY_MS', defaultRetryDelayMs);
  const chunks = chunkEntries(pendingEntries, batchSize);

  for (const [index, batch] of chunks.entries()) {
    const translated = await translateBatch(batch, sourceLocale, locale, apiKey, baseUrl, retryCount, retryDelayMs);

    batch.forEach((entry, batchIndex) => {
      setNestedValue(targetMessagesJson, entry.key, translated[batchIndex]);
    });

    console.log(`[${locale}] translated batch ${index + 1}/${chunks.length}`);
  }

  const sortedMessages = sortJsonValue(targetMessagesJson) as JsonObject;
  await writeFile(targetPath, `${JSON.stringify(sortedMessages, null, 2)}\n`, 'utf8');
}

async function main(): Promise<void> {
  const options = parseCliOptions(process.argv.slice(2));

  if (options.help) {
    printUsage();
    return;
  }

  const availableLocales = await resolveAvailableLocales();

  if (!availableLocales.includes(options.sourceLocale)) {
    throw new Error(`Unknown source locale: ${options.sourceLocale}`);
  }

  const targetLocales = options.locale
    ? [options.locale]
    : availableLocales.filter(locale => locale !== options.sourceLocale);

  for (const locale of targetLocales) {
    if (!availableLocales.includes(locale)) {
      throw new Error(`Unknown target locale: ${locale}`);
    }

    if (locale === options.sourceLocale) {
      continue;
    }

    await translateLocale(
      locale,
      options.sourceLocale,
      options.batchSize,
      options.limit,
      options.overwrite,
      options.dryRun
    );
  }
}

await main();
