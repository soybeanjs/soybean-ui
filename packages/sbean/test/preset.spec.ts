import { describe, it, expect } from 'vitest';
import {
  encodePreset,
  decodePreset,
  isPresetCode,
  DEFAULT_PRESET_CONFIG,
  toBase62,
  fromBase62
} from '../src/registry/preset';

describe('preset system', () => {
  describe('base62 encoding', () => {
    it('encodes and decodes correctly', () => {
      expect(toBase62(0)).toBe('0');
      expect(toBase62(61)).toBe('z');
      expect(toBase62(62)).toBe('10');
      expect(fromBase62('0')).toBe(0);
      expect(fromBase62('z')).toBe(61);
      expect(fromBase62('10')).toBe(62);
    });

    it('roundtrips numbers', () => {
      for (const n of [0, 1, 10, 61, 62, 100, 1000, 99999]) {
        expect(fromBase62(toBase62(n))).toBe(n);
      }
    });

    it('returns -1 for invalid input', () => {
      expect(fromBase62('')).toBe(0);
      expect(fromBase62('-')).toBe(-1);
      expect(fromBase62('!@#')).toBe(-1);
    });
  });

  describe('encodePreset', () => {
    it('encodes default config to "a0"', () => {
      expect(encodePreset({})).toBe('a0');
    });

    it('encodes partial configs', () => {
      const code = encodePreset({ primary: 'green' });
      expect(code).toMatch(/^a[0-9A-Za-z]+$/);
    });

    it('encodes full config', () => {
      const code = encodePreset({
        base: 'stone',
        primary: 'amber',
        iconLibrary: 'tabler',
        radius: 'xs',
        menuAccent: 'bold',
        menuColor: 'inverted'
      });
      expect(typeof code).toBe('string');
      expect(code.startsWith('a')).toBe(true);
    });
  });

  describe('decodePreset', () => {
    it('decodes default config from "a0"', () => {
      const decoded = decodePreset('a0');
      expect(decoded).not.toBeNull();
      expect(decoded!.base).toBe(DEFAULT_PRESET_CONFIG.base);
      expect(decoded!.primary).toBe(DEFAULT_PRESET_CONFIG.primary);
      expect(decoded!.radius).toBe(DEFAULT_PRESET_CONFIG.radius);
      expect(decoded!.iconLibrary).toBe(DEFAULT_PRESET_CONFIG.iconLibrary);
      expect(decoded!.menuColor).toBe(DEFAULT_PRESET_CONFIG.menuColor);
      expect(decoded!.menuAccent).toBe(DEFAULT_PRESET_CONFIG.menuAccent);
    });

    it('returns null for invalid codes', () => {
      expect(decodePreset('')).toBeNull();
      expect(decodePreset('x0')).toBeNull();
      expect(decodePreset('invalid')).toBeNull();
    });

    it('roundtrips configs', () => {
      const configs = [
        {},
        { primary: 'green', radius: 'lg' },
        { base: 'stone', primary: 'amber', iconLibrary: 'ph' },
        {
          base: 'slate',
          primary: 'emerald',
          iconLibrary: 'tabler',
          radius: 'xs',
          menuAccent: 'bold',
          menuColor: 'inverted'
        }
      ];

      for (const config of configs) {
        const code = encodePreset(config);
        const decoded = decodePreset(code);
        expect(decoded).not.toBeNull();

        for (const key of Object.keys(config)) {
          expect((decoded as any)[key]).toBe((config as any)[key]);
        }

        // Unspecified fields should be defaults
        for (const key of Object.keys(DEFAULT_PRESET_CONFIG)) {
          if (!(key in config)) {
            expect((decoded as any)[key]).toBe((DEFAULT_PRESET_CONFIG as any)[key]);
          }
        }
      }
    });
  });

  describe('isPresetCode', () => {
    it('validates correct codes', () => {
      expect(isPresetCode('a0')).toBe(true);
      expect(isPresetCode('a1A2b')).toBe(true);
    });

    it('rejects invalid codes', () => {
      expect(isPresetCode('')).toBe(false);
      expect(isPresetCode('a')).toBe(false);
      expect(isPresetCode('x0')).toBe(false);
      expect(isPresetCode('a!@#')).toBe(false);
      expect(isPresetCode('b0')).toBe(false);
      expect(isPresetCode(`a${'x'.repeat(20)}`)).toBe(false);
    });
  });
});
