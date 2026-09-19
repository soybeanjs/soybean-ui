import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { createThemeInitScript } from '../src/ssr';
import {
  THEME_ENVELOPE_VERSION,
  THEME_STORAGE_KEY,
  THEME_STYLE_ID,
  clearThemeEnvelope,
  createThemeWriter,
  parseThemeEnvelope,
  parseThemeOptions,
  readThemeEnvelope,
  writeThemeEnvelope
} from '../src/storage';

/**
 * P4 —— persistence + first paint (docs/theme.md §9.3).
 *
 * The envelope contract: one key, per-field validation (a bad field must not
 * discard the rest), version-gated reads, and one debounced writer.
 */

const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  // 测试共享同一个 happy-dom 文档：先清掉 <html> 上的类/内联样式与 body 内容，
  // 否则断言会依赖执行顺序
  document.documentElement.className = '';
  document.documentElement.style.colorScheme = '';
  document.body.innerHTML = '';
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key)
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('theme envelope', () => {
  it('round-trips options, mode and the alias snapshot', () => {
    const ok = writeThemeEnvelope({
      options: { base: 'slate', primary: 'emerald', lightLevel: 1 },
      mode: 'auto',
      style: ':root{--vean-background:var(--slate-100)}'
    });

    expect(ok).toBe(true);

    const envelope = readThemeEnvelope();

    expect(envelope).toMatchObject({
      v: THEME_ENVELOPE_VERSION,
      mode: 'auto',
      options: { base: 'slate', primary: 'emerald', lightLevel: 1 }
    });
    expect(envelope?.style).toContain('--vean-background');
    expect(store.has(THEME_STORAGE_KEY)).toBe(true);
  });

  it('keeps valid fields and drops only the invalid ones', () => {
    const options = parseThemeOptions({
      base: 'not-a-palette',
      primary: 'rose',
      lightLevel: 9,
      surfaceStyle: 'layered',
      contrast: 'sometimes',
      borderOpacity: 2,
      format: 'oklch'
    });

    expect(options).toEqual({ primary: 'rose', surfaceStyle: 'layered', format: 'oklch' });
  });

  it('keeps overrides that carry string values and drops the rest', () => {
    const options = parseThemeOptions({
      overrides: { light: { primary: 'zinc.800', surface: 42 }, dark: { carbon: 'oklch(0.2 0 0)' } }
    });

    expect(options.overrides).toEqual({ light: { primary: 'zinc.800' }, dark: { carbon: 'oklch(0.2 0 0)' } });
  });

  it('returns null for malformed, empty and future-versioned payloads', () => {
    expect(parseThemeEnvelope('not json')).toBeNull();
    expect(parseThemeEnvelope('null')).toBeNull();
    expect(parseThemeEnvelope(JSON.stringify({ v: THEME_ENVELOPE_VERSION + 1, options: {} }))).toBeNull();
    expect(readThemeEnvelope()).toBeNull();
  });

  it('normalizes a version-less (v0) payload', () => {
    const envelope = parseThemeEnvelope(JSON.stringify({ options: { base: 'zinc' }, mode: 'dark' }));

    expect(envelope?.v).toBe(THEME_ENVELOPE_VERSION);
    expect(envelope?.options.base).toBe('zinc');
  });

  it('drops an oversized style snapshot instead of failing the write', () => {
    writeThemeEnvelope({ options: {}, style: 'x'.repeat(70 * 1024) });

    expect(readThemeEnvelope()?.style).toBeUndefined();
  });

  it('survives blocked storage on read, write and clear', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('SecurityError');
      },
      setItem: () => {
        throw new Error('QuotaExceededError');
      },
      removeItem: () => {
        throw new Error('SecurityError');
      }
    });

    expect(readThemeEnvelope()).toBeNull();
    expect(writeThemeEnvelope({ options: {} })).toBe(false);
    expect(() => clearThemeEnvelope()).not.toThrow();
  });

  it('clears the envelope', () => {
    writeThemeEnvelope({ options: { base: 'zinc' } });
    clearThemeEnvelope();

    expect(readThemeEnvelope()).toBeNull();
  });
});

describe('debounced writer', () => {
  it('collapses rapid writes into one', () => {
    vi.useFakeTimers();
    const writer = createThemeWriter({ delay: 200 });

    writer.write({ options: { base: 'zinc' } });
    writer.write({ options: { base: 'slate' } });
    writer.write({ options: { base: 'stone' } });

    expect(readThemeEnvelope()).toBeNull();

    vi.advanceTimersByTime(200);

    expect(readThemeEnvelope()?.options.base).toBe('stone');
    vi.useRealTimers();
  });

  it('flushes and cancels explicitly', () => {
    vi.useFakeTimers();
    const writer = createThemeWriter({ delay: 500 });

    writer.write({ options: { base: 'slate' } });
    writer.cancel();
    vi.advanceTimersByTime(500);
    expect(readThemeEnvelope()).toBeNull();

    writer.write({ options: { base: 'stone' } });
    writer.flush();
    expect(readThemeEnvelope()?.options.base).toBe('stone');
    vi.useRealTimers();
  });
});

describe('first-paint script', () => {
  const runScript = (script: string): void => {
    // the generated script is an IIFE over `document` / `window`
    new Function(script)();
  };

  it('patches the existing style element instead of adding one', () => {
    document.head.innerHTML = '';
    document.body.innerHTML = `<style id="${THEME_STYLE_ID}">:root{--vean-background:var(--zinc-100)}</style>`;
    writeThemeEnvelope({ options: {}, mode: 'dark', style: ':root{--vean-background:var(--slate-900)}' });

    const stylesBefore = document.querySelectorAll('style').length;
    runScript(createThemeInitScript());

    expect(document.querySelectorAll('style').length).toBe(stylesBefore);
    expect(document.getElementById(THEME_STYLE_ID)?.textContent).toContain('var(--slate-900)');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('does nothing without a stored envelope', () => {
    document.head.innerHTML = '';
    document.body.innerHTML = `<style id="${THEME_STYLE_ID}">untouched</style>`;

    runScript(createThemeInitScript());

    expect(document.getElementById(THEME_STYLE_ID)?.textContent).toBe('untouched');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('resolves auto against the OS preference and honours the media selector', () => {
    document.documentElement.classList.remove('dark');
    writeThemeEnvelope({ options: {}, mode: 'auto' });
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('dark'), media: query }));
    runScript(createThemeInitScript());
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    document.documentElement.classList.remove('dark');
    runScript(createThemeInitScript({ darkSelector: 'media' }));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    vi.unstubAllGlobals();
  });

  it('keeps a custom dark selector and can skip color-scheme', () => {
    document.documentElement.classList.remove('night');
    writeThemeEnvelope({ options: {}, mode: 'dark' });
    runScript(createThemeInitScript({ darkSelector: '.night', setColorScheme: false }));

    expect(document.documentElement.classList.contains('night')).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe('');
  });

  it('creates the runtime element only when the page has none, and never uses !important', () => {
    document.body.innerHTML = '';
    writeThemeEnvelope({ options: {}, mode: 'light', style: ':root{--vean-background:var(--slate-50)}' });

    runScript(createThemeInitScript());

    expect(document.getElementById(THEME_STYLE_ID)?.textContent).toContain('--slate-50');
    expect(document.querySelectorAll(`#${THEME_STYLE_ID}`).length).toBe(1);

    // 再跑一次不应新增第二个元素
    runScript(createThemeInitScript());
    expect(document.querySelectorAll(`#${THEME_STYLE_ID}`).length).toBe(1);

    const script = createThemeInitScript();

    expect(script).not.toContain('!important');
    expect(script).toContain('appendChild');
  });
});
