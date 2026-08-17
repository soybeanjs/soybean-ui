import type { HTMLAttributes } from 'vue';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SChartLegendContent component.
 */
export interface ChartLegendContentProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether to hide the series icon.
   */
  hideIcon?: boolean;
  /**
   * Key of the series name within each config entry.
   */
  nameKey?: string;
  /**
   * Legend placement relative to the chart area.
   * @default 'bottom'
   */
  verticalAlign?: 'bottom' | 'top';
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
}
