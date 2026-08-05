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

/**
 * the built-in preset keys (base + primary) that seed the default theme
 */
export interface PresetKeyConfig {
  base: BaseColorKey;
  primary: PrimaryColorKey;
}

/**
 * distinguish a mode-split `ThemePreset` from a flat `ThemeTokens` override.
 * A flat token set has no `light`/`dark` layers and is applied as light-only.
 */
const isThemePreset = (preset: ThemePreset | ThemeTokens | undefined): preset is ThemePreset =>
  !!preset && 'light' in preset;

/**
 * the light/dark surface level offsets (§4.2)
 */
export interface LevelOffsets {
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
export function generateThemePreset(
  config: PresetKeyConfig,
  preset?: ThemePreset | ThemeTokens,
  levels: LevelOffsets = {}
): FullThemePreset {
  const { base, primary } = config;

  const builtin = getBuiltinPreset(base, primary, levels.lightLevel ?? 0, levels.darkLevel ?? 0);

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
 * build the built-in light + dark token sets from the base ⊕ primary palettes
 * (sidebar and fixed feedback colors included).
 */
function getBuiltinPreset(
  base: BaseColorKey,
  primary: PrimaryColorKey,
  lightLevel: LightLevelOffset,
  darkLevel: DarkLevelOffset
): { light: ColorTokens; dark: ColorTokens } {
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
