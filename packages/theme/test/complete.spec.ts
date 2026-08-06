import { describe, it, expect } from 'vitest';
import { createTheme } from '../src/core';
import { generateThemePreset, isCompleteThemePreset } from '../src/preset';
import type { ColorTokens, ThemePreset } from '../src/types';

/**
 * a full light token set covering every `ColorTokens` key.
 */
const completeLight: ColorTokens = {
  background: 'white',
  foreground: 'zinc.950',
  card: 'white',
  cardForeground: 'zinc.950',
  popover: 'white',
  popoverForeground: 'zinc.950',
  primary: 'violet.700',
  primaryForeground: 'white',
  secondary: 'violet.100',
  secondaryForeground: 'violet.900',
  muted: 'violet.100',
  mutedForeground: 'violet.500',
  accent: 'violet.100',
  accentForeground: 'violet.900',
  destructive: 'red.500',
  destructiveForeground: 'white',
  border: 'violet.200',
  input: 'violet.200',
  ring: 'violet.500',
  success: 'green.500',
  successForeground: 'white',
  warning: 'amber.500',
  warningForeground: 'white',
  info: 'blue.500',
  infoForeground: 'white',
  carbon: 'zinc.800',
  carbonForeground: 'white',
  sidebar: 'white',
  sidebarForeground: 'zinc.950',
  sidebarPrimary: 'violet.700',
  sidebarPrimaryForeground: 'white',
  sidebarAccent: 'violet.100',
  sidebarAccentForeground: 'violet.900',
  sidebarBorder: 'violet.200',
  sidebarRing: 'violet.500',
  chart1: 'violet.500',
  chart2: 'sky.500',
  chart3: 'emerald.500',
  chart4: 'amber.500',
  chart5: 'rose.500'
};

const completePreset: ThemePreset = {
  name: 'custom',
  light: completeLight,
  dark: { primary: 'violet.400' }
};

describe('isCompleteThemePreset — completeness detection', () => {
  it('returns true for a mode-split preset whose light covers every color token', () => {
    expect(isCompleteThemePreset(completePreset)).toBe(true);
  });

  it('returns false for a partial light', () => {
    expect(isCompleteThemePreset({ light: { primary: 'violet.700' } })).toBe(false);
  });

  it('returns false for a flat ThemeTokens override (no light/dark layers)', () => {
    expect(isCompleteThemePreset({ primary: 'violet.700' })).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isCompleteThemePreset(undefined)).toBe(false);
  });
});

describe('generateThemePreset — complete preset + complete enabled', () => {
  it('applies the provided light tokens as-is', () => {
    const preset = generateThemePreset({ base: 'zinc', primary: 'indigo', preset: completePreset, complete: true });

    expect(preset.light).toEqual(completeLight);
  });

  it('skips the built-in derivation so lightLevel/darkLevel are ignored', () => {
    const level0 = generateThemePreset({ base: 'zinc', primary: 'indigo', preset: completePreset, complete: true });
    const shifted = generateThemePreset({
      base: 'zinc',
      primary: 'indigo',
      preset: completePreset,
      lightLevel: 2,
      darkLevel: 3,
      complete: true
    });

    expect(shifted.light).toEqual(level0.light);
    expect(shifted.dark).toEqual(level0.dark);
  });

  it('still derives the dark layer from the light values', () => {
    const preset = generateThemePreset({ base: 'zinc', primary: 'indigo', preset: completePreset, complete: true });

    expect(preset.dark.primary).toBe('violet.400');
    // a light key without an explicit dark value is derived, not left as the light value
    expect(preset.dark.background).toBe('zinc.950');
  });
});

describe('generateThemePreset — behavior parity', () => {
  it('complete enabled vs disabled produce identical tokens for a complete preset at level 0', () => {
    const disabled = generateThemePreset({ base: 'zinc', primary: 'indigo', preset: completePreset });
    const enabled = generateThemePreset({ base: 'zinc', primary: 'indigo', preset: completePreset, complete: true });

    expect(enabled).toEqual(disabled);
  });

  it('for a complete preset, level offsets never change the resolved tokens (skip is a pure optimization)', () => {
    const level0 = generateThemePreset({ base: 'zinc', primary: 'indigo', preset: completePreset, complete: true });
    const shifted = generateThemePreset({
      base: 'zinc',
      primary: 'indigo',
      preset: completePreset,
      lightLevel: 2,
      darkLevel: 3,
      complete: true
    });

    expect(shifted).toEqual(level0);
  });
});

describe('generateThemePreset — incomplete preset + complete enabled', () => {
  it('falls back to the built-in derivation (equals complete disabled)', () => {
    const partial: ThemePreset = { light: { primary: 'red.600' }, dark: { primary: 'red.400' } };
    const disabled = generateThemePreset({ base: 'zinc', primary: 'indigo', preset: partial });
    const enabled = generateThemePreset({ base: 'zinc', primary: 'indigo', preset: partial, complete: true });

    expect(enabled).toEqual(disabled);
    expect(enabled.light.primary).toBe('red.600');
  });
});

describe('createTheme — complete preset + complete enabled', () => {
  it('emits CSS and ignores level offsets', () => {
    const css = createTheme({ preset: completePreset, complete: true });
    const shifted = createTheme({ preset: completePreset, complete: true, lightLevel: 2, darkLevel: 3 });

    expect(css).toContain('--primary:');
    expect(css).toContain('--chart-5:');
    expect(shifted).toBe(css);
  });

  it('for a complete preset, disabling complete also produces stable CSS (skip is a pure optimization)', () => {
    const css = createTheme({ preset: completePreset });
    const shifted = createTheme({ preset: completePreset, lightLevel: 2 });

    expect(shifted).toBe(css);
  });
});
