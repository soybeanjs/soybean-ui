import { PALETTE_KEYS, isPaletteKey } from './palette';
import type {
  ContrastPolicy,
  PaletteKey,
  SemanticToken,
  SurfaceStyle,
  ThemeModePreference,
  ThemeOptions,
  ThemeOverrides
} from './types';

/**
 * Persistence (docs/theme.md §9.3).
 *
 * One key, one envelope, one writer:
 *
 * - **one key** (`__VEAN_THEME`) removes the cross-key races the first
 *   generation had (four keys, three writers, a cross-tab listener that watched
 *   only two of them);
 * - **one envelope** carries the validated options, the light/dark preference and
 *   the style snapshot the first-paint script applies;
 * - **one debounced writer** owns every write, so dragging a knob cannot produce
 *   a write per frame.
 *
 * Everything here is SSR-safe: reads/writes are no-ops without `localStorage`,
 * and every access is wrapped in `try/catch` because blocked storage throws on
 * *access* (Firefox third-party contexts), not just on write.
 */

/** the single storage key. */
export const THEME_STORAGE_KEY = '__VEAN_THEME';

/** the current envelope schema version. */
export const THEME_ENVELOPE_VERSION = 1;

/** the style element id the first-paint script patches in place. */
export const THEME_STYLE_ID = 'vean-theme';

/**
 * an upper bound for the style snapshot: a runaway value must not fill the
 * user's storage (the alias block is ~6 KB; during the migration the payload also
 * carries the first-generation block, hence the headroom).
 */
const MAX_STYLE_LENGTH = 64 * 1024;

/** the persisted envelope. */
export interface ThemeEnvelope {
  /** the schema version. */
  v: number;
  /** the engine options. */
  options: ThemeOptions;
  /** the light / dark / auto preference. */
  mode?: ThemeModePreference;
  /**
   * the style payload applied by the first-paint script (`#vean-theme`).
   *
   * The snapshot is what removes the theme flash on refresh: the head script
   * applies it before any stylesheet is parsed, then the runtime provider
   * patches the same element in place.
   */
  style?: string;
  /** custom theme presets (the theme customizer's saved color schemes). */
  presets?: Record<string, unknown>;
  /** the name of the currently applied custom preset, if any. */
  appliedPreset?: string;
}

/** what a caller hands to the writer; the version is added for them. */
export type ThemeEnvelopeInput = Omit<ThemeEnvelope, 'v'>;

/** SSR-safe `localStorage`, `null` when unavailable or blocked. */
function getStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isMode = (value: unknown): value is ThemeModePreference =>
  value === 'light' || value === 'dark' || value === 'auto';

const isSurfaceStyle = (value: unknown): value is SurfaceStyle => value === 'layered' || value === 'flat';

const isContrastPolicy = (value: unknown): value is ContrastPolicy =>
  value === 'off' || value === 'aa' || value === 'aaa';

/**
 * validate the override record: only known semantic tokens with string values
 * survive, so a stale or hand-edited payload cannot reach the engine.
 */
function parseOverrides(value: unknown): ThemeOverrides | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const parseSide = (side: unknown): Partial<Record<SemanticToken, string>> | undefined => {
    if (!isRecord(side)) {
      return undefined;
    }

    const entries = Object.entries(side).filter(
      (entry): entry is [SemanticToken, string] => typeof entry[1] === 'string' && entry[1].length > 0
    );

    return entries.length > 0 ? Object.fromEntries(entries) : undefined;
  };

  const light = parseSide(value.light);
  const dark = parseSide(value.dark);

  return light || dark ? { ...(light ? { light } : {}), ...(dark ? { dark } : {}) } : undefined;
}

/**
 * validate and normalize engine options.
 *
 * Invalid *fields* are dropped while the rest of the configuration survives —
 * the first generation discarded the whole config as soon as one enum was
 * unknown, which silently reset the user's colour scheme (audit P1-4).
 */
export function parseThemeOptions(value: unknown): ThemeOptions {
  if (!isRecord(value)) {
    return {};
  }

  const options: Record<string, unknown> = {};
  const copy = (key: keyof ThemeOptions, valid: (input: unknown) => boolean): void => {
    if (value[key] !== undefined && valid(value[key])) {
      options[key] = value[key];
    }
  };

  copy('base', input => isPaletteKey(input) && (PALETTE_KEYS as readonly string[]).includes(input as string));
  copy('primary', input => isPaletteKey(input) && (PALETTE_KEYS as readonly string[]).includes(input as string));
  copy('feedback', input => typeof input === 'string' && input.length > 0);
  copy('chart', input => typeof input === 'string' && input.length > 0);
  copy('lightLevel', input => input === 0 || input === 1 || input === 2);
  copy('darkLevel', input => input === 0 || input === 1 || input === 2 || input === 3);
  copy('surfaceStyle', isSurfaceStyle);
  copy('contrast', isContrastPolicy);
  copy('solidVars', input => input === 'none' || input === 'chart' || input === 'all');
  copy('prefix', input => input === false || (typeof input === 'string' && input.length > 0));
  copy('size', input => typeof input === 'string' && input.length > 0);
  copy('radius', input => typeof input === 'string' && input.length > 0);
  copy('borderOpacity', input => typeof input === 'number' && input >= 0 && input <= 1);
  copy('format', input => input === 'hsl' || input === 'oklch');
  copy('styleTarget', input => input === 'html' || input === ':root');
  copy('darkSelector', input => typeof input === 'string' && input.length > 0);

  const overrides = parseOverrides(value.overrides);

  if (overrides) {
    options.overrides = overrides;
  }

  return options as ThemeOptions;
}

/** whether a value looks like a palette key (used by the base/primary guard). */
export const isKnownPalette = (value: unknown): value is PaletteKey => isPaletteKey(value);

/**
 * parse a stored envelope.
 *
 * Returns `null` for a missing, malformed or **future-versioned** payload: an
 * unknown schema is never guessed (the version is bumped when the shape changes).
 */
export function parseThemeEnvelope(raw: string | null | undefined): ThemeEnvelope | null {
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

  const version = typeof data.v === 'number' && Number.isInteger(data.v) && data.v > 0 ? data.v : 0;

  if (version > THEME_ENVELOPE_VERSION) {
    return null;
  }

  const envelope: ThemeEnvelope = { v: THEME_ENVELOPE_VERSION, options: parseThemeOptions(data.options) };

  if (isMode(data.mode)) {
    envelope.mode = data.mode;
  }

  if (typeof data.style === 'string' && data.style.length > 0 && data.style.length <= MAX_STYLE_LENGTH) {
    envelope.style = data.style;
  }

  if (isRecord(data.presets)) {
    envelope.presets = data.presets;
  }

  if (typeof data.appliedPreset === 'string' && data.appliedPreset.length > 0) {
    envelope.appliedPreset = data.appliedPreset;
  }

  return envelope;
}

/** read the persisted envelope (SSR-safe). */
export function readThemeEnvelope(key: string = THEME_STORAGE_KEY): ThemeEnvelope | null {
  let raw: string | null = null;

  try {
    raw = getStorage()?.getItem(key) ?? null;
  } catch {
    return null;
  }

  return parseThemeEnvelope(raw);
}

/** write the envelope (SSR-safe; returns whether the write landed). */
export function writeThemeEnvelope(envelope: ThemeEnvelopeInput, key: string = THEME_STORAGE_KEY): boolean {
  const storage = getStorage();

  if (!storage) {
    return false;
  }

  const payload: ThemeEnvelope = { v: THEME_ENVELOPE_VERSION, ...envelope };

  if (payload.style && payload.style.length > MAX_STYLE_LENGTH) {
    delete payload.style;
  }

  try {
    storage.setItem(key, JSON.stringify(payload));

    return true;
  } catch {
    return false;
  }
}

/** remove the envelope (SSR-safe). */
export function clearThemeEnvelope(key: string = THEME_STORAGE_KEY): void {
  try {
    getStorage()?.removeItem(key);
  } catch {
    // 存储被禁用时无需处理：没有写入就没有需要清理的状态
  }
}

/** the debounced single writer. */
export interface ThemeWriter {
  /** queue a write; the latest payload wins within the debounce window. */
  write(envelope: ThemeEnvelopeInput): void;
  /** write immediately (page hide, tests). */
  flush(): void;
  /** drop a queued write. */
  cancel(): void;
}

/**
 * create the single debounced writer for the theme envelope.
 *
 * One writer per application removes the "two watchers write two keys" race of
 * the first generation, and the debounce keeps a slider drag from writing on
 * every frame.
 */
export function createThemeWriter(options: { key?: string; delay?: number } = {}): ThemeWriter {
  const { key = THEME_STORAGE_KEY, delay = 250 } = options;
  let pending: ThemeEnvelopeInput | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const flush = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }

    if (pending) {
      writeThemeEnvelope(pending, key);
      pending = null;
    }
  };

  return {
    write: envelope => {
      pending = envelope;

      if (timer !== null) {
        return;
      }

      timer = setTimeout(flush, delay);
    },
    flush,
    cancel: () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }

      pending = null;
    }
  };
}
