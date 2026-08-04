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
export type SidebarPreset = Preset<SidebarPresetColorKey>;
export type SidebarExtendedPreset = Preset<SidebarExtendedColorKey>;
export type ThemeColorPreset = Preset<ThemeColorKey>;
export type CustomThemeColorPreset = {
  light: Partial<ThemeColors>;
  dark?: Partial<ThemeColors>;
};

/**
 * a reference to a stored custom theme preset by name
 *
 * the preset definition is resolved from the persisted presets table
 * (localStorage on the client, or an injected provider on the server)
 * when `persistTheme` is enabled on the ConfigProvider.
 */
export type ThemePresetRef = { presetName: string };

/**
 * theme preset input: either an inline custom preset or a reference to a stored one
 */
export type ThemePresetInput = CustomThemeColorPreset | ThemePresetRef;

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

export type StyleTarget = 'html' | ':root';

export type DarkSelector = 'class' | 'media';

export type ColorFormat = 'hsl' | 'oklch';

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
}

export interface PresetConfig extends PresetKeyConfig {
  /**
   * custom preset colors that override built-in preset values.
   * When provided, matching keys are replaced in the final theme.
   *
   * Accepts either an inline `CustomThemeColorPreset` or a `{ presetName }`
   * reference resolved from the persisted presets table (see
   * `getStoredThemePresets`). A reference is only resolved when
   * `persistTheme` is enabled on the ConfigProvider.
   */
  preset?: ThemePresetInput;
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
export type MenuAccent = 'subtle' | 'bold';

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
   * - subtle: muted foreground highlight
   * - bold: primary color highlight
   *
   * @default 'subtle'
   */
  menuAccent?: MenuAccent;
}

/**
 * light mode darkening offset
 *
 * - 0: unchanged
 * - 1: surfaces white → {p}.50
 * - 2: surfaces {p}.50 → {p}.100
 */
export type LightLevelOffset = 0 | 1 | 2;

/**
 * dark mode brightening offset
 *
 * - 0: unchanged
 * - 1: background {p}.950 → {p}.900
 * - 2: background {p}.900 → {p}.800
 * - 3: background {p}.800 → {p}.700
 */
export type DarkLevelOffset = 0 | 1 | 2 | 3;

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
}

export interface RequiredThemeOptions extends Required<Omit<ThemeOptions, 'preset'>>, Pick<ThemeOptions, 'preset'> {}

export interface BaseThemeOptions extends Omit<ThemeOptions, 'styleTarget' | 'darkSelector' | 'format' | 'preset'> {}

/**
 * the persistable theme config state
 *
 * a subset of `ThemeOptions` that can be safely stored in localStorage /
 * cookies, plus the `mode` preference used to toggle the dark mode class
 * before first paint. Custom `preset` colors are intentionally not persisted.
 */
export interface ThemeConfigState extends ThemeSizeConfig, ThemeRadiusConfig, ThemeMenuConfig, PresetKeyConfig {
  /**
   * the color scheme preference
   *
   * applied as a class on `<html>` (default `'dark'`)
   */
  mode?: 'light' | 'dark';
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
}

/**
 * options for `setThemeCookie`
 */
export interface ThemeCookieOptions {
  /**
   * the cookie name
   *
   * @defaultValue 'soybean-ui-theme'
   */
  key?: string;
  /**
   * the cookie lifetime in seconds
   *
   * @defaultValue 365 days
   */
  maxAge?: number;
  /**
   * the cookie path
   *
   * @defaultValue '/'
   */
  path?: string;
}

/**
 * options for `createThemeInitScript`
 */
export interface ThemeInitScriptOptions {
  /**
   * the localStorage key to read
   *
   * @defaultValue 'soybean-ui-theme'
   */
  storageKey?: string;
  /**
   * the cookie key to sync the config into
   *
   * @defaultValue 'soybean-ui-theme'
   */
  cookieKey?: string;
  /**
   * the dark mode class toggled on `<html>`
   *
   * @defaultValue 'dark'
   */
  darkClass?: string;
  /**
   * whether to set the `data-theme="<base>-<primary>"` attribute on `<html>`
   *
   * @defaultValue true
   */
  setDataTheme?: boolean;
  /**
   * whether to mirror the stored config into a cookie so the next SSR request
   * can render the same theme
   *
   * @defaultValue true
   */
  syncCookie?: boolean;
}

/**
 * options for `createThemeStore`
 */
export interface ThemeStoreOptions {
  /**
   * the localStorage key of the persisted theme config
   *
   * @defaultValue THEME_STORAGE_KEY ('soybean-ui-theme')
   */
  storageKey?: string;
  /**
   * the cookie name carrying the theme config for SSR resolution
   *
   * @defaultValue THEME_COOKIE_KEY ('soybean-ui-theme')
   */
  cookieKey?: string;
  /**
   * the localStorage key of the custom presets table
   *
   * @defaultValue THEME_PRESETS_STORAGE_KEY ('soybean-ui-theme-presets')
   */
  presetsKey?: string;
  /**
   * the cookie name carrying the currently applied custom preset name
   *
   * @defaultValue 'soybean-ui-applied-preset'
   */
  appliedPresetCookieKey?: string;
  /**
   * the explicit runtime environment.
   *
   * The theme library is pre-built, so `import.meta.env.SSR` is baked at build
   * time and cannot detect the consumer's runtime. Pass the app's own flag
   * (e.g. Nuxt's `import.meta.server`) to drive the SSR-specific storage paths.
   *
   * @defaultValue isServerRuntime() — runtime detection of `window`/`document`
   */
  isServer?: boolean;
  /**
   * the raw cookie header for SSR resolution, e.g. Nuxt's
   * `useRequestHeaders(['cookie']).cookie`. Only used when `isServer` is true.
   */
  cookieHeader?: string | null;
  /**
   * the server-side custom preset registry resolver: maps a preset name to its
   * definition so SSR can render custom presets without localStorage access.
   * Only used when `isServer` is true.
   */
  presetProvider?: (name: string) => CustomThemeColorPreset | undefined;
}

/**
 * a cohesive, environment-aware theme storage facade.
 *
 * Bundles the persisted theme config, the custom presets table, and the
 * currently applied custom preset into one object. All reads and writes are
 * routed to the correct transport based on the runtime environment:
 *
 * - server: reads come from the injected `cookieHeader`; writes are no-ops;
 * - client: reads/writes go to localStorage and `document.cookie`.
 *
 * The cookie is the cross-environment sync channel, so the config and the
 * applied preset name are resolvable on the server and stay consistent with
 * the client's localStorage.
 */
export interface ThemeStore {
  /**
   * whether this store is running in the server environment
   */
  readonly isServer: boolean;
  /**
   * read the persisted theme config from the appropriate source
   * (cookie on the server, localStorage on the client).
   */
  readConfig(): ThemeConfigState | null;
  /**
   * persist the theme config to localStorage and mirror it into a cookie so the
   * next SSR request renders the same theme. Client-only; no-op on the server.
   */
  commitConfig(config: ThemeConfigState): void;
  /**
   * resolve a named custom preset to its definition
   * (server via `presetProvider`, client via the presets table).
   */
  resolvePreset(name: string): CustomThemeColorPreset | undefined;
  /**
   * persist a custom preset into the presets table. Client-only; returns
   * `false` on the server.
   */
  savePreset(preset: StoredThemePreset): boolean;
  /**
   * remove a custom preset from the presets table. Client-only; returns
   * `false` on the server.
   */
  removePreset(name: string): boolean;
  /**
   * read the currently applied custom preset name (from the cookie on both
   * environments) so SSR can render the applied preset on first paint.
   */
  readAppliedPreset(): string | null;
  /**
   * apply a custom preset by name and persist its reference to the cookie.
   * Client-only; no-op on the server.
   */
  applyPreset(name: string): void;
  /**
   * clear the applied custom preset reference. Client-only; no-op on the server.
   */
  resetPreset(): void;
}
