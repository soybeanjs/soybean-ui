import type {
  StatisticCompactProps,
  StatisticCompactEmits,
  StatisticCompactSlots,
  StatisticUi
} from '@soybeanjs/headless/statistic';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the Statistic component.
 */
export interface StatisticProps extends StatisticCompactProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<StatisticUi>;
}

/**
 * Events for the Statistic component.
 */
export type StatisticEmits = StatisticCompactEmits;

/**
 * Slots for the Statistic component.
 */
export type StatisticSlots = StatisticCompactSlots;
