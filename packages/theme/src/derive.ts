import type { PaletteColorLevel } from '@soybeanjs/colord/palette';
import {
  builtinBaseCoreTemplate,
  builtinPrimaryCoreTemplate,
  CHART_TEMPLATE,
  DARK_PRIMARY_600,
  NEUTRAL_FAMILY
} from './core-template';
import {
  DARK_BORDER,
  DARK_CARD,
  DARK_INPUT,
  DARK_MUTED_FG,
  DARK_SURFACE,
  DARK_WEAK,
  LEVEL_FLIP,
  LIGHT_MUTED_FG,
  LIGHT_SURFACE,
  LIGHT_WEAK,
  WHITE_TO_900_KEYS
} from './tokens';
import type {
  BaseColorKey,
  ColorKey,
  ColorTokens,
  ColorValue,
  DarkLevelOffset,
  LightLevelOffset,
  PrimaryColorKey
} from './types';

/**
 * an ordered level table a token may be shifted along (§4.2)
 */
type LevelTable = readonly (PaletteColorLevel | 'white')[];

/**
 * shift a surface token `offset` steps toward the end of its level table,
 * clamping at the last entry.
 *
 * Tokens whose baseline level is absent from the table are never shifted (D8,
 * e.g. `carbon` is not a shiftable surface).
 */
function shiftToken(palette: string, color: ColorValue, table: LevelTable, offset: number): ColorValue {
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

  return (shifted === 'white' ? 'white' : `${palette}.${shifted}`) as ColorValue;
}

/**
 * split a `ColorValue` into its palette prefix and level when it is a tailwind
 * `palette.level` reference. Simple keywords (`white`/`black`) carry no palette;
 * absolute hsl()/oklch() strings carry neither.
 */
function splitColor(color: ColorValue): { palette: string | null; level: string | null } {
  if (color === 'white') {
    return { palette: null, level: 'white' };
  }

  if (color === 'black') {
    return { palette: null, level: 'black' };
  }

  const parts = color.split('.');

  if (parts.length === 2) {
    return { palette: parts[0], level: parts[1] };
  }

  return { palette: null, level: null };
}

/**
 * derive the dark-mode value for a single color token from its light-mode
 * value, following the theme engine dark-token derivation rules.
 *
 * - the palette is taken from the light value itself when it is a
 *   `palette.level` reference, so feedback/chart/primary overrides resolve on
 *   their own palette (e.g. `success: 'green.500'` → `green.400`);
 * - surfaces/text on the base palette flip through the `LEVEL_FLIP` table
 *   (`white` uses the base palette, raised surfaces darken to `.900`);
 * - `border`/`input`/`sidebarBorder` collapse to the fixed translucent white;
 * - values with no derivable rule (absolute colors, unknown levels) fall back
 *   to the light value, so the dark block simply inherits the light token.
 */
export function deriveDarkFromLight(key: ColorKey, light: ColorValue, basePalette: BaseColorKey): ColorValue {
  if (key === 'border' || key === 'sidebarBorder') {
    return DARK_BORDER;
  }

  if (key === 'input') {
    return DARK_INPUT;
  }

  const { palette, level } = splitColor(light);

  // primary / ring depend on the neutral vs chromatic family of their palette
  if (key === 'primary' || key === 'ring') {
    if (palette === null || level === null) {
      return light;
    }

    const neutral = (NEUTRAL_FAMILY as readonly string[]).includes(palette);

    if (key === 'primary') {
      if (neutral && level === '800') {
        return `${palette}.200` as ColorValue;
      }
      if (!neutral && (level === '500' || level === '600')) {
        return (
          (DARK_PRIMARY_600 as ReadonlySet<string>).has(palette) ? `${palette}.600` : `${palette}.500`
        ) as ColorValue;
      }
      return light;
    }

    if (neutral && level === '400') {
      return `${palette}.500` as ColorValue;
    }
    if (!neutral && level === '400') {
      return `${palette}.900` as ColorValue;
    }
    return light;
  }

  // generic surface / text derivation on the (possibly value-embedded) palette
  const resolvedPalette = palette ?? basePalette;

  if (level === null || resolvedPalette === null) {
    return light;
  }

  if (level === 'white') {
    const darkLevel = (WHITE_TO_900_KEYS.has(key) ? '900' : '950') as string;
    return `${resolvedPalette}.${darkLevel}` as ColorValue;
  }

  if (level === 'black') {
    return light;
  }

  const darkLevel = LEVEL_FLIP[level];

  return darkLevel ? (`${resolvedPalette}.${darkLevel}` as ColorValue) : light;
}

/**
 * derive the built-in base preset (light + dark) from the core 10 keys + §3.2
 * rules, applying the light/dark surface level offsets (§4.2). The sidebar keys
 * are derived downstream from these values, so they follow the shifted surfaces.
 */
export function deriveBasePreset(
  palette: BaseColorKey,
  lightLevel: LightLevelOffset = 0,
  darkLevel: DarkLevelOffset = 0
): { light: ColorTokens; dark: ColorTokens } {
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
 * derive the built-in primary preset (primary + ring + chart) from the core 2
 * keys + the fixed chart template (D7).
 */
export function derivePrimaryPreset(palette: PrimaryColorKey): { light: ColorTokens; dark: ColorTokens } {
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
 * red/green/amber/blue at .500 (light) and .400 (dark).
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
 * derive the sidebar colors from base ⊕ primary (extended preset).
 * light: sidebar = background; dark: sidebar = card.
 */
export function deriveSidebarPreset(extendedPreset: { light: ColorTokens; dark: ColorTokens }): {
  light: ColorTokens;
  dark: ColorTokens;
} {
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
