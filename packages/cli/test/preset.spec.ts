import { describe, it, expect } from 'vitest';
import {
  encodePreset,
  decodePreset,
  isPresetCode,
  DEFAULT_PRESET_CONFIG,
  toBase62,
  fromBase62
} from '../src/registry/preset';
import type { PresetConfig } from '../src/registry/preset';

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
    it('encodes default config to "b0"', () => {
      expect(encodePreset({})).toBe('b0');
    });

    it('encodes partial configs', () => {
      const code = encodePreset({ primary: 'green' });
      expect(code).toMatch(/^b[0-9A-Za-z]+$/);
    });

    it('encodes full config', () => {
      const code = encodePreset({
        base: 'stone',
        primary: 'amber',
        iconLibrary: 'tabler',
        radius: 'xs'
      });
      expect(typeof code).toBe('string');
      expect(code.startsWith('b')).toBe(true);
    });
  });

  describe('decodePreset', () => {
    it('decodes default config from "b0"', () => {
      const decoded = decodePreset('b0');
      expect(decoded).not.toBeNull();
      expect(decoded!.base).toBe(DEFAULT_PRESET_CONFIG.base);
      expect(decoded!.primary).toBe(DEFAULT_PRESET_CONFIG.primary);
      expect(decoded!.radius).toBe(DEFAULT_PRESET_CONFIG.radius);
      expect(decoded!.iconLibrary).toBe(DEFAULT_PRESET_CONFIG.iconLibrary);
    });

    it('returns null for invalid codes', () => {
      expect(decodePreset('')).toBeNull();
      expect(decodePreset('x0')).toBeNull();
      expect(decodePreset('invalid')).toBeNull();
      expect(decodePreset('a0')).toBeNull(); // version `a` (with menu fields) was removed in `b`
    });

    it('roundtrips configs', () => {
      const configs: Partial<PresetConfig>[] = [
        {},
        { primary: 'green', radius: 'lg' },
        { base: 'stone', primary: 'amber', iconLibrary: 'ph' },
        { base: 'slate', primary: 'emerald', iconLibrary: 'tabler', radius: 'xs' }
      ];

      for (const config of configs) {
        const code = encodePreset(config);
        const decoded = decodePreset(code);
        expect(decoded).not.toBeNull();
        expect(decoded).toEqual({ ...DEFAULT_PRESET_CONFIG, ...config });
      }
    });
  });

  describe('isPresetCode', () => {
    it('validates correct codes', () => {
      expect(isPresetCode('b0')).toBe(true);
      expect(isPresetCode('b1A2b')).toBe(true);
    });

    it('rejects invalid codes', () => {
      expect(isPresetCode('')).toBe(false);
      expect(isPresetCode('b')).toBe(false);
      expect(isPresetCode('x0')).toBe(false);
      expect(isPresetCode('b!@#')).toBe(false);
      expect(isPresetCode('a0')).toBe(false);
      expect(isPresetCode(`b${'x'.repeat(20)}`)).toBe(false);
    });
  });
});
