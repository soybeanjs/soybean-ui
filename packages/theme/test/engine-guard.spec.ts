import { describe, expect, it } from 'vitest';
import { contrastRatio, roundRatio } from '../src/contrast';
import { channelHsl, valueRef } from '../src/guard';
import {
  CORE_NON_TEXT_PAIRS,
  CORE_ON_SOLID_PAIRS,
  CORE_TEXT_PAIRS,
  REGION_NON_TEXT_PAIRS,
  REGION_TEXT_PAIRS,
  SEMANTIC_TOKENS,
  STATUS_NAMES
} from '../src/semantic';
import { resolveThemeMap } from '../src/theme-map';
import type { PaletteKey, SemanticToken, ThemeMode, TokenValue } from '../src/types';

/**
 * P2 —— the contrast guard's acceptance matrix (docs/theme.md §7).
 *
 * Every built-in palette combination is resolved and then *re-measured* from the
 * produced map: the guard's own report is not trusted as evidence, the ratios
 * are computed again here.
 */

const NEUTRALS = [
  'slate',
  'mist',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'taupe',
  'olive',
  'mauve'
] as const satisfies readonly PaletteKey[];
const PRIMARIES = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
] as const;

/** zinc base × every chromatic primary, plus every neutral base × indigo. */
const MATRIX: readonly { base: PaletteKey; primary: PaletteKey }[] = [
  ...PRIMARIES.map((primary): { base: PaletteKey; primary: PaletteKey } => ({ base: 'zinc', primary })),
  ...NEUTRALS.map(base => ({ base, primary: 'indigo' as PaletteKey }))
];

const ratio = (text: TokenValue, surface: TokenValue): number | undefined => {
  const a = channelHsl(text);
  const b = channelHsl(surface);

  return a && b ? contrastRatio(a, b) : undefined;
};

const measurePairs = (
  map: Record<SemanticToken, TokenValue>,
  pairs: readonly { text: SemanticToken; surfaces: readonly SemanticToken[]; min?: number }[],
  threshold: number
): { pair: string; ratio: number; required: number }[] =>
  pairs.flatMap(({ text, surfaces, min }) =>
    surfaces.flatMap(surface => {
      const value = map[text] && map[surface] ? ratio(map[text] as TokenValue, map[surface] as TokenValue) : undefined;

      return value === undefined
        ? []
        : [{ pair: `${text}-on-${surface}`, ratio: roundRatio(value), required: min ?? threshold }];
    })
  );

describe('contrast guard — matrix acceptance', () => {
  it('keeps every declared pair above its threshold across all built-in palettes', () => {
    const failures: string[] = [];

    MATRIX.forEach(({ base, primary }) => {
      const themeMap = resolveThemeMap({ base, primary, contrast: 'aa' });

      (['light', 'dark'] as ThemeMode[]).forEach(mode => {
        const map = themeMap[mode];

        [...measurePairs(map, CORE_TEXT_PAIRS, 4.5), ...measurePairs(map, REGION_TEXT_PAIRS, 4.5)].forEach(
          ({ pair, ratio: value, required }) => {
            if (value < required) {
              failures.push(`${base}/${primary} ${mode} ${pair}=${value} <${required}`);
            }
          }
        );

        [...CORE_NON_TEXT_PAIRS, ...REGION_NON_TEXT_PAIRS].forEach(({ text, surfaces }) => {
          surfaces.forEach(surface => {
            const value =
              map[text] && map[surface] ? ratio(map[text] as TokenValue, map[surface] as TokenValue) : undefined;

            if (value !== undefined && value < 3) {
              failures.push(`${base}/${primary} ${mode} ${text}-on-${surface}=${roundRatio(value)} <3`);
            }
          });
        });

        // on-solid：两个候选中至少一个通过（取较高者）
        CORE_ON_SOLID_PAIRS.forEach(({ fill, text, min }) => {
          const fillValue = map[fill];
          const textValue = map[text];
          const required = min ?? 4.5;

          if (!fillValue || !textValue) {
            return;
          }

          const value = ratio(textValue, fillValue);

          if (value !== undefined && value < required) {
            failures.push(`${base}/${primary} ${mode} ${text}-on-${fill}=${roundRatio(value)} <${required}`);
          }
        });
      });
    });

    expect(failures).toEqual([]);
  });

  it('never reports an uncorrectable pair', () => {
    MATRIX.forEach(({ base, primary }) => {
      const { report } = resolveThemeMap({ base, primary, contrast: 'aa' });

      expect(report.corrections.filter(correction => !correction.passed)).toEqual([]);
    });
  });

  it('applies only a handful of corrections (nominal table is measured, not guessed)', () => {
    const { report } = resolveThemeMap({ base: 'zinc', primary: 'indigo', contrast: 'aa' });

    // 名义表已按实测定档，护栏只是安全网：默认主题应当只出现个位数修正
    expect(report.corrections.length).toBeLessThanOrEqual(4);
    expect(report.corrections.every(correction => correction.steps <= 2)).toBe(true);
  });

  it('treats the aaa policy as a stricter contract', () => {
    const { report } = resolveThemeMap({ base: 'zinc', primary: 'indigo', contrast: 'aaa' });

    expect(report.textThreshold).toBe(7);
    expect(report.corrections.length).toBeGreaterThan(0);
  });

  it('emits nominal values untouched when the policy is off', () => {
    const { report } = resolveThemeMap({ base: 'zinc', primary: 'indigo', contrast: 'off' });

    expect(report.corrections).toEqual([]);
  });

  it('records the guard corrections of the default theme (snapshot)', () => {
    const { report } = resolveThemeMap({ base: 'zinc', primary: 'indigo', contrast: 'aa' });

    expect(report).toMatchSnapshot();
  });

  it('keeps every semantic token present after guarding', () => {
    const themeMap = resolveThemeMap({ base: 'zinc', primary: 'indigo' });

    SEMANTIC_TOKENS.forEach(token => {
      expect(themeMap.light[token], `light ${token}`).toBeDefined();
      expect(themeMap.dark[token], `dark ${token}`).toBeDefined();
    });

    STATUS_NAMES.forEach(name => {
      expect(valueRef(themeMap.light[name] as TokenValue)).toMatch(/\./);
    });
  });
});
