import { chartThemes } from '../types';
import type { ChartConfig, ChartThemeKey } from '../types';

/**
 * Build the scoped CSS that maps each config key to a `--color-{key}` variable.
 *
 * The output is scoped to `[data-chart={id}]` per theme selector (`''` for
 * light, `.dark` for dark), letting chart library parts reference
 * `var(--color-{key})` for series colors. Pure and SSR-safe.
 */
export function buildChartColorCss(id: string, config: ChartConfig): string {
  const colorConfig = Object.entries(config).filter(([, item]) => item.theme || item.color);
  if (colorConfig.length === 0) {
    return '';
  }

  return (Object.keys(chartThemes) as ChartThemeKey[])
    .map(theme => {
      const prefix = chartThemes[theme];
      const cssVars = colorConfig
        .map(([key, item]) => {
          const color = item.theme?.[theme] ?? item.color;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter((line): line is string => Boolean(line))
        .join('\n');

      return `${prefix} [data-chart=${id}] {\n${cssVars}\n}`;
    })
    .join('\n');
}
