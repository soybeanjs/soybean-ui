import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type JsonPrimitive = boolean | null | number | string;
export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export interface JsonArray extends Array<JsonValue> {}

export interface JsonObject {
  [key: string]: JsonValue;
}

export function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function cloneJsonObject(value: JsonObject): JsonObject {
  return JSON.parse(JSON.stringify(value)) as JsonObject;
}

export function collectKeyedTextEntries(
  value: unknown,
  collected: Map<string, string>,
  options: {
    keyField: string;
    valueField: string;
  }
): void {
  if (Array.isArray(value)) {
    value.forEach(item => collectKeyedTextEntries(item, collected, options));
    return;
  }

  if (!isJsonObject(value)) {
    return;
  }

  const rawEntryKey = value[options.keyField];
  const rawEntryValue = value[options.valueField];
  const entryKey = typeof rawEntryKey === 'string' ? rawEntryKey : null;
  const entryValue = typeof rawEntryValue === 'string' ? rawEntryValue : '';

  if (entryKey) {
    const existingValue = collected.get(entryKey);

    if (!existingValue || (!existingValue.trim() && entryValue.trim())) {
      collected.set(entryKey, entryValue);
    }
  }

  Object.values(value).forEach(item => collectKeyedTextEntries(item, collected, options));
}

export async function listFileBasenames(directoryPath: string, extension: string): Promise<string[]> {
  const fileNames = await readdir(directoryPath);

  return fileNames
    .filter(fileName => fileName.endsWith(extension))
    .map(fileName => fileName.slice(0, -extension.length))
    .sort((left, right) => left.localeCompare(right));
}

export async function readJsonObject(filePath: string): Promise<JsonObject> {
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

export async function writeJsonFile(
  filePath: string,
  value: JsonValue,
  options?: {
    sort?: boolean;
  }
): Promise<void> {
  const outputValue = options?.sort ? sortJsonValue(value) : value;
  const content = `${JSON.stringify(outputValue, null, 2)}\n`;

  await writeFile(filePath, content, 'utf8');
}

export async function writeGeneratedJsonDirectory(options: {
  outputDir: string;
  resetPaths?: string[];
  documents: Array<{
    fileName: string;
    value: unknown;
  }>;
}): Promise<void> {
  const resetPaths = Array.from(new Set([options.outputDir, ...(options.resetPaths ?? [])]));

  await Promise.all(resetPaths.map(filePath => rm(filePath, { recursive: true, force: true })));
  await mkdir(options.outputDir, { recursive: true });
  await Promise.all(
    options.documents.map(document => {
      const content = `${JSON.stringify(document.value, null, 2)}\n`;

      return writeFile(path.join(options.outputDir, document.fileName), content, 'utf8');
    })
  );
}

export function getNestedString(messages: JsonObject, key: string): string | null {
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

export function setNestedValue(messages: JsonObject, key: string, value: string): void {
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

export function sortJsonValue(value: JsonValue): JsonValue {
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

export function flattenJsonMessages(messages: JsonObject, prefix: string = ''): Map<string, string> {
  const flattened = new Map<string, string>();

  for (const [key, value] of Object.entries(messages)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      flattened.set(nextKey, value);
      continue;
    }

    if (isJsonObject(value)) {
      for (const [nestedKey, nestedValue] of flattenJsonMessages(value, nextKey)) {
        flattened.set(nestedKey, nestedValue);
      }
    }
  }

  return flattened;
}

export function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

export function getEnvNumber(name: string, fallback: number): number {
  const value = Number(process.env[name]?.trim());

  if (!Number.isFinite(value) || value < 0) {
    return fallback;
  }

  return value;
}

export async function readResponseText(response: Response): Promise<string> {
  try {
    return (await response.text()).trim();
  } catch {
    return '';
  }
}

export function collectChangedSourceKeys(
  entries: Map<string, string>,
  previousDefaultMessages: JsonObject
): Set<string> {
  const changedKeys = new Set<string>();

  entries.forEach((sourceValue, key) => {
    const previousValue = getNestedString(previousDefaultMessages, key);

    if (previousValue !== null && previousValue !== sourceValue) {
      changedKeys.add(key);
    }
  });

  return changedKeys;
}

export function createLocaleMessages(
  locale: string,
  entries: Map<string, string>,
  existingMessages: JsonObject,
  changedSourceKeys: Set<string>,
  defaultLocale: string
): JsonObject {
  const messages: JsonObject = {};

  Array.from(entries.entries())
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .forEach(([key, sourceValue]) => {
      const existingValue = getNestedString(existingMessages, key);
      const nextValue =
        locale === defaultLocale ? sourceValue : changedSourceKeys.has(key) ? '' : (existingValue ?? '');

      setNestedValue(messages, key, nextValue);
    });

  return sortJsonValue(messages) as JsonObject;
}

export async function syncLocaleTemplateFiles(options: {
  entries: Map<string, string>;
  locales: string[];
  outputDir: string;
  defaultLocale: string;
}): Promise<{
  changedSourceKeys: Set<string>;
}> {
  const previousDefaultMessages = await readJsonObject(`${options.outputDir}/${options.defaultLocale}.json`);
  const changedSourceKeys = collectChangedSourceKeys(options.entries, previousDefaultMessages);

  for (const locale of options.locales) {
    const existingMessages = await readJsonObject(`${options.outputDir}/${locale}.json`);
    const localeMessages = createLocaleMessages(
      locale,
      options.entries,
      existingMessages,
      changedSourceKeys,
      options.defaultLocale
    );

    await writeJsonFile(`${options.outputDir}/${locale}.json`, localeMessages);
  }

  return { changedSourceKeys };
}
