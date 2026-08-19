import type { ComputedRef } from 'vue';
import type { BaseProps, Direction, UiClass } from '../../types';

/**
 * The trend direction of a statistic value.
 */
export type StatisticTrend = 'up' | 'down';

/**
 * Properties for the StatisticRoot component.
 */
export interface StatisticRootProps extends BaseProps {
  /**
   * The numeric value to display.
   */
  value?: number;
  /**
   * Number of decimal places to display.
   */
  precision?: number;
  /**
   * Character used to group thousands.
   *
   * @default ','
   */
  groupSeparator?: string;
  /**
   * Character used as the decimal separator.
   *
   * @default '.'
   */
  decimalSeparator?: string;
  /**
   * Custom formatter function. When provided it takes priority over
   * `precision` and the separator props.
   */
  formatter?: (value: number) => string;
  /**
   * Optional trend indicator direction. Reflected as `data-trend` on the root.
   */
  trend?: StatisticTrend;
  /**
   * The reading direction of the statistic.
   */
  dir?: Direction;
}

/**
 * Events for the StatisticRoot component.
 */
export type StatisticRootEmits = Record<string, never>;

/**
 * Properties for the StatisticLabel component.
 */
export interface StatisticLabelProps extends BaseProps {}

/**
 * Properties for the StatisticValueRow component.
 */
export interface StatisticValueRowProps extends BaseProps {}

/**
 * Properties for the StatisticValue component.
 */
export interface StatisticValueProps extends BaseProps {}

/**
 * Properties for the StatisticPrefix component.
 */
export interface StatisticPrefixProps extends BaseProps {}

/**
 * Properties for the StatisticSuffix component.
 */
export interface StatisticSuffixProps extends BaseProps {}

/**
 * Context for the StatisticRoot component.
 */
export interface StatisticRootContext {
  /** Current value as a reactive prop. */
  value: ComputedRef<number | undefined>;
  /** Number of decimal places to display. */
  precision: ComputedRef<number | undefined>;
  /** Character used to group thousands. */
  groupSeparator: ComputedRef<string | undefined>;
  /** Character used as the decimal separator. */
  decimalSeparator: ComputedRef<string | undefined>;
  /** Custom formatter function. */
  formatter: ComputedRef<((value: number) => string) | undefined>;
  /** Trend direction. */
  trend: ComputedRef<StatisticTrend | undefined>;
  /** The reading direction of the statistic. */
  dir: ComputedRef<Direction>;
  /** The formatted display string of the current value. */
  formattedValue: ComputedRef<string>;
}

/**
 * Available UI slots for the Statistic component.
 */
export type StatisticUiSlot = 'root' | 'label' | 'valueRow' | 'value' | 'prefix' | 'suffix';

/**
 * UI class overrides for the Statistic component.
 */
export type StatisticUi = UiClass<StatisticUiSlot>;

/**
 * Properties for the StatisticCompact component.
 */
export interface StatisticCompactProps extends StatisticRootProps {
  /**
   * Label text rendered above the value.
   */
  label?: string;
  /**
   * Prefix text (or icon glyph) rendered before the value.
   */
  prefix?: string;
  /**
   * Suffix text (or unit) rendered after the value.
   */
  suffix?: string;
  /**
   * Properties forwarded to the label element.
   */
  labelProps?: StatisticLabelProps;
  /**
   * Properties forwarded to the value row element.
   */
  valueRowProps?: StatisticValueRowProps;
  /**
   * Properties forwarded to the value element.
   */
  valueProps?: StatisticValueProps;
  /**
   * Properties forwarded to the prefix element.
   */
  prefixProps?: StatisticPrefixProps;
  /**
   * Properties forwarded to the suffix element.
   */
  suffixProps?: StatisticSuffixProps;
}

/**
 * Events for the StatisticCompact component.
 */
export type StatisticCompactEmits = Record<string, never>;

/**
 * Slots for the StatisticCompact component.
 */
export type StatisticCompactSlots = {
  /**
   * Custom content rendered below the value row.
   */
  default?: () => any;
  /**
   * Custom content for the label slot.
   */
  label?: () => any;
  /**
   * Custom content for the value slot.
   */
  value?: () => any;
  /**
   * Custom content for the prefix slot.
   */
  prefix?: () => any;
  /**
   * Custom content for the suffix slot.
   */
  suffix?: () => any;
};
