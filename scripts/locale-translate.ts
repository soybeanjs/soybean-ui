import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

type JsonPrimitive = boolean | null | number | string;
type JsonValue = JsonArray | JsonObject | JsonPrimitive;

interface JsonArray extends Array<JsonValue> {}

interface JsonObject {
  [key: string]: JsonValue;
}

interface LocaleRegistryDocument {
  name: string;
  key: string;
  dir?: 'ltr' | 'rtl';
  messages: JsonObject;
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

type PreparedTranslationEntry = TranslationEntry & {
  protectedSource: string;
  placeholderTokens: Map<string, string>;
};

type DeepLTranslation = {
  detected_source_language?: string;
  text?: string;
};

type DeepLTranslateResponse = {
  detail?: string;
  message?: string;
  translations?: DeepLTranslation[];
};

const rootDir = process.cwd();
const localeDir = path.join(rootDir, 'headless/src/locale/langs');
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
  ['nb-no', 'NB'],
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
  ['zh-hk', 'ZH'],
  ['zh-sg', 'ZH'],
  ['zh-tw', 'ZH'],
  ['zh-hant', 'ZH']
]);

const rtlLanguageCodes = new Set(['ar', 'fa', 'he', 'ur']);

function printUsage() {
  console.log(`Usage: pnpm translate:locale -- [--locale <locale>] [options]

Options:
  --locale <locale>         Target locale, for example de, pt-BR, or zh-TW. If omitted, translates all locale files in headless/src/locale/langs except the source locale.
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

function isMissingModuleError(error: unknown, filePath: string): boolean {
  if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
    return true;
  }

  return error instanceof Error && error.message.includes(path.basename(filePath));
}

function cloneJsonObject(value: JsonObject): JsonObject {
  return JSON.parse(JSON.stringify(value)) as JsonObject;
}

function isLocaleRegistryDocument(value: unknown): value is LocaleRegistryDocument {
  return (
    isJsonObject(value) &&
    typeof value.name === 'string' &&
    typeof value.key === 'string' &&
    isJsonObject(value.messages) &&
    (value.dir === undefined || value.dir === 'ltr' || value.dir === 'rtl')
  );
}

function getPrimaryLanguageSubtag(locale: string): string {
  const normalizedLocale = locale.trim().replace(/_/gu, '-').toLowerCase();

  if (!normalizedLocale) {
    return 'en';
  }

  return normalizedLocale.split('-')[0] ?? 'en';
}

function resolveLocaleDirection(locale: string): 'ltr' | 'rtl' {
  return rtlLanguageCodes.has(getPrimaryLanguageSubtag(locale)) ? 'rtl' : 'ltr';
}

function resolveLocaleDisplayName(locale: string): string {
  const normalizedLocale = locale.trim().replace(/_/gu, '-');
  const [languageCode, regionCode] = normalizedLocale.split('-');

  if (!languageCode) {
    return 'English';
  }

  const languageDisplayNames = new Intl.DisplayNames([normalizedLocale, languageCode, 'en'], { type: 'language' });
  const languageName = languageDisplayNames.of(languageCode) ?? normalizedLocale;

  if (!regionCode) {
    return languageName;
  }

  const regionDisplayNames = new Intl.DisplayNames([normalizedLocale, languageCode, 'en'], { type: 'region' });
  const regionName = regionDisplayNames.of(regionCode.toUpperCase());

  if (!regionName) {
    return languageName;
  }

  return `${languageName} (${regionName})`;
}

function toLocaleExportName(locale: string): string {
  const segments = locale.trim().replace(/_/gu, '-').split('-').filter(Boolean);

  const [firstSegment, ...remainingSegments] = segments;

  if (!firstSegment) {
    return 'en';
  }

  return `${firstSegment.toLowerCase()}${remainingSegments.map(segment => segment.toUpperCase()).join('')}`;
}

async function resolveAvailableLocales(): Promise<string[]> {
  const fileNames = await readdir(localeDir);

  return fileNames
    .filter(fileName => fileName.endsWith('.ts'))
    .map(fileName => fileName.replace(/\.ts$/u, ''))
    .sort((left, right) => left.localeCompare(right));
}

async function readLocaleMessages(locale: string): Promise<JsonObject> {
  const filePath = path.join(localeDir, `${locale}.ts`);

  try {
    const localeModule = (await import(pathToFileURL(filePath).href)) as Record<string, unknown>;
    const exportName = toLocaleExportName(locale);
    const localeExport = localeModule.default ?? localeModule[exportName];
    const messages = isLocaleRegistryDocument(localeExport) ? localeExport.messages : localeExport;

    return isJsonObject(messages) ? cloneJsonObject(messages) : {};
  } catch (error) {
    if (isMissingModuleError(error, filePath)) {
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

function shouldTranslateKey(key: string): boolean {
  return !key.startsWith('date.placeholder.');
}

function rebuildLocaleMessages(
  sourceMessages: JsonObject,
  translatedMessages: Map<string, string>,
  prefix: string = ''
): JsonObject {
  const output: JsonObject = {};

  for (const [key, value] of Object.entries(sourceMessages)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      output[key] = translatedMessages.get(nextKey) ?? value;
      continue;
    }

    if (isJsonObject(value)) {
      output[key] = rebuildLocaleMessages(value, translatedMessages, nextKey);
    }
  }

  return output;
}

function getPendingEntries(
  sourceMessages: Map<string, string>,
  targetMessages: Map<string, string>,
  overwrite: boolean,
  limit: number | null
): TranslationEntry[] {
  const pendingEntries = Array.from(sourceMessages.entries())
    .filter(([key]) => shouldTranslateKey(key))
    .filter(([, source]) => source.trim())
    .filter(([key]) => overwrite || !targetMessages.get(key)?.trim())
    .map(([key, source]) => ({ key, source }));

  return limit ? pendingEntries.slice(0, limit) : pendingEntries;
}

function chunkEntries(entries: TranslationEntry[], batchSize: number): TranslationEntry[][] {
  const chunks: TranslationEntry[][] = [];

  for (let index = 0; index < entries.length; index += batchSize) {
    chunks.push(entries.slice(index, index + batchSize));
  }

  return chunks;
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

function getEntryDescription(key: string): string {
  switch (key) {
    case 'pagination.firstPage':
    case 'pagination.prevPage':
    case 'pagination.nextPage':
    case 'pagination.lastPage':
      return 'Pagination button label and aria-label.';
    case 'table.emptyTitle':
      return 'Table empty state title.';
    case 'table.emptyDescription':
      return 'Table empty state description.';
    case 'table.selectAllRows':
      return 'Aria-label for selecting all table rows.';
    case 'table.sortByColumn':
      return 'Aria-label template for sorting a table column. Keep {column} unchanged.';
    case 'table.sortByColumnAsc':
      return 'Aria-label template for a table column sorted ascending. Keep {column} unchanged.';
    case 'table.sortByColumnDesc':
      return 'Aria-label template for a table column sorted descending. Keep {column} unchanged.';
    case 'table.resizeColumn':
      return 'Aria-label template for resizing a table column. Keep {column} unchanged.';
    case 'table.expandRow':
      return 'Aria-label template for expanding a table row. Keep {row} unchanged.';
    case 'table.collapseRow':
      return 'Aria-label template for collapsing a table row. Keep {row} unchanged.';
    case 'table.selectRow':
      return 'Aria-label template for selecting a table row. Keep {row} unchanged.';
    case 'calendar.prevPage':
    case 'calendar.nextPage':
      return 'Calendar navigation button label and aria-label.';
    case 'calendar.selectMonth':
      return 'Aria-label for opening the month selector in a calendar.';
    case 'calendar.selectYear':
      return 'Aria-label for opening the year selector in a calendar.';
    case 'layout.toggleSidebar':
      return 'Aria-label and title for toggling a layout sidebar.';
    case 'inputNumber.increment':
      return 'Aria-label for increasing a number input value.';
    case 'inputNumber.decrement':
      return 'Aria-label for decreasing a number input value.';
    case 'inputNumber.clear':
      return 'Aria-label for clearing a number input value.';
    case 'textarea.clear':
      return 'Aria-label for clearing a textarea value.';
    case 'tagsInput.addTag':
      return 'Aria-label for a tags input field used to add a tag.';
    case 'tagsInput.clear':
      return 'Aria-label for clearing all tags.';
    case 'progress.loading':
      return 'Aria-label describing a loading progress indicator.';
    case 'anchor.nav':
      return 'Aria-label for an anchor navigation landmark.';
    case 'breadcrumb.nav':
      return 'Aria-label for a breadcrumb navigation landmark.';
    case 'stepper.step':
      return 'Step indicator text template. Keep {step} unchanged.';
    case 'editable.cancel':
    case 'dialog.cancel':
      return 'Button text and aria-label for a cancel action.';
    case 'editable.edit':
      return 'Button text and aria-label for entering edit mode.';
    case 'editable.submit':
      return 'Button text and aria-label for submitting an edit.';
    case 'combobox.clearInput':
    case 'autocomplete.clearInput':
    case 'password.clearInput':
      return 'Aria-label for clearing the current text input value. Clear means remove content, not make obvious.';
    case 'combobox.noResults':
    case 'autocomplete.noResults':
    case 'command.noResults':
      return 'Empty state text shown when search returns no results.';
    case 'combobox.search':
      return 'Fallback aria-label for a search input field.';
    case 'combobox.options':
      return 'Fallback aria-label for the options list or viewport.';
    case 'autocomplete.toggleSuggestions':
      return 'Aria-label for toggling the autocomplete suggestions list.';
    case 'dialog.confirm':
      return 'Button text and aria-label for confirming an action.';
    case 'slider.valueN':
      return 'Aria-label template for one slider thumb in a multi-value slider. Keep {index} and {total} unchanged.';
    case 'slider.minimum':
      return 'Aria-label for the minimum thumb in a range slider.';
    case 'slider.maximum':
      return 'Aria-label for the maximum thumb in a range slider.';
    case 'password.showPassword':
      return 'Aria-label for showing a hidden password.';
    case 'password.hidePassword':
      return 'Aria-label for hiding a visible password.';
    case 'date.daySegment':
      return 'Aria-label for the day segment in a date input.';
    case 'date.monthSegment':
      return 'Aria-label for the month segment in a date input.';
    case 'date.yearSegment':
      return 'Aria-label for the year segment in a date input.';
    case 'date.hourSegment':
      return 'Aria-label for the hour segment in a time input.';
    case 'date.minuteSegment':
      return 'Aria-label for the minute segment in a time input.';
    case 'date.secondSegment':
      return 'Aria-label for the second segment in a time input.';
    case 'date.dayPeriodSegment':
      return 'Aria-label for the AM/PM or day period segment in a time input.';
    case 'date.timeZoneSegment':
      return 'Aria-label for the time zone segment in a time input.';
    case 'date.empty':
      return 'Aria-valuetext for an empty or unfilled date/time segment.';
    default:
      return 'Short UI copy for a component label, button, aria-label, or empty state.';
  }
}

function createTranslationContext(locale: string, entries: TranslationEntry[]): string {
  return [
    `Target locale: ${locale}.`,
    'Translate short built-in UI copy for a Vue component library.',
    'Keep placeholders such as {column}, {row}, {step}, {index}, and {total} unchanged.',
    'For verbs such as clear, confirm, submit, edit, and toggle, prefer concise interface wording suitable for button labels and aria-labels.',
    'For date strings, day, month, year, hour, minute, second, day period, and time zone refer to date or time input segments.',
    'Preserve punctuation, spacing, casing intent, and concise accessibility wording.',
    'Translate naturally for interface labels, empty states, and button text.',
    ...entries.map(entry => `${entry.key}: ${getEntryDescription(entry.key)}`)
  ].join(' ');
}

function protectPlaceholders(source: string): Pick<PreparedTranslationEntry, 'placeholderTokens' | 'protectedSource'> {
  const placeholderTokens = new Map<string, string>();
  const placeholders = Array.from(source.matchAll(/\{[^}]+\}/gu), match => match[0]);

  if (!placeholders.length) {
    return { placeholderTokens, protectedSource: source };
  }

  let protectedSource = source;

  placeholders.forEach((placeholder, index) => {
    const token = `SBPH${index}TOKEN`;
    placeholderTokens.set(token, placeholder);
    protectedSource = protectedSource.replaceAll(placeholder, token);
  });

  return { placeholderTokens, protectedSource };
}

function restorePlaceholders(text: string, placeholderTokens: Map<string, string>): string {
  let restoredText = text;

  placeholderTokens.forEach((placeholder, token) => {
    restoredText = restoredText.replaceAll(token, placeholder);
  });

  return restoredText;
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
  const preparedEntries = entries.map(entry => ({ ...entry, ...protectPlaceholders(entry.source) }));

  let payload: DeepLTranslateResponse | null = null;

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    const response = await fetch(`${baseUrl}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `DeepL-Auth-Key ${apiKey}`
      },
      body: JSON.stringify({
        context: createTranslationContext(locale, entries),
        preserve_formatting: true,
        source_lang: sourceLanguage,
        target_lang: targetLanguage,
        text: preparedEntries.map(entry => entry.protectedSource)
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

  preparedEntries.forEach((entry, index) => {
    const translatedValue = translations[index]?.text;

    if (typeof translatedValue !== 'string') {
      throw new Error(`Missing translated value for key: ${entry.key}`);
    }

    translatedEntries.set(entry.key, restorePlaceholders(translatedValue, entry.placeholderTokens));
  });

  return translatedEntries;
}

function formatObjectKey(key: string): string {
  return /^[A-Za-z_$][\w$]*$/u.test(key) ? key : JSON.stringify(key);
}

function escapeString(value: string): string {
  return value.replace(/\\/gu, '\\\\').replace(/'/gu, "\\'").replace(/\n/gu, '\\n');
}

function serializeTsValue(value: JsonValue, indentLevel: number = 0): string {
  if (typeof value === 'string') {
    return `'${escapeString(value)}'`;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (value === null) {
    return 'null';
  }

  if (Array.isArray(value)) {
    if (!value.length) {
      return '[]';
    }

    const indent = '  '.repeat(indentLevel);
    const childIndent = '  '.repeat(indentLevel + 1);

    return `[
${value.map(item => `${childIndent}${serializeTsValue(item, indentLevel + 1)}`).join(',\n')}
${indent}]`;
  }

  const entries = Object.entries(value);

  if (!entries.length) {
    return '{}';
  }

  const indent = '  '.repeat(indentLevel);
  const childIndent = '  '.repeat(indentLevel + 1);

  return `{
${entries.map(([key, item]) => `${childIndent}${formatObjectKey(key)}: ${serializeTsValue(item, indentLevel + 1)}`).join(',\n')}
${indent}}`;
}

async function writeLocaleMessages(locale: string, messages: JsonObject): Promise<void> {
  const exportName = toLocaleExportName(locale);
  const filePath = path.join(localeDir, `${locale}.ts`);
  const localeRegistry = {
    name: resolveLocaleDisplayName(locale),
    key: locale,
    dir: resolveLocaleDirection(locale),
    messages
  };
  const content = `import type { LocaleRegistry } from '../types';\n\nconst ${exportName}: LocaleRegistry = ${serializeTsValue(localeRegistry)};\n\nexport default ${exportName};\n`;

  await writeFile(filePath, content, 'utf8');
}

async function translateLocale(locale: string, options: CliOptions): Promise<void> {
  const sourceMessagesDocument = await readLocaleMessages(options.sourceLocale);

  if (!Object.keys(sourceMessagesDocument).length) {
    throw new Error(`Unable to find source locale: ${options.sourceLocale}`);
  }

  const targetMessagesDocument = await readLocaleMessages(locale);
  const flattenedSourceMessages = flattenLocaleMessages(sourceMessagesDocument);
  const flattenedTargetMessages = flattenLocaleMessages(targetMessagesDocument);
  const pendingEntries = getPendingEntries(
    flattenedSourceMessages,
    flattenedTargetMessages,
    options.overwrite,
    options.limit
  );

  if (!pendingEntries.length) {
    console.log(`No pending translations for ${locale}.`);
    return;
  }

  console.log(`Found ${pendingEntries.length} pending translations for ${locale}.`);

  if (options.dryRun) {
    return;
  }

  const translatedTextCache = new Map<string, string>();
  const entryChunks = chunkEntries(pendingEntries, options.batchSize);

  for (const [chunkIndex, entryChunk] of entryChunks.entries()) {
    const uncachedEntries = entryChunk.filter(entry => !translatedTextCache.has(entry.source));

    if (uncachedEntries.length) {
      console.log(
        `Translating ${locale} batch ${chunkIndex + 1}/${entryChunks.length} (${uncachedEntries.length} entries)...`
      );
      const translatedEntries = await requestTranslations(uncachedEntries, locale, options.sourceLocale);

      uncachedEntries.forEach(entry => {
        translatedTextCache.set(entry.source, translatedEntries.get(entry.key) ?? '');
      });
    }

    entryChunk.forEach(entry => {
      const translatedValue = translatedTextCache.get(entry.source);

      if (translatedValue === undefined) {
        throw new Error(`Missing cached translation for key: ${entry.key}`);
      }

      flattenedTargetMessages.set(entry.key, translatedValue);
    });
  }

  const outputDocument = rebuildLocaleMessages(sourceMessagesDocument, flattenedTargetMessages);

  await writeLocaleMessages(locale, outputDocument);
  console.log(
    `Updated ${path.relative(rootDir, path.join(localeDir, `${locale}.ts`))} with ${pendingEntries.length} translations.`
  );
}

async function main(): Promise<void> {
  const options = parseCliOptions(process.argv.slice(2));

  if (options.help) {
    printUsage();
    return;
  }

  if (options.batchSize <= 0) {
    throw new Error('--batch-size must be greater than 0.');
  }

  const availableLocales = await resolveAvailableLocales();
  const targetLocales = options.locale
    ? [options.locale]
    : availableLocales.filter(locale => locale !== options.sourceLocale);

  if (!targetLocales.length) {
    console.log('No target locales found.');
    return;
  }

  for (const locale of targetLocales) {
    if (locale === options.sourceLocale) {
      continue;
    }

    await translateLocale(locale, options);
  }
}

void main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
