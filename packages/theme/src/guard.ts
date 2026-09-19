import { contrastRatio, roundRatio } from './contrast';
import { PALETTE_LEVELS, paletteChannelHsl, simpleChannelHsl, walkPaletteLevel } from './palette';
import type {
  ContrastCorrection,
  ContrastPolicy,
  ContrastReport,
  PaletteKey,
  PaletteLevel,
  SemanticToken,
  TextPair,
  ThemeMode,
  TokenValue
} from './types';

/**
 * The contrast guard (docs/theme.md §7).
 *
 * Two levers fix an unreadable pair: **(A)** pick the on-solid text color that
 * passes, **(B)** walk a palette level toward the direction that increases
 * contrast. Every change is bounded (so the result stays layered) and recorded
 * in a report, which makes the correction set snapshot-testable and visible.
 *
 * The guard runs on a mode's token map and treats it as immutable: a corrected
 * copy plus the report is returned.
 */

const MAX_TEXT_STEPS = 4;
const MAX_FILL_STEPS = 2;

/**
 * thresholds by policy: text pairs need 4.5 (`aa`) or 7 (`aaa`); non-text pairs
 * always follow WCAG 1.4.11 (3:1) because they are UI boundaries, not content.
 */
export function thresholds(policy: ContrastPolicy): { text: number; nonText: number } {
  return { text: policy === 'aaa' ? 7 : 4.5, nonText: 3 };
}

/**
 * the hsl channel of a token value, for measurement.
 */
export function channelHsl(value: TokenValue): string | undefined {
  if (value.kind === 'palette') {
    return paletteChannelHsl(value.palette, value.level);
  }

  return value.kind === 'simple' ? simpleChannelHsl(value.name) : undefined;
}

/**
 * the `palette.level` / `white` / `black` reference of a token value, for reports.
 */
export function valueRef(value: TokenValue): string {
  if (value.kind === 'palette') {
    return `${value.palette}.${value.level}`;
  }

  return value.kind === 'simple' ? value.name : value.value;
}

/**
 * the contrast ratio between two token values, or `undefined` when either side
 * cannot be measured (raw values are not level-bearing).
 */
export function ratioOf(a: TokenValue, b: TokenValue): number | undefined {
  const channelA = channelHsl(a);
  const channelB = channelHsl(b);

  return channelA && channelB ? contrastRatio(channelA, channelB) : undefined;
}

/**
 * walk a palette value along the level ramp.
 *
 * `deeper` moves toward 950 (dark text on light surfaces needs a darker fill),
 * `lighter` toward 50. Returns `undefined` at the palette end, so callers stop
 * instead of oscillating.
 */
export function walkLevel(value: TokenValue, direction: 'deeper' | 'lighter'): TokenValue | undefined {
  if (value.kind !== 'palette') {
    return undefined;
  }

  if (!PALETTE_LEVELS.includes(value.level)) {
    return undefined;
  }

  const level = walkPaletteLevel(value.level, 1, direction);

  return level === value.level ? undefined : { kind: 'palette', palette: value.palette, level };
}

/**
 * the on-solid text candidates: the base palette's extremes (light text in dark
 * mode and vice versa are both evaluated, the guard picks the higher contrast).
 */
export function textCandidates(base: PaletteKey): { light: TokenValue; dark: TokenValue } {
  return {
    light: { kind: 'palette', palette: base, level: 50 as PaletteLevel },
    dark: { kind: 'palette', palette: base, level: 950 as PaletteLevel }
  };
}

/**
 * the guard input: the token map plus the policy, mode and candidate palette.
 */
export interface GuardContext {
  mode: ThemeMode;
  policy: ContrastPolicy;
  /** the base palette whose extremes are the on-solid text candidates. */
  base: PaletteKey;
}

/**
 * the pair sets a guard pass verifies. Core pairs run before the region mirrors
 * are derived; region pairs run afterwards (a region may be inverted, e.g. a
 * dark sidebar in light mode).
 */
export interface GuardPairs {
  text: readonly TextPair[];
  nonText: readonly TextPair[];
  onSolid: readonly { fill: SemanticToken; text: SemanticToken; prefer: 'light' | 'dark' | 'auto'; min?: number }[];
}

/**
 * run one guard pass over a mode's token map.
 */
export function runContrastGuard(
  map: Partial<Record<SemanticToken, TokenValue>>,
  context: GuardContext,
  pairs: GuardPairs
): { map: Partial<Record<SemanticToken, TokenValue>>; report: ContrastReport } {
  const { mode, policy, base } = context;
  const { text: textThreshold, nonText: nonTextThreshold } = thresholds(policy);

  if (policy === 'off') {
    return { map, report: { policy, textThreshold, nonTextThreshold, corrections: [] } };
  }

  const working: Partial<Record<string, TokenValue>> = { ...map };
  const corrections: ContrastCorrection[] = [];

  /**
   * lever B：把文字 token 沿色板走到通过阈值为止（亮色更深、暗色更浅）。
   */
  const ensureContrast = (text: SemanticToken, surface: SemanticToken, threshold: number): void => {
    const initial = working[text];
    const background = working[surface];

    if (!initial || !background) {
      return;
    }

    const initialRatio = ratioOf(initial, background);

    if (initialRatio === undefined || initialRatio >= threshold) {
      return;
    }

    for (let steps = 1; steps <= MAX_TEXT_STEPS; steps++) {
      const current = working[text];
      const next = current ? walkLevel(current, mode === 'light' ? 'deeper' : 'lighter') : undefined;

      if (!next) {
        break;
      }

      working[text] = next;
      const ratio = ratioOf(next, background);

      if (ratio !== undefined && ratio >= threshold) {
        corrections.push({
          mode,
          pair: `${text}-on-${surface}`,
          token: text,
          before: valueRef(initial),
          after: valueRef(next),
          steps,
          ratio: roundRatio(ratio),
          passed: true
        });

        return;
      }
    }

    corrections.push({
      mode,
      pair: `${text}-on-${surface}`,
      token: text,
      before: valueRef(initial),
      after: valueRef(working[text] ?? initial),
      steps: MAX_TEXT_STEPS,
      ratio: roundRatio(initialRatio),
      passed: false
    });
  };

  const runPairs = (list: readonly TextPair[], threshold: number): void =>
    list.forEach(({ text, surfaces: targets, min }) =>
      targets.forEach(surface => ensureContrast(text, surface, min ?? threshold))
    );

  runPairs(pairs.text, textThreshold);
  runPairs(pairs.nonText, nonTextThreshold);

  /**
   * lever A：on-solid 先选字色；两个候选都不通过时走填充档（远离所选文字）。
   */
  pairs.onSolid.forEach(({ fill, text, prefer, min }) => {
    const fillValue = working[fill];

    if (!fillValue) {
      return;
    }

    const candidates = textCandidates(base);
    const scored = [
      { side: 'light' as const, value: candidates.light, ratio: ratioOf(candidates.light, fillValue) },
      { side: 'dark' as const, value: candidates.dark, ratio: ratioOf(candidates.dark, fillValue) }
    ].filter(
      (entry): entry is { side: 'light' | 'dark'; value: TokenValue; ratio: number } => entry.ratio !== undefined
    );

    const threshold = min ?? textThreshold;

    const passing = scored.filter(entry => entry.ratio >= threshold);
    const chosen =
      prefer === 'auto'
        ? [...passing].sort((a, b) => b.ratio - a.ratio)[0]
        : (passing.find(entry => entry.side === prefer) ?? passing[0]);

    if (chosen) {
      // 字色选择是 on-solid 的常规解析（不是修正），只有走填充档才记入报告
      working[text] = chosen.value;

      return;
    }

    // 两个候选在名义填充上都不通过：走填充档，优先满足 prefer
    const wanted = prefer === 'dark' ? candidates.dark : candidates.light;
    const direction = prefer === 'dark' ? 'lighter' : 'deeper';
    const before = valueRef(fillValue);

    for (let steps = 1; steps <= MAX_FILL_STEPS; steps++) {
      const current = working[fill];
      const next = current ? walkLevel(current, direction) : undefined;

      if (!next) {
        break;
      }

      working[fill] = next;
      const ratio = ratioOf(wanted, next);

      if (ratio !== undefined && ratio >= threshold) {
        working[text] = wanted;
        corrections.push({
          mode,
          pair: `${text}-on-${fill}`,
          token: fill,
          before,
          after: valueRef(next),
          steps,
          ratio: roundRatio(ratio),
          passed: true
        });

        return;
      }
    }

    const fallback = [...scored].sort((a, b) => b.ratio - a.ratio)[0];

    if (fallback) {
      working[text] = fallback.value;
    }

    corrections.push({
      mode,
      pair: `${text}-on-${fill}`,
      token: fill,
      before,
      after: valueRef(working[fill] ?? fillValue),
      steps: MAX_FILL_STEPS,
      ratio: roundRatio(fallback?.ratio ?? 0),
      passed: false
    });
  });

  return {
    map: working as Partial<Record<SemanticToken, TokenValue>>,
    report: { policy, textThreshold, nonTextThreshold, corrections }
  };
}
