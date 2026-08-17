import type { HTMLAttributes } from 'vue';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ChartConfig } from '../../types';

/**
 * Properties for the SChartContainer component.
 */
export interface ChartContainerProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Declarative chart configuration.
   */
  config: ChartConfig;
  /**
   * Whether to render a crosshair cursor on hover.
   * @default true
   */
  cursor?: boolean;
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
}

/**
 * Slot bindings for the SChartContainer component.
 */
export type ChartContainerSlots = {
  default: (props: {
    /** Sanitized chart id bound to `data-chart`. */
    id: string;
    /** Chart config provided to chart parts. */
    config: ChartConfig;
  }) => any;
};
