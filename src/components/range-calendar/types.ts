import type { DateValue } from '@internationalized/date';

import type {
  RangeCalendarCellProps,
  RangeCalendarCellTriggerProps,
  RangeCalendarGridBodyProps,
  RangeCalendarGridHeadProps,
  RangeCalendarGridProps,
  RangeCalendarGridRowProps,
  RangeCalendarHeadCellProps,
  RangeCalendarHeaderProps,
  RangeCalendarHeadingProps,
  RangeCalendarNextProps,
  RangeCalendarPrevProps,
  RangeCalendarRootEmits,
  RangeCalendarRootProps,
  RangeCalendarUi
} from '@soybeanjs/headless/range-calendar';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the range calendar component.
 */
export interface RangeCalendarProps extends RangeCalendarRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<RangeCalendarUi>;
  /**
   * Properties forwarded to the header element.
   */
  headerProps?: RangeCalendarHeaderProps;
  /**
   * Properties forwarded to the heading element.
   */
  headingProps?: RangeCalendarHeadingProps;
  /**
   * Properties forwarded to the prev element.
   */
  prevProps?: RangeCalendarPrevProps;
  /**
   * Properties forwarded to the next element.
   */
  nextProps?: RangeCalendarNextProps;
  /**
   * Properties forwarded to the grid element.
   */
  gridProps?: RangeCalendarGridProps;
  /**
   * Properties forwarded to the grid head element.
   */
  gridHeadProps?: RangeCalendarGridHeadProps;
  /**
   * Properties forwarded to the grid body element.
   */
  gridBodyProps?: RangeCalendarGridBodyProps;
  /**
   * Properties forwarded to the grid row element.
   */
  gridRowProps?: RangeCalendarGridRowProps;
  /**
   * Properties forwarded to the head cell element.
   */
  headCellProps?: RangeCalendarHeadCellProps;
  /**
   * Properties forwarded to the cell element.
   */
  cellProps?: Omit<RangeCalendarCellProps, 'date'>;
  /**
   * Properties forwarded to the cell trigger element.
   */
  cellTriggerProps?: Omit<RangeCalendarCellTriggerProps, 'day' | 'month'>;
}

/**
 * Events for the range calendar component.
 */
export type RangeCalendarEmits = RangeCalendarRootEmits;

/**
 * Slot properties for the range calendar head cell component.
 */
export interface RangeCalendarHeadCellSlotProps {
  /**
   * Date exposed in the slot scope.
   */
  date: DateValue;
  /**
   * Index of the current item.
   */
  index: number;
  /**
   * Label text rendered by the component.
   */
  label: string;
}

/**
 * Slot properties for the range calendar day component.
 */
export interface RangeCalendarDaySlotProps {
  /**
   * Day exposed in the slot scope.
   */
  day: DateValue;
  /**
   * Day value exposed in the slot scope.
   */
  dayValue: string;
  /**
   * Whether the component is disabled.
   */
  disabled: boolean;
  /**
   * Whether highlighted.
   */
  highlighted: boolean;
  /**
   * Whether highlighted end.
   */
  highlightedEnd: boolean;
  /**
   * Whether highlighted start.
   */
  highlightedStart: boolean;
  /**
   * Month exposed in the slot scope.
   */
  month: DateValue;
  /**
   * Whether outside view.
   */
  outsideView: boolean;
  /**
   * Whether outside visible view.
   */
  outsideVisibleView: boolean;
  /**
   * Whether the item is selected.
   */
  selected: boolean;
  /**
   * Whether selection end.
   */
  selectionEnd: boolean;
  /**
   * Whether selection start.
   */
  selectionStart: boolean;
  /**
   * Whether today.
   */
  today: boolean;
  /**
   * Whether unavailable.
   */
  unavailable: boolean;
}

/**
 * Slots for the range calendar component.
 */
export type RangeCalendarSlots = {
  /**
   * Custom content for the heading slot.
   */
  heading?: (props: { headingValue: string }) => any;
  /**
   * Custom content for the prev slot.
   */
  prev?: (props: { disabled: boolean }) => any;
  /**
   * Custom content for the next slot.
   */
  next?: (props: { disabled: boolean }) => any;
  /**
   * Custom content for the head cell slot.
   */
  'head-cell'?: (props: RangeCalendarHeadCellSlotProps) => any;
  /**
   * Custom content for the day slot.
   */
  day?: (props: RangeCalendarDaySlotProps) => any;
  /**
   * Custom content for the default slot.
   */
  default?: (props: { modelValue: RangeCalendarRootProps['modelValue'] | undefined }) => any;
};
