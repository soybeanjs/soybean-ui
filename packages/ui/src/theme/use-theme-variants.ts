import { computed } from 'vue';
import type { ComputedRef, Ref, WritableComputedRef } from 'vue';
import { resolveTheme } from '@soybeanjs/theme';
import type { ColorKey, ColorValue } from '@soybeanjs/theme';
import type { UseThemeSettingsReturn } from './use-theme-settings';

/**
 * the variant group keys a token can belong to.
 */
export type VariantGroupKey = 'surfaces' | 'palette' | 'hairlines' | 'sidebar' | 'charts' | 'feedback';

/**
 * the metadata of a single variant token.
 */
export interface VariantTokenMeta {
  /** the color token key. */
  key: ColorKey;
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
  derived: ComputedRef<Record<ColorKey, ColorValue>>;
  /** a writable ref bound to the override for a token key. */
  getOverride: (key: ColorKey) => WritableComputedRef<ColorValue | ''>;
  /** merge rule: override wins when present, otherwise falls back to derived. */
  final: ComputedRef<Record<ColorKey, ColorValue>>;
  /** whether the active mode has any explicit override. */
  hasOverrides: ComputedRef<boolean>;
  /** clear the override for a token key. */
  clearOverride: (key: ColorKey) => void;
}

const surfaces: VariantTokenMeta[] = [
  { key: 'background', group: 'surfaces', source: 'base', shadeLinked: true, i18n: 'theme.variant.background' },
  { key: 'foreground', group: 'surfaces', source: 'base', i18n: 'theme.variant.foreground' },
  { key: 'card', group: 'surfaces', source: 'base', shadeLinked: true, i18n: 'theme.variant.card' },
  { key: 'cardForeground', group: 'surfaces', source: 'base', i18n: 'theme.variant.cardForeground' },
  { key: 'popover', group: 'surfaces', source: 'base', shadeLinked: true, i18n: 'theme.variant.popover' },
  { key: 'popoverForeground', group: 'surfaces', source: 'base', i18n: 'theme.variant.popoverForeground' }
];

const palette: VariantTokenMeta[] = [
  { key: 'primary', group: 'palette', source: 'primary', i18n: 'theme.variant.primary' },
  { key: 'primaryForeground', group: 'palette', source: 'primary', i18n: 'theme.variant.primaryForeground' },
  { key: 'ring', group: 'palette', source: 'primary', i18n: 'theme.variant.ring' },
  { key: 'secondary', group: 'palette', source: 'base', shadeLinked: true, i18n: 'theme.variant.secondary' },
  { key: 'secondaryForeground', group: 'palette', source: 'base', i18n: 'theme.variant.secondaryForeground' },
  { key: 'muted', group: 'palette', source: 'base', shadeLinked: true, i18n: 'theme.variant.muted' },
  {
    key: 'mutedForeground',
    group: 'palette',
    source: 'base',
    shadeLinked: true,
    i18n: 'theme.variant.mutedForeground'
  },
  { key: 'accent', group: 'palette', source: 'base', shadeLinked: true, i18n: 'theme.variant.accent' },
  { key: 'accentForeground', group: 'palette', source: 'base', i18n: 'theme.variant.accentForeground' }
];

const hairlines: VariantTokenMeta[] = [
  { key: 'border', group: 'hairlines', source: 'base', i18n: 'theme.variant.border' },
  { key: 'input', group: 'hairlines', source: 'base', i18n: 'theme.variant.input' }
];

const sidebar: VariantTokenMeta[] = [
  { key: 'sidebar', group: 'sidebar', source: 'scheme', shadeLinked: true, i18n: 'theme.variant.sidebar' },
  { key: 'sidebarForeground', group: 'sidebar', source: 'scheme', i18n: 'theme.variant.sidebarForeground' },
  { key: 'sidebarPrimary', group: 'sidebar', source: 'scheme', i18n: 'theme.variant.sidebarPrimary' },
  {
    key: 'sidebarPrimaryForeground',
    group: 'sidebar',
    source: 'scheme',
    i18n: 'theme.variant.sidebarPrimaryForeground'
  },
  { key: 'sidebarAccent', group: 'sidebar', source: 'scheme', i18n: 'theme.variant.sidebarAccent' },
  { key: 'sidebarAccentForeground', group: 'sidebar', source: 'scheme', i18n: 'theme.variant.sidebarAccentForeground' },
  { key: 'sidebarBorder', group: 'sidebar', source: 'scheme', i18n: 'theme.variant.sidebarBorder' },
  { key: 'sidebarRing', group: 'sidebar', source: 'scheme', i18n: 'theme.variant.sidebarRing' }
];

const charts: VariantTokenMeta[] = [1, 2, 3, 4, 5].map(index => ({
  key: `chart${index}` as ColorKey,
  group: 'charts' as const,
  source: 'scheme' as const,
  i18n: `theme.variant.chart${index}`
}));

const feedback: VariantTokenMeta[] = [
  { key: 'destructive', group: 'feedback', source: 'scheme', i18n: 'theme.variant.destructive' },
  { key: 'destructiveForeground', group: 'feedback', source: 'base', i18n: 'theme.variant.destructiveForeground' },
  { key: 'success', group: 'feedback', source: 'scheme', i18n: 'theme.variant.success' },
  { key: 'successForeground', group: 'feedback', source: 'base', i18n: 'theme.variant.successForeground' },
  { key: 'warning', group: 'feedback', source: 'scheme', i18n: 'theme.variant.warning' },
  { key: 'warningForeground', group: 'feedback', source: 'base', i18n: 'theme.variant.warningForeground' },
  { key: 'info', group: 'feedback', source: 'scheme', i18n: 'theme.variant.info' },
  { key: 'infoForeground', group: 'feedback', source: 'base', i18n: 'theme.variant.infoForeground' },
  { key: 'carbon', group: 'feedback', source: 'base', i18n: 'theme.variant.carbon' },
  { key: 'carbonForeground', group: 'feedback', source: 'base', i18n: 'theme.variant.carbonForeground' }
];

/**
 * the built-in variant groups.
 */
export const DEFAULT_VARIANT_GROUPS: VariantGroupMeta[] = [
  { key: 'surfaces', i18n: 'theme.group.surfaces', tokens: surfaces },
  { key: 'palette', i18n: 'theme.group.palette', tokens: palette },
  { key: 'hairlines', i18n: 'theme.group.hairlines', tokens: hairlines },
  { key: 'sidebar', i18n: 'theme.group.sidebar', tokens: sidebar },
  { key: 'charts', i18n: 'theme.group.charts', tokens: charts },
  { key: 'feedback', i18n: 'theme.group.feedback', tokens: feedback }
];

const ALL_TOKENS: VariantTokenMeta[] = DEFAULT_VARIANT_GROUPS.flatMap(group => group.tokens);

/**
 * The full-variants linkage model (§5.6).
 *
 * Derives the resolved token values from the left-column generator (the
 * settings `resolved` preset), exposes a per-token override channel bound to the
 * settings overrides, and computes the merged `final` tokens (override wins,
 * otherwise falls back to derived). Left-column changes refresh every un-overridden
 * derived token automatically.
 */
export function useThemeVariants(options: UseThemeVariantsOptions): UseThemeVariantsReturn {
  const { settings, mode, groups = DEFAULT_VARIANT_GROUPS } = options;

  const derived = computed<Record<ColorKey, ColorValue>>(() => {
    const resolved = settings.resolved.value;

    const preset = resolveTheme({
      base: resolved.base ?? 'zinc',
      primary: resolved.primary ?? 'indigo',
      feedback: resolved.feedback,
      chart: resolved.chart,
      sidebar: resolved.sidebar,
      sidebarDerive: resolved.sidebarDerive,
      lightLevel: resolved.lightLevel,
      darkLevel: resolved.darkLevel,
      overrides: resolved.overrides,
      size: resolved.size,
      radius: resolved.radius
    });

    // dark 层在生成时会被裁剪（与 light 相同的 token 被移除，CSS 由 light 继承），
    // 因此 dark 模式需将 light 作为基底、dark 覆盖其上，避免裁剪 token 变为 undefined。
    const tokens = mode.value === 'light' ? preset.light : { ...preset.light, ...preset.dark };

    return tokens as unknown as Record<ColorKey, ColorValue>;
  });

  // 每个 token 的 override 引用只创建一次并缓存，保证模板重复调用 `getOverride`
  // 拿到的是同一个 ref（否则每次渲染都会新建 computed，v-model 失效）。
  const overrideCache = new Map<ColorKey, WritableComputedRef<ColorValue | ''>>();

  const getOverride = (key: ColorKey): WritableComputedRef<ColorValue | ''> => {
    let ref = overrideCache.get(key);

    if (!ref) {
      ref = computed<ColorValue | ''>({
        get: () => settings.state.value.overrides?.[mode.value]?.[key] ?? '',
        set: value => settings.setOverride(mode.value, key, value)
      });
      overrideCache.set(key, ref);
    }

    return ref;
  };

  const final = computed<Record<ColorKey, ColorValue>>(() => {
    const result = ALL_TOKENS.reduce<Partial<Record<ColorKey, ColorValue>>>((acc, meta) => {
      const override = settings.state.value.overrides?.[mode.value]?.[meta.key];

      acc[meta.key] = override ?? derived.value[meta.key];

      return acc;
    }, {});

    return result as Record<ColorKey, ColorValue>;
  });

  const hasOverrides = computed<boolean>(() => {
    const tokens = settings.state.value.overrides?.[mode.value];

    return tokens != null && Object.keys(tokens).length > 0;
  });

  const clearOverride = (key: ColorKey): void => {
    settings.setOverride(mode.value, key, '');
  };

  return { groups, derived, getOverride, final, hasOverrides, clearOverride };
}
