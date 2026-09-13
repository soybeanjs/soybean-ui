import fs from 'node:fs';
import path from 'node:path';
import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import type { BaseTokens, ThemeOptions } from '@vean/theme';
import type { UiUnocssOptions } from './options';
import { presetUiUnocss } from './preset';

// ---------------------------------------------------------------------------
// Vean config → UnoCSS preset bridge
// ---------------------------------------------------------------------------

/** Web font name mapping: vean preset name → web font family name. */
const WEB_FONT_NAMES: Record<string, string> = {
  inter: 'Inter',
  'noto-sans': 'Noto Sans',
  'nunito-sans': 'Nunito Sans',
  figtree: 'Figtree',
  roboto: 'Roboto',
  raleway: 'Raleway',
  'dm-sans': 'DM Sans',
  'public-sans': 'Public Sans',
  outfit: 'Outfit',
  oxanium: 'Oxanium',
  manrope: 'Manrope',
  'space-grotesk': 'Space Grotesk',
  geist: 'Geist',
  montserrat: 'Montserrat',
  'ibm-plex-sans': 'IBM Plex Sans',
  'source-sans-3': 'Source Sans 3',
  'instrument-sans': 'Instrument Sans',
  'jetbrains-mono': 'JetBrains Mono',
  'geist-mono': 'Geist Mono',
  'noto-serif': 'Noto Serif',
  'roboto-slab': 'Roboto Slab',
  merriweather: 'Merriweather',
  lora: 'Lora',
  'playfair-display': 'Playfair Display',
  'eb-garamond': 'EB Garamond',
  'instrument-serif': 'Instrument Serif'
};

/** Options for {@link presetVean}. */
export interface VeanPresetOptions {
  /**
   * Project root directory where `vean.json` lives.
   * @default process.cwd()
   */
  cwd?: string;
  /**
   * Override any {@link UiUnocssOptions} that would otherwise be derived from
   * `vean.json`.
   */
  overrides?: UiUnocssOptions;
}

/**
 * The full set of theme configuration items that a `vean.json` `uno` block can
 * carry. It is the single source of truth the preset bridge must cover:
 *
 * - theme keys: `base`, `primary`, `lightLevel`, `darkLevel`
 * - base tokens: `size`, `radius`
 *
 * In a generated `vean.json`, `base`/`primary`/`size`/`radius` live in the
 * `uno` block; the bridge forwards them into this shape.
 */
interface VeanUnoConfig extends Pick<ThemeOptions, 'base' | 'primary' | 'lightLevel' | 'darkLevel'>, BaseTokens {}

interface VeanConfig {
  style?: string;
  uno?: VeanUnoConfig;
  font?: { sans?: string; heading?: string };
}

/**
 * UnoCSS preset that reads theme configuration from `vean.json`.
 *
 * After `vean init`, the user's `uno.config.ts` can be reduced to:
 *
 * ```ts
 * import { defineConfig } from 'unocss'
 * import { presetVean } from '@vean/unocss'
 *
 * export default defineConfig({
 *   presets: [presetVean()],
 * })
 * ```
 *
 * The preset reads `vean.json` and forwards every {@link VeanUnoConfig} item
 * to {@link presetUiUnocss}:
 *
 * - `uno.base`, `uno.primary`, `uno.radius`, `uno.size` and the optional
 *   `uno.lightLevel` / `uno.darkLevel` are passed through directly;
 * - `font.*` is resolved through the web font name map.
 *
 * If `vean.json` is missing or unreadable, it falls back to the default
 * ui-uno theme (zinc / indigo / md).
 */
export function presetVean(options?: VeanPresetOptions): Preset<Theme>[] {
  const cwd = options?.cwd ?? process.cwd();
  const config = readVeanConfig(cwd);

  // ---- 1. `uno` block → theme keys + base tokens ------------------------
  // Spread the whole `uno` block so `base`/`primary`/`size`/`radius` and any
  // optional `lightLevel`/`darkLevel` are captured together.
  const uiUnocssOptions: UiUnocssOptions = {
    ...config?.uno,
    // A `vean` project is expected to render the generated theme (base tokens
    // + light/dark color tokens), so the theme preflight is enabled by default.
    // Callers can still disable it via `overrides`.
    uiCSS: true
  };

  // ---- 2. Fonts ---------------------------------------------------------
  if (config?.font?.sans) {
    const sansName = WEB_FONT_NAMES[config.font.sans] ?? config.font.sans;
    const fonts: UiUnocssOptions['fonts'] = { sans: sansName };
    if (config.font.heading && config.font.heading !== 'inherit') {
      fonts.heading = WEB_FONT_NAMES[config.font.heading] ?? config.font.heading;
    }
    uiUnocssOptions.fonts = fonts;
  }

  // ---- 3. Merge user overrides (take precedence) ------------------------
  if (options?.overrides) {
    Object.assign(uiUnocssOptions, options.overrides);
  }

  return presetUiUnocss(uiUnocssOptions);
}

function readVeanConfig(cwd: string): VeanConfig | null {
  const configPath = path.join(cwd, 'vean.json');
  try {
    const raw = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(raw) as VeanConfig;
  } catch {
    return null;
  }
}
