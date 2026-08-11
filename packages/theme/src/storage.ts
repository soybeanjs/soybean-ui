import { colord } from '@soybeanjs/colord';
import { tailwindPalette } from '@soybeanjs/colord/palette';
import type { TailwindPaletteKey } from '@soybeanjs/colord/palette';
import {
  isBaseKey as isRegistryBaseKey,
  isChartScheme as isRegistryChartScheme,
  isFeedbackScheme as isRegistryFeedbackScheme,
  isPrimaryKey as isRegistryPrimaryKey,
  isSidebarScheme as isRegistrySidebarScheme
} from './registry';
import type {
  BaseColorKey,
  ChartSchemeKey,
  ColorTokens,
  ColorValue,
  FeedbackSchemeKey,
  PrimaryColorKey,
  SidebarSchemeKey,
  ThemeModePreference,
  ThemeRadiusValue,
  ThemeSizeValue,
  ThemePreset,
  ColorFormat,
  LightLevelOffset,
  DarkLevelOffset,
  ThemeOverrides
} from './types';
import { COLOR_VARIABLES } from './variables';

/**
 * a custom theme color preset (light/dark color token overrides)
 */
export type CustomThemeColorPreset = {
  light: Partial<ColorTokens>;
  dark?: Partial<ColorTokens>;
};

/**
 * theme preset input: reuses the engine's `ThemePreset`, so a name-carrying
 * preset is a first-class citizen instead of a parallel `{ presetName }` type.
 *
 * - an inline color preset is a full `ThemePreset` (`light` present);
 * - a reference to a stored preset is a `ThemePreset` carrying only `name`.
 *
 * Consumers distinguish the two by checking whether `light` is present. The
 * same `name` field aligns with `ThemePreset` / `FullThemePreset` / stored
 * preset entries.
 */
export type ThemePresetInput = ThemePreset | Pick<ThemePreset, 'name'>;

/**
 * a persisted custom theme preset entry
 */
export interface StoredThemePreset extends CustomThemeColorPreset {
  /**
   * the preset unique name (also the storage object key)
   */
  name: string;
  /**
   * the preset data version (semver, used for display and update decisions)
   */
  version: string;
}

/**
 * the persisted custom theme presets table
 */
export interface StoredThemePresets {
  /**
   * the storage schema version
   *
   * @defaultValue 1
   */
  version: number;
  presets: Record<string, StoredThemePreset>;
}

/**
 * the persistable theme config state
 *
 * a subset of `ThemeOptions` that can be safely stored in localStorage, plus
 * the `mode` preference used to toggle the dark mode class before first paint.
 * Custom `preset` colors are intentionally not persisted.
 */
export interface ThemeConfigState {
  /**
   * the base color preset key
   */
  base?: BaseColorKey;
  /**
   * the primary color preset key
   */
  primary?: PrimaryColorKey;
  /**
   * the feedback (status) semantic scheme key
   */
  feedback?: FeedbackSchemeKey;
  /**
   * the chart (data) semantic scheme key
   */
  chart?: ChartSchemeKey;
  /**
   * the sidebar skin semantic scheme key
   */
  sidebar?: SidebarSchemeKey;
  /**
   * whether to apply a separate sidebar skin from the `sidebar` scheme.
   *
   * @default true
   */
  sidebarDerive?: boolean;
  /**
   * the component size / density
   */
  size?: ThemeSizeValue;
  /**
   * the border radius
   */
  radius?: ThemeRadiusValue;
  /**
   * the color scheme preference (`light` / `dark` / `auto`)
   *
   * `'auto'` follows the OS `prefers-color-scheme`. The effective mode is
   * applied as a class on `<html>` (default `'dark'`).
   */
  mode?: ThemeModePreference;
  /**
   * color output format
   *
   * @default 'hsl'
   */
  format?: ColorFormat;
  /**
   * light mode darkening offset
   *
   * @default 0
   */
  lightLevel?: LightLevelOffset;
  /**
   * dark mode brightening offset
   *
   * @default 0
   */
  darkLevel?: DarkLevelOffset;
  /**
   * the border opacity override (0 - 1)
   */
  borderOpacity?: number;
  /**
   * inline color token overrides persisted alongside the config so a theme that
   * differs only in `overrides` is still reconstructable during SSR.
   */
  overrides?: ThemeOverrides;
}

/**
 * the default localStorage key for the persisted theme config
 */
export const THEME_STORAGE_KEY = '__SOYBEAN_THEME';

const isBaseKey = (value: unknown): value is BaseColorKey => isRegistryBaseKey(value);

const isPrimaryKey = (value: unknown): value is PrimaryColorKey => isRegistryPrimaryKey(value);

const isFeedbackScheme = (value: unknown): value is FeedbackSchemeKey => isRegistryFeedbackScheme(value);

const isChartScheme = (value: unknown): value is ChartSchemeKey => isRegistryChartScheme(value);

const isSidebarScheme = (value: unknown): value is SidebarSchemeKey => isRegistrySidebarScheme(value);

const isMode = (value: unknown): value is ThemeConfigState['mode'] =>
  value === 'light' || value === 'dark' || value === 'auto';

const isFormat = (value: unknown): value is ThemeConfigState['format'] => value === 'hsl' || value === 'oklch';

const isSidebarDerive = (value: unknown): value is boolean => typeof value === 'boolean';

const isLightLevel = (value: unknown): value is ThemeConfigState['lightLevel'] =>
  value === 0 || value === 1 || value === 2;

const isDarkLevel = (value: unknown): value is ThemeConfigState['darkLevel'] =>
  value === 0 || value === 1 || value === 2 || value === 3;

const isBorderOpacity = (value: unknown): value is number => typeof value === 'number' && value >= 0 && value <= 1;

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

/**
 * serialize a theme config into a string for storage
 */
export function stringifyThemeConfig(config: ThemeConfigState): string {
  return JSON.stringify(config);
}

/**
 * parse and validate a stored theme config string.
 *
 * Returns `null` when the value is missing, malformed, or carries an
 * unsupported `base` / `primary` preset key so callers can fall back to
 * their defaults safely.
 */
export function parseThemeConfig(raw: string | null | undefined): ThemeConfigState | null {
  if (!raw) {
    return null;
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!isRecord(data)) {
    return null;
  }

  const {
    base,
    primary,
    feedback,
    chart,
    sidebar,
    sidebarDerive,
    mode,
    size,
    radius,
    format,
    lightLevel,
    darkLevel,
    borderOpacity,
    overrides
  } = data;

  if (base !== undefined && !isBaseKey(base)) {
    return null;
  }
  if (primary !== undefined && !isPrimaryKey(primary)) {
    return null;
  }
  if (feedback !== undefined && !isFeedbackScheme(feedback)) {
    return null;
  }
  if (chart !== undefined && !isChartScheme(chart)) {
    return null;
  }
  if (sidebar !== undefined && !isSidebarScheme(sidebar)) {
    return null;
  }
  if (sidebarDerive !== undefined && !isSidebarDerive(sidebarDerive)) {
    return null;
  }

  const config: ThemeConfigState = {};

  if (base !== undefined) {
    config.base = base;
  }
  if (primary !== undefined) {
    config.primary = primary;
  }
  if (feedback !== undefined) {
    config.feedback = feedback;
  }
  if (chart !== undefined) {
    config.chart = chart;
  }
  if (sidebar !== undefined) {
    config.sidebar = sidebar;
  }
  if (sidebarDerive !== undefined) {
    config.sidebarDerive = sidebarDerive;
  }
  if (isMode(mode)) {
    config.mode = mode;
  }
  if (typeof size === 'string') {
    config.size = size as ThemeSizeValue;
  }
  if (typeof radius === 'string') {
    config.radius = radius as ThemeRadiusValue;
  }
  if (isFormat(format)) {
    config.format = format;
  }
  if (isLightLevel(lightLevel)) {
    config.lightLevel = lightLevel;
  }
  if (isDarkLevel(darkLevel)) {
    config.darkLevel = darkLevel;
  }
  if (isBorderOpacity(borderOpacity)) {
    config.borderOpacity = borderOpacity;
  }
  if (isRecord(overrides)) {
    const parsedOverrides = parseOverrides(overrides);

    if (parsedOverrides) {
      config.overrides = parsedOverrides;
    }
  }

  return config;
}

const getStorage = (): Storage | null => {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return null;
  }

  return window.localStorage;
};

/**
 * read the persisted theme config from localStorage (SSR-safe, returns `null` on the server)
 */
export function getStoredThemeConfig(key: string = THEME_STORAGE_KEY): ThemeConfigState | null {
  return parseThemeConfig(getStorage()?.getItem(key) ?? null);
}

/**
 * persist the theme config into localStorage (SSR-safe, no-op on the server)
 */
export function setStoredThemeConfig(config: ThemeConfigState, key: string = THEME_STORAGE_KEY): void {
  getStorage()?.setItem(key, stringifyThemeConfig(config));
}

/**
 * remove the persisted theme config from localStorage (SSR-safe, no-op on the server)
 */
export function removeStoredThemeConfig(key: string = THEME_STORAGE_KEY): void {
  getStorage()?.removeItem(key);
}

/**
 * the default localStorage key for the persisted custom theme presets table
 */
export const THEME_PRESETS_STORAGE_KEY = '__SOYBEAN_THEME_PRESETS';

/**
 * the current storage schema version for the persisted presets table
 */
export const THEME_PRESETS_SCHEMA_VERSION = 1;

const SIMPLE_COLOR_KEYS: ReadonlySet<string> = new Set(['inherit', 'currentColor', 'transparent', 'black', 'white']);

const THEME_COLOR_KEYS: ReadonlySet<string> = new Set(Object.keys(COLOR_VARIABLES));

const isSimpleColor = (value: string): boolean => SIMPLE_COLOR_KEYS.has(value);

const isPaletteLevelColor = (value: string): boolean => {
  const [key, level] = value.split('.');

  const levels = tailwindPalette[key as TailwindPaletteKey];

  return levels != null && level != null && level in levels;
};

/**
 * whether a value is a valid theme color token value (`ColorValue`): a simple
 * keyword, a `palette.level` reference, or a valid hsl()/oklch() string.
 *
 * Exposed so UI-layer theme composables can reuse the same validation the
 * storage layer applies when persisting overrides.
 */
export function isValidColorValue(value: unknown): value is ColorValue {
  if (typeof value !== 'string' || !value) {
    return false;
  }

  if (isSimpleColor(value)) {
    return true;
  }

  if (value.includes('.')) {
    return isPaletteLevelColor(value);
  }

  if (value.startsWith('hsl(') || value.startsWith('oklch(')) {
    return colord(value).isValid();
  }

  return false;
}

const pickValidColors = (record: Record<string, unknown>): Record<string, ColorValue> =>
  Object.entries(record).reduce<Record<string, ColorValue>>((acc, [key, value]) => {
    if (THEME_COLOR_KEYS.has(key) && isValidColorValue(value)) {
      acc[key] = value;
    }

    return acc;
  }, {});

/**
 * parse and validate a persisted `ThemeOverrides` record. Only known color
 * tokens with valid color values are kept.
 */
const parseOverrides = (record: Record<string, unknown>): ThemeOverrides | null => {
  const light = isRecord(record.light) ? pickValidColors(record.light) : undefined;
  const dark = isRecord(record.dark) ? pickValidColors(record.dark) : undefined;

  if (!light && !dark) {
    return null;
  }

  const overrides: ThemeOverrides = {};

  if (light && Object.keys(light).length > 0) {
    overrides.light = light;
  }

  if (dark && Object.keys(dark).length > 0) {
    overrides.dark = dark;
  }

  if (!overrides.light && !overrides.dark) {
    return null;
  }

  return overrides;
};

const parseStoredThemePreset = (name: string, raw: unknown): StoredThemePreset | null => {
  if (!isRecord(raw) || raw.name !== name || typeof raw.version !== 'string' || !raw.version) {
    return null;
  }

  if (!isRecord(raw.light)) {
    return null;
  }

  const light = pickValidColors(raw.light);

  if (Object.keys(light).length === 0) {
    return null;
  }

  const preset: StoredThemePreset = {
    name,
    version: raw.version,
    light
  };

  if (isRecord(raw.dark)) {
    const dark = pickValidColors(raw.dark);

    if (Object.keys(dark).length > 0) {
      preset.dark = dark;
    }
  }

  return preset;
};

/**
 * parse and validate a stored custom theme presets string.
 *
 * - a malformed JSON payload, a missing `presets` table, or a schema version
 *   newer than the current one returns `null` (unknown future format is never
 *   guessed);
 * - entries are validated per item: an invalid entry is dropped while the rest
 *   of the table is kept; within an entry only keys with valid `ColorValue`s
 *   are kept, and an entry without any valid color key is dropped entirely;
 * - the returned table is always normalized to `THEME_PRESETS_SCHEMA_VERSION`.
 */
export function parseThemePresets(raw: string | null | undefined): StoredThemePresets | null {
  if (!raw) {
    return null;
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!isRecord(data) || !isRecord(data.presets)) {
    return null;
  }

  const schemaVersion =
    typeof data.version === 'number' && Number.isInteger(data.version) && data.version > 0 ? data.version : 0;

  if (schemaVersion > THEME_PRESETS_SCHEMA_VERSION) {
    return null;
  }

  // v0 (no `version` field) and v1 share the same shape, so migration is a
  // normalization; future schema versions add a step here.
  const presets = Object.entries(data.presets).reduce<Record<string, StoredThemePreset>>((acc, [name, rawPreset]) => {
    const preset = parseStoredThemePreset(name, rawPreset);

    if (preset) {
      acc[name] = preset;
    }

    return acc;
  }, {});

  return { version: THEME_PRESETS_SCHEMA_VERSION, presets };
}

/**
 * read the persisted custom theme presets table from localStorage
 * (SSR-safe, returns `null` on the server)
 */
export function getStoredThemePresets(key: string = THEME_PRESETS_STORAGE_KEY): StoredThemePresets | null {
  return parseThemePresets(getStorage()?.getItem(key) ?? null);
}

/**
 * persist a single custom theme preset into the presets table
 * (SSR-safe, no-op on the server). Returns `false` when the preset is invalid
 * or the storage is unavailable.
 */
export function setStoredThemePreset(preset: StoredThemePreset, key: string = THEME_PRESETS_STORAGE_KEY): boolean {
  const storage = getStorage();

  if (!storage) {
    return false;
  }

  const parsed = parseStoredThemePreset(preset.name, preset);

  if (!parsed) {
    return false;
  }

  const current = parseThemePresets(storage.getItem(key)) ?? { version: THEME_PRESETS_SCHEMA_VERSION, presets: {} };

  storage.setItem(key, JSON.stringify({ ...current, presets: { ...current.presets, [parsed.name]: parsed } }));

  return true;
}

/**
 * remove a custom theme preset from the presets table
 * (SSR-safe, no-op on the server). Returns whether an entry was removed.
 */
export function removeStoredThemePreset(name: string, key: string = THEME_PRESETS_STORAGE_KEY): boolean {
  const storage = getStorage();

  if (!storage) {
    return false;
  }

  const current = parseThemePresets(storage.getItem(key));

  if (!current || !(name in current.presets)) {
    return false;
  }

  const presets = Object.entries(current.presets)
    .filter(([presetName]) => presetName !== name)
    .reduce<Record<string, StoredThemePreset>>((acc, [presetName, preset]) => {
      acc[presetName] = preset;

      return acc;
    }, {});

  storage.setItem(key, JSON.stringify({ version: THEME_PRESETS_SCHEMA_VERSION, presets }));

  return true;
}
