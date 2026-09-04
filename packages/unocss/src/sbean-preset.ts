import fs from 'node:fs';
import path from 'node:path';
import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import type { BaseTokens, ThemeOptions } from '@soybeanjs/theme';
import type { UiUnocssOptions } from './options';
import { presetUiUnocss } from './preset';

// ---------------------------------------------------------------------------
// SBean config → UnoCSS preset bridge
// ---------------------------------------------------------------------------

/** Web font name mapping: sbean preset name → web font family name. */
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

/** Options for {@link presetSbean}. */
export interface SbeanPresetOptions {
  /**
   * Project root directory where `sbean.json` lives.
   * @default process.cwd()
   */
  cwd?: string;
  /**
   * Override any {@link UiUnocssOptions} that would otherwise be derived from
   * `sbean.json`.
   */
  overrides?: UiUnocssOptions;
}

/**
 * The full set of theme configuration items that a `sbean.json` `uno` block can
 * carry. It is the single source of truth the preset bridge must cover:
 *
 * - theme keys: `base`, `primary`, `lightLevel`, `darkLevel`
 * - base tokens: `size`, `radius`
 *
 * In a generated `sbean.json`, `base`/`primary`/`size`/`radius` live in the
 * `uno` block; the bridge forwards them into this shape.
 */
interface SbeanUnoConfig extends Pick<ThemeOptions, 'base' | 'primary' | 'lightLevel' | 'darkLevel'>, BaseTokens {}

interface SbeanConfig {
  style?: string;
  uno?: SbeanUnoConfig;
  font?: { sans?: string; heading?: string };
}

/**
 * UnoCSS preset that reads theme configuration from `sbean.json`.
 *
 * After `sbean init`, the user's `uno.config.ts` can be reduced to:
 *
 * ```ts
 * import { defineConfig } from 'unocss'
 * import { presetSbean } from '@soybeanjs/ui-uno'
 *
 * export default defineConfig({
 *   presets: [presetSbean()],
 * })
 * ```
 *
 * The preset reads `sbean.json` and forwards every {@link SbeanUnoConfig} item
 * to {@link presetUiUnocss}:
 *
 * - `uno.base`, `uno.primary`, `uno.radius`, `uno.size` and the optional
 *   `uno.lightLevel` / `uno.darkLevel` are passed through directly;
 * - `font.*` is resolved through the web font name map.
 *
 * If `sbean.json` is missing or unreadable, it falls back to the default
 * ui-uno theme (zinc / indigo / md).
 */
export function presetSbean(options?: SbeanPresetOptions): Preset<Theme>[] {
  const cwd = options?.cwd ?? process.cwd();
  const config = readSbeanConfig(cwd);

  // ---- 1. `uno` block → theme keys + base tokens ------------------------
  // Spread the whole `uno` block so `base`/`primary`/`size`/`radius` and any
  // optional `lightLevel`/`darkLevel` are captured together.
  const uiUnocssOptions: UiUnocssOptions = {
    ...config?.uno,
    // A `sbean` project is expected to render the generated theme (base tokens
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

function readSbeanConfig(cwd: string): SbeanConfig | null {
  const configPath = path.join(cwd, 'sbean.json');
  try {
    const raw = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(raw) as SbeanConfig;
  } catch {
    return null;
  }
}
