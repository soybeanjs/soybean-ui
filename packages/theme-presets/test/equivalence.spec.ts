import { describe, expect, it } from 'vitest';
import { createTheme } from '@soybeanjs/theme';
import type { BuiltinBasePresetKey, CustomThemeColorPreset } from '@soybeanjs/theme';
import {
  baseGray,
  baseMauve,
  baseMist,
  baseNeutral,
  baseOlive,
  baseSlate,
  baseStone,
  baseTaupe,
  baseZinc
} from '../src/generated';
import { chartDefault } from '../src/generated/chart/default';
import { feedbackClassic } from '../src/generated/feedback/classic';
import { themeSoybean } from '../src/generated/theme/soybean';

const primary = 'blue';

const basePresets: Array<{ key: BuiltinBasePresetKey; preset: CustomThemeColorPreset }> = [
  { key: 'slate', preset: baseSlate },
  { key: 'mist', preset: baseMist },
  { key: 'gray', preset: baseGray },
  { key: 'zinc', preset: baseZinc },
  { key: 'neutral', preset: baseNeutral },
  { key: 'stone', preset: baseStone },
  { key: 'taupe', preset: baseTaupe },
  { key: 'olive', preset: baseOlive },
  { key: 'mauve', preset: baseMauve }
];

describe('baseline equivalence', () => {
  for (const { key, preset } of basePresets) {
    it(`base.${key} preset reproduces the builtin baseline`, () => {
      expect(createTheme({ base: key, primary, preset })).toBe(createTheme({ base: key, primary }));
    });
  }

  it('feedback.classic preset reproduces the builtin baseline', () => {
    expect(createTheme({ base: 'zinc', primary, preset: feedbackClassic })).toBe(
      createTheme({ base: 'zinc', primary })
    );
  });

  it('chart.default preset reproduces the builtin baseline', () => {
    expect(createTheme({ base: 'zinc', primary, preset: chartDefault })).toBe(createTheme({ base: 'zinc', primary }));
  });
});

describe('theme dimension', () => {
  it('theme.soybean preset is consumed and overrides the baseline', () => {
    const baseline = createTheme({ base: 'zinc', primary });
    const themed = createTheme({ base: 'zinc', primary, preset: themeSoybean });

    expect(themed).not.toBe(baseline);
    // overridden palette/ring keys surface in the generated CSS
    expect(themed).toContain('--primary-600');
    expect(themed).toContain('--ring');
  });
});
