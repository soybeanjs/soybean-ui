import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

type JsonPrimitive = boolean | null | number | string;
type JsonValue = JsonArray | JsonObject | JsonPrimitive;

interface JsonArray extends Array<JsonValue> {}

interface JsonObject {
  [key: string]: JsonValue;
}

const rootDir = process.cwd();
const changelogDir = path.join(rootDir, 'docs/src/generated/changelog');
const localeDir = path.join(rootDir, 'docs/locales');
const outputDir = path.join(rootDir, 'docs/src/generated/changelog-locales');
const defaultLocale = 'en';

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getNestedString(messages: JsonObject, key: string): string | null {
  const segments = key.split('.');
  let current: unknown = messages;

  for (const segment of segments) {
    if (!isJsonObject(current) || !(segment in current)) {
      return null;
    }

    current = current[segment];
  }

  return typeof current === 'string' ? current : null;
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

function collectSummaryEntries(value: unknown, collected: Map<string, string>): void {
  if (Array.isArray(value)) {
    value.forEach(item => collectSummaryEntries(item, collected));
    return;
  }

  if (!isJsonObject(value)) {
    return;
  }

  const summaryKey = typeof value.summaryKey === 'string' ? value.summaryKey : null;
  const summary = typeof value.summary === 'string' ? value.summary : '';

  if (summaryKey) {
    const existingSummary = collected.get(summaryKey);

    if (!existingSummary || (!existingSummary.trim() && summary.trim())) {
      collected.set(summaryKey, summary);
    }
  }

  Object.values(value).forEach(item => collectSummaryEntries(item, collected));
}

function collectChangedSourceKeys(entries: Map<string, string>, previousDefaultMessages: JsonObject): Set<string> {
  const changedKeys = new Set<string>();

  entries.forEach((summary, key) => {
    const previousValue = getNestedString(previousDefaultMessages, key);

    if (previousValue !== null && previousValue !== summary) {
      changedKeys.add(key);
    }
  });

  return changedKeys;
}

function resolveLocaleValue(
  locale: string,
  existingValue: string | null,
  summary: string,
  changedSourceKeys: Set<string>,
  key: string
): string {
  if (locale === defaultLocale) {
    return summary;
  }

  if (changedSourceKeys.has(key)) {
    return '';
  }

  return existingValue ?? '';
}

function createLocaleMessages(
  locale: string,
  entries: Map<string, string>,
  existingMessages: JsonObject,
  changedSourceKeys: Set<string>
): JsonObject {
  const messages: JsonObject = {};

  Array.from(entries.entries())
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .forEach(([key, summary]) => {
      setNestedValue(
        messages,
        key,
        resolveLocaleValue(locale, getNestedString(existingMessages, key), summary, changedSourceKeys, key)
      );
    });

  return sortJsonValue(messages) as JsonObject;
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

async function getLocaleNames(): Promise<string[]> {
  const fileNames = await readdir(localeDir);

  return fileNames
    .filter(fileName => fileName.endsWith('.yml'))
    .map(fileName => fileName.replace(/\.yml$/u, ''))
    .sort((left, right) => left.localeCompare(right));
}

async function writeLocaleMessages(locale: string, messages: JsonObject): Promise<void> {
  const filePath = path.join(outputDir, `${locale}.json`);
  const content = `${JSON.stringify(messages, null, 2)}\n`;

  await writeFile(filePath, content, 'utf8');
}

async function main(): Promise<void> {
  const [entries, locales] = await Promise.all([collectChangelogSummaryEntries(), getLocaleNames()]);

  await mkdir(outputDir, { recursive: true });

  const previousDefaultMessages = await readJsonObject(path.join(outputDir, `${defaultLocale}.json`));
  const changedSourceKeys = collectChangedSourceKeys(entries, previousDefaultMessages);

  for (const locale of locales) {
    const existingMessages = await readJsonObject(path.join(outputDir, `${locale}.json`));
    const localeMessages = createLocaleMessages(locale, entries, existingMessages, changedSourceKeys);

    await writeLocaleMessages(locale, localeMessages);
  }

  console.log(
    `Generated changelog locale templates for ${locales.join(', ')} with ${entries.size} translation keys.` +
      ` Reset ${changedSourceKeys.size} changed source keys for non-default locales.`
  );
}

await main();
