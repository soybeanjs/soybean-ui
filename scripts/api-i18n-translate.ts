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

type OpenAiMessage = {
  role: 'system' | 'user';
  content: string;
};

type OpenAiCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const rootDir = process.cwd();
const localeDir = path.join(rootDir, 'docs/src/generated/api-locales');
const defaultBaseUrl = 'https://api.openai.com/v1';
const defaultRetryCount = 3;
const defaultRetryDelayMs = 1500;

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
  TRANSLATE_API_KEY         Required. API key for an OpenAI-compatible translation endpoint
  TRANSLATE_MODEL           Required. Model name, for example gpt-4.1-mini or gpt-5-mini
  TRANSLATE_BASE_URL        Optional. Defaults to https://api.openai.com/v1
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

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
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

function buildPrompt(entries: TranslationEntry[], locale: string): OpenAiMessage[] {
  const payload = Object.fromEntries(entries.map(entry => [entry.key, entry.source]));

  return [
    {
      role: 'system',
      content:
        'You are translating technical component API documentation. Translate from English into the requested target locale. Preserve Markdown, punctuation, line breaks, code fences, and inline code. Do not translate identifiers inside backticks, component names, type names, prop keys, or event names unless they are ordinary prose. Return only a JSON object mapping the same keys to translated strings.'
    },
    {
      role: 'user',
      content: `Target locale: ${locale}\n\nTranslate this JSON object:\n${JSON.stringify(payload, null, 2)}`
    }
  ];
}

function extractJsonObject(content: string): JsonObject {
  const trimmedContent = content.trim();

  try {
    const parsed = JSON.parse(trimmedContent) as unknown;

    if (isJsonObject(parsed)) {
      return parsed;
    }
  } catch {}

  const startIndex = trimmedContent.indexOf('{');
  const endIndex = trimmedContent.lastIndexOf('}');

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error('Unable to parse translation response as JSON object.');
  }

  const parsed = JSON.parse(trimmedContent.slice(startIndex, endIndex + 1)) as unknown;

  if (!isJsonObject(parsed)) {
    throw new Error('Translation response is not a JSON object.');
  }

  return parsed;
}

async function requestTranslations(entries: TranslationEntry[], locale: string): Promise<Map<string, string>> {
  const apiKey = getRequiredEnv('TRANSLATE_API_KEY');
  const model = getRequiredEnv('TRANSLATE_MODEL');
  const baseUrl = (process.env.TRANSLATE_BASE_URL?.trim() || defaultBaseUrl).replace(/\/$/u, '');
  const retryCount = getEnvNumber('TRANSLATE_RETRY_COUNT', defaultRetryCount);
  const retryDelayMs = getEnvNumber('TRANSLATE_RETRY_DELAY_MS', defaultRetryDelayMs);

  let payload: OpenAiCompletionResponse | null = null;

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        messages: buildPrompt(entries, locale)
      })
    });

    if (response.ok) {
      payload = (await response.json()) as OpenAiCompletionResponse;
      break;
    }

    const responseText = await readResponseText(response);

    if (attempt < retryCount && shouldRetryRequest(response.status)) {
      const delayMs = getRetryDelay(attempt, retryDelayMs);
      console.log(
        `Translation request failed with ${response.status}. Retrying in ${delayMs}ms (${attempt + 1}/${retryCount})...`
      );
      await wait(delayMs);
      continue;
    }

    const details = responseText ? `\n${responseText}` : '';
    throw new Error(`Translation request failed: ${response.status} ${response.statusText}${details}`);
  }

  if (!payload) {
    throw new Error('Translation request failed without a response payload.');
  }

  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('Translation response did not include message content.');
  }

  const translatedObject = extractJsonObject(content);
  const translatedEntries = new Map<string, string>();

  for (const entry of entries) {
    const translatedValue = translatedObject[entry.key];

    if (typeof translatedValue !== 'string') {
      throw new Error(`Missing translated value for key: ${entry.key}`);
    }

    translatedEntries.set(entry.key, translatedValue);
  }

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
      const translatedEntries = await requestTranslations(uncachedEntries, options.locale);

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
