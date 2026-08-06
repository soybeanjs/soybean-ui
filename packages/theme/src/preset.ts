import { keysOf } from '@soybeanjs/utils';
import { defu } from 'defu';
import { DEFAULT_PRESET_OPTIONS } from './defaults';
import {
  deriveBasePreset,
  deriveDarkFromLight,
  deriveFeedbackColors,
  derivePrimaryPreset,
  deriveSidebarPreset
} from './derive';
import type {
  BaseColorKey,
  BaseTokens,
  ColorTokens,
  DarkLevelOffset,
  FullThemePreset,
  LightLevelOffset,
  PrimaryColorKey,
  ThemePreset,
  ThemeTokens
} from './types';
import { COLOR_VARIABLES } from './variables';

/**
 * the authoritative color token key set (mirrors `ColorTokens`).
 */
const COLOR_TOKEN_KEYS = keysOf(COLOR_VARIABLES);

/**
 * distinguish a mode-split `ThemePreset` from a flat `ThemeTokens` override.
 * A flat token set has no `light`/`dark` layers and is applied as light-only.
 */
const isThemePreset = (preset: ThemePreset | ThemeTokens | undefined): preset is ThemePreset =>
  !!preset && 'light' in preset;

/**
 * a preset is "complete" when it is a mode-split `ThemePreset` whose `light`
 * layer defines every color token. A flat `ThemeTokens` override (no
 * `light`/`dark` layers) or a partial `light` is never complete.
 */
export function isCompleteThemePreset(preset: ThemePreset | ThemeTokens | undefined): boolean {
  if (!isThemePreset(preset) || !preset.light) {
    return false;
  }

  return COLOR_TOKEN_KEYS.every(key => preset.light[key] !== undefined);
}

/**
 * the single options object for `generateThemePreset`, combining the preset
 * keys, the light/dark level offsets, the skip-derivation flag and the custom
 * preset override.
 */
export interface GenerateThemePresetOptions {
  base: BaseColorKey;
  primary: PrimaryColorKey;
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
   * when `true`, and the provided `preset` is a complete preset (every color
   * token present in `light`), the built-in base/primary/feedback/sidebar
   * derivation from the palette keys is skipped and the preset's tokens are
   * applied as-is. `lightLevel` / `darkLevel` are ignored in this case.
   *
   * @default false
   */
  complete?: boolean;
  /**
   * the custom preset override.
   */
  preset?: ThemePreset | ThemeTokens;
}

/**
 * resolve a full theme preset from the built-in base/primary palettes plus an
 * optional custom override.
 *
 * - `light` is the built-in light tokens overridden by the custom `light`
 *   (or the flat `ThemeTokens`) values;
 * - `dark` starts from the built-in dark tokens, then any explicit `dark`
 *   override wins, and every custom light key without an explicit dark value
 *   is derived from its light value via `deriveDarkFromLight`;
 * - base tokens (`size`/`radius`/`menuColor`/`menuAccent`) come from a
 *   `ThemePreset`, falling back to the engine defaults.
 */
export function generateThemePreset(options: GenerateThemePresetOptions): FullThemePreset {
  const { base, primary, preset, lightLevel, darkLevel, complete } = options;

  // When `complete` is enabled and the preset already supplies every color
  // token, the built-in base/primary/feedback/sidebar derivation is skipped
  // and the layers are seeded directly from the provided tokens.
  const skipBaseDerivation = complete === true && isCompleteThemePreset(preset);

  const builtin = skipBaseDerivation
    ? { light: {} as ColorTokens, dark: {} as Partial<ColorTokens> }
    : getBuiltinPreset({ base, primary, lightLevel: lightLevel ?? 0, darkLevel: darkLevel ?? 0 });

  const customLight: Partial<ColorTokens> | undefined = preset
    ? isThemePreset(preset)
      ? preset.light
      : (preset as ThemeTokens)
    : undefined;
  const customDark: Partial<ColorTokens> | undefined = isThemePreset(preset) ? preset.dark : undefined;

  // `defu(source, ...defaults)`: the custom light tokens override the built-in
  // light tokens, and `undefined` values fall through to the built-ins.
  const light = defu(customLight ?? {}, builtin.light);

  const dark: Partial<ColorTokens> = { ...builtin.dark };

  if (customLight) {
    for (const key of keysOf(customLight)) {
      const lightValue = customLight[key];
      if (lightValue === undefined) {
        continue;
      }

      if (customDark?.[key] !== undefined) {
        dark[key] = customDark[key];
      } else {
        dark[key] = deriveDarkFromLight(key, lightValue, base);
      }
    }
  }

  if (customDark) {
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

  const baseTokens = resolveBaseTokens(preset);
  const name = (isThemePreset(preset) && preset.name) || `${base}-${primary}`;

  return {
    name,
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
  lightLevel: LightLevelOffset;
  darkLevel: DarkLevelOffset;
}

/**
 * build the built-in light + dark token sets from the base ⊕ primary palettes
 * (sidebar and fixed feedback colors included).
 */
function getBuiltinPreset(options: BuiltinPresetOptions): { light: ColorTokens; dark: ColorTokens } {
  const { base, primary, lightLevel, darkLevel } = options;

  const basePreset = deriveBasePreset(base, lightLevel, darkLevel);
  const primaryPreset = derivePrimaryPreset(primary);
  const feedbackPreset = deriveFeedbackColors();
  const sidebarPreset = deriveSidebarPreset({
    light: { ...basePreset.light, ...primaryPreset.light },
    dark: { ...basePreset.dark, ...primaryPreset.dark }
  });

  return {
    light: {
      ...basePreset.light,
      ...primaryPreset.light,
      ...feedbackPreset.light,
      ...sidebarPreset.light
    },
    dark: {
      ...basePreset.dark,
      ...primaryPreset.dark,
      ...feedbackPreset.dark,
      ...sidebarPreset.dark
    }
  };
}

/**
 * resolve the base tokens of the preset. Only a mode-split `ThemePreset`
 * carries them; a flat `ThemeTokens` override is treated as light-only and
 * therefore does not affect size/radius/menu settings.
 */
function resolveBaseTokens(preset?: ThemePreset | ThemeTokens): Required<BaseTokens> {
  const p = isThemePreset(preset) ? preset : undefined;

  return {
    size: p?.size ?? DEFAULT_PRESET_OPTIONS.size,
    radius: p?.radius ?? DEFAULT_PRESET_OPTIONS.radius,
    menuColor: p?.menuColor ?? DEFAULT_PRESET_OPTIONS.menuColor,
    menuAccent: p?.menuAccent ?? DEFAULT_PRESET_OPTIONS.menuAccent
  };
}
