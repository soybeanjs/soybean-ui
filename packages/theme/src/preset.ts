import { mergeObjects } from './shared';
import { deriveBasePreset, deriveFeedbackColors, derivePrimaryPreset, deriveSidebarPreset } from './derive';
import type {
  CustomThemeColorPreset,
  DarkLevelOffset,
  LightLevelOffset,
  PresetKeyConfig,
  ThemeColorPreset,
  ThemeColors
} from './types';

export function generateThemePreset(
  config: Required<PresetKeyConfig>,
  levels: { lightLevel?: LightLevelOffset; darkLevel?: DarkLevelOffset } = {},
  customPreset?: CustomThemeColorPreset
) {
  const preset = getBuiltinThemePreset(config, levels.lightLevel ?? 0, levels.darkLevel ?? 0);

  if (!customPreset) {
    return preset;
  }

  return {
    light: mergeObjects<Required<ThemeColors>>(preset.light, customPreset.light),
    dark: mergeObjects<Required<ThemeColors>>(preset.dark, customPreset.dark || {})
  };
}

function getBuiltinThemePreset(
  config: Required<PresetKeyConfig>,
  lightLevel: LightLevelOffset,
  darkLevel: DarkLevelOffset
): ThemeColorPreset {
  const { base, primary } = config;

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
