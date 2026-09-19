import {
  DEFAULT_OPTIONS,
  PALETTE_KEYS,
  PALETTE_LEVELS,
  SEMANTIC_TOKENS,
  ROLE_RAMP_ROLES,
  emitThemeCss,
  generatePaletteCss,
  resolveThemeMap
} from '@vean/theme';
import type { ColorFormat, EmitThemeOptions, RoleRampRole, ThemeOptions, SemanticToken } from '@vean/theme';

/**
 * The token adapter (docs/theme.md §8).
 *
 * Two rules that the emitted utilities depend on:
 *
 * 1. **colors are `hsl(var(--vean-x) / <alpha-value>)`** — a bare `var()` makes
 *    UnoCSS drop the opacity modifier silently, so the function wrapper (and the
 *    `<alpha-value>` slot) is mandatory;
 * 2. **the palette layer + the default alias block ship in the preflight**, so
 *    `--zinc-100` / `--vean-background` resolve with no runtime JS. A themed
 *    (non-default) configuration is injected later on top of them.
 */

/** the CSS-variable name prefix of a token (`vean` → `--vean-x`, `false` → `--x`). */
const varPrefixOf = (prefix: string | false | undefined): string =>
  prefix === false ? '' : `${prefix ?? DEFAULT_OPTIONS.prefix}-`;

/** the CSS variable reference of a semantic token. */
const tokenRef = (token: SemanticToken, prefix: string | false | undefined): string =>
  `--${varPrefixOf(prefix)}${token}`;

/**
 * the color reference UnoCSS needs: function + channel var + alpha slot.
 */
const colorRef = (varName: string, format: ColorFormat): string => `${format}(var(${varName}) / <alpha-value>)`;

/** a static CSS color reference (no UnoCSS alpha slot; alpha defaults to 1). */
export const cssColorRef = (varName: string, format: ColorFormat): string => `${format}(var(${varName}))`;

/** a static CSS color reference with an explicit alpha expression (border family). */
export const cssAlphaColorRef = (varName: string, alpha: string, format: ColorFormat): string =>
  `${format}(var(${varName}) / ${alpha})`;

/**
 * `theme.colors` entries for the semantic tokens (51) — the utility name is the
 * token name itself, so `bg-surface`, `text-muted-foreground`, `border-input`
 * and `bg-chart-1` all map 1:1 onto the token contract.
 */
export function buildSemanticColors(
  format: ColorFormat = 'hsl',
  prefix: string | false = DEFAULT_OPTIONS.prefix
): Record<string, string> {
  return Object.fromEntries(SEMANTIC_TOKENS.map(token => [token, colorRef(tokenRef(token, prefix), format)]));
}

/**
 * `theme.colors` entries for the 26 built-in palettes (all 11 levels each), so
 * `bg-indigo-500/30` reads the injected palette layer and a palette swap in the
 * theme follows automatically. The palette layer is unprefixed by design.
 */
export function buildPaletteColors(format: ColorFormat = 'hsl'): Record<string, Record<string, string>> {
  return Object.fromEntries(
    PALETTE_KEYS.map(palette => [
      palette,
      Object.fromEntries(PALETTE_LEVELS.map(level => [level, colorRef(`--${palette}-${level}`, format)]))
    ])
  );
}

/** the full color map (semantic + palette). */
export function buildThemeColors(
  format: ColorFormat = 'hsl',
  prefix: string | false = DEFAULT_OPTIONS.prefix
): Record<string, unknown> {
  return {
    ...buildSemanticColors(format, prefix),
    ...buildPaletteColors(format),
    ...buildRoleRampColors(format, prefix)
  };
}

/**
 * `theme.colors` entries for the five role ramps (primary / destructive /
 * success / warning / info × 50–950): each utility reads the role's runtime
 * ramp variable (`--vean-primary-500`), which the engine aliases to the palette
 * that currently backs the role — so `bg-primary-500` follows a primary swap
 * and `bg-destructive-*` follows the feedback scheme, in both modes.
 */
export function buildRoleRampColors(
  format: ColorFormat = 'hsl',
  prefix: string | false = DEFAULT_OPTIONS.prefix
): Record<string, string> {
  return Object.fromEntries(
    ROLE_RAMP_ROLES.flatMap((role: RoleRampRole) =>
      PALETTE_LEVELS.map(level => [`${role}-${level}`, colorRef(`--${varPrefixOf(prefix)}${role}-${level}`, format)])
    )
  );
}

/**
 * the preflight CSS that makes the tokens resolvable without runtime JS:
 * the static palette layer (Layer 1) plus the default theme's alias block
 * (Layer 2).
 */
export function buildThemePreflight(options: ThemeOptions): string {
  const format = options.format ?? DEFAULT_OPTIONS.format;
  const emit: EmitThemeOptions = {
    prefix: options.prefix ?? DEFAULT_OPTIONS.prefix,
    styleTarget: options.styleTarget,
    darkSelector: options.darkSelector,
    format,
    weakSelectors: true
  };

  const aliases = emitThemeCss(resolveThemeMap(options), emit);

  // 静态默认层用 `:where()` 降权到零特异性：运行时/首帧快照用普通选择器即可胜出，
  // 不必依赖源码顺序（head 内联脚本无法排在样式表之后），也不需要 `!important`
  return `${generatePaletteCss({ format, styleTarget: options.styleTarget, weakSelectors: true })}\n\n${aliases}\n`;
}

/**
 * The remaining `theme` keys that the token contract owns (docs/theme.md §8.1).
 *
 * Only the **visually neutral** subset is mapped here: their defaults equal the
 * values UnoCSS already produced, so re-pointing them at `--vean-*` makes the
 * dimension/motion/layering tokens themable without changing a single pixel. Two
 * families are deliberately left out, because they *do* change rendering and
 * should land with the VRT refresh:
 *
 * - `boxShadow` (the token shadows are composed from `--vean-shadow-color`,
 *   whose alpha differs from UnoCSS's per-step values);
 * - `spacing` (the contract only adds semantic rungs; numeric spacing stays
 *   UnoCSS-native).
 */
export function buildThemeEntries(prefix: string | false = DEFAULT_OPTIONS.prefix): {
  borderRadius: Record<string, string>;
  fontSize: Record<string, string | [string, string]>;
  fontFamily: { sans: string; heading: string; mono: string };
  zIndex: Record<string, string>;
  duration: Record<string, string>;
  easing: Record<string, string>;
  lineWidth: Record<string, string>;
  ringWidth: Record<string, string>;
} {
  const literal = (name: string): string => `var(--${varPrefixOf(prefix)}${name})`;
  const radius = (step: string): string => literal(`radius-${step}`);

  return {
    borderRadius: {
      '2xl': radius('2xl'),
      xl: radius('xl'),
      lg: radius('lg'),
      md: radius('md'),
      sm: radius('sm')
    },
    fontSize: {
      '4xs': [literal('text-4xs'), literal('leading-4xs')],
      '3xs': [literal('text-3xs'), literal('leading-3xs')],
      '2xs': [literal('text-2xs'), literal('leading-2xs')],
      xs: [literal('text-xs'), literal('leading-xs')],
      sm: [literal('text-sm'), literal('leading-sm')],
      base: [literal('text-base'), literal('leading-base')],
      lg: [literal('text-lg'), literal('leading-lg')],
      xl: [literal('text-xl'), literal('leading-xl')],
      '2xl': [literal('text-2xl'), literal('leading-2xl')],
      root: literal('size')
    },
    fontFamily: {
      sans: literal('font-sans'),
      heading: literal('font-heading'),
      mono: literal('font-mono')
    },
    zIndex: {
      layout: literal('z-layout'),
      base: literal('z-base'),
      toast: literal('z-toast'),
      max: literal('z-max')
    },
    duration: {
      fast: literal('duration-fast'),
      base: literal('duration-base'),
      slow: literal('duration-slow')
    },
    easing: {
      out: literal('ease-out'),
      'in-out': literal('ease-in-out'),
      spring: literal('ease-spring')
    },
    lineWidth: {
      DEFAULT: literal('border-width'),
      strong: literal('border-width-strong')
    },
    ringWidth: {
      DEFAULT: literal('ring-width')
    }
  };
}
