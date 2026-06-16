/**
 * Preset encoding/decoding — bit-packs design system params into
 * a short base62 code, similar to shadcn's preset system.
 *
 * Rules for backward compatibility:
 *   1. Never reorder existing value arrays — only append.
 *   2. New fields must have their default at index 0.
 *   3. Only append new fields to the end of PRESET_FIELDS.
 *   4. Stay under 53 bits total (JS safe integer limit).
 */

import {
  PRESET_BASE_COLORS,
  PRESET_PRIMARY_COLORS,
  PRESET_RADII,
  PRESET_ICON_LIBRARIES,
  PRESET_FEEDBACK_COLORS
} from '../registry/config';

// ---------------------------------------------------------------------------
// Value arrays — order matters for backward compat. Never reorder, only append.
// ---------------------------------------------------------------------------

const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const CURRENT_VERSION = 'a';

export const PRESET_FIELDS = [
  { key: 'menuColor', values: ['default', 'inverted', 'default-translucent', 'inverted-translucent'] as const },
  { key: 'menuAccent', values: ['subtle', 'bold'] as const },
  { key: 'radius', values: PRESET_RADII as readonly string[] },
  { key: 'iconLibrary', values: PRESET_ICON_LIBRARIES as readonly string[] },
  { key: 'primary', values: PRESET_PRIMARY_COLORS as readonly string[] },
  { key: 'base', values: PRESET_BASE_COLORS as readonly string[] },
  { key: 'feedback', values: PRESET_FEEDBACK_COLORS as readonly string[] }
] as const;

export interface PresetConfig {
  base: string;
  primary: string;
  feedback?: string;
  iconLibrary: string;
  radius: string;
  menuAccent: string;
  menuColor: string;
  fontSans?: string;
  fontHeading?: string;
}

export const DEFAULT_PRESET_CONFIG: PresetConfig = Object.fromEntries(
  PRESET_FIELDS.map(f => [f.key, f.values[0]])
) as unknown as PresetConfig;

// ---------------------------------------------------------------------------
// Base62 encoding
// ---------------------------------------------------------------------------

export function toBase62(num: number): string {
  if (num === 0) return '0';
  let result = '';
  let n = num;
  while (n > 0) {
    result = BASE62[n % 62] + result;
    n = Math.floor(n / 62);
  }
  return result;
}

export function fromBase62(str: string): number {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const idx = BASE62.indexOf(str[i]);
    if (idx === -1) return -1;
    result = result * 62 + idx;
  }
  return result;
}

// ---------------------------------------------------------------------------
// Encode / Decode
// ---------------------------------------------------------------------------

/**
 * Encode a PresetConfig into a short alphanumeric code.
 */
export function encodePreset(config: Partial<PresetConfig>): string {
  const merged = { ...DEFAULT_PRESET_CONFIG, ...config };

  let bits = 0;
  let offset = 0;

  // Calculate maximum bits based on largest value array
  const maxBitsPerField = Math.ceil(Math.log2(Math.max(...PRESET_FIELDS.map(f => f.values.length))));
  const bitsPerField = maxBitsPerField + 1; // +1 for safety margin

  for (const field of PRESET_FIELDS) {
    const idx = (field.values as readonly string[]).indexOf(merged[field.key as keyof PresetConfig] as string);
    bits += (idx === -1 ? 0 : idx) * 2 ** offset;
    offset += bitsPerField;
  }

  return CURRENT_VERSION + toBase62(bits);
}

/**
 * Decode a preset code back into a PresetConfig.
 */
export function decodePreset(code: string): PresetConfig | null {
  if (!code || code.length < 2) return null;

  const version = code[0];
  if (version !== CURRENT_VERSION) return null;

  const bitsPerField = Math.ceil(Math.log2(Math.max(...PRESET_FIELDS.map(f => f.values.length)))) + 1;

  const bits = fromBase62(code.slice(1));
  if (bits < 0) return null;

  const result = {} as Record<string, string>;
  let offset = 0;

  for (const field of PRESET_FIELDS) {
    const idx = Math.floor(bits / 2 ** offset) % 2 ** bitsPerField;
    result[field.key] = idx < field.values.length ? field.values[idx] : field.values[0];
    offset += bitsPerField;
  }

  return result as unknown as PresetConfig;
}

/**
 * Check if a string looks like a preset code.
 */
export function isPresetCode(value: string): boolean {
  if (!value || value.length < 2 || value.length > 16) return false;
  if (value[0] !== CURRENT_VERSION) return false;
  for (let i = 1; i < value.length; i++) {
    if (BASE62.indexOf(value[i]) === -1) return false;
  }
  return true;
}
