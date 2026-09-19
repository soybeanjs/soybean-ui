/**
 * @vean/theme — the Vean theme engine.
 *
 * Three layers (docs/theme.md):
 * 1. **palette** (static, `generatePaletteCss`): 26 built-in palettes × 11 levels
 *    plus `white` / `black`, stored as naked channels so alpha composition and
 *    color inheritance both work.
 * 2. **semantic** (`resolveThemeMap` → `emitThemeCss`): the token layer — every
 *    token is a *reference* to a palette level, so a theme change is a reference
 *    swap and the emitted CSS stays tiny.
 * 3. **literal**: radius / sizing / motion / z-index / typography tokens.
 *
 * Two mechanisms are what make the layer model hold:
 * - **ladder shift**: the level knob moves the whole surface ladder, so the
 *   elevation order is preserved by construction;
 * - **contrast guard**: every declared pair is measured and corrected at
 *   generation time, so readability is an engine contract rather than a
 *   designer's promise.
 */

export { resolveThemeMap } from './theme-map';
export { emitThemeCss, generatePaletteCss, tokenVar } from './emit';
export { resolveTokenColor, resolveThemeColors, resolveColorRef } from './resolve';
export { runContrastGuard, thresholds, ratioOf, valueRef, channelHsl, walkLevel } from './guard';
export { contrastRatio, hslChannelToRgb, relativeLuminance, roundRatio } from './contrast';
export {
  PALETTE_KEYS,
  PALETTE_LEVELS,
  NEUTRAL_PALETTES,
  isPaletteKey,
  isPaletteLevel,
  isNeutralFamily,
  paletteChannel,
  paletteChannelHsl,
  paletteColor,
  simpleChannel,
  simpleChannelHsl,
  simpleColor,
  toChannel,
  walkPaletteLevel
} from './palette';
export {
  ACTIVE_ROLES,
  ACTIVE_TOKENS,
  ROLE_RAMP_ROLES,
  ALPHA_RULES,
  ALPHA_TOKENS,
  BRAND_TOKENS,
  CHART_TOKENS,
  CORE_NON_TEXT_PAIRS,
  CORE_ON_SOLID_PAIRS,
  CORE_RULES,
  CORE_TEXT_PAIRS,
  CORE_TOKENS,
  CARBON_TOKENS,
  FILL_TOKENS,
  LADDER_PAIRS,
  LINE_TOKENS,
  REGION_NON_TEXT_PAIRS,
  REGION_TEXT_PAIRS,
  REGION_TOKENS,
  SCRIM_TOKENS,
  SEMANTIC_TOKENS,
  SHIFT_TOKENS,
  STATUS_NAMES,
  STATUS_ROLE_LEVELS,
  STATUS_SUFFIXES,
  SURFACE_TOKENS,
  TEXT_TOKENS
} from './semantic';
export {
  CHART_SCHEMES,
  CHART_SCHEME_KEYS,
  FEEDBACK_SCHEMES,
  FEEDBACK_SCHEME_KEYS,
  chartScheme,
  feedbackScheme,
  splitLevelRef
} from './schemes';
export { DARK_LITERALS, LITERAL_DEFAULTS, literalTokens, literalVar } from './literals';
export { DEFAULT_OPTIONS, THEME_RADIUS, THEME_SIZE, DARK_SELECTOR, themeSizeKeys, themeRadiusKeys } from './defaults';
export {
  darkClassName,
  getDarkSelector,
  isPaletteLevelRef,
  levelOf,
  resolveRadiusValue,
  resolveSizeValue
} from './shared';

export type { ChartScheme, FeedbackScheme } from './schemes';
export type { GuardContext, GuardPairs } from './guard';
export type {
  ActiveToken,
  AlphaToken,
  ChartToken,
  ChartSchemeKey,
  ColorFormat,
  ContrastCorrection,
  ContrastPolicy,
  ContrastReport,
  CoreToken,
  ColorValue,
  DarkLevelOffset,
  DarkSelectorValue,
  EmitThemeOptions,
  FeedbackSchemeKey,
  LevelOrSimple,
  LevelSource,
  LightLevelOffset,
  LiteralToken,
  OnSolidToken,
  PaletteKey,
  PaletteLevel,
  PaletteLevelRef,
  RegionToken,
  RoleRampRole,
  SemanticToken,
  SimpleColorName,
  SolidVars,
  StatusName,
  StatusToken,
  StyleTarget,
  SurfaceStyle,
  TextPair,
  ThemeMap,
  ThemeMode,
  ThemeModePreference,
  ThemeOptions,
  ThemeOverrides,
  ThemeRadius,
  ThemeRadiusValue,
  ThemeSize,
  ThemeSizeValue,
  TokenOverride,
  TokenPrefix,
  TokenRule,
  TokenValue
} from './types';
