import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type { DateFormatter, DateRange, DateValue, Matcher, WeekDayFormat } from '../../date';
import type { Direction } from '../../types';

// Root
export interface RangeCalendarRootProps {
  /** The default placeholder date */
  defaultPlaceholder?: DateValue;
  /** The default value for the calendar */
  defaultValue?: DateRange;
  /** The controlled checked state of the calendar. Can be bound as `v-model`. */
  modelValue?: DateRange;
  /**
   * The placeholder date, which is used to determine what month to display when no date is selected. This updates as
   * the user navigates the calendar and can be used to programmatically control the calendar view
   */
  placeholder?: DateValue;
  /**
   * When combined with `isDateUnavailable`, determines whether non-contiguous ranges, i.e. ranges containing
   * unavailable dates, may be selected.
   */
  allowNonContiguousRanges?: boolean;
  /**
   * This property causes the previous and next buttons to navigate by the number of months displayed at once, rather
   * than one month
   */
  pagedNavigation?: boolean;
  /** Whether or not to prevent the user from deselecting a date without selecting another date first */
  preventDeselect?: boolean;
  /** The day of the week to start the calendar on */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** The format to use for the weekday strings provided via the weekdays slot prop */
  weekdayFormat?: WeekDayFormat;
  /** The accessible label for the calendar */
  calendarLabel?: string;
  /** Whether or not to always display 6 weeks in the calendar */
  fixedWeeks?: boolean;
  /** The maximum date that can be selected */
  maxValue?: DateValue;
  /** The minimum date that can be selected */
  minValue?: DateValue;
  /** The locale to use for formatting dates */
  locale?: string;
  /** The number of months to display at once */
  numberOfMonths?: number;
  /** Whether or not the calendar is disabled */
  disabled?: boolean;
  /** Whether or not the calendar is readonly */
  readonly?: boolean;
  /**
   * If true, the calendar will focus the selected day, today, or the first day of the month depending on what is
   * visible when the calendar is mounted
   */
  initialFocus?: boolean;
  /** A function that returns whether or not a date is disabled */
  isDateDisabled?: Matcher;
  /** A function that returns whether or not a date is unavailable */
  isDateUnavailable?: Matcher;
  /**
   * The reading direction of the calendar when applicable. <br> If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /**
   * A function that returns the next page of the calendar. It receives the current placeholder as an argument inside
   * the component.
   */
  nextPage?: (placeholder: DateValue) => DateValue;
  /**
   * A function that returns the previous page of the calendar. It receives the current placeholder as an argument
   * inside the component.
   */
  prevPage?: (placeholder: DateValue) => DateValue;
}
export type RangeCalendarRootPropsWithPrimitive = RangeCalendarRootProps & PrimitiveProps;

export type RangeCalendarRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: DateRange];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
  /** Event handler called whenever the start value changes */
  'update:startValue': [date: DateValue | undefined];
};

export type RangeCalendarRootContext = {
  modelValue: Ref<DateRange>;
  startValue: Ref<DateValue | undefined>;
  endValue: Ref<DateValue | undefined>;
  locale: Ref<string>;
  placeholder: Ref<DateValue>;
  pagedNavigation: Ref<boolean>;
  preventDeselect: Ref<boolean>;
  weekStartsOn: Ref<0 | 1 | 2 | 3 | 4 | 5 | 6>;
  weekdayFormat: Ref<WeekDayFormat>;
  fixedWeeks: Ref<boolean>;
  numberOfMonths: Ref<number>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  initialFocus: Ref<boolean>;
  onPlaceholderChange: (date: DateValue) => void;
  fullCalendarLabel: Ref<string>;
  parentElement: Ref<HTMLElement | undefined>;
  headingValue: Ref<string>;
  isInvalid: Ref<boolean>;
  isDateDisabled: Matcher;
  isDateUnavailable?: Matcher;
  isOutsideVisibleView: (date: DateValue) => boolean;
  highlightedRange: Ref<{ start: DateValue; end: DateValue } | null>;
  focusedValue: Ref<DateValue | undefined>;
  lastPressedDateValue: Ref<DateValue | undefined>;
  isSelected: (date: DateValue) => boolean;
  isSelectionEnd: (date: DateValue) => boolean;
  isSelectionStart: (date: DateValue) => boolean;
  isHighlightedStart: (date: DateValue) => boolean;
  isHighlightedEnd: (date: DateValue) => boolean;
  prevPage: (prevPageFunc?: (date: DateValue) => DateValue) => void;
  nextPage: (nextPageFunc?: (date: DateValue) => DateValue) => void;
  isNextButtonDisabled: (nextPageFunc?: (date: DateValue) => DateValue) => boolean;
  isPrevButtonDisabled: (prevPageFunc?: (date: DateValue) => DateValue) => boolean;
  formatter: DateFormatter;
  dir: Ref<Direction>;
};
// Grid
export interface RangeCalendarGridProps {}
export type RangeCalendarGridPropsWithPrimitive = RangeCalendarGridProps & PrimitiveProps;

// Grid Head
export interface RangeCalendarGridHeadProps {}
export type RangeCalendarGridHeadPropsWithPrimitive = RangeCalendarGridHeadProps & PrimitiveProps;

// Grid Body
export interface RangeCalendarGridBodyProps {}
export type RangeCalendarGridBodyPropsWithPrimitive = RangeCalendarGridBodyProps & PrimitiveProps;

// Grid Row
export interface RangeCalendarGridRowProps {}
export type RangeCalendarGridRowPropsWithPrimitive = RangeCalendarGridRowProps & PrimitiveProps;

// Header
export interface RangeCalendarHeaderProps {}
export type RangeCalendarHeaderPropsWithPrimitive = RangeCalendarHeaderProps & PrimitiveProps;

// Heading
export interface RangeCalendarHeadingProps {}
export type RangeCalendarHeadingPropsWithPrimitive = RangeCalendarHeadingProps & PrimitiveProps;

// Head Cell
export interface RangeCalendarHeadCellProps {}
export type RangeCalendarHeadCellPropsWithPrimitive = RangeCalendarHeadCellProps & PrimitiveProps;

// Cell
export interface RangeCalendarCellProps {
  date: DateValue;
}
export type RangeCalendarCellPropsWithPrimitive = RangeCalendarCellProps & PrimitiveProps;

// Cell Trigger
export interface RangeCalendarCellTriggerProps {
  day: DateValue;
  month: DateValue;
}
export type RangeCalendarCellTriggerPropsWithPrimitive = RangeCalendarCellTriggerProps & PrimitiveProps;

// Next
export interface RangeCalendarNextProps {
  /** The function to be used for the next page. Overwrites the `nextPage` function set on the `RangeCalendarRoot`. */
  nextPage?: (placeholder: DateValue) => DateValue;
}
export type RangeCalendarNextPropsWithPrimitive = RangeCalendarNextProps & PrimitiveProps;
// Prev
export interface RangeCalendarPrevProps {
  /** The function to be used for the prev page. Overwrites the `prevPage` function set on the `RangeCalendarRoot`. */
  prevPage?: (placeholder: DateValue) => DateValue;
}
export type RangeCalendarPrevPropsWithPrimitive = RangeCalendarPrevProps & PrimitiveProps;
