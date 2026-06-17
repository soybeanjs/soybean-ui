import type {
  TailwindPaletteKey,
  TailwindNeutralPaletteKey,
  TailwindPaletteLevelColorKey,
  SimplePaletteKey
} from '@soybeanjs/colord/palette';

export type HSLColor = `hsl(${number} ${number}% ${number}%)` | `hsl(${number} ${number}% ${number}% / ${number})`;

export type OKLCHColor = `oklch(${number}% ${number} ${number})` | `oklch(${number}% ${number} ${number} / ${number})`;

export type ColorValue = HSLColor | OKLCHColor | SimplePaletteKey | TailwindPaletteLevelColorKey;

export interface ShadcnColors {
  background?: ColorValue;
  foreground?: ColorValue;
  card?: ColorValue;
  cardForeground?: ColorValue;
  popover?: ColorValue;
  popoverForeground?: ColorValue;
  primary?: ColorValue;
  primaryForeground?: ColorValue;
  secondary?: ColorValue;
  secondaryForeground?: ColorValue;
  muted?: ColorValue;
  mutedForeground?: ColorValue;
  accent?: ColorValue;
  accentForeground?: ColorValue;
  destructive?: ColorValue;
  destructiveForeground?: ColorValue;
  border?: ColorValue;
  input?: ColorValue;
  ring?: ColorValue;
}

/**
 * sidebar colors
 */
export interface SidebarColors {
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
}

/**
 * chart colors
 */
export interface ChartColors {
  chart1?: ColorValue;
  chart2?: ColorValue;
  chart3?: ColorValue;
  chart4?: ColorValue;
  chart5?: ColorValue;
}

export interface ExtendedColors {
  success?: ColorValue;
  successForeground?: ColorValue;
  warning?: ColorValue;
  warningForeground?: ColorValue;
  info?: ColorValue;
  infoForeground?: ColorValue;
  carbon?: ColorValue;
  carbonForeground?: ColorValue;
}

export interface ThemeColors extends ShadcnColors, ExtendedColors, SidebarColors, ChartColors {}

export type ThemeColorKey = keyof ThemeColors;
export type ThemeColorWithAlphaKey = keyof Pick<ThemeColors, 'border' | 'input' | 'sidebarBorder'>;

/**
 * the built-in base color preset key
 */
export type BuiltinBasePresetKey = TailwindNeutralPaletteKey;

/**
 * the built-in primary color preset key
 */
export type BuiltinPrimaryPresetKey = TailwindPaletteKey;

/**
 * the built-in feedback color preset key
 */
export type BuiltinFeedbackPresetKey =
  | 'classic'
  | 'vivid'
  | 'subtle'
  | 'warm'
  | 'cool'
  | 'nature'
  | 'modern'
  | 'vibrant'
  | 'professional'
  | 'soft'
  | 'bold'
  | 'calm'
  | 'candy'
  | 'deep'
  | 'light';

/**
 * the built-in sidebar preset key
 */
export type BuiltinSidebarPresetKey = 'extended';

export type BasePresetColorKey = Extract<
  ThemeColorKey,
  | 'background'
  | 'foreground'
  | 'card'
  | 'cardForeground'
  | 'popover'
  | 'popoverForeground'
  | 'primaryForeground'
  | 'secondary'
  | 'secondaryForeground'
  | 'muted'
  | 'mutedForeground'
  | 'accent'
  | 'accentForeground'
  | 'border'
  | 'input'
  | 'destructiveForeground'
  | 'successForeground'
  | 'warningForeground'
  | 'infoForeground'
  | 'carbon'
  | 'carbonForeground'
>;

export type PrimaryPresetColorKey = Extract<ThemeColorKey, 'primary' | 'ring'> | keyof ChartColors;

export type FeedbackPresetColorKey = Extract<ThemeColorKey, 'destructive' | 'success' | 'warning' | 'info'>;

export type SidebarPresetColorKey = keyof SidebarColors;

export type SidebarExtendedColorKey = Extract<
  ThemeColorKey,
  | 'background'
  | 'foreground'
  | 'card'
  | 'primary'
  | 'primaryForeground'
  | 'accent'
  | 'accentForeground'
  | 'border'
  | 'ring'
>;

export type Preset<K extends string> = {
  light: {
    [key in K]: ColorValue;
  };
  dark: {
    [key in K]: ColorValue;
  };
};

export type BasePreset = Preset<BasePresetColorKey>;
export type PrimaryPreset = Preset<PrimaryPresetColorKey>;
export type FeedbackPreset = Preset<FeedbackPresetColorKey>;
export type SidebarPreset = Preset<SidebarPresetColorKey>;
export type SidebarExtendedPreset = Preset<SidebarExtendedColorKey>;
export type ThemeColorPreset = Preset<ThemeColorKey>;
export type CustomThemeColorPreset = {
  light: Partial<ThemeColors>;
  dark?: Partial<ThemeColors>;
};

export type StyleTarget = 'html' | ':root';

export type DarkSelector = 'class' | 'media';

export type ColorFormat = 'hsl' | 'oklch';

/**
 * CSS generation scope
 *
 * - 'all': generate CSS for all built-in preset variants with [data-*] selectors for runtime switching
 * - 'current': only generate CSS for the currently passed parameters (no variant selectors, smaller output)
 */
export type ThemeScope = 'all' | 'current';

export interface CustomPreset {
  base: BasePreset;
  primary: PrimaryPreset;
  feedback: FeedbackPreset;
  sidebar: SidebarPreset;
}

/**
 * the preset config
 */
export interface PresetKeyConfig {
  /**
   * the base color key
   *
   * @default 'zinc'
   */
  base?: BuiltinBasePresetKey;
  /**
   * the primary color key
   *
   * @default 'indigo'
   */
  primary?: BuiltinPrimaryPresetKey;
  /**
   * the feedback color key
   *
   * @default 'classic'
   */
  feedback?: BuiltinFeedbackPresetKey;
}

export interface PresetConfig extends PresetKeyConfig {
  /**
   * custom preset colors that override built-in preset values.
   * When provided, matching keys are replaced in the final theme.
   */
  preset?: CustomThemeColorPreset;
}

export type ThemeColor = Extract<
  ThemeColorKey,
  'primary' | 'secondary' | 'accent' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon'
>;

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

export interface ThemeRadiusConfig {
  /**
   * the border radius
   *
   * @default 'md'
   */
  radius?: ThemeRadius | (string & {});
}

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

export interface ThemeSizeConfig {
  /**
   * the component size / density
   *
   * Controls the root font-size (`<html>`), scaling all rem-based sizes.
   *
   * @default 'md'
   */
  size?: ThemeSize | (string & {});
}

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
export type MenuAccent = 'default' | 'bold';

export interface ThemeMenuConfig {
  /**
   * the menu color style
   *
   * - default: normal popover background
   * - inverted: dark card background
   * - default-translucent: popover with backdrop blur
   * - inverted-translucent: dark card with backdrop blur
   *
   * @default 'default'
   */
  menuColor?: MenuColor;
  /**
   * the menu accent style
   *
   * - default: muted foreground highlight
   * - bold: primary color highlight
   *
   * @default 'default'
   */
  menuAccent?: MenuAccent;
}

/**
 * theme options
 */
export interface ThemeOptions extends ThemeSizeConfig, ThemeRadiusConfig, ThemeMenuConfig, PresetConfig {
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
  darkSelector?: DarkSelector | (string & {});
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

export interface RequiredThemeOptions extends Required<Omit<ThemeOptions, 'preset'>>, Pick<ThemeOptions, 'preset'> {}

export interface BaseThemeOptions extends Omit<
  ThemeOptions,
  'scope' | 'styleTarget' | 'darkSelector' | 'format' | 'preset'
> {}
