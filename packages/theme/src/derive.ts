import type { PaletteColorLevel } from '@soybeanjs/colord/palette';
import { builtinBaseCoreTemplate, builtinPrimaryCoreTemplate, CHART_TEMPLATE } from './core-template';
import {
  DARK_BORDER,
  DARK_CARD,
  DARK_INPUT,
  DARK_MUTED_FG,
  DARK_SURFACE,
  DARK_WEAK,
  LIGHT_MUTED_FG,
  LIGHT_SURFACE,
  LIGHT_WEAK
} from './tokens';
import type {
  BasePreset,
  BuiltinBasePresetKey,
  BuiltinPrimaryPresetKey,
  ColorValue,
  DarkLevelOffset,
  LightLevelOffset,
  PrimaryPreset,
  SidebarPreset,
  SidebarExtendedPreset
} from './types';

type LevelTable = readonly (PaletteColorLevel | 'white')[];

/**
 * shift a token along its level table (§4.2)
 *
 * - the token takes its baseline index in the table, moves `offset` steps
 *   toward the table end, and is clamped at the last entry
 * - a token whose baseline level is absent from the table is never shifted
 *   (D8, e.g. carbon is not a shiftable surface)
 */
function shiftToken(palette: BuiltinBasePresetKey, color: ColorValue, table: LevelTable, offset: number): ColorValue {
  if (offset === 0) {
    return color;
  }

  const level = color === 'white' ? 'white' : color.split('.')[1];

  if (level === undefined) {
    return color;
  }

  const index = table.findIndex(entry => String(entry) === level);

  if (index === -1) {
    return color;
  }

  const shifted = table[Math.min(index + offset, table.length - 1)];

  return shifted === 'white' ? 'white' : `${palette}.${shifted}`;
}

/**
 * derive a full base preset from the core 10 keys + §3.2 rules
 *
 * surface tokens are level-shifted first; sidebar derivation downstream
 * therefore automatically follows the shifted values (§4.3)
 */
export function deriveBasePreset(
  palette: BuiltinBasePresetKey,
  lightLevel: LightLevelOffset = 0,
  darkLevel: DarkLevelOffset = 0
): BasePreset {
  const core = builtinBaseCoreTemplate[palette];

  const lightMuted = shiftToken(palette, core.light.muted, LIGHT_WEAK, lightLevel);
  const darkMuted = shiftToken(palette, core.dark.muted, DARK_WEAK, darkLevel);

  return {
    light: {
      background: shiftToken(palette, core.light.background, LIGHT_SURFACE, lightLevel),
      foreground: core.light.foreground,
      card: shiftToken(palette, core.light.card, LIGHT_SURFACE, lightLevel),
      cardForeground: core.light.cardForeground,
      popover: shiftToken(palette, core.light.popover, LIGHT_SURFACE, lightLevel),
      popoverForeground: core.light.popoverForeground,
      primaryForeground: `${palette}.50`,
      secondary: lightMuted,
      secondaryForeground: `${palette}.900`,
      muted: lightMuted,
      mutedForeground: shiftToken(palette, core.light.mutedForeground, LIGHT_MUTED_FG, lightLevel),
      accent: shiftToken(palette, core.light.accent, LIGHT_WEAK, lightLevel),
      accentForeground: core.light.accentForeground,
      destructiveForeground: `${palette}.50`,
      successForeground: `${palette}.50`,
      warningForeground: `${palette}.50`,
      infoForeground: `${palette}.50`,
      carbon: `${palette}.800`,
      carbonForeground: `${palette}.50`,
      border: `${palette}.200`,
      input: `${palette}.200`
    },
    dark: {
      background: shiftToken(palette, core.dark.background, DARK_SURFACE, darkLevel),
      foreground: core.dark.foreground,
      card: shiftToken(palette, core.dark.card, DARK_CARD, darkLevel),
      cardForeground: core.dark.cardForeground,
      popover: shiftToken(palette, core.dark.popover, DARK_CARD, darkLevel),
      popoverForeground: core.dark.popoverForeground,
      primaryForeground: `${palette}.900`,
      secondary: darkMuted,
      secondaryForeground: core.dark.foreground,
      muted: darkMuted,
      mutedForeground: shiftToken(palette, core.dark.mutedForeground, DARK_MUTED_FG, darkLevel),
      accent: shiftToken(palette, core.dark.accent, DARK_WEAK, darkLevel),
      accentForeground: core.dark.accentForeground,
      destructiveForeground: `${palette}.900`,
      successForeground: `${palette}.900`,
      warningForeground: `${palette}.900`,
      infoForeground: `${palette}.900`,
      carbon: `${palette}.100`,
      carbonForeground: `${palette}.900`,
      border: DARK_BORDER,
      input: DARK_INPUT
    }
  };
}

/**
 * derive a full primary preset from the core 2 keys + fixed chart templates (D7)
 */
export function derivePrimaryPreset(palette: BuiltinPrimaryPresetKey): PrimaryPreset {
  const core = builtinPrimaryCoreTemplate[palette];

  return {
    light: {
      ...core.light,
      ...CHART_TEMPLATE.light
    },
    dark: {
      ...core.dark,
      ...CHART_TEMPLATE.dark
    }
  };
}

export type FeedbackColors = {
  light: Record<'destructive' | 'success' | 'warning' | 'info', ColorValue>;
  dark: Record<'destructive' | 'success' | 'warning' | 'info', ColorValue>;
};

/**
 * feedback colors follow the fixed classic rule (ADR-6 / D9)
 *
 * red/green/amber/blue at .500 (light) and .400 (dark)
 */
export function deriveFeedbackColors(): FeedbackColors {
  return {
    light: {
      destructive: 'red.500',
      success: 'green.500',
      warning: 'amber.500',
      info: 'blue.500'
    },
    dark: {
      destructive: 'red.400',
      success: 'green.400',
      warning: 'amber.400',
      info: 'blue.400'
    }
  };
}

/**
 * derive sidebar colors from base ⊕ primary (extended preset)
 *
 * light: sidebar = background; dark: sidebar = card
 */
export function deriveSidebarPreset(extendedPreset: SidebarExtendedPreset): SidebarPreset {
  const { light, dark } = extendedPreset;

  return {
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
}
