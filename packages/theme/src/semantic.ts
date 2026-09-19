import type { PaletteLevel, TokenRule } from './types';

/**
 * The semantic token vocabulary: names, level rules, region mirrors and the
 * contrast pairs the guard verifies.
 *
 * This module is the **single source of truth** for token semantics — the
 * engine, the contrast guard, the UnoCSS mapping and the acceptance tests all
 * read from here (docs/theme.md §4).
 *
 * Naming follows the shadcn vocabulary with a `--vean-` prefix: `background` /
 * `surface` / `elevated` for the elevation axis, `muted` / `accent` / `secondary`
 * for fills, `foreground*` for text, `border*` / `input` / `ring` for lines.
 */

/**
 * the four status roles.
 */
export const STATUS_NAMES = ['destructive', 'success', 'warning', 'info'] as const;

/**
 * a status role name.
 */
export type StatusName = (typeof STATUS_NAMES)[number];

/**
 * the roles that carry a full 50–950 palette ramp (`--vean-{role}-{level}`),
 * referencing the palette that backs the role: `primary` follows the primary
 * palette, the statuses follow the active feedback scheme's palette.
 */
export const ROLE_RAMP_ROLES = ['primary', ...STATUS_NAMES] as const;
export type RoleRampRole = (typeof ROLE_RAMP_ROLES)[number];

/**
 * the five token suffixes every status exposes (docs/theme.md §4.6).
 */
export const STATUS_SUFFIXES = ['', '-foreground', '-text', '-subtle', '-border'] as const;

/**
 * a status token name, e.g. `destructive-subtle`.
 */
export type StatusToken = `${StatusName}${(typeof STATUS_SUFFIXES)[number]}`;

/**
 * the chart (data visualisation) tokens.
 */
export const CHART_TOKENS = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] as const;

/**
 * a chart token name.
 */
export type ChartToken = (typeof CHART_TOKENS)[number];

/**
 * the elevation axis, ordered from "closest to the page" to "furthest": the
 * invariant `lum(background) < lum(surface) ≤ lum(elevated)` must hold in both
 * modes (docs/theme.md §6.3).
 */
export const SURFACE_TOKENS = ['background', 'surface', 'elevated'] as const;

/**
 * the fill (interactive) axis plus its content roles.
 */
export const FILL_TOKENS = ['muted', 'accent', 'accent-foreground', 'secondary', 'secondary-foreground'] as const;

/**
 * the text roles (the `foreground` ladder).
 */
export const TEXT_TOKENS = ['foreground', 'muted-foreground', 'foreground-subtle', 'carbon-foreground'] as const;

/**
 * the line / focus roles.
 */
export const LINE_TOKENS = ['border', 'border-strong', 'input', 'ring'] as const;

/**
 * the brand roles.
 */
export const BRAND_TOKENS = ['primary', 'primary-foreground'] as const;

/**
 * the inverted surface (its content role is `carbon-foreground`). The name
 * `carbon` is the historical one (restored by decision); the value semantics —
 * mode-flipped high-contrast surface — are unchanged.
 */
export const CARBON_TOKENS = ['carbon'] as const;

/**
 * the modal scrim.
 */
export const SCRIM_TOKENS = ['scrim'] as const;

/**
 * the region (region axis) roles: the sidebar mirrors global roles and only
 * renames the region base to an explicit `-surface` (docs/theme.md §4.8).
 */
export const REGION_TOKENS = [
  'sidebar-surface',
  'sidebar-foreground',
  'sidebar-border',
  'sidebar-accent',
  'sidebar-accent-foreground',
  'sidebar-primary'
] as const;

/**
 * a region token name.
 */
export type RegionToken = (typeof REGION_TOKENS)[number];

/**
 * the status tokens whose text is decided by the guard (on-solid pairs).
 */
export type OnSolidToken = `${StatusName}-foreground` | 'primary-foreground';

/**
 * the solid roles that expose a **pressed** companion (`{role}-active`).
 *
 * A pressed solid needs a tone one step away from the resting fill; encoding it
 * as a token (instead of a hard-coded ramp level like `bg-primary-600`) keeps it
 * themeable. The value is *derived from the guarded solid* — one step toward the
 * mode's emphasis direction (light: deeper, dark: lighter) — so it always sits
 * next to the resting fill, whatever the guard did to it.
 */
export const ACTIVE_ROLES = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon'] as const;

/**
 * an active-companion token name, e.g. `primary-active`.
 */
export type ActiveToken = `${(typeof ACTIVE_ROLES)[number]}-active`;

/**
 * the border-family tokens that carry a numeric alpha companion.
 */
export const ALPHA_TOKENS = ['border'] as const;

/**
 * a border-family token name.
 */
export type AlphaToken = (typeof ALPHA_TOKENS)[number];

/**
 * every non-status, non-chart token, in declaration order.
 */
export const CORE_TOKENS = [
  ...SURFACE_TOKENS,
  ...SCRIM_TOKENS,
  ...FILL_TOKENS,
  ...TEXT_TOKENS,
  ...LINE_TOKENS,
  ...BRAND_TOKENS,
  ...CARBON_TOKENS,
  ...REGION_TOKENS
] as const;

/**
 * a core (non-status, non-chart) token name.
 */
export type CoreToken = (typeof CORE_TOKENS)[number];

/**
 * every semantic token name: core + status × 5 roles + charts.
 */
export type SemanticToken = CoreToken | StatusToken | ChartToken;

/**
 * all semantic tokens, in declaration order — the completeness contract used by
 * the acceptance tests (`SEMANTIC_TOKENS.every(token => token in map)`).
 */
export const ACTIVE_TOKENS = ACTIVE_ROLES.map(role => `${role}-active`) as ActiveToken[];

/**
 * all semantic tokens, in declaration order — the completeness contract used by
 * the acceptance tests (`SEMANTIC_TOKENS.every(token => token in map)`).
 */
export const SEMANTIC_TOKENS = [
  ...CORE_TOKENS,
  ...STATUS_NAMES.flatMap(name => STATUS_SUFFIXES.map(suffix => `${name}${suffix}` as StatusToken)),
  ...ACTIVE_TOKENS,
  ...CHART_TOKENS
] as readonly SemanticToken[];

/**
 * level rules of the core tokens.
 *
 * A rule is one of: a palette level (`{ source: 'base', light: 100, dark: 950 }`),
 * a mirror of another semantic token (`{ mirror: { light: 'background', … } }`),
 * a simple palette key (`white` / `black`), an on-solid pair decided by the
 * guard, or a raw channel fragment.
 */
export const CORE_RULES: Record<CoreToken, TokenRule> = {
  // —— elevation axis ——
  background: { kind: 'level', source: 'base', light: 50, dark: 950 },
  surface: { kind: 'level', source: 'base', light: 'white', dark: 900 },
  elevated: { kind: 'level', source: 'base', light: 'white', dark: 800 },
  scrim: { kind: 'simple', light: 'black', dark: 'black' },
  // —— fills ——
  muted: { kind: 'level', source: 'base', light: 100, dark: 800 },
  accent: { kind: 'level', source: 'base', light: 100, dark: 800 },
  'accent-foreground': { kind: 'level', source: 'base', light: 900, dark: 50 },
  secondary: { kind: 'level', source: 'base', light: 200, dark: 800 },
  'secondary-foreground': { kind: 'level', source: 'base', light: 950, dark: 50 },
  // —— text ladder ——
  foreground: { kind: 'level', source: 'base', light: 950, dark: 50 },
  'muted-foreground': { kind: 'level', source: 'base', light: 600, dark: 400 },
  'foreground-subtle': { kind: 'level', source: 'base', light: 500, dark: 500 },
  'carbon-foreground': { kind: 'level', source: 'base', light: 50, dark: 950 },
  // —— lines / focus ——
  border: { kind: 'level', source: 'base', light: 200, dark: 'white' },
  // input / border-strong 是 WCAG 1.4.11 的边界：暗色用色板级别而非半透明白，
  // 因为半透明白在任何可用浓度下都到不了 3:1（实测）
  'border-strong': { kind: 'level', source: 'base', light: 600, dark: 500 },
  input: { kind: 'level', source: 'base', light: 600, dark: 500 },
  ring: { kind: 'level', source: 'primary', light: 400, dark: 900 },
  // —— brand ——
  // 500 是 shadcn 谱系的习惯档位（旧引擎同为 500）；其上的白字对比约 4.4:1，
  // 低于 AA 正文阈值，因此 primary 的 on-solid 配对走组件阈值（min: 3，见下）。
  primary: { kind: 'level', source: 'primary', light: 500, dark: 500, neutral: { light: 800, dark: 200 } },
  'primary-foreground': { kind: 'on-solid', fill: 'primary', prefer: 'light' },
  // —— carbon surface（反相表面，原 `inverse`，§12-9 复原旧名）——
  carbon: { kind: 'level', source: 'base', light: 800, dark: 100 },
  // —— region (mirrors global roles) ——
  'sidebar-surface': { kind: 'mirror', light: 'background', dark: 'surface' },
  'sidebar-foreground': { kind: 'mirror', light: 'foreground', dark: 'foreground' },
  'sidebar-border': { kind: 'mirror', light: 'border', dark: 'border' },
  'sidebar-accent': { kind: 'mirror', light: 'accent', dark: 'accent' },
  'sidebar-accent-foreground': { kind: 'mirror', light: 'accent-foreground', dark: 'accent-foreground' },
  'sidebar-primary': { kind: 'mirror', light: 'primary', dark: 'primary' }
};

/**
 * the palette level of every non-solid status role (the `solid` role uses the
 * level declared by the feedback scheme, so palettes stay swappable).
 */
export const STATUS_ROLE_LEVELS = {
  '-text': { light: 700, dark: 300 },
  '-subtle': { light: 50, dark: 950 },
  '-border': { light: 200, dark: 800 }
} as const satisfies Record<string, { light: PaletteLevel; dark: PaletteLevel }>;

/**
 * the numeric alpha companion of each border-family token.
 *
 * Dark mode draws hairline whites, which cannot carry alpha inside a single
 * channel variable (`hsl(var(--x) / a)` requires `--x` to be alpha-free), hence
 * a separate numeric variable (docs/theme.md §4.4).
 */
export const ALPHA_RULES: Record<AlphaToken, { light: number; dark: number }> = {
  border: { light: 1, dark: 0.1 }
};

/**
 * tokens that follow the surface-level knob. In light mode only the recessive
 * side moves (the raised surfaces stay at the palette's light extreme); in dark
 * mode the whole ladder lifts.
 */
export const SHIFT_TOKENS = {
  light: ['background', 'muted', 'accent', 'secondary'],
  dark: ['background', 'surface', 'elevated', 'muted', 'accent', 'secondary']
} as const satisfies Record<'light' | 'dark', readonly SemanticToken[]>;

/**
 * an on-solid pair: a fill plus the text drawn on it, whose value the guard
 * decides (`prefer` is a tie-breaker, not a hard requirement).
 */
export interface OnSolidPair {
  /** the fill token. */
  fill: SemanticToken;
  /** the text token drawn on the fill. */
  text: SemanticToken;
  /** the preferred text side when both candidates pass at the same step count. */
  prefer: 'light' | 'dark' | 'auto';
  /**
   * an explicit minimum ratio, overriding the policy threshold.
   *
   * `primary` uses the WCAG 1.4.11 component threshold (3:1) instead of the
   * body-text 4.5:1: the brand fill keeps the familiar `.500` level, where a
   * white label measures ≈4.4:1 — below AA text but above the component floor.
   */
  min?: number;
}

/**
 * a text-on-surface pair the guard must keep readable.
 */
export interface TextPair {
  /** the text token. */
  text: SemanticToken;
  /** the surfaces the text may sit on. */
  surfaces: readonly SemanticToken[];
  /**
   * an explicit minimum ratio, overriding the policy threshold.
   *
   * Used by `foreground-subtle` (placeholder / decorative text), whose contract
   * is 3:1 rather than the body-text 4.5:1 — otherwise the guard would walk it
   * up to `muted-foreground` and collapse the third text tier.
   */
  min?: number;
}

/**
 * core text pairs: every text role against the surfaces it can appear on.
 *
 * Region pairs are separate because the guard derives them *after* the core
 * pass (a region mirror must follow the corrected global value).
 */
export const CORE_TEXT_PAIRS: readonly TextPair[] = [
  { text: 'foreground', surfaces: ['background', 'surface', 'elevated'] },
  { text: 'muted-foreground', surfaces: ['background', 'surface', 'muted'] },
  { text: 'foreground-subtle', surfaces: ['background', 'surface'], min: 3 },
  { text: 'carbon-foreground', surfaces: ['carbon'] },
  { text: 'accent-foreground', surfaces: ['accent'] },
  { text: 'secondary-foreground', surfaces: ['secondary'] },
  { text: 'destructive-text', surfaces: ['background', 'surface'] },
  { text: 'success-text', surfaces: ['background', 'surface'] },
  { text: 'warning-text', surfaces: ['background', 'surface'] },
  { text: 'info-text', surfaces: ['background', 'surface'] }
];

/**
 * region text pairs (checked after the mirrors are derived).
 */
export const REGION_TEXT_PAIRS: readonly TextPair[] = [
  { text: 'sidebar-foreground', surfaces: ['sidebar-surface'] },
  { text: 'sidebar-accent-foreground', surfaces: ['sidebar-accent'] }
];

/**
 * core non-text (WCAG 1.4.11) pairs: focus rings and interactive boundaries.
 */
export const CORE_NON_TEXT_PAIRS: readonly TextPair[] = [
  { text: 'input', surfaces: ['surface', 'background'] },
  { text: 'border-strong', surfaces: ['surface', 'background'] }
];

/**
 * region non-text pairs: the focus ring must also be visible on the region
 * surface, and the region's selected indicator must read against it — this is
 * what replaces the removed `sidebar-ring` token.
 */
export const REGION_NON_TEXT_PAIRS: readonly TextPair[] = [
  { text: 'ring', surfaces: ['background', 'surface', 'sidebar-surface'] },
  { text: 'sidebar-primary', surfaces: ['sidebar-surface'] }
];

/**
 * the on-solid pairs whose text the guard decides (and whose fill it may deepen
 * when neither text candidate passes).
 */
export const CORE_ON_SOLID_PAIRS: readonly OnSolidPair[] = [
  ...STATUS_NAMES.map(name => ({
    fill: name as SemanticToken,
    text: `${name}-foreground` as SemanticToken,
    prefer: 'auto' as const
  })),
  { fill: 'primary', text: 'primary-foreground', prefer: 'light', min: 3 },
  // 按压态：实心加深一档后，其上的文字同样必须可读
  ...ACTIVE_ROLES.map(role => ({
    fill: `${role}-active` as SemanticToken,
    text: (role === 'carbon' ? 'carbon-foreground' : `${role}-foreground`) as SemanticToken,
    prefer: 'auto' as const
  }))
];

/**
 * the ladder pairs whose *relative* contrast the tests assert
 * (docs/theme.md §6.3).
 */
export const LADDER_PAIRS: readonly { outer: SemanticToken; inner: SemanticToken }[] = [
  { outer: 'background', inner: 'surface' },
  { outer: 'surface', inner: 'elevated' }
];
