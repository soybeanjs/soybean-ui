import { isPaletteLevelRef, resolveRadiusValue, resolveSizeValue } from './shared';
import { roundRatio } from './contrast';
import { DEFAULT_OPTIONS } from './defaults';
import { ratioOf, runContrastGuard, thresholds, valueRef } from './guard';
import { literalTokens } from './literals';
import { isNeutralFamily, walkPaletteLevel } from './palette';
import { chartScheme, feedbackScheme, splitLevelRef } from './schemes';
import {
  ACTIVE_ROLES,
  ALPHA_RULES,
  CHART_TOKENS,
  CORE_NON_TEXT_PAIRS,
  CORE_ON_SOLID_PAIRS,
  CORE_RULES,
  CORE_TEXT_PAIRS,
  REGION_NON_TEXT_PAIRS,
  REGION_TEXT_PAIRS,
  SHIFT_TOKENS,
  STATUS_NAMES,
  STATUS_ROLE_LEVELS,
  STATUS_SUFFIXES
} from './semantic';
import type { StatusName } from './semantic';
import type {
  ContrastCorrection,
  LiteralToken,
  ContrastPolicy,
  FeedbackSchemeKey,
  PaletteKey,
  PaletteLevel,
  SemanticToken,
  SurfaceStyle,
  ThemeMap,
  ThemeMode,
  ThemeOptions,
  TokenRule,
  TokenValue
} from './types';

/**
 * Resolve the theme map (docs/theme.md §2, §4, §6).
 *
 * Pipeline: nominal level rules → ladder shift (the level knob) → contrast
 * guard → region mirrors → literal (non-color) layer. Everything is pure data:
 * no CSS, no DOM, no color math except the guard's contrast checks.
 */

/**
 * how far each shifted token moves per level step, in "recessive" direction:
 * light mode walks toward 950 (a darker page), dark mode toward 50 (a lifted
 * dark theme).
 */

/**
 * the ladder-shift direction of a mode: light walks toward 950 (a darker page),
 * dark toward 50 (a lifted dark theme).
 */
function shiftDirection(mode: ThemeMode): 'deeper' | 'lighter' {
  return mode === 'light' ? 'deeper' : 'lighter';
}

/**
 * resolve a `level` rule to a token value, honoring the neutral-`primary`
 * override and the surface-level shift.
 */
function resolveLevelRule(
  rule: Extract<TokenRule, { kind: 'level' }>,
  token: SemanticToken,
  context: { mode: ThemeMode; base: PaletteKey; primary: PaletteKey; shift: number }
): TokenValue {
  const { mode, base, primary, shift } = context;
  const neutral = rule.source === 'primary' && isNeutralFamily(primary);
  const level = neutral && rule.neutral ? rule.neutral : rule;
  const nominal = mode === 'light' ? level.light : level.dark;
  const palette = rule.source === 'base' ? base : primary;

  if (nominal === 'white') {
    return { kind: 'simple', name: 'white' };
  }

  const shouldShift = shift > 0 && (SHIFT_TOKENS[mode] as readonly SemanticToken[]).includes(token);
  const finalLevel = shouldShift ? walkPaletteLevel(nominal, shift, shiftDirection(mode)) : nominal;

  return { kind: 'palette', palette, level: finalLevel };
}

/**
 * the `surfaceStyle: 'flat'` extremes: the pre-refactor look where the raised
 * surfaces sit on the page tone instead of being separated from it.
 */
function flatOverrides(mode: ThemeMode, base: PaletteKey): Partial<Record<SemanticToken, TokenValue>> {
  const extreme = (level: PaletteLevel): TokenValue => ({ kind: 'palette', palette: base, level });

  return {
    background: mode === 'light' ? { kind: 'simple', name: 'white' } : extreme(950),
    surface: mode === 'light' ? { kind: 'simple', name: 'white' } : extreme(900),
    elevated: mode === 'light' ? { kind: 'simple', name: 'white' } : extreme(900)
  };
}

/**
 * the palette of a status role, taken from the feedback scheme so schemes stay
 * swappable (`red.500` → palette `red`).
 */
function statusPalette(schemeValue: string | undefined, fallback: PaletteKey): PaletteKey {
  const palette = schemeValue?.split('.')[0];

  return (palette || fallback) as PaletteKey;
}

/**
 * build the nominal (pre-guard) token map of one mode.
 */
function buildNominalMap(options: {
  mode: ThemeMode;
  base: PaletteKey;
  primary: PaletteKey;
  feedback: FeedbackSchemeKey;
  chart: string;
  lightLevel: number;
  darkLevel: number;
  surfaceStyle: SurfaceStyle;
}): Partial<Record<SemanticToken, TokenValue>> {
  const { mode, base, primary, feedback, chart, lightLevel, darkLevel, surfaceStyle } = options;
  const shift = mode === 'light' ? lightLevel : darkLevel;
  const entries: [SemanticToken, TokenValue][] = [];

  Object.entries(CORE_RULES).forEach(([name, rule]) => {
    const token = name as SemanticToken;

    if (rule.kind === 'level') {
      entries.push([token, resolveLevelRule(rule, token, { mode, base, primary, shift })]);

      return;
    }

    if (rule.kind === 'simple') {
      entries.push([token, { kind: 'simple', name: mode === 'light' ? rule.light : rule.dark }]);

      return;
    }

    if (rule.kind === 'on-solid') {
      // 名义值 = 声明的偏好侧；护栏只负责在必要时改写（`off` 时保持名义值）
      entries.push([
        token,
        { kind: 'palette', palette: base, level: (rule.prefer === 'dark' ? 950 : 50) as PaletteLevel }
      ]);

      return;
    }

    // `mirror` 在镜像阶段解析
  });

  const statusValues = (mode === 'light' ? feedbackScheme(feedback).light : feedbackScheme(feedback).dark) ?? {};
  const chartValues = (mode === 'light' ? chartScheme(chart).light : chartScheme(chart).dark) ?? {};

  STATUS_NAMES.forEach((name: StatusName) => {
    const schemeValue = statusValues[name];
    const palette = statusPalette(schemeValue, base);
    const solidLevel = (schemeValue ? splitLevelRef(schemeValue).level : 500) as PaletteLevel;

    entries.push([name, { kind: 'palette', palette, level: solidLevel }]);

    // on-solid 名义值 = 偏好侧（`auto` 取浅色），护栏在必要时改写
    entries.push([`${name}-foreground` as SemanticToken, { kind: 'palette', palette: base, level: 50 }]);

    Object.entries(STATUS_ROLE_LEVELS).forEach(([suffix, levels]) => {
      entries.push([
        `${name}${suffix}` as SemanticToken,
        { kind: 'palette', palette, level: (mode === 'light' ? levels.light : levels.dark) as PaletteLevel }
      ]);
    });
  });

  CHART_TOKENS.forEach(token => {
    const { palette, level } = splitLevelRef(chartValues[token] ?? `${base}.500`);

    entries.push([token, { kind: 'palette', palette, level }]);
  });

  const nominal = Object.fromEntries(entries) as Partial<Record<SemanticToken, TokenValue>>;

  return surfaceStyle === 'flat' ? { ...nominal, ...flatOverrides(mode, base) } : nominal;
}

/**
 * assert the map carries every semantic token.
 *
 * A missing key means the guard / mirror stage silently dropped it (the
 * pre-refactor `sidebarDerive: false` bug class), so it fails loudly instead of
 * emitting a half-themed stylesheet.
 */
function requireComplete(map: Partial<Record<SemanticToken, TokenValue>>): Record<SemanticToken, TokenValue> {
  const missing = (Object.keys({ ...CORE_RULES }) as SemanticToken[])
    .concat(
      STATUS_NAMES.flatMap(name => STATUS_SUFFIXES.map(suffix => `${name}${suffix}` as SemanticToken)),
      ACTIVE_ROLES.map(role => `${role}-active` as SemanticToken),
      [...CHART_TOKENS]
    )
    .filter(token => map[token] === undefined);

  if (missing.length > 0) {
    throw new Error(`[@vean/theme] theme map is missing tokens: ${missing.join(', ')}`);
  }

  return map as Record<SemanticToken, TokenValue>;
}

/**
 * resolve the region mirrors from the (already guarded) global tokens.
 */
function resolveMirrors(
  map: Partial<Record<SemanticToken, TokenValue>>,
  mode: ThemeMode
): Partial<Record<SemanticToken, TokenValue>> {
  const rules = Object.entries(CORE_RULES).filter(([, rule]) => rule.kind === 'mirror');

  return rules.reduce<Partial<Record<SemanticToken, TokenValue>>>(
    (acc, [token, rule]) => {
      if (rule.kind !== 'mirror') {
        return acc;
      }

      const target = mode === 'light' ? rule.light : rule.dark;
      const value = map[target];

      return value ? { ...acc, [token]: value } : acc;
    },
    { ...map }
  );
}

/**
 * the literal (non-color) layer: dimension, elevation shadows, motion, layering
 * and typography tokens (docs/theme.md §4.9).
 */
function buildLiterals(options: ThemeOptions): Record<LiteralToken, string> {
  return literalTokens({
    size: resolveSizeValue(options.size),
    radius: resolveRadiusValue(options.radius),
    prefix: options.prefix ?? DEFAULT_OPTIONS.prefix
  });
}

/**
 * parse an override value into a token value.
 *
 * A `palette.level` reference stays a reference (so the palette layer can still
 * be swapped); anything else must be a complete color, which is emitted as-is
 * and cannot be walked by the guard (there is no level to move).
 */
function parseOverride(value: string): TokenValue {
  if (isPaletteLevelRef(value)) {
    const { palette, level } = splitLevelRef(value);

    return { kind: 'palette', palette, level };
  }

  return { kind: 'color', value };
}

/**
 * apply explicit overrides and *report* (never correct) any pair they break.
 *
 * An override is user intent, so it wins over the guard; but silently shipping a
 * pair the author broke would be worse, hence the `overridden: true` entries.
 */
function applyOverrides(
  map: Record<SemanticToken, TokenValue>,
  overrides: Partial<Record<SemanticToken, string>> | undefined,
  context: { mode: ThemeMode; policy: ContrastPolicy; base: PaletteKey }
): { map: Record<SemanticToken, TokenValue>; report: ContrastCorrection[] } {
  const entries = Object.entries(overrides ?? {}) as [SemanticToken, string][];

  if (entries.length === 0) {
    return { map, report: [] };
  }

  const overridden = Object.fromEntries(entries.map(([token, value]) => [token, parseOverride(value)])) as Partial<
    Record<SemanticToken, TokenValue>
  >;
  const next = { ...map, ...overridden };
  const { text: textThreshold, nonText: nonTextThreshold } = thresholds(context.policy);
  const pairs = [
    ...[...CORE_TEXT_PAIRS, ...REGION_TEXT_PAIRS].map(pair => ({ ...pair, threshold: pair.min ?? textThreshold })),
    ...[...CORE_NON_TEXT_PAIRS, ...REGION_NON_TEXT_PAIRS].map(pair => ({ ...pair, threshold: nonTextThreshold }))
  ];

  const report = pairs.flatMap(({ text, surfaces, threshold }) => {
    if (overridden[text] === undefined) {
      return [];
    }

    return surfaces.flatMap(surface => {
      const background = next[surface];

      if (!background) {
        return [];
      }

      const ratio = ratioOf(next[text] as TokenValue, background);

      return ratio === undefined || ratio >= threshold
        ? []
        : [
            {
              mode: context.mode,
              pair: `${text}-on-${surface}`,
              token: text,
              before: valueRef(overridden[text] as TokenValue),
              after: valueRef(overridden[text] as TokenValue),
              steps: 0,
              ratio: roundRatio(ratio),
              passed: false,
              overridden: true
            }
          ];
    });
  });

  void context.base;

  return { map: next, report };
}

/**
 * derive the pressed companions (`{role}-active`) from the guarded solids.
 *
 * The pressed fill walks one palette step in whichever direction keeps the
 * *chosen* text readable (the text token is shared between the resting and the
 * pressed state); if one step is not enough it walks once more (bounded).
 */
function deriveActiveTokens(
  map: Partial<Record<SemanticToken, TokenValue>>,
  mode: ThemeMode,
  threshold: number
): Partial<Record<SemanticToken, TokenValue>> {
  const source = map as Record<string, TokenValue>;

  return ACTIVE_ROLES.reduce<Record<string, TokenValue>>((acc, role) => {
    const solid = source[role];
    const text = source[role === 'carbon' ? 'carbon-foreground' : `${role}-foreground`];

    if (!solid || solid.kind !== 'palette' || !text) {
      return acc;
    }

    const score = (level: PaletteLevel): number =>
      ratioOf({ kind: 'palette', palette: solid.palette, level }, text) ?? 0;
    const deeper = walkPaletteLevel(solid.level, 1, 'deeper');
    const lighter = walkPaletteLevel(solid.level, 1, 'lighter');
    const useDeeper = score(deeper) >= score(lighter);

    let level = useDeeper ? deeper : lighter;
    let steps = 1;

    while (steps < 2 && score(level) < threshold) {
      const next = walkPaletteLevel(level, 1, useDeeper ? 'deeper' : 'lighter');

      if (next === level) {
        break;
      }

      level = next;
      steps++;
    }

    acc[`${role}-active`] = { kind: 'palette', palette: solid.palette, level };

    return acc;
  }, source) as Partial<Record<SemanticToken, TokenValue>>;
}

/**
 * resolve the full theme map for the given options.
 */
export function resolveThemeMap(options: ThemeOptions = {}): ThemeMap {
  const base = (options.base ?? DEFAULT_OPTIONS.base) as PaletteKey;
  const primary = (options.primary ?? DEFAULT_OPTIONS.primary) as PaletteKey;
  const policy: ContrastPolicy = options.contrast ?? 'aa';
  const surfaceStyle: SurfaceStyle = options.surfaceStyle ?? DEFAULT_OPTIONS.surfaceStyle;
  const lightLevel = Number(options.lightLevel ?? DEFAULT_OPTIONS.lightLevel);
  const darkLevel = Number(options.darkLevel ?? DEFAULT_OPTIONS.darkLevel);
  const borderOpacity = options.borderOpacity ?? DEFAULT_OPTIONS.borderOpacity;
  const literal = buildLiterals(options);

  const buildMode = (mode: ThemeMode): { map: Record<SemanticToken, TokenValue>; report: ThemeMap['report'] } => {
    const nominal = buildNominalMap({
      mode,
      base,
      primary,
      feedback: (options.feedback ?? 'classic') as FeedbackSchemeKey,
      chart: options.chart ?? 'vivid',
      lightLevel,
      darkLevel,
      surfaceStyle
    });

    // 先护栏 core，再由修正后的全局值派生镜像，最后单独校验区域配对
    const corePass = runContrastGuard(
      nominal,
      { mode, policy, base },
      {
        text: CORE_TEXT_PAIRS,
        nonText: CORE_NON_TEXT_PAIRS,
        onSolid: CORE_ON_SOLID_PAIRS
      }
    );

    const mirrored = resolveMirrors(corePass.map, mode);

    const regionPass = runContrastGuard(
      mirrored,
      { mode, policy, base },
      {
        text: REGION_TEXT_PAIRS,
        nonText: REGION_NON_TEXT_PAIRS,
        onSolid: []
      }
    );

    // active 伴生（按压态）：从护栏后的实心值出发，沿"能与已选文字保持对比度"
    // 的方向走一档（两个方向里取比值更高者；不达标再走一档，上限 2）。
    // 文字 token 由护栏为静止态选定且两种状态共用，因此方向由文字而非模式决定。
    const withActive = deriveActiveTokens(regionPass.map, mode, corePass.report.textThreshold);

    const overridden = applyOverrides(
      requireComplete(withActive),
      mode === 'light' ? options.overrides?.light : options.overrides?.dark,
      { mode, policy, base }
    );

    return {
      map: overridden.map,
      report: {
        ...regionPass.report,
        corrections: [...corePass.report.corrections, ...regionPass.report.corrections, ...overridden.report]
      }
    };
  };

  const light = buildMode('light');
  const dark = buildMode('dark');

  return {
    light: light.map,
    dark: dark.map,
    alpha: Object.fromEntries(
      Object.entries(ALPHA_RULES).map(([token, values]) => [
        token,
        { light: values.light * borderOpacity, dark: values.dark * borderOpacity }
      ])
    ) as ThemeMap['alpha'],
    literal,
    report: {
      policy,
      textThreshold: light.report.textThreshold,
      nonTextThreshold: light.report.nonTextThreshold,
      corrections: [...light.report.corrections, ...dark.report.corrections]
    }
  };
}
