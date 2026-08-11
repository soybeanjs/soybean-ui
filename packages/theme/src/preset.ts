import { keysOf } from '@soybeanjs/utils';
import { defu } from 'defu';
import { DEFAULT_PRESET_OPTIONS } from './defaults';
import { deriveBasePreset, deriveDarkFromLight, derivePrimaryPreset } from './derive';
import { getRegistry } from './registry';
import type {
  BaseColorKey,
  BaseTokens,
  ChartSchemeKey,
  ColorKey,
  ColorTokens,
  ColorValue,
  DarkLevelOffset,
  FeedbackSchemeKey,
  FullThemePreset,
  LightLevelOffset,
  PrimaryColorKey,
  SemanticScheme,
  SidebarColorValue,
  SidebarSchemeKey,
  ThemeOverrides,
  ThemeRadiusValue,
  ThemeSizeValue
} from './types';

/**
 * the single options object for `generateThemePreset`, combining the palette /
 * scheme keys, the light/dark level offsets, the inline `overrides` copy and
 * the base tokens.
 */
export interface GenerateThemePresetOptions {
  base: BaseColorKey;
  primary: PrimaryColorKey;
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
   * @default true
   */
  sidebarDerive?: boolean;
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
   * inline color token overrides applied on top of the derived tokens. Highest
   * priority.
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
}

/**
 * resolve a full theme preset from the built-in base/primary palettes plus the
 * selected feedback / chart / sidebar schemes and an optional inline override.
 *
 * - `light` is the built-in light tokens overridden by the `overrides.light`
 *   values;
 * - `dark` starts from the built-in dark tokens, then any explicit `overrides.dark`
 *   value wins, and every `overrides.light` key without an explicit dark value
 *   is derived from its light value via `deriveDarkFromLight`;
 * - base tokens (`size`/`radius`) come from the options,
 *   falling back to the engine defaults.
 */
export function generateThemePreset(options: GenerateThemePresetOptions): FullThemePreset {
  const { base, primary, overrides, lightLevel, darkLevel } = options;

  const builtin = getBuiltinPreset({
    base,
    primary,
    feedback: options.feedback,
    chart: options.chart,
    sidebar: options.sidebar,
    sidebarDerive: options.sidebarDerive,
    lightLevel: lightLevel ?? 0,
    darkLevel: darkLevel ?? 0
  });

  const customLight: Partial<ColorTokens> = overrides?.light ?? {};
  const customDark: Partial<ColorTokens> = overrides?.dark ?? {};

  // `defu(source, ...defaults)`: the override light tokens win over the built-in
  // light tokens, and `undefined` values fall through to the built-ins.
  const light = defu(customLight, builtin.light);

  const dark: Partial<ColorTokens> = { ...builtin.dark };

  if (Object.keys(customLight).length > 0) {
    for (const key of keysOf(customLight)) {
      const lightValue = customLight[key];
      if (lightValue === undefined) {
        continue;
      }

      dark[key] = customDark[key] ?? deriveDarkFromLight(key, lightValue, base);
    }
  }

  if (Object.keys(customDark).length > 0) {
    for (const key of keysOf(customDark)) {
      const value = customDark[key];
      if (value !== undefined) {
        dark[key] = value;
      }
    }
  }

  // Prune dark tokens that resolve to the same value as their light
  // counterpart. A dark layer only needs to carry explicit overrides, so
  // identical values are redundant and can be dropped from the preset. This
  // keeps the `dark` layer minimal and lets the CSS generator skip emitting
  // no-op dark rules (dark `<selector>` inherits the light token naturally).
  for (const key of keysOf(dark)) {
    if (dark[key] === light[key]) {
      delete dark[key];
    }
  }

  const baseTokens = resolveBaseTokens(options);

  return {
    name: `${base}-${primary}`,
    ...baseTokens,
    light,
    dark
  };
}

/**
 * the resolve inputs for the built-in light + dark token sets.
 */
interface BuiltinPresetOptions {
  base: BaseColorKey;
  primary: PrimaryColorKey;
  feedback?: FeedbackSchemeKey;
  chart?: ChartSchemeKey;
  sidebar?: SidebarSchemeKey;
  /** whether to apply a separate sidebar skin from the `sidebar` scheme. */
  sidebarDerive?: boolean;
  lightLevel: LightLevelOffset;
  darkLevel: DarkLevelOffset;
}

/**
 * the sidebar token references a sidebar scheme value may point to.
 */
const SIDEBAR_TOKEN_REFS = new Set([
  'background',
  'foreground',
  'card',
  'primary',
  'primaryForeground',
  'secondary',
  'secondaryForeground',
  'muted',
  'mutedForeground',
  'accent',
  'accentForeground',
  'border',
  'ring'
]);

/**
 * resolve a sidebar scheme value: a token reference resolves to the
 * corresponding derived token; a literal color passes through.
 */
function resolveSidebarValue(value: SidebarColorValue, tokens: Partial<ColorTokens>): ColorValue {
  if (typeof value === 'string' && SIDEBAR_TOKEN_REFS.has(value) && tokens[value as ColorKey]) {
    return tokens[value as ColorKey] as ColorValue;
  }

  return value as ColorValue;
}

/**
 * resolve a sidebar scheme into token partials, substituting token references
 * with the already-derived base⊕primary tokens.
 */
function resolveSidebarScheme(
  scheme: SemanticScheme<SidebarColorValue>,
  sources: { light: ColorTokens; dark: ColorTokens }
): { light: Partial<ColorTokens>; dark: Partial<ColorTokens> } {
  return {
    light: Object.fromEntries(
      Object.entries(scheme.light).map(([key, value]) => [key, resolveSidebarValue(value, sources.light)])
    ) as Partial<ColorTokens>,
    dark: Object.fromEntries(
      Object.entries(scheme.dark).map(([key, value]) => [key, resolveSidebarValue(value, sources.dark)])
    ) as Partial<ColorTokens>
  };
}

/**
 * build the built-in light + dark token sets from the base ⊕ primary palettes
 * plus the selected feedback / chart / sidebar schemes.
 */
function getBuiltinPreset(options: BuiltinPresetOptions): { light: ColorTokens; dark: ColorTokens } {
  const { base, primary, lightLevel, darkLevel, sidebarDerive } = options;
  const registry = getRegistry();

  const feedbackScheme = registry.feedback[options.feedback ?? 'classic'] ?? registry.feedback.classic;
  const chartScheme = registry.chart[options.chart ?? 'vivid'] ?? registry.chart.vivid;

  const basePreset = deriveBasePreset(base, lightLevel, darkLevel);
  const primaryPreset = derivePrimaryPreset(primary);
  const mergedLight: ColorTokens = { ...basePreset.light, ...primaryPreset.light };
  const mergedDark: ColorTokens = { ...basePreset.dark, ...primaryPreset.dark };

  const baseResult: ColorTokens = { ...mergedLight, ...feedbackScheme.light, ...chartScheme.light };
  const darkResult: ColorTokens = { ...mergedDark, ...feedbackScheme.dark, ...chartScheme.dark };

  // sidebar 皮肤默认应用；`sidebarDerive=false` 时不派生独立 sidebar token，
  // 直接回落到 base 的 background/foreground/border（无独立侧栏皮肤）。
  if (sidebarDerive === false) {
    return { light: baseResult, dark: darkResult };
  }

  const sidebarScheme = registry.sidebar[options.sidebar ?? 'derived'] ?? registry.sidebar.derived;
  const sidebarPreset = resolveSidebarScheme(sidebarScheme, { light: mergedLight, dark: mergedDark });

  return {
    light: { ...baseResult, ...sidebarPreset.light },
    dark: { ...darkResult, ...sidebarPreset.dark }
  };
}

/**
 * resolve the base tokens of the preset from the options, falling back to the
 * engine defaults.
 */
function resolveBaseTokens(options: GenerateThemePresetOptions): Required<BaseTokens> {
  return {
    size: options.size ?? DEFAULT_PRESET_OPTIONS.size,
    radius: options.radius ?? DEFAULT_PRESET_OPTIONS.radius
  };
}

/**
 * resolve a full theme preset (with auto-generated name) from the theme
 * options, without generating any CSS.
 *
 * Convenience wrapper over `generateThemePreset` exposing the resolution stage
 * so callers (e.g. SSR, theme store) can inspect the resolved tokens.
 */
export function resolveTheme(options: GenerateThemePresetOptions): FullThemePreset {
  return generateThemePreset(options);
}
