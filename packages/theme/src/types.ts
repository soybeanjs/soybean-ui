import type {
  PaletteColorLevel,
  TailwindNeutralPaletteKey,
  TailwindPaletteKey,
  TailwindPaletteLevelColorKey,
  SimplePaletteKey
} from '@soybeanjs/colord/palette';

/**
 * base color palette key
 *
 * a neutral-family palette key (e.g. `slate`/`zinc`/`neutral`), extended with
 * arbitrary strings supplied through the runtime registry. Built-in keys keep
 * literal autocomplete; custom keys are validated against the registry at
 * runtime.
 */
export type BaseColorKey = TailwindNeutralPaletteKey | (string & {});

/**
 * primary color palette key
 *
 * any palette key (neutral or chromatic, e.g. `indigo`/`blue`), extended with
 * arbitrary strings supplied through the runtime registry. Built-in keys keep
 * literal autocomplete; custom keys are validated against the registry at
 * runtime.
 */
export type PrimaryColorKey = TailwindPaletteKey | (string & {});

/**
 * HSL color
 *
 * @example
 * - hsl(240 50% 30% 50%)
 * - hsl(240 50% 30% / 0.5)
 */
export type HSLColor = `hsl(${number} ${number}% ${number}%)` | `hsl(${number} ${number}% ${number}% / ${number})`;

/**
 * OKLCH color
 *
 * @example
 * - oklch(50% 50 50)
 * - oklch(50% 50 50 / 0.5)
 */
export type OKLCHColor = `oklch(${number}% ${number} ${number})` | `oklch(${number}% ${number} ${number} / ${number})`;

/**
 * Color value
 *
 * - HSL color: hsl(240 50% 30% 50%)
 * - OKLCH color: oklch(50% 50 50)
 * - Simple palette key: 'white
 * - Tailwind palette level color key: 'blue.200
 */
export type ColorValue = HSLColor | OKLCHColor | SimplePaletteKey | TailwindPaletteLevelColorKey;

/**
 * shadcn colors
 */
export interface ColorTokens {
  /**
   * background color
   */
  background?: ColorValue;
  /**
   * foreground color
   */
  foreground?: ColorValue;
  /**
   * card color
   */
  card?: ColorValue;
  /**
   * card foreground color
   */
  cardForeground?: ColorValue;
  /**
   * popover color
   */
  popover?: ColorValue;
  /**
   * popover foreground color
   */
  popoverForeground?: ColorValue;
  /**
   * primary color
   */
  primary?: ColorValue;
  /**
   * primary foreground color
   */
  primaryForeground?: ColorValue;
  /**
   * secondary color
   */
  secondary?: ColorValue;
  /**
   * secondary foreground color
   */
  secondaryForeground?: ColorValue;
  /**
   * muted color
   */
  muted?: ColorValue;
  /**
   * muted foreground color
   */
  mutedForeground?: ColorValue;
  /**
   * accent color
   */
  accent?: ColorValue;
  /**
   * accent foreground color
   */
  accentForeground?: ColorValue;
  /**
   * destructive color
   */
  destructive?: ColorValue;
  /**
   * destructive foreground color
   */
  destructiveForeground?: ColorValue;
  /**
   * border color
   */
  border?: ColorValue;
  /**
   * input color
   */
  input?: ColorValue;
  /**
   * ring color
   */
  ring?: ColorValue;
  /**
   * the sidebar background color
   *
   * if not set, will use the theme background color
   */
  sidebar?: ColorValue;
  /**
   * the sidebar foreground color
   *
   * if not set, will use the theme foreground color
   */
  sidebarForeground?: ColorValue;
  /**
   * the sidebar primary color
   *
   * if not set, will use the theme primary color
   */
  sidebarPrimary?: ColorValue;
  /**
   * the sidebar primary foreground color
   *
   * if not set, will use the theme primary foreground color
   */
  sidebarPrimaryForeground?: ColorValue;
  /**
   * the sidebar accent color
   *
   * if not set, will use the theme accent color
   */
  sidebarAccent?: ColorValue;
  /**
   * the sidebar accent foreground color
   *
   * if not set, will use the theme accent foreground color
   */
  sidebarAccentForeground?: ColorValue;
  /**
   * the sidebar border color
   *
   * if not set, will use the theme border color
   */
  sidebarBorder?: ColorValue;
  /**
   * the sidebar ring color
   *
   * if not set, will use the theme ring color
   */
  sidebarRing?: ColorValue;
  /**
   * the chart1 color
   */
  chart1?: ColorValue;
  /**
   * the chart2 color
   */
  chart2?: ColorValue;
  /**
   * the chart3 color
   */
  chart3?: ColorValue;
  /**
   * the chart4 color
   */
  chart4?: ColorValue;
  /**
   * the chart5 color
   */
  chart5?: ColorValue;
  /**
   * success color
   */
  success?: ColorValue;
  /**
   * success foreground color
   */
  successForeground?: ColorValue;
  /**
   * warning color
   */
  warning?: ColorValue;
  /**
   * warning foreground color
   */
  warningForeground?: ColorValue;
  /**
   * info color
   */
  info?: ColorValue;
  /**
   * info foreground color
   */
  infoForeground?: ColorValue;
  /**
   * carbon color
   */
  carbon?: ColorValue;
  /**
   * carbon foreground color
   */
  carbonForeground?: ColorValue;
}

/**
 * Color key
 */
export type ColorKey = keyof ColorTokens;

/**
 * Theme color
 */
export type ThemeColor = Extract<
  ColorKey,
  'primary' | 'secondary' | 'accent' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon'
>;

/**
 * the theme size key
 *
 * Controls the root font-size, scaling all rem-based values proportionally.
 *
 * - xs: 12px
 * - sm: 14px
 * - md: 16px
 * - lg: 18px
 * - xl: 20px
 * - 2xl: 24px
 */
export type ThemeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * the theme size value
 */
export type ThemeSizeValue = ThemeSize | `${number}px` | `${number}rem`;

/**
 * the theme radius
 *
 * - 2xs: 0.25rem
 * - xs: 0.375rem
 * - sm: 0.5rem
 * - md: 0.625rem
 * - lg: 0.75rem
 * - xl: 0.875rem
 * - 2xl: 1rem
 */
export type ThemeRadius = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * the theme radius value
 */
export type ThemeRadiusValue = ThemeRadius | `${number}px` | `${number}rem`;

/**
 * the menu color preset key
 *
 * Controls menu background style (default, inverted, or translucent variants).
 */
export type MenuColor = 'default' | 'inverted' | 'default-translucent' | 'inverted-translucent';

/**
 * the menu accent preset key
 *
 * Controls menu item highlight style.
 */
export type MenuAccent = 'subtle' | 'bold';

/**
 * light mode surface darkening offset
 *
 * - 0: unchanged
 * - 1: surfaces {p}.white → {p}.50, {p}.50 → {p}.100
 * - 2: surfaces {p}.50 → {p}.100, {p}.100 → {p}.200
 *
 * Only shiftable surface tokens are affected; text/foreground/border values
 * never shift (D8).
 */
export type LightLevelOffset = 0 | 1 | 2;

/**
 * dark mode surface brightening offset
 *
 * - 0: unchanged
 * - 1: background {p}.950 → {p}.900
 * - 2: background {p}.900 → {p}.800
 * - 3: background {p}.800 → {p}.700
 *
 * Only shiftable surface tokens are affected; text/foreground/border values
 * never shift (D8).
 */
export type DarkLevelOffset = 0 | 1 | 2 | 3;

/**
 * Base tokens
 */
export interface BaseTokens {
  /**
   * the component size / density
   *
   * @default 'md'
   */
  size?: ThemeSizeValue;
  /**
   * the border radius
   *
   * @default 'md'
   */
  radius?: ThemeRadiusValue;
  /**
   * the menu color preset key
   *
   * @default 'default'
   */
  menuColor?: MenuColor;
  /**
   * the menu accent preset key
   *
   * @default 'subtle'
   */
  menuAccent?: MenuAccent;
}

/**
 * The effective (resolved) color scheme. Always `'light'` or `'dark'` — this is
 * what drives CSS/token selection and the `.dark` class toggle.
 */
export type ThemeMode = 'light' | 'dark';

/**
 * The user's color scheme preference. Extends `ThemeMode` with `'auto'`, which
 * resolves to the OS `prefers-color-scheme` at runtime (see
 * `ThemeContext.effectiveMode` in the UI layer).
 */
export type ThemeModePreference = ThemeMode | 'auto';

/**
 * Theme tokens
 */
export interface ThemeTokens extends BaseTokens, ColorTokens {}

/**
 * Theme preset
 */
export interface ThemePreset extends BaseTokens {
  /**
   * the theme name
   */
  name?: string;
  /**
   * the light mode tokens
   */
  light: Partial<ColorTokens>;
  /**
   * the dark mode tokens
   */
  dark?: Partial<ColorTokens>;
}

/**
 * Full theme preset
 */
export interface FullThemePreset extends Required<BaseTokens> {
  /**
   * the theme name
   */
  name: string;
  /**
   * the light mode tokens
   */
  light: ColorTokens;
  /**
   * the dark mode tokens
   */
  dark: Partial<ColorTokens>;
}

/**
 * Style target
 */
export type StyleTarget = 'html' | ':root';

/**
 * Dark selector
 */
export type DarkSelector = 'class' | 'media';

/**
 * Dark selector value
 */
export type DarkSelectorValue = DarkSelector | (string & {});

/**
 * Color format
 */
export type ColorFormat = 'hsl' | 'oklch';

/**
 * Base generate CSS options
 */
export interface BaseGenerateCSSOptions {
  /**
   * the style target
   *
   * @default ':root'
   */
  styleTarget?: StyleTarget;
  /**
   * dark mode selector
   *
   * - class: ".dark"
   * - media: "@media (prefers-color-scheme: dark)"
   * - custom: custom dark mode selector, e.g. ".custom-dark"
   *
   * @default 'class'
   */
  darkSelector?: DarkSelectorValue;
  /**
   * color output format
   *
   * - hsl: "h s l [/ alpha]", e.g. "0 0% 100% / 0.1"
   * - oklch: "oklch(l c h [/ alpha])", e.g. "oklch(0 0 0 / 0.1)"
   *
   * @default 'hsl'
   */
  format?: ColorFormat;
}

/**
 * Generate CSS options
 */
export interface GenerateCSSOptions extends BaseGenerateCSSOptions {
  /**
   * theme preset
   */
  preset: FullThemePreset;
}

/**
 * Theme options
 */
export interface ThemeOptions extends BaseGenerateCSSOptions {
  /**
   * the base color palette key
   *
   * @default 'zinc'
   */
  base?: BaseColorKey;
  /**
   * the primary color palette key
   *
   * @default 'indigo'
   */
  primary?: PrimaryColorKey;
  /**
   * the feedback (status) semantic scheme key
   *
   * @default 'classic'
   */
  feedback?: FeedbackSchemeKey;
  /**
   * the chart (data) semantic scheme key
   *
   * @default 'vivid'
   */
  chart?: ChartSchemeKey;
  /**
   * the sidebar skin semantic scheme key
   *
   * @default 'derived'
   */
  sidebar?: SidebarSchemeKey;
  /**
   * whether to apply a separate sidebar skin from the `sidebar` scheme.
   *
   * When `false`, the sidebar tokens are not derived and fall back to the base
   * `background`/`foreground`/`border` tokens (no dedicated sidebar skin).
   *
   * @default true
   */
  sidebarDerive?: boolean;
  /**
   * inline color token overrides applied on top of the derived tokens
   */
  overrides?: ThemeOverrides;
  /**
   * the component size / density
   *
   * @default 'md'
   */
  size?: ThemeSizeValue;
  /**
   * the border radius
   *
   * @default 'md'
   */
  radius?: ThemeRadiusValue;
  /**
   * the menu color preset key
   *
   * @default 'default'
   */
  menuColor?: MenuColor;
  /**
   * the menu accent preset key
   *
   * @default 'subtle'
   */
  menuAccent?: MenuAccent;
  /**
   * light mode surface darkening offset
   *
   * @default 0
   */
  lightLevel?: LightLevelOffset;
  /**
   * dark mode surface brightening offset
   *
   * @default 0
   */
  darkLevel?: DarkLevelOffset;
  /**
   * the border (border / input / sidebar-border) opacity multiplier.
   *
   * Scales the alpha channel of the border-family tokens, driving the
   * `--border-alpha` / `--input-alpha` / `--sidebar-border-alpha` variables
   * (effective alpha = token alpha × borderOpacity). Defaults to `1`, so the
   * token's own alpha is preserved.
   *
   * @default 1
   * @range 0 - 1
   */
  borderOpacity?: number;
}

/**
 * feedback semantic scheme key
 *
 * selects a named status-color scheme (destructive / success / warning / info /
 * carbon). Extends the built-in `classic` key with arbitrary strings supplied
 * through the runtime registry.
 */
export type FeedbackSchemeKey = 'classic' | 'vivid' | 'subtle' | 'modern' | 'professional' | (string & {});

/**
 * chart semantic scheme key
 *
 * selects a named data-viz color scheme (chart1–chart5). Extends the built-in
 * `vivid` key with arbitrary strings supplied through the runtime registry.
 */
export type ChartSchemeKey = 'vivid' | 'cool' | 'warm' | 'natural' | 'minimal' | (string & {});

/**
 * sidebar color key
 */
export type SidebarColorKey =
  | 'sidebar'
  | 'sidebarForeground'
  | 'sidebarPrimary'
  | 'sidebarPrimaryForeground'
  | 'sidebarAccent'
  | 'sidebarAccentForeground'
  | 'sidebarBorder'
  | 'sidebarRing';

/**
 * a sidebar scheme value may reference an already-derived token instead of a
 * literal color, letting a scheme reuse the base⊕primary surface/brand tokens.
 */
export type SidebarTokenRef =
  | 'background'
  | 'foreground'
  | 'card'
  | 'primary'
  | 'primaryForeground'
  | 'secondary'
  | 'secondaryForeground'
  | 'muted'
  | 'mutedForeground'
  | 'accent'
  | 'accentForeground'
  | 'border'
  | 'ring';

/**
 * the value slot of a sidebar scheme
 */
export type SidebarColorValue = ColorValue | SidebarTokenRef;

/**
 * sidebar semantic scheme key
 *
 * selects a named sidebar skin scheme. Extends the built-in `derived` key with
 * arbitrary strings supplied through the runtime registry.
 */
export type SidebarSchemeKey = 'derived' | 'inverted-dark' | 'soft' | 'contrast' | (string & {});

/**
 * a semantic color scheme: a named mapping of role keys to colors (light/dark).
 *
 * Used for the `feedback` (status) and `chart` (data) dimensions.
 */
export interface SemanticScheme<V = ColorValue> {
  light: Record<string, V>;
  dark: Record<string, V>;
}

/**
 * a theme palette: a named family metadata + a 10-level ramp of colors.
 *
 * `family` drives which base/primary core template and dark derivation apply;
 * `colors` is normally produced by `generatePalette` from a single seed color.
 */
export interface ThemePalette {
  name: string;
  family: 'neutral' | 'chromatic';
  colors: Record<PaletteColorLevel, { hsl: string; oklch: string }>;
}

/**
 * the runtime theme preset registry.
 *
 * Built-in entries are the defaults; user entries are merged in by
 * `registerThemePresets`.
 */
export interface ThemePresetRegistry {
  base: Record<BaseColorKey, ThemePalette>;
  primary: Record<PrimaryColorKey, ThemePalette>;
  feedback: Record<FeedbackSchemeKey, SemanticScheme>;
  chart: Record<ChartSchemeKey, SemanticScheme>;
  sidebar: Record<SidebarSchemeKey, SemanticScheme<SidebarColorValue>>;
}

/**
 * inline color overrides applied on top of the derived tokens.
 *
 * Unlike a named preset, `overrides` is a lightweight per-token override with
 * no identity and no `name`.
 */
export interface ThemeOverrides {
  light?: Partial<ColorTokens>;
  dark?: Partial<ColorTokens>;
}

export type { PaletteColorLevel };
