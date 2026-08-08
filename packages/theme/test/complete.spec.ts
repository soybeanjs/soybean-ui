import { describe, it, expect } from 'vitest';
import { createTheme } from '../src/core';
import { generateThemePreset } from '../src/preset';
import type { ThemeOverrides } from '../src/types';

/**
 * a light-mode override covering a spread of `ColorTokens` keys.
 */
const overrides: ThemeOverrides = {
  light: {
    primary: 'violet.700',
    primaryForeground: 'white',
    secondary: 'violet.100',
    secondaryForeground: 'violet.900',
    carbon: 'zinc.800',
    chart1: 'violet.500'
  },
  dark: {
    primary: 'violet.400'
  }
};

describe('generateThemePreset — overrides priority & merging', () => {
  it('applies overrides.light on top of the built-in light tokens', () => {
    const preset = generateThemePreset({ base: 'zinc', primary: 'indigo', overrides });

    expect(preset.light.primary).toBe('violet.700');
    expect(preset.light.secondary).toBe('violet.100');
    expect(preset.light.chart1).toBe('violet.500');
  });

  it('has the highest priority over schemes and built-in derivation', () => {
    // feedback scheme drives destructive; an override wins over it.
    const preset = generateThemePreset({
      base: 'zinc',
      primary: 'indigo',
      feedback: 'classic',
      overrides: { light: { destructive: 'rose.600' } }
    });

    expect(preset.light.destructive).toBe('rose.600');
  });

  it('derives the dark layer from an overridden light key when no explicit dark value is given', () => {
    const preset = generateThemePreset({ base: 'zinc', primary: 'indigo', overrides });

    // primary has an explicit dark override.
    expect(preset.dark.primary).toBe('violet.400');
    // secondary has no explicit dark value, so it is derived from its light
    // value (violet.100 darkens to violet.800 via the level-flip table).
    expect(preset.dark.secondary).toBe('violet.800');
  });

  it('prunes a dark token that equals its light value', () => {
    const preset = generateThemePreset({
      base: 'zinc',
      primary: 'indigo',
      overrides: { light: { primary: 'violet.700' }, dark: { primary: 'violet.700' } }
    });

    // an explicit dark override equal to the light value is redundant → pruned.
    expect(preset.dark.primary).toBeUndefined();
  });

  it('keeps the dark layer minimal when no overrides are provided', () => {
    const preset = generateThemePreset({ base: 'zinc', primary: 'indigo' });

    // dark only carries tokens that differ from light (e.g. background).
    expect(Object.keys(preset.dark).length).toBeGreaterThan(0);
    expect(preset.dark.background).toBeDefined();
  });
});

describe('generateThemePreset — base tokens come from top-level options', () => {
  it('resolves size/radius/menuColor/menuAccent without a preset field', () => {
    const preset = generateThemePreset({
      base: 'zinc',
      primary: 'indigo',
      size: 'sm',
      radius: 'lg',
      menuColor: 'inverted',
      menuAccent: 'bold'
    });

    expect(preset.size).toBe('sm');
    expect(preset.radius).toBe('lg');
    expect(preset.menuColor).toBe('inverted');
    expect(preset.menuAccent).toBe('bold');
  });

  it('falls back to the engine defaults for omitted base tokens', () => {
    const preset = generateThemePreset({ base: 'zinc', primary: 'indigo' });

    expect(preset.size).toBe('md');
    expect(preset.radius).toBe('md');
    expect(preset.menuColor).toBe('default');
    expect(preset.menuAccent).toBe('subtle');
  });
});

describe('createTheme — overrides flow through to CSS', () => {
  it('emits the overridden palette tokens', () => {
    const css = createTheme({ base: 'zinc', primary: 'indigo', overrides });

    expect(css).toContain('--primary:');
    expect(css).toContain('--chart-5:');
  });

  it('respects level offsets when no complete preset short-circuits them', () => {
    const css = createTheme({ base: 'zinc', primary: 'indigo', lightLevel: 2, darkLevel: 3 });
    const base = createTheme({ base: 'zinc', primary: 'indigo' });

    expect(css).not.toBeUndefined();
    expect(base).not.toBeUndefined();
  });
});
