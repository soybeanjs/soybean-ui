import { readFile, writeFile } from 'node:fs/promises';
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
const localeDir = path.join(rootDir, 'docs/src/generated/api-locales');
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
  console.log(`Usage: pnpm translate:api:i18n -- --locale <locale> [options]

Options:
  --locale <locale>         Target locale, for example zh-CN or ja
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

function createTranslationContext(locale: string): string {
  return [
    `Target locale: ${locale}.`,
    'Translate technical component API documentation.',
    'Preserve Markdown, punctuation, line breaks, code fences, and inline code.',
    'Do not translate identifiers inside backticks, component names, type names, prop keys, event names, or enum-like string literals unless they are ordinary prose.',
    'Keep the output natural for software documentation.'
  ].join(' ');
}

function getTranslateApiKey(): string {
  const apiKey = process.env.DEEPL_API_KEY?.trim() || process.env.TRANSLATE_API_KEY?.trim();

  if (!apiKey) {
    throw new Error('Missing required environment variable: DEEPL_API_KEY');
  }

  return apiKey;
}

function getTranslateBaseUrl(): string {
  return (process.env.DEEPL_BASE_URL?.trim() || process.env.TRANSLATE_BASE_URL?.trim() || defaultBaseUrl).replace(
    /\/$/u,
    ''
  );
}

function getDeepLErrorMessage(payload: DeepLTranslateResponse | null, fallback: string): string {
  return payload?.message?.trim() || payload?.detail?.trim() || fallback;
}

function parseDeepLErrorResponse(responseText: string): DeepLTranslateResponse | null {
  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText) as DeepLTranslateResponse;
  } catch {
    return null;
  }
}

async function requestTranslations(
  entries: TranslationEntry[],
  locale: string,
  sourceLocale: string
): Promise<Map<string, string>> {
  const apiKey = getTranslateApiKey();
  const baseUrl = getTranslateBaseUrl();
  const retryCount = getEnvNumber('TRANSLATE_RETRY_COUNT', defaultRetryCount);
  const retryDelayMs = getEnvNumber('TRANSLATE_RETRY_DELAY_MS', defaultRetryDelayMs);
  const sourceLanguage = toDeepLLanguage(process.env.DEEPL_SOURCE_LANG?.trim() || sourceLocale);
  const targetLanguage = toDeepLLanguage(locale);

  let payload: DeepLTranslateResponse | null = null;

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    const response = await fetch(`${baseUrl}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `DeepL-Auth-Key ${apiKey}`
      },
      body: JSON.stringify({
        source_lang: sourceLanguage,
        target_lang: targetLanguage,
        text: entries.map(entry => entry.source),
        context: createTranslationContext(locale),
        preserve_formatting: true
      })
    });

    if (response.ok) {
      payload = (await response.json()) as DeepLTranslateResponse;
      break;
    }

    const responseText = await readResponseText(response);
    const parsedError = parseDeepLErrorResponse(responseText);

    if (attempt < retryCount && shouldRetryRequest(response.status)) {
      const delayMs = getRetryDelay(attempt, retryDelayMs);
      console.log(
        `Translation request failed with ${response.status}. Retrying in ${delayMs}ms (${attempt + 1}/${retryCount})...`
      );
      await wait(delayMs);
      continue;
    }

    const details = getDeepLErrorMessage(parsedError, responseText || response.statusText);
    throw new Error(`Translation request failed: ${response.status} ${details}`);
  }

  if (!payload) {
    throw new Error('Translation request failed without a response payload.');
  }

  const translations = payload.translations;

  if (!translations?.length) {
    throw new Error('Translation response did not include translations.');
  }

  const translatedEntries = new Map<string, string>();

  entries.forEach((entry, index) => {
    const translatedValue = translations[index]?.text;

    if (typeof translatedValue !== 'string') {
      throw new Error(`Missing translated value for key: ${entry.key}`);
    }

    translatedEntries.set(entry.key, translatedValue);
  });

  return translatedEntries;
}

async function writeJsonObject(filePath: string, messages: JsonObject): Promise<void> {
  const content = `${JSON.stringify(sortJsonValue(messages), null, 2)}\n`;
  await writeFile(filePath, content, 'utf8');
}

async function main(): Promise<void> {
  const options = parseCliOptions(process.argv.slice(2));

  if (options.help) {
    printUsage();
    return;
  }

  if (!options.locale) {
    throw new Error('Missing required argument: --locale');
  }

  if (options.locale === options.sourceLocale) {
    throw new Error('Target locale must be different from source locale.');
  }

  if (options.batchSize <= 0) {
    throw new Error('--batch-size must be greater than 0.');
  }

  const sourcePath = path.join(localeDir, `${options.sourceLocale}.json`);
  const targetPath = path.join(localeDir, `${options.locale}.json`);
  const [sourceMessages, targetMessages] = await Promise.all([readJsonObject(sourcePath), readJsonObject(targetPath)]);
  const flattenedSourceMessages = flattenLocaleMessages(sourceMessages);
  const flattenedTargetMessages = flattenLocaleMessages(targetMessages);
  const pendingEntries = getPendingEntries(
    flattenedSourceMessages,
    flattenedTargetMessages,
    options.overwrite,
    options.limit
  );

  if (!pendingEntries.length) {
    console.log(`No pending translations for ${options.locale}.`);
    return;
  }

  console.log(`Found ${pendingEntries.length} pending translations for ${options.locale}.`);

  if (options.dryRun) {
    return;
  }

  const translatedTextCache = new Map<string, string>();
  const targetDocument = targetMessages;
  const entryChunks = chunkEntries(pendingEntries, options.batchSize);

  for (const [chunkIndex, entryChunk] of entryChunks.entries()) {
    const uncachedEntries = entryChunk.filter(entry => !translatedTextCache.has(entry.source));

    if (uncachedEntries.length) {
      console.log(`Translating batch ${chunkIndex + 1}/${entryChunks.length} (${uncachedEntries.length} entries)...`);
      const translatedEntries = await requestTranslations(uncachedEntries, options.locale, options.sourceLocale);

      uncachedEntries.forEach(entry => {
        translatedTextCache.set(entry.source, translatedEntries.get(entry.key) ?? '');
      });
    }

    entryChunk.forEach(entry => {
      const translatedValue = translatedTextCache.get(entry.source);

      if (translatedValue === undefined) {
        throw new Error(`Missing cached translation for key: ${entry.key}`);
      }

      setNestedValue(targetDocument, entry.key, translatedValue);
    });
  }

  await writeJsonObject(targetPath, targetDocument);
  console.log(`Updated ${path.relative(rootDir, targetPath)} with ${pendingEntries.length} translations.`);
}

await main();
