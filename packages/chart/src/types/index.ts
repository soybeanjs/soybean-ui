import type { Component, Ref } from 'vue';

/**
 * Chart color theme contexts.
 *
 * `''` matches the root selector (light), `.dark` matches the dark root.
 * Mirrors the theme engine's `darkSelector` contract used by `@soybeanjs/ui`.
 */
export const chartThemes = { light: '', dark: '.dark' } as const;

export type ChartThemeKey = keyof typeof chartThemes;

/**
 * The theme's chart palette, ready for `ChartConfig` `color` values.
 *
 * The theme engine stores `--chart-N` as raw HSL channel triplets
 * (`--chart-1: 20.5 90.2% 48.2%`), so each reference is wrapped in `hsl()`
 * to be a valid CSS color. Use these instead of writing `var(--chart-N)`.
 */
export const chartColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
] as const;

/**
 * Declarative configuration for a chart's data series.
 *
 * Each key maps a series/`dataKey` to its label, optional icon and color.
 * Color can be a single CSS color or a per-theme map resolved at render time.
 */
export type ChartConfig = {
  [k in string]: {
    label?: string | Component;
    icon?: string | Component;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<ChartThemeKey, string> });
};

/** Reactive context shared between `SChartContainer` and its chart parts. */
export interface ChartContext {
  /** Sanitized chart id bound to `data-chart`, used by legend/style selectors. */
  id: string;
  /** Reactive chart config consumed by tooltip/legend/style parts. */
  config: Ref<ChartConfig>;
}
