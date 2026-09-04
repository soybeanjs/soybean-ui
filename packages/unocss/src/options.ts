import type { BaseTokens, ThemeOptions } from '@soybeanjs/theme';

/**
 * Options for {@link presetUiUnocss}.
 *
 * Extends the theme options (`base`/`primary`/`lightLevel`/`darkLevel`/etc.)
 * with the base tokens (`size`/`radius`) so a single
 * options object can fully drive the generated theme. Base tokens are top-level
 * `ThemeOptions` fields that `createTheme` reads directly.
 */
export interface UiUnocssOptions extends ThemeOptions, BaseTokens {
  /**
   * Whether to include the reset CSS preflight (box-sizing, border-width, etc.).
   *
   * @default false
   */
  resetCSS?: boolean;
  /**
   * Whether to include the global CSS preflight (border color, background, etc.).
   *
   * @default false
   */
  globalCSS?: boolean;
  /**
   * Whether to include the UI CSS preflight (buttons, inputs, etc.).
   *
   * @default false
   */
  uiCSS?: boolean;
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
