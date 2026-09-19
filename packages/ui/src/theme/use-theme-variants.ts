import { computed } from 'vue';
import type { ComputedRef, Ref, WritableComputedRef } from 'vue';
import { resolveThemeMap, valueRef } from '@vean/theme';
import type { SemanticToken, TokenValue } from '@vean/theme';
import type { UseThemeSettingsReturn } from './use-theme-settings';

/**
 * the variant group keys a token can belong to.
 */
export type VariantGroupKey = 'surfaces' | 'fills' | 'hairlines' | 'brand' | 'sidebar' | 'feedback' | 'charts';

/**
 * the metadata of a single variant token.
 */
export interface VariantTokenMeta {
  /** the color token key. */
  key: SemanticToken;
  /** the group this token belongs to. */
  group: VariantGroupKey;
  /** the derivation source: base / primary / scheme. */
  source: 'base' | 'primary' | 'scheme';
  /** whether the token follows the background-shade (light/dark level) offset. */
  shadeLinked?: boolean;
  /** a label key used for display (falls back to the token key itself). */
  i18n: string;
}

/**
 * a variant group: its label and the tokens it contains.
 */
export interface VariantGroupMeta {
  /** the group key. */
  key: VariantGroupKey;
  /** the group label key. */
  i18n: string;
  /** the tokens in this group. */
  tokens: VariantTokenMeta[];
}

/**
 * Options for `useThemeVariants`.
 */
export interface UseThemeVariantsOptions {
  /** the settings state core exposing `state` / `setOverride` / `resolved`. */
  settings: UseThemeSettingsReturn;
  /** the active light/dark mode used to select the derived tokens. */
  mode: Ref<'light' | 'dark'>;
  /** optional custom group list; defaults to the built-in variant groups. */
  groups?: VariantGroupMeta[];
}

/**
 * The return value of `useThemeVariants`.
 */
export interface UseThemeVariantsReturn {
  /** the variant groups (group → tokens). */
  groups: VariantGroupMeta[];
  /** the derived tokens from the left-column generator (the resolved preset). */
  derived: ComputedRef<Record<SemanticToken, string>>;
  /** a writable ref bound to the override for a token key. */
  getOverride: (key: SemanticToken) => WritableComputedRef<string>;
  /** merge rule: override wins when present, otherwise falls back to derived. */
  final: ComputedRef<Record<SemanticToken, string>>;
  /** whether the active mode has any explicit override. */
  hasOverrides: ComputedRef<boolean>;
  /** clear the override for a token key. */
  clearOverride: (key: SemanticToken) => void;
}

const surfaces: VariantTokenMeta[] = [
  { key: 'background', group: 'surfaces', source: 'base', shadeLinked: true, i18n: 'theme.variant.background' },
  { key: 'surface', group: 'surfaces', source: 'base', shadeLinked: true, i18n: 'theme.variant.surface' },
  { key: 'elevated', group: 'surfaces', source: 'base', shadeLinked: true, i18n: 'theme.variant.elevated' },
  { key: 'carbon', group: 'surfaces', source: 'base', shadeLinked: true, i18n: 'theme.variant.carbon' },
  { key: 'foreground', group: 'surfaces', source: 'base', i18n: 'theme.variant.foreground' },
  { key: 'muted-foreground', group: 'surfaces', source: 'base', i18n: 'theme.variant.mutedForeground' },
  { key: 'foreground-subtle', group: 'surfaces', source: 'base', i18n: 'theme.variant.foregroundSubtle' },
  { key: 'carbon-foreground', group: 'surfaces', source: 'base', i18n: 'theme.variant.carbonForeground' }
];

const fills: VariantTokenMeta[] = [
  { key: 'muted', group: 'fills', source: 'base', shadeLinked: true, i18n: 'theme.variant.muted' },
  { key: 'accent', group: 'fills', source: 'base', shadeLinked: true, i18n: 'theme.variant.accent' },
  { key: 'accent-foreground', group: 'fills', source: 'base', i18n: 'theme.variant.accentForeground' },
  { key: 'secondary', group: 'fills', source: 'base', shadeLinked: true, i18n: 'theme.variant.secondary' },
  { key: 'secondary-foreground', group: 'fills', source: 'base', i18n: 'theme.variant.secondaryForeground' }
];

const hairlines: VariantTokenMeta[] = [
  { key: 'border', group: 'hairlines', source: 'base', i18n: 'theme.variant.border' },
  { key: 'border-strong', group: 'hairlines', source: 'base', i18n: 'theme.variant.borderStrong' },
  { key: 'input', group: 'hairlines', source: 'base', i18n: 'theme.variant.input' },
  { key: 'ring', group: 'hairlines', source: 'primary', i18n: 'theme.variant.ring' }
];

const brand: VariantTokenMeta[] = [
  { key: 'primary', group: 'brand', source: 'primary', i18n: 'theme.variant.primary' },
  { key: 'primary-foreground', group: 'brand', source: 'primary', i18n: 'theme.variant.primaryForeground' }
];

const sidebar: VariantTokenMeta[] = [
  { key: 'sidebar-surface', group: 'sidebar', source: 'base', shadeLinked: true, i18n: 'theme.variant.sidebarSurface' },
  { key: 'sidebar-foreground', group: 'sidebar', source: 'base', i18n: 'theme.variant.sidebarForeground' },
  { key: 'sidebar-border', group: 'sidebar', source: 'base', i18n: 'theme.variant.sidebarBorder' },
  { key: 'sidebar-accent', group: 'sidebar', source: 'base', shadeLinked: true, i18n: 'theme.variant.sidebarAccent' },
  {
    key: 'sidebar-accent-foreground',
    group: 'sidebar',
    source: 'base',
    i18n: 'theme.variant.sidebarAccentForeground'
  },
  { key: 'sidebar-primary', group: 'sidebar', source: 'primary', i18n: 'theme.variant.sidebarPrimary' }
];

const charts: VariantTokenMeta[] = [1, 2, 3, 4, 5].map(index => ({
  key: `chart-${index}` as SemanticToken,
  group: 'charts' as const,
  source: 'scheme' as const,
  i18n: `theme.variant.chart${index}`
}));

const feedback: VariantTokenMeta[] = (['destructive', 'success', 'warning', 'info'] as const).flatMap(name => [
  { key: name, group: 'feedback' as const, source: 'scheme' as const, i18n: `theme.variant.${name}` },
  {
    key: `${name}-foreground` as SemanticToken,
    group: 'feedback' as const,
    source: 'scheme' as const,
    i18n: `theme.variant.${name}Foreground`
  },
  {
    key: `${name}-text` as SemanticToken,
    group: 'feedback' as const,
    source: 'scheme' as const,
    i18n: `theme.variant.${name}Text`
  },
  {
    key: `${name}-subtle` as SemanticToken,
    group: 'feedback' as const,
    source: 'scheme' as const,
    i18n: `theme.variant.${name}Subtle`
  },
  {
    key: `${name}-border` as SemanticToken,
    group: 'feedback' as const,
    source: 'scheme' as const,
    i18n: `theme.variant.${name}Border`
  }
]);

/**
 * the built-in variant groups.
 */
export const DEFAULT_VARIANT_GROUPS: VariantGroupMeta[] = [
  { key: 'surfaces', i18n: 'theme.group.surfaces', tokens: surfaces },
  { key: 'fills', i18n: 'theme.group.fills', tokens: fills },
  { key: 'hairlines', i18n: 'theme.group.hairlines', tokens: hairlines },
  { key: 'brand', i18n: 'theme.group.brand', tokens: brand },
  { key: 'sidebar', i18n: 'theme.group.sidebar', tokens: sidebar },
  { key: 'feedback', i18n: 'theme.group.feedback', tokens: feedback },
  { key: 'charts', i18n: 'theme.group.charts', tokens: charts }
];

const ALL_TOKENS: VariantTokenMeta[] = DEFAULT_VARIANT_GROUPS.flatMap(group => group.tokens);

/**
 * The full-variants linkage model (docs/theme.md §4).
 *
 * The groups mirror the v2 token families (surfaces / fills / hairlines / brand /
 * region / status / charts); every entry is a v2 `SemanticToken`, so an override
 * written here lands in the engine's own vocabulary.
 *
 * Derives the resolved token values from the left-column generator (the
 * settings `resolved` preset), exposes a per-token override channel bound to the
 * settings overrides, and computes the merged `final` tokens (override wins,
 * otherwise falls back to derived). Left-column changes refresh every un-overridden
 * derived token automatically.
 */
export function useThemeVariants(options: UseThemeVariantsOptions): UseThemeVariantsReturn {
  const { settings, mode, groups = DEFAULT_VARIANT_GROUPS } = options;

  const derived = computed<Record<SemanticToken, string>>(() => {
    // 派生值来自引擎（与运行时同一套映射表，含对比度护栏修正），
    // 以 `palette.level` 形态展示 —— 与选择器接受的取值形态一致。
    const map = resolveThemeMap(settings.resolved.value);

    return Object.fromEntries(
      (Object.keys(map[mode.value]) as SemanticToken[]).map(token => [
        token,
        valueRef(map[mode.value][token] as TokenValue)
      ])
    ) as Record<SemanticToken, string>;
  });

  // 每个 token 的 override 引用只创建一次并缓存，保证模板重复调用 `getOverride`
  // 拿到的是同一个 ref（否则每次渲染都会新建 computed，v-model 失效）。
  const overrideCache = new Map<SemanticToken, WritableComputedRef<string>>();

  const getOverride = (key: SemanticToken): WritableComputedRef<string> => {
    let ref = overrideCache.get(key);

    if (!ref) {
      ref = computed<string>({
        get: () => overrideOf(key),
        set: value => settings.setOverride(mode.value, key, value)
      });
      overrideCache.set(key, ref);
    }

    return ref;
  };

  /**
   * read the current override value of a token.
   *
   * The persisted overrides are keyed by token name; the vocabulary lives in the
   * engine, so the read is typed loosely here.
   */
  const overrideOf = (key: SemanticToken): string =>
    (settings.state.value.overrides?.[mode.value] as Record<string, string> | undefined)?.[key] ?? '';

  const final = computed<Record<SemanticToken, string>>(() => {
    const result = ALL_TOKENS.reduce<Partial<Record<SemanticToken, string>>>((acc, meta) => {
      acc[meta.key] = overrideOf(meta.key) || derived.value[meta.key];

      return acc;
    }, {});

    return result as Record<SemanticToken, string>;
  });

  const hasOverrides = computed<boolean>(() => {
    const tokens = settings.state.value.overrides?.[mode.value];

    return tokens != null && Object.keys(tokens).length > 0;
  });

  const clearOverride = (key: SemanticToken): void => {
    settings.setOverride(mode.value, key, '');
  };

  return { groups, derived, getOverride, final, hasOverrides, clearOverride };
}
