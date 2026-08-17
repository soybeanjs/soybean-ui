import type { HTMLAttributes } from 'vue';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ChartConfig } from '../../types';

/**
 * Properties for the SChartTooltipContent component.
 */
export interface ChartTooltipContentProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether to hide the tooltip label.
   */
  hideLabel?: boolean;
  /**
   * Whether to hide the series indicator.
   */
  hideIndicator?: boolean;
  /**
   * Indicator style.
   * @default 'dot'
   */
  indicator?: 'line' | 'dot' | 'dashed';
  /**
   * Key used to resolve the tooltip label from the config.
   */
  labelKey?: string;
  /**
   * Custom formatter for the tooltip label.
   */
  labelFormatter?: (d: number | Date) => string;
  /**
   * Payload entry provided by the chart library.
   */
  payload?: Record<string, unknown>;
  /**
   * Chart config used to resolve series metadata.
   */
  config?: ChartConfig;
  /**
   * X value of the hovered datum.
   */
  x?: number | Date;
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
}
