import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { JsonObject } from '../src/shared/json';
import {
  getPendingEntries,
  parseTranslateCliOptions,
  requestTranslations,
  resolveTargetLocales,
  toDeepLLanguage,
  translateJsonLocaleFile
} from '../src/shared/translate';

interface MockFetchOptions {
  ok?: boolean;
  status?: number;
  statusText?: string;
}

function createMockResponse(
  payload: unknown,
  options: MockFetchOptions = {}
): {
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
} {
  const { ok = true, status = 200, statusText = 'OK' } = options;
  const body = typeof payload === 'string' ? payload : JSON.stringify(payload);

  return {
    ok,
    status,
    statusText,
    async json() {
      return payload;
    },
    async text() {
      return body;
    }
  };
}

function mockFetch(impl: (input: RequestInfo | URL, init?: RequestInit) => unknown): void {
  vi.stubGlobal('fetch', vi.fn(impl));
}

function jsonBody(init: RequestInit | undefined): JsonObject {
  return JSON.parse(String(init?.body)) as JsonObject;
}

async function createTempFile(fileName: string, content: JsonObject): Promise<string> {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'sui-translate-'));

  return writeFile(path.join(tempDir, fileName), JSON.stringify(content), 'utf8').then(() =>
    path.join(tempDir, fileName)
  );
}

async function removeTempDir(filePath: string): Promise<void> {
  await rm(path.dirname(filePath), { recursive: true, force: true });
}

describe('shared/translate', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('toDeepLLanguage', () => {
    it('maps known locales to DeepL language codes', () => {
      expect(toDeepLLanguage('zh')).toBe('ZH');
      expect(toDeepLLanguage('zh-cn')).toBe('ZH');
      expect(toDeepLLanguage('pt-br')).toBe('PT-BR');
      expect(toDeepLLanguage('en-gb')).toBe('EN-GB');
      expect(toDeepLLanguage('ja')).toBe('JA');
    });

    it('normalizes underscores and falls back to uppercase', () => {
      expect(toDeepLLanguage('de')).toBe('DE');
      expect(toDeepLLanguage('xx-zz')).toBe('XX-ZZ');
    });
  });

  describe('parseTranslateCliOptions', () => {
    it('applies defaults', () => {
      expect(parseTranslateCliOptions([])).toEqual({
        locale: '',
        sourceLocale: 'en',
        batchSize: 20,
        limit: null,
        overwrite: false,
        dryRun: false,
        help: false
      });
    });

    it('parses locale, batch-size and flags', () => {
      const options = parseTranslateCliOptions([
        '--locale',
        'zh',
        '--source-locale',
        'en',
        '--batch-size',
        '5',
        '--limit',
        '10',
        '--overwrite',
        '--dry-run'
      ]);

      expect(options.locale).toBe('zh');
      expect(options.sourceLocale).toBe('en');
      expect(options.batchSize).toBe(5);
      expect(options.limit).toBe(10);
      expect(options.overwrite).toBe(true);
      expect(options.dryRun).toBe(true);
    });
  });

  describe('resolveTargetLocales', () => {
    it('returns every locale except the source, sorted and deduped', () => {
      expect(
        resolveTargetLocales({
          availableLocales: ['zh', 'en', 'ja', 'zh'],
          sourceLocale: 'en'
        })
      ).toEqual(['ja', 'zh']);
    });

    it('returns only the requested locale when given', () => {
      expect(
        resolveTargetLocales({
          availableLocales: ['zh', 'en', 'ja'],
          sourceLocale: 'en',
          requestedLocale: 'ja'
        })
      ).toEqual(['ja']);
    });

    it('rejects a target equal to the source', () => {
      expect(() =>
        resolveTargetLocales({
          availableLocales: ['en'],
          sourceLocale: 'en',
          requestedLocale: 'en'
        })
      ).toThrow('Target locale must be different from source locale.');
    });

    it('rejects an unsupported target locale', () => {
      expect(() =>
        resolveTargetLocales({
          availableLocales: ['en', 'zh'],
          sourceLocale: 'en',
          requestedLocale: 'fr'
        })
      ).toThrow('Unsupported locale: fr');
    });
  });

  describe('getPendingEntries', () => {
    const source = new Map([
      ['a', 'Hello'],
      ['b', 'World'],
      ['c', '   ']
    ]);

    it('skips blank sources and already-translated targets', () => {
      const target = new Map([['a', '你好']]);

      expect(getPendingEntries(source, target, false, null)).toEqual([{ key: 'b', source: 'World' }]);
    });

    it('re-translates existing targets when overwrite is set', () => {
      const target = new Map([['a', '你好']]);

      expect(getPendingEntries(source, target, true, null).map(entry => entry.key)).toEqual(['a', 'b']);
    });

    it('applies a limit', () => {
      expect(getPendingEntries(source, new Map(), false, 1).map(entry => entry.key)).toEqual(['a']);
    });

    it('filters keys through shouldIncludeKey', () => {
      const result = getPendingEntries(source, new Map(), false, null, key => key !== 'b');

      expect(result.map(entry => entry.key)).toEqual(['a']);
    });
  });

  describe('requestTranslations', () => {
    it('posts a DeepL-shaped request and maps responses back to keys', async () => {
      mockFetch(() => createMockResponse({ translations: [{ text: '你好' }, { text: '世界' }] }));

      const result = await requestTranslations({
        entries: [
          { key: 'root.title', source: 'Hello' },
          { key: 'root.desc', source: 'World' }
        ],
        sourceLocale: 'en',
        targetLocale: 'zh',
        context: 'Component API docs.',
        apiKey: 'test-key',
        baseUrl: 'https://example.com/v2',
        retryCount: 0,
        retryDelayMs: 1
      });

      const init = vi.mocked(fetch).mock.calls[0]?.[1];

      expect(init?.method).toBe('POST');
      expect(init?.headers).toEqual({
        'Content-Type': 'application/json',
        Authorization: 'DeepL-Auth-Key test-key'
      });
      expect(jsonBody(init)).toEqual({
        context: 'Component API docs.',
        preserve_formatting: true,
        source_lang: 'EN',
        target_lang: 'ZH',
        text: ['Hello', 'World']
      });
      expect(result).toEqual(
        new Map([
          ['root.title', '你好'],
          ['root.desc', '世界']
        ])
      );
    });

    it('protects and restores {placeholders} when requested', async () => {
      mockFetch(() => createMockResponse({ translations: [{ text: '世界 SBPH0TOKEN 值' }] }));

      const result = await requestTranslations({
        entries: [{ key: 'root', source: 'World {color} value' }],
        sourceLocale: 'en',
        targetLocale: 'zh',
        context: '',
        apiKey: 'test-key',
        baseUrl: 'https://example.com/v2',
        retryCount: 0,
        retryDelayMs: 1,
        protectPlaceholders: true
      });

      const init = vi.mocked(fetch).mock.calls[0]?.[1];
      const text = jsonBody(init).text as string[];

      expect(text).toEqual(['World SBPH0TOKEN value']);
      expect(result.get('root')).toBe('世界 {color} 值');
    });

    it('retries 429 responses up to retryCount', async () => {
      let callCount = 0;

      mockFetch(() => {
        callCount += 1;

        if (callCount === 1) {
          return createMockResponse({ message: 'Quota exceeded' }, { ok: false, status: 429 });
        }

        return createMockResponse({ translations: [{ text: '你好' }] });
      });

      const result = await requestTranslations({
        entries: [{ key: 'root', source: 'Hello' }],
        sourceLocale: 'en',
        targetLocale: 'zh',
        context: '',
        apiKey: 'test-key',
        baseUrl: 'https://example.com/v2',
        retryCount: 1,
        retryDelayMs: 1
      });

      expect(callCount).toBe(2);
      expect(result.get('root')).toBe('你好');
    });

    it('throws with the DeepL error detail on non-retryable failures', async () => {
      mockFetch(() => createMockResponse({ message: 'Bad Request' }, { ok: false, status: 400 }));

      await expect(
        requestTranslations({
          entries: [{ key: 'root', source: 'Hello' }],
          sourceLocale: 'en',
          targetLocale: 'zh',
          context: '',
          apiKey: 'test-key',
          baseUrl: 'https://example.com/v2',
          retryCount: 0,
          retryDelayMs: 1
        })
      ).rejects.toThrow('Translation request failed: 400 Bad Request');
    });
  });

  describe('translateJsonLocaleFile', () => {
    it('translates pending entries and writes them into the target file', async () => {
      const sourcePath = await createTempFile('en.json', {
        root: { title: 'Hello', desc: 'World {x}' }
      });
      const targetPath = await createTempFile('zh.json', {
        root: { title: '', desc: '' }
      });

      mockFetch((_input, init) => {
        const text = jsonBody(init).text as string[];

        return createMockResponse({
          translations: text.map(item => ({ text: item === 'Hello' ? '你好' : '世界 SBPH0TOKEN' }))
        });
      });

      const result = await translateJsonLocaleFile({
        sourcePath,
        targetPath,
        sourceLocale: 'en',
        targetLocale: 'zh',
        batchSize: 20,
        overwrite: false,
        limit: null,
        dryRun: false,
        createContext: () => '',
        protectPlaceholders: true
      });

      const written = JSON.parse(await readFile(targetPath, 'utf8')) as JsonObject;

      expect(result.updated).toBe(true);
      expect(result.pendingEntries).toHaveLength(2);
      expect(written).toEqual({
        root: { title: '你好', desc: '世界 {x}' }
      });
      await removeTempDir(targetPath);
    });

    it('skips the network call in dry-run mode', async () => {
      const sourcePath = await createTempFile('en.json', { root: 'Hello' });
      const targetPath = await createTempFile('zh.json', { root: '' });
      const fetchMock = vi.fn();

      vi.stubGlobal('fetch', fetchMock);

      const result = await translateJsonLocaleFile({
        sourcePath,
        targetPath,
        sourceLocale: 'en',
        targetLocale: 'zh',
        batchSize: 20,
        overwrite: false,
        limit: null,
        dryRun: true,
        createContext: () => ''
      });

      expect(result.updated).toBe(false);
      expect(fetchMock).not.toHaveBeenCalled();
      await removeTempDir(targetPath);
    });

    it('does nothing when there are no pending entries', async () => {
      const sourcePath = await createTempFile('en.json', { root: 'Hello' });
      const targetPath = await createTempFile('zh.json', { root: '你好' });
      const fetchMock = vi.fn();

      vi.stubGlobal('fetch', fetchMock);

      const result = await translateJsonLocaleFile({
        sourcePath,
        targetPath,
        sourceLocale: 'en',
        targetLocale: 'zh',
        batchSize: 20,
        overwrite: false,
        limit: null,
        dryRun: false,
        createContext: () => ''
      });

      expect(result.updated).toBe(false);
      expect(fetchMock).not.toHaveBeenCalled();
      await removeTempDir(targetPath);
    });
  });
});
