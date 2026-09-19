import { getDarkSelector } from './shared';
import { DARK_LITERALS, literalVar } from './literals';
import { PALETTE_KEYS, PALETTE_LEVELS, paletteChannel, paletteColor, simpleChannel, simpleColor } from './palette';
import { ALPHA_TOKENS, CHART_TOKENS, ROLE_RAMP_ROLES } from './semantic';
import type {
  ColorFormat,
  EmitThemeOptions,
  SolidVars,
  LiteralToken,
  SemanticToken,
  StyleTarget,
  ThemeMap,
  ThemeMode,
  TokenPrefix,
  TokenValue
} from './types';

/**
 * CSS emission for the refactored engine (docs/theme.md §3, §5).
 *
 * Two artifacts:
 * - `generatePaletteCss` — Layer 1, the static palette table (26 × 11 + white/black)
 * - `emitThemeCss` — Layer 2, the semantic alias block (tiny, regenerated per theme)
 *
 * Color values are **naked channels**: semantic tokens reference palette levels
 * (`var(--zinc-100)`), palette tokens hold channel triples (`240 4.8% 95.9%`),
 * and consumers wrap them as `hsl(var(--…))` (see §3.1 for why).
 */

/**
 * emit options of the theme CSS.
 */
const prefixOf = (prefix: TokenPrefix | undefined): string => (prefix === false ? '--' : `--${prefix ?? 'vean'}-`);

/**
 * the CSS variable name of a semantic token.
 */
export function tokenVar(token: SemanticToken, prefix: TokenPrefix | undefined): string {
  return `${prefixOf(prefix)}${token}`;
}

/**
 * render a token value as a CSS reference.
 */
function renderValue(value: TokenValue): string {
  if (value.kind === 'palette') {
    return `var(--${value.palette}-${value.level})`;
  }

  return value.kind === 'simple' ? `var(--${value.name})` : value.value;
}

/**
 * the body of one block (declarations without the selector).
 */
function block(declarations: string[]): string {
  return declarations.filter(Boolean).join('\n');
}

/**
 * Layer 1 —— the static palette table.
 *
 * Emits every built-in palette level plus `white` / `black` as naked channels.
 */
export function generatePaletteCss(
  options: { format?: ColorFormat; styleTarget?: StyleTarget; weakSelectors?: boolean } = {}
): string {
  const { format = 'hsl', styleTarget = ':root', weakSelectors = false } = options;
  const selector = weakSelectors ? `:where(${styleTarget})` : styleTarget;
  const declarations = PALETTE_KEYS.flatMap(palette =>
    PALETTE_LEVELS.map(level => {
      const channel = paletteChannel(palette, level, format);

      return channel ? `  --${palette}-${level}: ${channel};` : '';
    })
  );

  declarations.push(`  --white: ${simpleChannel('white', format)};`);
  declarations.push(`  --black: ${simpleChannel('black', format)};`);

  return `${selector} {\n${block(declarations)}\n}`;
}

/**
 * render a token value as a complete color, for the `solidVars` escape hatch.
 */
function renderSolid(value: TokenValue, format: ColorFormat): string {
  if (value.kind === 'palette') {
    return paletteColor(value.palette, value.level, format) ?? '';
  }

  if (value.kind === 'simple') {
    return simpleColor(value.name, format);
  }

  return value.value;
}

/**
 * the tokens that get a complete-color twin under each `solidVars` setting.
 */
function solidTokens(setting: SolidVars): SemanticToken[] {
  const tokens: readonly SemanticToken[] = setting === 'chart' ? CHART_TOKENS : [];

  return [...tokens];
}

/** whether the `solidVars` setting emits a twin at all. */
const emitsSolid = (setting: SolidVars): boolean => setting !== 'none';

/**
 * Layer 2 —— the semantic alias block.
 *
 * The dark block only carries tokens whose value differs from light, so the diff
 * stays minimal (and, because everything is a reference, tiny).
 */
export function emitThemeCss(map: ThemeMap, options: EmitThemeOptions = {}): string {
  const { styleTarget = ':root', format = 'hsl', darkSelector = 'class', weakSelectors = false } = options;

  /**
   * `color-scheme` is what makes the UA-drawn surfaces (canvas, scrollbars, form
   * controls, autofill) follow the theme — a `.dark` class alone leaves them
   * light. In `media` mode the light block advertises both schemes and lets the
   * UA pick, so the dark (media) block carries none.
   */
  const colorScheme = (mode: ThemeMode): string => {
    if (darkSelector === 'media') {
      return mode === 'light' ? 'light dark' : '';
    }

    return mode === 'light' ? 'light' : 'dark';
  };
  /** the block selector, optionally weakened to zero specificity. */
  const selectorOf = (mode: ThemeMode): string => {
    const base = mode === 'light' ? styleTarget : getDarkSelector(darkSelector);

    if (!weakSelectors || mode === 'dark') {
      return weakSelectors ? `:where(${base})` : base;
    }

    return `:where(${base})`;
  };
  const colorSchemeDeclaration = (mode: ThemeMode): string[] => {
    const value = colorScheme(mode);

    return value ? [`  color-scheme: ${value};`] : [];
  };
  const solid = options.solidVars ?? 'none';
  const solidDeclaration = (mode: ThemeMode): string[] =>
    (solid === 'all' ? (Object.keys(map.light) as SemanticToken[]) : solidTokens(solid)).map(
      token => `  ${prefixOf(options.prefix)}${token}-solid: ${renderSolid(map[mode][token], format)};`
    );
  const literalDeclarations = Object.entries(map.literal).map(
    ([token, value]) => `  ${literalVar(token as LiteralToken, options.prefix ?? 'vean')}: ${value};`
  );

  const colorDeclarations = (mode: ThemeMode): string[] =>
    (Object.keys(map.light) as SemanticToken[]).map(token => {
      const value = map[mode][token];

      return `  ${tokenVar(token, options.prefix)}: ${renderValue(value)};`;
    });

  const alphaDeclarations = (mode: ThemeMode): string[] =>
    ALPHA_TOKENS.map(token => `  ${prefixOf(options.prefix)}${token}-alpha: ${map.alpha[token][mode]};`);

  /**
   * role ramps: `--vean-{role}-{level}` referencing the palette that backs the
   * role (primary palette / the active feedback scheme's palette). Mode-free —
   * the palette layer itself does not vary by mode — so they emit once in the
   * light block. A role overridden with a complete color has no backing palette
   * and is skipped.
   */
  const rampDeclarations = ROLE_RAMP_ROLES.flatMap(role => {
    const value = map.light[role];

    if (value.kind !== 'palette') {
      return [];
    }

    return PALETTE_LEVELS.map(
      level => `  ${prefixOf(options.prefix)}${role}-${level}: var(--${value.palette}-${level});`
    );
  });

  const lightDeclarations = [
    ...colorSchemeDeclaration('light'),
    ...colorDeclarations('light'),
    ...rampDeclarations,
    ...alphaDeclarations('light'),
    ...(emitsSolid(solid) ? solidDeclaration('light') : []),
    ...literalDeclarations
  ];

  const darkDeclarations = [
    ...colorSchemeDeclaration('dark'),
    ...(Object.keys(map.light) as SemanticToken[])
      .filter(token => renderValue(map.dark[token]) !== renderValue(map.light[token]))
      .map(token => `  ${tokenVar(token, options.prefix)}: ${renderValue(map.dark[token])};`),
    ...alphaDeclarations('dark'),
    ...(emitsSolid(solid) ? solidDeclaration('dark') : []),
    ...Object.entries(DARK_LITERALS).map(
      ([token, value]) => `  ${literalVar(token as LiteralToken, options.prefix ?? 'vean')}: ${value};`
    )
  ];

  return [
    `${selectorOf('light')} {\n${block(lightDeclarations)}\n}`,
    `${selectorOf('dark')} {\n${block(darkDeclarations)}\n}`
  ].join('\n\n');
}
