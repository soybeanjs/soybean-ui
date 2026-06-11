import {
  DEFAULT_PRESET_OPTIONS,
  builtinBasePreset,
  builtinFeedbackPreset,
  builtinPrimaryPreset,
  basePresetColorKeys,
  primaryPresetColorKeys,
  feedbackPresetColorKeys,
  sidebarPresetColorKeys
} from './constants';
import type {
  PresetKeyConfig,
  ThemeColorPreset,
  CustomPreset,
  CustomThemeColorPreset,
  SidebarPreset,
  SidebarExtendedPreset
} from './types';

export function generateThemePreset(config: Required<PresetKeyConfig>, customPreset?: CustomThemeColorPreset) {
  const { base, primary, feedback, sidebar } = config;

  const preset = getBuiltinThemePreset(config);

  if (!customPreset) {
    return preset;
  }

  if (base === 'custom') {
    basePresetColorKeys.forEach(key => {
      preset.light[key] = customPreset.light[key] ?? preset.light[key];
      preset.dark[key] = customPreset.dark?.[key] ?? preset.dark[key];
    });
  }
  if (primary === 'custom') {
    primaryPresetColorKeys.forEach(key => {
      preset.light[key] = customPreset.light[key] ?? preset.light[key];
      preset.dark[key] = customPreset.dark?.[key] ?? preset.dark[key];
    });
  }
  if (feedback === 'custom') {
    feedbackPresetColorKeys.forEach(key => {
      preset.light[key] = customPreset.light[key] ?? preset.light[key];
      preset.dark[key] = customPreset.dark?.[key] ?? preset.dark[key];
    });
  }
  // regenerate sidebar preset
  const sidebarPreset = generateSidebarPreset(preset);
  Object.assign(preset.light, sidebarPreset.light);
  Object.assign(preset.dark, sidebarPreset.dark);

  if (sidebar === 'custom') {
    sidebarPresetColorKeys.forEach(key => {
      preset.light[key] = customPreset.light[key] ?? preset.light[key];
      preset.dark[key] = customPreset.dark?.[key] ?? preset.dark[key];
    });
  }

  return preset;
}

function getBuiltinThemePreset(config: Required<PresetKeyConfig>) {
  let { base, primary, feedback, sidebar } = config;

  if (base === 'custom') {
    base = DEFAULT_PRESET_OPTIONS.base;
  }
  if (primary === 'custom') {
    primary = DEFAULT_PRESET_OPTIONS.primary;
  }
  if (feedback === 'custom') {
    feedback = DEFAULT_PRESET_OPTIONS.feedback;
  }
  if (sidebar === 'custom') {
    sidebar = DEFAULT_PRESET_OPTIONS.sidebar;
  }

  const basePreset = builtinBasePreset[base];
  const primaryPreset = builtinPrimaryPreset[primary];
  const feedbackPreset = builtinFeedbackPreset[feedback];
  const sidebarPreset = generateSidebarPreset({
    light: { ...basePreset.light, ...primaryPreset.light },
    dark: { ...basePreset.dark, ...primaryPreset.dark }
  });

  const preset: ThemeColorPreset = {
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

  return preset;
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

  const classified: CustomPreset = {
    base: {
      light: {
        background: light.background,
        foreground: light.foreground,
        card: light.card,
        cardForeground: light.cardForeground,
        popover: light.popover,
        popoverForeground: light.popoverForeground,
        primaryForeground: light.primaryForeground,
        secondary: light.secondary,
        secondaryForeground: light.secondaryForeground,
        muted: light.muted,
        mutedForeground: light.mutedForeground,
        accent: light.accent,
        accentForeground: light.accentForeground,
        destructiveForeground: light.destructiveForeground,
        successForeground: light.successForeground,
        warningForeground: light.warningForeground,
        infoForeground: light.infoForeground,
        carbon: light.carbon,
        carbonForeground: light.carbonForeground,
        border: light.border,
        input: light.input
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
        primary: light.primary,
        ring: light.ring,
        chart1: light.chart1,
        chart2: light.chart2,
        chart3: light.chart3,
        chart4: light.chart4,
        chart5: light.chart5
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
        destructive: light.destructive,
        success: light.success,
        warning: light.warning,
        info: light.info
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
        sidebar: light.sidebar,
        sidebarForeground: light.sidebarForeground,
        sidebarPrimary: light.sidebarPrimary,
        sidebarPrimaryForeground: light.sidebarPrimaryForeground,
        sidebarAccent: light.sidebarAccent,
        sidebarAccentForeground: light.sidebarAccentForeground,
        sidebarBorder: light.sidebarBorder,
        sidebarRing: light.sidebarRing
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
