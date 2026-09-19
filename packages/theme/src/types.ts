import type { PaletteColorLevel, TailwindPaletteKey } from '@soybeanjs/colord/palette';
import type {
  ActiveToken,
  AlphaToken,
  ChartToken,
  RoleRampRole,
  CoreToken,
  OnSolidToken,
  RegionToken,
  SemanticToken,
  StatusName,
  StatusToken,
  TextPair
} from './semantic';

/**
 * The theme engine v2 type surface (docs/theme.md §9).
 *
 * Three layers, three kinds of values:
 * - **palette** (Layer 1): naked channels, `--zinc-100: 240 4.8% 95.9%`
 * - **semantic** (Layer 2): references to palette levels, `--vean-background: var(--zinc-100)`
 * - **literal**: plain CSS values (radius scale, motion, z-index, typography)
 *
 * Nothing in the semantic layer holds a color literal, which is what makes the
 * palette layer static, the theme switch a reference swap, and `resolveTokenColor`
 * able to return the very same color the CSS resolves to.
 */

/** a built-in palette key of the palette layer (26 keys). */
export type PaletteKey = TailwindPaletteKey;

/** a built-in palette level (`50` … `950`). */
export type PaletteLevel = PaletteColorLevel;

/** a simple palette name shipped beside the ramps. */
export type SimpleColorName = 'white' | 'black';

/** a level rule value: a numeric level or the light extreme (`white`). */
export type LevelOrSimple = PaletteLevel | 'white';

/** which palette a token level is read from. */
export type LevelSource = 'base' | 'primary';

/** the `palette.level` reference form used by rules and overrides, e.g. `zinc.200`. */
export type PaletteLevelRef = `${PaletteKey}.${PaletteLevel}`;

/** the color output format. */
export type ColorFormat = 'hsl' | 'oklch';

/** the resolved color scheme. */
export type ThemeMode = 'light' | 'dark';

/** the style target of the light block. */
export type StyleTarget = 'html' | ':root';

/** how dark mode is expressed in the emitted CSS. */
export type DarkSelectorValue = 'class' | 'media' | (string & {});

/** the color scheme preference including the OS-following `auto`. */
export type ThemeModePreference = ThemeMode | 'auto';

/** the component size / density preset. */
export type ThemeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** a size token value: a preset key or a raw `px` / `rem` length. */
export type ThemeSizeValue = ThemeSize | `${number}px` | `${number}rem`;

/** the border radius preset. */
export type ThemeRadius = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** a radius token value: a preset key or a raw `px` / `rem` length. */
export type ThemeRadiusValue = ThemeRadius | `${number}px` | `${number}rem`;

/** the light-mode surface tint knob (how far the page moves off the extreme). */
export type LightLevelOffset = 0 | 1 | 2;

/** the dark-mode surface lift knob. */
export type DarkLevelOffset = 0 | 1 | 2 | 3;

/**
 * the surface style.
 *
 * - `layered` (default): the page is tinted so raised surfaces can sit above it
 * - `flat`: every surface keeps the mode extreme (the pre-v2 look)
 */
export type SurfaceStyle = 'layered' | 'flat';

/** the contrast contract enforced by the guard. */
export type ContrastPolicy = 'off' | 'aa' | 'aaa';

/** whether complete colors are emitted beside the channels. */
export type SolidVars = 'none' | 'chart' | 'all';

/** the CSS variable prefix; `false` emits bare names. */
export type TokenPrefix = string | false;

/** the feedback (status) scheme key. */
export type FeedbackSchemeKey = string;

/** the chart (data visualisation) scheme key. */
export type ChartSchemeKey = string;

/**
 * a semantic token override value: a palette level reference (`zinc.200`) or a
 * complete color (`oklch(0.6 0.2 250)`).
 *
 * Raw channel triples are rejected on purpose: they are format-ambiguous, so a
 * JS consumer could not tell whether to wrap them in `hsl()` or `oklch()`.
 */
export type TokenOverride = PaletteLevelRef | ({} & string);

/**
 * a color value as a user supplies it: a `palette.level` reference
 * (`indigo.600`), a simple name (`white` / `black`), or a complete CSS color.
 * The same form `TokenOverride` accepts; aliased for pickers and presets.
 */
export type ColorValue = TokenOverride;

/** inline overrides applied on top of the resolved tokens (highest priority). */
export interface ThemeOverrides {
  light?: Partial<Record<SemanticToken, TokenOverride>>;
  dark?: Partial<Record<SemanticToken, TokenOverride>>;
}

/** how a token gets its value. */
export type TokenRule =
  | {
      kind: 'level';
      source: LevelSource;
      light: LevelOrSimple;
      dark: LevelOrSimple;
      /** level override when the primary palette is a neutral family. */
      neutral?: { light: LevelOrSimple; dark: LevelOrSimple };
    }
  | { kind: 'mirror'; light: SemanticToken; dark: SemanticToken }
  | { kind: 'simple'; light: SimpleColorName; dark: SimpleColorName }
  | { kind: 'on-solid'; fill: SemanticToken; prefer: 'light' | 'dark' | 'auto' };

/** the value a semantic token resolves to. */
export type TokenValue =
  | { kind: 'palette'; palette: PaletteKey; level: PaletteLevel }
  | { kind: 'simple'; name: SimpleColorName }
  | { kind: 'color'; value: string };

/** a single guard correction (or a verification failure) for one pair. */
export interface ContrastCorrection {
  mode: ThemeMode;
  /** the pair as `text-on-surface`. */
  pair: string;
  /** the token whose value changed (text token, or the fill for on-solid pairs). */
  token: SemanticToken;
  /** the value before the change (`palette.level` / `white` / a color). */
  before: string;
  /** the value after the change. */
  after: string;
  /** how many palette steps were walked. */
  steps: number;
  /** the resulting contrast ratio. */
  ratio: number;
  /** whether the pair ended above its threshold. */
  passed: boolean;
  /** `true` when the pair comes from an explicit user override (reported, never corrected). */
  overridden?: boolean;
}

/** the guard's report for one resolved theme. */
export interface ContrastReport {
  policy: ContrastPolicy;
  textThreshold: number;
  nonTextThreshold: number;
  corrections: ContrastCorrection[];
}

/** a non-color token name. */
export type LiteralToken =
  | 'size'
  | 'radius'
  | 'radius-2xs'
  | 'radius-xs'
  | 'radius-sm'
  | 'radius-md'
  | 'radius-lg'
  | 'radius-xl'
  | 'radius-2xl'
  | 'control-height-sm'
  | 'control-height'
  | 'control-height-lg'
  | 'space-gutter'
  | 'space-section'
  | 'space-gap'
  | 'space-control-x'
  | 'space-control-y'
  | 'shadow-color'
  | 'shadow-xs'
  | 'shadow-sm'
  | 'shadow-md'
  | 'shadow-lg'
  | 'duration-fast'
  | 'duration-base'
  | 'duration-slow'
  | 'ease-out'
  | 'ease-in-out'
  | 'ease-spring'
  | 'z-layout'
  | 'z-base'
  | 'z-toast'
  | 'z-max'
  | 'border-width'
  | 'border-width-strong'
  | 'ring-width'
  | 'ring-offset-width'
  | 'font-sans'
  | 'font-heading'
  | 'font-mono'
  | 'text-4xs'
  | 'text-3xs'
  | 'text-2xs'
  | 'text-xs'
  | 'text-sm'
  | 'text-base'
  | 'text-lg'
  | 'text-xl'
  | 'text-2xl'
  | 'leading-4xs'
  | 'leading-3xs'
  | 'leading-2xs'
  | 'leading-xs'
  | 'leading-sm'
  | 'leading-base'
  | 'leading-lg'
  | 'leading-xl'
  | 'leading-2xl'
  | 'line-height-normal';

/**
 * the resolved theme: two mode maps, the alpha companions and the literal layer.
 *
 * This is the single intermediate representation: the CSS emitter and the JS
 * resolvers both read it, so they cannot disagree.
 */
export interface ThemeMap {
  light: Record<SemanticToken, TokenValue>;
  dark: Record<SemanticToken, TokenValue>;
  alpha: Record<AlphaToken, { light: number; dark: number }>;
  literal: Record<LiteralToken, string>;
  report: ContrastReport;
}

/** the engine options. */
export interface ThemeOptions {
  /** the neutral palette (9 built-ins). @default 'zinc' */
  base?: PaletteKey;
  /** the brand palette (any of the 26 built-ins). @default 'indigo' */
  primary?: PaletteKey;
  /** the status color scheme. @default 'classic' */
  feedback?: FeedbackSchemeKey;
  /** the data visualisation scheme. @default 'vivid' */
  chart?: ChartSchemeKey;
  /** inline token overrides, applied last. */
  overrides?: ThemeOverrides;
  /** the light-mode surface tint knob. @default 0 */
  lightLevel?: LightLevelOffset;
  /** the dark-mode surface lift knob. @default 0 */
  darkLevel?: DarkLevelOffset;
  /** @default 'layered' */
  surfaceStyle?: SurfaceStyle;
  /** @default 'aa' */
  contrast?: ContrastPolicy;
  /** @default 'none' */
  solidVars?: SolidVars;
  /** @default 'vean' */
  prefix?: TokenPrefix;
  /** the root font-size preset or length (the density zoom). @default 'md' */
  size?: ThemeSizeValue;
  /** the radius seed. @default 'md' */
  radius?: ThemeRadiusValue;
  /** multiplies the decorative border alpha (0 – 1). @default 1 */
  borderOpacity?: number;
  /** the palette layer format. @default 'hsl' */
  format?: ColorFormat;
  /** @default ':root' */
  styleTarget?: StyleTarget;
  /** @default 'class' */
  darkSelector?: DarkSelectorValue;
}

/** emit options of the semantic layer. */
export interface EmitThemeOptions {
  styleTarget?: StyleTarget;
  darkSelector?: DarkSelectorValue;
  /**
   * the format used when emitting complete colors (`solidVars`); the channel
   * values themselves are format-free.
   *
   * @default 'hsl'
   */
  format?: ColorFormat;
  /** whether complete-color twins are emitted. @default 'none' */
  solidVars?: SolidVars;
  /**
   * wrap the block selectors in `:where(…)` (zero specificity).
   *
   * Used by the **static default block** that ships with the preset: it must be
   * beatable by the runtime/snapshot block regardless of source order, and
   * `:where()` achieves that without `!important` (a head inline script cannot
   * be placed after the stylesheet, so order alone cannot decide).
   *
   * @default false
   */
  weakSelectors?: boolean;
  /**
   * the token name prefix; must match the prefix `resolveThemeMap` used, because
   * the literal layer references other tokens (`var(--vean-radius)`).
   */
  prefix?: TokenPrefix;
}

export type {
  ActiveToken,
  AlphaToken,
  RoleRampRole,
  ChartToken,
  CoreToken,
  OnSolidToken,
  RegionToken,
  SemanticToken,
  StatusName,
  StatusToken,
  TextPair
};
