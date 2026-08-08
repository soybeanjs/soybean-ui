import type { PaletteColorLevel } from '@soybeanjs/colord/palette';
import {
  createBaseCore,
  createChromaticPrimaryCore,
  createNeutralPrimaryCore,
  DARK_PRIMARY_600
} from './core-template';
import { getRegistry, NEUTRAL_FAMILY } from './registry';
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
  const core = createBaseCore(palette);

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
  } as { light: ColorTokens; dark: ColorTokens };
}

/**
 * resolve the family of a primary palette (neutral vs chromatic) from the
 * runtime registry, falling back to the built-in family sets.
 */
function resolvePrimaryFamily(palette: PrimaryColorKey): 'neutral' | 'chromatic' {
  const registered = getRegistry().primary[palette];

  if (registered) {
    return registered.family;
  }

  return (NEUTRAL_FAMILY as readonly string[]).includes(palette) ? 'neutral' : 'chromatic';
}

/**
 * derive the primary preset (primary + ring) from the core 2 keys. Chart colors
 * are no longer merged here; they come from the chart scheme (D7 → scheme).
 */
export function derivePrimaryPreset(
  palette: PrimaryColorKey,
  family: 'neutral' | 'chromatic' = resolvePrimaryFamily(palette)
): { light: ColorTokens; dark: ColorTokens } {
  const core = family === 'neutral' ? createNeutralPrimaryCore(palette) : createChromaticPrimaryCore(palette);

  return {
    light: { ...core.light },
    dark: { ...core.dark }
  };
}
