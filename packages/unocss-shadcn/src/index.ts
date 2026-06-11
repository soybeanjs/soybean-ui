import fs from 'node:fs';
import path from 'node:path';
import { presetWind3, presetWebFonts } from 'unocss';
import type { Preflight, Preset } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetAnimations } from 'unocss-preset-animations';
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';
import type { ThemeOptions } from '@soybeanjs/shadcn-theme';
import globalStyle from './global.css?raw';
import resetStyle from './reset.css?raw';

export interface ShadcnPresetOptions extends ThemeOptions {
  /**
   * Whether to generate the CSS theme (CSS variables + preflights).
   *
   * @default false
   */
  generated?: boolean;
  /**
   * Whether to include the global CSS preflight (border color, background, etc.).
   * Only effective when `generated` is `true`.
   *
   * @default true
   */
  globalCss?: boolean;
  /**
   * Whether to include the reset CSS preflight (box-sizing, border-width, etc.).
   * Only effective when `generated` is `true`.
   *
   * @default true
   */
  resetCss?: boolean;
  /**
   * Font configuration forwarded to `@unocss/preset-web-fonts`.
   * When provided, `presetWebFonts` is automatically included in the returned presets.
   *
   * Keys (sans / heading / mono) map to web font names understood
   * by the configured provider (default: 'fontsource').
   */
  fonts?: {
    sans?: string;
    heading?: string;
    mono?: string;
  };
  /**
   * Web font provider.
   *
   * Uses `@fontsource-variable/*` npm packages (self-hosted, no CDN requests).
   *
   * @default 'fontsource'
   */
  fontProvider?: 'google' | 'bunny' | 'fontshare' | 'fontsource' | 'coollabs' | 'none';
}

/**
 * The SoybeanUI shadcn preset.
 *
 * Returns **multiple presets** so that a single call composes the full
 * recommendation stack:
 *
 * ```ts
 * // uno.config.ts
 * import { defineConfig } from 'unocss'
 * import { presetShadcn } from '@soybeanjs/unocss-shadcn'
 *
 * export default defineConfig({
 *   presets: [presetShadcn({ base: 'zinc', primary: 'indigo', generated: true })],
 * })
 * ```
 *
 * The returned array is:
 *   [
 *     presetWind3({ dark }),
 *     presetAnimations(),
 *     presetWebFonts({ … }),        // only when `fonts` option is provided
 *     shadcn-theme + preflights,
 *   ]
 */
/**
 * The SoybeanUI shadcn preset.
 *
 * Returns **multiple presets** so that a single call composes the full
 * recommendation stack:
 *
 * ```ts
 * // uno.config.ts
 * import { defineConfig } from 'unocss'
 * import { presetShadcn } from '@soybeanjs/unocss-shadcn'
 *
 * export default defineConfig({
 *   presets: [presetShadcn({ base: 'zinc', primary: 'indigo', generated: true })],
 * })
 * ```
 *
 * The returned array is:
 *   [
 *     presetWind3({ dark }),
 *     presetAnimations(),
 *     presetWebFonts({ ... }),        // only when `fonts` option is provided
 *     shadcn-theme + preflights,
 *   ]
 */
export function presetShadcn(options?: ShadcnPresetOptions): Preset<Theme>[] {
  const { globalCss = true, resetCss = true, fonts, fontProvider = 'fontsource' } = options || {};

  // ---- shadcn-theme preflights -------------------------------------------
  const preflights: Preflight[] = [];

  if (options?.generated) {
    if (resetCss) {
      preflights.push({
        getCSS: () => resetStyle
      });
    }

    if (globalCss) {
      preflights.push({
        getCSS: () => globalStyle
      });
    }

    preflights.push({
      getCSS: () => {
        const { getCss } = createShadcnTheme(options);
        return getCss();
      }
    });
  }

  // ---- Self preset (theme layer) ----------------------------------------
  const selfPreset: Preset<Theme> = {
    name: 'unocss-preset-shadcn',
    preflights,
    theme: {
      animation: {
        keyframes: {
          'collapsible-down': '{from{ height: 0 } to { height: var(--soybean-collapsible-content-height)}}',
          'collapsible-up': '{from{ height: var(--soybean-collapsible-content-height)} to { height: 0 }}'
        },
        durations: {
          'collapsible-down': '200ms',
          'collapsible-up': '200ms'
        },
        timingFns: {
          'collapsible-down': 'ease-out',
          'collapsible-up': 'ease-out'
        }
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        border: 'hsl(var(--border) / var(--border-alpha, 1))',
        input: 'hsl(var(--input) / var(--input-alpha, 1))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
          950: 'hsl(var(--primary-950))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          50: 'hsl(var(--destructive-50))',
          100: 'hsl(var(--destructive-100))',
          200: 'hsl(var(--destructive-200))',
          300: 'hsl(var(--destructive-300))',
          400: 'hsl(var(--destructive-400))',
          500: 'hsl(var(--destructive-500))',
          600: 'hsl(var(--destructive-600))',
          700: 'hsl(var(--destructive-700))',
          800: 'hsl(var(--destructive-800))',
          900: 'hsl(var(--destructive-900))',
          950: 'hsl(var(--destructive-950))'
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          50: 'hsl(var(--success-50))',
          100: 'hsl(var(--success-100))',
          200: 'hsl(var(--success-200))',
          300: 'hsl(var(--success-300))',
          400: 'hsl(var(--success-400))',
          500: 'hsl(var(--success-500))',
          600: 'hsl(var(--success-600))',
          700: 'hsl(var(--success-700))',
          800: 'hsl(var(--success-800))',
          900: 'hsl(var(--success-900))',
          950: 'hsl(var(--success-950))'
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          50: 'hsl(var(--warning-50))',
          100: 'hsl(var(--warning-100))',
          200: 'hsl(var(--warning-200))',
          300: 'hsl(var(--warning-300))',
          400: 'hsl(var(--warning-400))',
          500: 'hsl(var(--warning-500))',
          600: 'hsl(var(--warning-600))',
          700: 'hsl(var(--warning-700))',
          800: 'hsl(var(--warning-800))',
          900: 'hsl(var(--warning-900))',
          950: 'hsl(var(--warning-950))'
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
          50: 'hsl(var(--info-50))',
          100: 'hsl(var(--info-100))',
          200: 'hsl(var(--info-200))',
          300: 'hsl(var(--info-300))',
          400: 'hsl(var(--info-400))',
          500: 'hsl(var(--info-500))',
          600: 'hsl(var(--info-600))',
          700: 'hsl(var(--info-700))',
          800: 'hsl(var(--info-800))',
          900: 'hsl(var(--info-900))',
          950: 'hsl(var(--info-950))'
        },
        carbon: {
          DEFAULT: 'hsl(var(--carbon))',
          foreground: 'hsl(var(--carbon-foreground))',
          50: 'hsl(var(--carbon-50))',
          100: 'hsl(var(--carbon-100))',
          200: 'hsl(var(--carbon-200))',
          300: 'hsl(var(--carbon-300))',
          400: 'hsl(var(--carbon-400))',
          500: 'hsl(var(--carbon-500))',
          600: 'hsl(var(--carbon-600))',
          700: 'hsl(var(--carbon-700))',
          800: 'hsl(var(--carbon-800))',
          900: 'hsl(var(--carbon-900))',
          950: 'hsl(var(--carbon-950))'
        },
        sidebar: 'hsl(var(--sidebar))',
        'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
        'sidebar-primary': 'hsl(var(--sidebar-primary))',
        'sidebar-primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        'sidebar-accent': 'hsl(var(--sidebar-accent))',
        'sidebar-accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        'sidebar-border': 'hsl(var(--sidebar-border) / var(--sidebar-border-alpha, 1))',
        'sidebar-ring': 'hsl(var(--sidebar-ring))',
        'chart-1': 'hsl(var(--chart-1))',
        'chart-2': 'hsl(var(--chart-2))',
        'chart-3': 'hsl(var(--chart-3))',
        'chart-4': 'hsl(var(--chart-4))',
        'chart-5': 'hsl(var(--chart-5))'
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontSize: {
        '4xs': ['0.375rem', '0.5rem'],
        '3xs': ['0.5rem', '0.625rem'],
        '2xs': ['0.625rem', '0.75rem']
      }
    }
  };

  // ---- Build the presets array ------------------------------------------

  const presets: Preset[] = [
    // 1. Wind3 — required for utility classes
    presetWind3({ dark: resolveWind3Dark(options?.darkSelector) }),
    // 2. Animations
    presetAnimations()
  ];

  // 3. Web fonts (only when fonts are explicitly configured)
  if (fonts) {
    presets.push(
      presetWebFonts({
        provider: fontProvider,
        fonts: fonts as Record<string, string>
      })
    );
  }

  // 4. Self — shadcn theme layer
  presets.push(selfPreset);

  return presets as Preset<Theme>[];
}

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
   * Override any {@link ShadcnPresetOptions} that would otherwise be
   * derived from `sbean.json`.
   */
  overrides?: ShadcnPresetOptions;
}

interface SbeanConfig {
  style?: string;
  uno?: { base?: string; primary?: string; feedback?: string; radius?: string; size?: string };
  font?: { sans?: string; heading?: string };
}

/**
 * UnoCSS preset that reads theme configuration from `sbean.json`.
 *
 * After `sbean init`, the user's `uno.config.ts` can be reduced to:
 *
 * ```ts
 * import { defineConfig } from 'unocss'
 * import { presetSbean } from '@soybeanjs/unocss-shadcn'
 *
 * export default defineConfig({
 *   presets: [presetSbean()],
 * })
 * ```
 *
 * The preset reads `sbean.json`, extracts `uno.base`, `uno.primary`,
 * `uno.feedback`, `uno.radius`, `uno.size`, and `font.*`, and forwards
 * them to {@link presetShadcn}.
 * If `sbean.json` is missing or unreadable, it falls back to the default
 * shadcn theme (zinc / indigo / md).
 */
export function presetSbean(options?: SbeanPresetOptions): Preset<Theme>[] {
  const cwd = options?.cwd ?? process.cwd();
  const config = readSbeanConfig(cwd);

  const shadcnOptions: ShadcnPresetOptions = {
    generated: true,
    darkSelector: 'class',
    base: (config?.uno?.base as ShadcnPresetOptions['base']) ?? 'zinc',
    primary: (config?.uno?.primary as ShadcnPresetOptions['primary']) ?? 'indigo',
    feedback: (config?.uno?.feedback as ShadcnPresetOptions['feedback']) ?? 'classic',
    radius: (config?.uno?.radius as ShadcnPresetOptions['radius']) ?? 'md',
    size: (config?.uno?.size as ShadcnPresetOptions['size']) ?? 'md'
  };

  // Fonts
  if (config?.font?.sans) {
    const sansName = WEB_FONT_NAMES[config.font.sans] ?? config.font.sans;
    const fonts: ShadcnPresetOptions['fonts'] = { sans: sansName };
    if (config.font.heading && config.font.heading !== 'inherit') {
      fonts.heading = WEB_FONT_NAMES[config.font.heading] ?? config.font.heading;
    }
    shadcnOptions.fonts = fonts;
  }

  // Merge user overrides (take precedence)
  if (options?.overrides) {
    Object.assign(shadcnOptions, options.overrides);
  }

  return presetShadcn(shadcnOptions);
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

function resolveWind3Dark(darkSelector: string | undefined | null) {
  if (!darkSelector || darkSelector === 'class') {
    return 'class' as const;
  }

  if (darkSelector === 'media') {
    return 'media' as const;
  }

  // Custom dark selector — e.g. ".dark", "[data-theme=dark]"
  return { dark: [darkSelector] };
}
