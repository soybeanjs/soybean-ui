import { afterEach, describe, expect, it } from 'vitest';
import {
  getStoredThemeConfig,
  getStoredThemePresets,
  parseThemeConfig,
  parseThemePresets,
  removeStoredThemeConfig,
  removeStoredThemePreset,
  setStoredThemeConfig,
  setStoredThemePreset,
  stringifyThemeConfig,
  THEME_PRESETS_STORAGE_KEY,
  THEME_STORAGE_KEY
} from '../src/storage';
import type { StoredThemePreset, ThemeConfigState } from '../src/storage';

const sampleConfig: ThemeConfigState = {
  base: 'slate',
  primary: 'violet',
  mode: 'dark',
  radius: 'lg',
  size: 'md'
};

const samplePreset: StoredThemePreset = {
  name: 'brand',
  version: '1.0.0',
  light: { primary: 'blue.600', ring: 'blue.500' },
  dark: { primary: 'blue.300', ring: 'blue.700' }
};

afterEach(() => {
  window.localStorage.clear();
});

describe('stringifyThemeConfig / parseThemeConfig', () => {
  it('round-trips a valid config', () => {
    const parsed = parseThemeConfig(stringifyThemeConfig(sampleConfig));

    expect(parsed).toEqual(sampleConfig);
  });

  it('returns null for missing or malformed values', () => {
    expect(parseThemeConfig(null)).toBeNull();
    expect(parseThemeConfig(undefined)).toBeNull();
    expect(parseThemeConfig('')).toBeNull();
    expect(parseThemeConfig('not-json')).toBeNull();
    expect(parseThemeConfig('"just-a-string"')).toBeNull();
  });

  it('rejects unsupported base / primary preset keys', () => {
    expect(parseThemeConfig(JSON.stringify({ base: 'neon', primary: 'violet' }))).toBeNull();
    expect(parseThemeConfig(JSON.stringify({ base: 'slate', primary: 'neon' }))).toBeNull();
  });

  it('drops unknown fields and keeps known typed fields', () => {
    const parsed = parseThemeConfig(
      JSON.stringify({
        base: 'gray',
        primary: 'blue',
        mode: 'dark',
        format: 'oklch',
        lightLevel: 1,
        darkLevel: 2,
        menuColor: 'inverted',
        menuAccent: 'bold',
        unknown: 'ignored'
      })
    );

    expect(parsed).toEqual({
      base: 'gray',
      primary: 'blue',
      mode: 'dark',
      format: 'oklch',
      lightLevel: 1,
      darkLevel: 2,
      menuColor: 'inverted',
      menuAccent: 'bold'
    });
  });

  it('ignores invalid enum values instead of rejecting the whole config', () => {
    const parsed = parseThemeConfig(JSON.stringify({ base: 'slate', mode: 'neon', format: 'rgb' }));

    expect(parsed).toEqual({ base: 'slate' });
  });
});

describe('getStoredThemeConfig / setStoredThemeConfig / removeStoredThemeConfig', () => {
  it('persists and reads back the config under the default key', () => {
    setStoredThemeConfig(sampleConfig);

    expect(getStoredThemeConfig()).toEqual(sampleConfig);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(stringifyThemeConfig(sampleConfig));
  });

  it('supports a custom storage key', () => {
    setStoredThemeConfig(sampleConfig, 'custom-key');
    expect(getStoredThemeConfig('custom-key')).toEqual(sampleConfig);

    removeStoredThemeConfig('custom-key');
    expect(getStoredThemeConfig('custom-key')).toBeNull();
  });

  it('returns null when nothing is stored', () => {
    expect(getStoredThemeConfig()).toBeNull();
  });
});

describe('parseThemePresets', () => {
  it('parses a valid table with multiple presets', () => {
    const raw = JSON.stringify({
      version: 1,
      presets: {
        brand: samplePreset,
        alt: {
          name: 'alt',
          version: '0.1.0',
          light: { success: 'green.500' }
        }
      }
    });

    expect(parseThemePresets(raw)).toEqual({
      version: 1,
      presets: {
        brand: samplePreset,
        alt: { name: 'alt', version: '0.1.0', light: { success: 'green.500' } }
      }
    });
  });

  it('returns null for missing or malformed payloads', () => {
    expect(parseThemePresets(null)).toBeNull();
    expect(parseThemePresets(undefined)).toBeNull();
    expect(parseThemePresets('')).toBeNull();
    expect(parseThemePresets('not-json')).toBeNull();
    expect(parseThemePresets(JSON.stringify({ version: 1 }))).toBeNull();
  });

  it('rejects an unknown future schema version', () => {
    const raw = JSON.stringify({ version: 99, presets: { brand: samplePreset } });

    expect(parseThemePresets(raw)).toBeNull();
  });

  it('normalizes a missing version (old format) to the current schema version', () => {
    const raw = JSON.stringify({ presets: { brand: samplePreset } });

    expect(parseThemePresets(raw)).toEqual({ version: 1, presets: { brand: samplePreset } });
  });

  it('drops invalid entries while keeping the rest of the table', () => {
    const raw = JSON.stringify({
      version: 1,
      presets: {
        broken: { name: 'broken', version: '1.0.0', light: { primary: 'not-a-color' } },
        brand: samplePreset
      }
    });

    expect(parseThemePresets(raw)).toEqual({ version: 1, presets: { brand: samplePreset } });
  });

  it('keeps valid color keys and drops invalid ones within an entry', () => {
    const raw = JSON.stringify({
      version: 1,
      presets: {
        brand: {
          name: 'brand',
          version: '1.0.0',
          light: { primary: 'blue.600', background: 'hsl(0 0% 100%)', nonsense: 'zinc.950' }
        }
      }
    });

    expect(parseThemePresets(raw)).toEqual({
      version: 1,
      presets: {
        brand: { name: 'brand', version: '1.0.0', light: { primary: 'blue.600', background: 'hsl(0 0% 100%)' } }
      }
    });
  });

  it('drops an entry whose name does not match its object key', () => {
    const raw = JSON.stringify({
      version: 1,
      presets: {
        brand: { name: 'other', version: '1.0.0', light: { primary: 'blue.600' } }
      }
    });

    expect(parseThemePresets(raw)).toEqual({ version: 1, presets: {} });
  });
});

describe('getStoredThemePresets / setStoredThemePreset / removeStoredThemePreset', () => {
  it('persists and reads back a preset under the default key', () => {
    expect(setStoredThemePreset(samplePreset)).toBe(true);
    expect(getStoredThemePresets()).toEqual({ version: 1, presets: { brand: samplePreset } });
    expect(window.localStorage.getItem(THEME_PRESETS_STORAGE_KEY)).toContain(samplePreset.name);
  });

  it('upserts an existing preset instead of duplicating it', () => {
    setStoredThemePreset(samplePreset);
    setStoredThemePreset({ ...samplePreset, version: '2.0.0', light: { primary: 'indigo.600' } });

    expect(getStoredThemePresets()?.presets.brand).toEqual({
      name: 'brand',
      version: '2.0.0',
      light: { primary: 'indigo.600' },
      dark: { primary: 'blue.300', ring: 'blue.700' }
    });
  });

  it('rejects an invalid preset', () => {
    // simulate untrusted external data whose color values are plain strings
    const invalid: unknown = { name: 'bad', version: '1.0.0', light: { primary: 'nope' } };

    expect(setStoredThemePreset(invalid as StoredThemePreset)).toBe(false);
    expect(getStoredThemePresets()).toBeNull();
  });

  it('removes an existing preset and reports the removal', () => {
    setStoredThemePreset(samplePreset);

    expect(removeStoredThemePreset('brand')).toBe(true);
    expect(getStoredThemePresets()).toEqual({ version: 1, presets: {} });
  });

  it('returns false when removing an unknown name', () => {
    expect(removeStoredThemePreset('missing')).toBe(false);
  });

  it('keeps the theme config storage isolated from the presets table', () => {
    setStoredThemePreset(samplePreset);
    setStoredThemeConfig(sampleConfig);

    expect(getStoredThemePresets()).toEqual({ version: 1, presets: { brand: samplePreset } });
    expect(getStoredThemeConfig()).toEqual(sampleConfig);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).not.toContain('presets');
  });

  it('is SSR-safe when localStorage is unavailable', () => {
    const original = window.localStorage;

    Object.defineProperty(window, 'localStorage', { value: undefined, configurable: true });

    try {
      expect(getStoredThemePresets()).toBeNull();
      expect(setStoredThemePreset(samplePreset)).toBe(false);
      expect(removeStoredThemePreset('brand')).toBe(false);
    } finally {
      Object.defineProperty(window, 'localStorage', { value: original, configurable: true });
    }
  });
});
