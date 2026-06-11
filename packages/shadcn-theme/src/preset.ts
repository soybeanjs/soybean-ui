import { builtinBasePreset, builtinFeedbackPreset, builtinPrimaryPreset } from './constants';
import { mergeObjects } from './shared';
import type {
  PresetKeyConfig,
  ThemeColorPreset,
  CustomPreset,
  CustomThemeColorPreset,
  SidebarPreset,
  SidebarExtendedPreset,
  ThemeColors
} from './types';

export function generateThemePreset(config: Required<PresetKeyConfig>, customPreset?: CustomThemeColorPreset) {
  const preset = getBuiltinThemePreset(config);

  if (!customPreset) {
    return preset;
  }

  const custom: ThemeColorPreset = {
    light: mergeObjects<Required<ThemeColors>>(preset.light, customPreset.light),
    dark: mergeObjects<Required<ThemeColors>>(preset.dark, customPreset.dark || {})
  };

  return custom;
}

function getBuiltinThemePreset(config: Required<PresetKeyConfig>): ThemeColorPreset {
  const { base, primary, feedback } = config;

  const basePreset = builtinBasePreset[base];
  const primaryPreset = builtinPrimaryPreset[primary];
  const feedbackPreset = builtinFeedbackPreset[feedback];
  const sidebarPreset = generateSidebarPreset({
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
 * generate sidebar color preset from base and theme color preset
 */
function generateSidebarPreset(extendedPreset: SidebarExtendedPreset) {
  const { light, dark } = extendedPreset;

  const preset: SidebarPreset = {
    light: {
      sidebar: light.background,
      sidebarForeground: light.foreground,
      sidebarPrimary: light.primary,
      sidebarPrimaryForeground: light.primaryForeground,
      sidebarAccent: light.accent,
      sidebarAccentForeground: light.accentForeground,
      sidebarBorder: light.border,
      sidebarRing: light.ring
    },
    dark: {
      sidebar: dark.card,
      sidebarForeground: dark.foreground,
      sidebarPrimary: dark.primary,
      sidebarPrimaryForeground: dark.primaryForeground,
      sidebarAccent: dark.accent,
      sidebarAccentForeground: dark.accentForeground,
      sidebarBorder: dark.border,
      sidebarRing: dark.ring
    }
  };

  return preset;
}

export function generateCustomPreset(preset: ThemeColorPreset) {
  const { light, dark } = preset;

  const {
    background,
    foreground,
    card,
    cardForeground,
    popover,
    popoverForeground,
    primaryForeground,
    secondary,
    secondaryForeground,
    muted,
    mutedForeground,
    accent,
    accentForeground,
    destructiveForeground,
    successForeground,
    warningForeground,
    infoForeground,
    carbon,
    carbonForeground,
    border,
    input,
    primary,
    destructive,
    success,
    warning,
    info,
    ring,
    chart1,
    chart2,
    chart3,
    chart4,
    chart5,
    sidebar,
    sidebarForeground,
    sidebarPrimary,
    sidebarPrimaryForeground,
    sidebarAccent,
    sidebarAccentForeground,
    sidebarBorder,
    sidebarRing
  } = light;

  const classified: CustomPreset = {
    base: {
      light: {
        background,
        foreground,
        card,
        cardForeground,
        popover,
        popoverForeground,
        primaryForeground,
        secondary,
        secondaryForeground,
        muted,
        mutedForeground,
        accent,
        accentForeground,
        destructiveForeground,
        successForeground,
        warningForeground,
        infoForeground,
        carbon,
        carbonForeground,
        border,
        input
      },
      dark: {
        background: dark.background,
        foreground: dark.foreground,
        card: dark.card,
        cardForeground: dark.cardForeground,
        popover: dark.popover,
        popoverForeground: dark.popoverForeground,
        primaryForeground: dark.primaryForeground,
        secondary: dark.secondary,
        secondaryForeground: dark.secondaryForeground,
        muted: dark.muted,
        mutedForeground: dark.mutedForeground,
        accent: dark.accent,
        accentForeground: dark.accentForeground,
        destructiveForeground: dark.destructiveForeground,
        successForeground: dark.successForeground,
        warningForeground: dark.warningForeground,
        infoForeground: dark.infoForeground,
        carbon: dark.carbon,
        carbonForeground: dark.carbonForeground,
        border: dark.border,
        input: dark.input
      }
    },
    primary: {
      light: {
        primary,
        ring,
        chart1,
        chart2,
        chart3,
        chart4,
        chart5
      },
      dark: {
        primary: dark.primary,
        ring: dark.ring,
        chart1: dark.chart1,
        chart2: dark.chart2,
        chart3: dark.chart3,
        chart4: dark.chart4,
        chart5: dark.chart5
      }
    },
    feedback: {
      light: {
        destructive,
        success,
        warning,
        info
      },
      dark: {
        destructive: dark.destructive,
        success: dark.success,
        warning: dark.warning,
        info: dark.info
      }
    },
    sidebar: {
      light: {
        sidebar,
        sidebarForeground,
        sidebarPrimary,
        sidebarPrimaryForeground,
        sidebarAccent,
        sidebarAccentForeground,
        sidebarBorder,
        sidebarRing
      },
      dark: {
        sidebar: dark.sidebar,
        sidebarForeground: dark.sidebarForeground,
        sidebarPrimary: dark.sidebarPrimary,
        sidebarPrimaryForeground: dark.sidebarPrimaryForeground,
        sidebarAccent: dark.sidebarAccent,
        sidebarAccentForeground: dark.sidebarAccentForeground,
        sidebarBorder: dark.sidebarBorder,
        sidebarRing: dark.sidebarRing
      }
    }
  };

  return classified;
}
