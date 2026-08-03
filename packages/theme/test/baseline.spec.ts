import { describe, it, expect } from 'vitest';
import {
  builtinBasePreset,
  builtinFeedbackPreset,
  builtinPrimaryPreset,
  builtinBasePresetKeys,
  builtinPrimaryPresetKeys,
  createShadcnTheme
} from '@soybeanjs/shadcn-theme';
import type { ThemeColorPreset } from '@soybeanjs/shadcn-theme';
import { createTheme } from '../src/core';
import { CHART_TEMPLATE } from '../src/core-template';
import { generateThemePreset } from '../src/preset';

const NEUTRAL_PRIMARY: readonly string[] = [
  'slate',
  'mist',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'taupe',
  'olive',
  'mauve'
];

const CHART_KEYS: readonly string[] = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5'];

/**
 * rebuild the baseline shadcn-theme preset exactly as its generateThemePreset does:
 * base ⊕ primary ⊕ feedback(classic) ⊕ sidebar
 */
function buildBaselinePreset(
  base: (typeof builtinBasePresetKeys)[number],
  primary: (typeof builtinPrimaryPresetKeys)[number]
): ThemeColorPreset {
  const basePreset = builtinBasePreset[base];
  const primaryPreset = builtinPrimaryPreset[primary];
  const feedbackPreset = builtinFeedbackPreset.classic;

  const sidebarPreset = {
    light: {
      sidebar: basePreset.light.background,
      sidebarForeground: basePreset.light.foreground,
      sidebarPrimary: primaryPreset.light.primary,
      sidebarPrimaryForeground: basePreset.light.primaryForeground,
      sidebarAccent: basePreset.light.accent,
      sidebarAccentForeground: basePreset.light.accentForeground,
      sidebarBorder: basePreset.light.border,
      sidebarRing: primaryPreset.light.ring
    },
    dark: {
      sidebar: basePreset.dark.card,
      sidebarForeground: basePreset.dark.foreground,
      sidebarPrimary: primaryPreset.dark.primary,
      sidebarPrimaryForeground: basePreset.dark.primaryForeground,
      sidebarAccent: basePreset.dark.accent,
      sidebarAccentForeground: basePreset.dark.accentForeground,
      sidebarBorder: basePreset.dark.border,
      sidebarRing: primaryPreset.dark.ring
    }
  };

  return {
    light: { ...basePreset.light, ...primaryPreset.light, ...feedbackPreset.light, ...sidebarPreset.light },
    dark: { ...basePreset.dark, ...primaryPreset.dark, ...feedbackPreset.dark, ...sidebarPreset.dark }
  };
}

describe('baseline parity with @soybeanjs/shadcn-theme (level 0,0)', () => {
  it('every 9×26 base/primary combo matches, except chart1-5 for chromatic primaries (§3.3)', () => {
    for (const base of builtinBasePresetKeys) {
      for (const primary of builtinPrimaryPresetKeys) {
        const mine = generateThemePreset({ base, primary });
        const baseline = buildBaselinePreset(base, primary);
        const isChromatic = !NEUTRAL_PRIMARY.includes(primary);

        for (const mode of ['light', 'dark'] as const) {
          for (const key of Object.keys(baseline[mode]) as (keyof ThemeColorPreset['light'])[]) {
            if (isChromatic && CHART_KEYS.includes(key)) {
              continue;
            }

            expect(mine[mode][key], `${base}/${primary} ${mode}.${String(key)}`).toBe(baseline[mode][key]);
          }
        }
      }
    }
  });

  it('chromatic primaries now reuse the fixed chart template instead of the {p} family (D7)', () => {
    for (const primary of builtinPrimaryPresetKeys) {
      if (NEUTRAL_PRIMARY.includes(primary)) {
        continue;
      }

      const mine = generateThemePreset({ base: 'zinc', primary });

      expect(mine.light.chart1).toBe(CHART_TEMPLATE.light.chart1);
      expect(mine.light.chart5).toBe(CHART_TEMPLATE.light.chart5);
      expect(mine.dark.chart1).toBe(CHART_TEMPLATE.dark.chart1);
      expect(mine.dark.chart5).toBe(CHART_TEMPLATE.dark.chart5);
    }
  });

  it('CSS output is byte-identical to shadcn-theme for every neutral-primary combo', () => {
    for (const base of builtinBasePresetKeys) {
      const css = createTheme({ base, primary: base });
      const baseline = createShadcnTheme({ base, primary: base }).getCss();

      expect(css, base).toBe(baseline);
    }
  });

  it('default zinc/indigo CSS matches shadcn-theme except for the chart1-5 variables', () => {
    const css = createTheme();
    const baseline = createShadcnTheme().getCss();

    const diff = baseline.split('\n').filter(line => css.split('\n').indexOf(line) === -1);

    expect(diff.filter(line => !/^--chart-[1-5]:/.test(line))).toEqual([]);
    // baseline emits 5 chart lines in the light block (dark duplicates are collapsed);
    // the new fixed template replaces all 5 with different values
    expect(diff).toHaveLength(5);
  });
});
