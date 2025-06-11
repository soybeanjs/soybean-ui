import type { Ref } from 'vue';
import type { DateFormatter, DateValue, DaysOfWeekNumber, Grid, Matcher, WeekDayFormat } from '../../date';
import type { ClassValueProp, Direction, PrimitiveProps } from '../../types';

export interface CalendarRootProps extends ClassValueProp {
  /** The default value for the calendar */
  defaultValue?: DateValue;
  /** The default placeholder date */
  defaultPlaceholder?: DateValue;
  /** The placeholder date, which is used to determine what month to display when no date is selected */
  placeholder?: DateValue;
  /**
   * This property causes the previous and next buttons to navigate by the number of months displayed at once, rather
   * than one month
   */
  pagedNavigation?: boolean;
  /** Whether or not to prevent the user from deselecting a date without selecting another date first */
  preventDeselect?: boolean;
  /** The day of the week to start the calendar on */
  weekStartsOn?: DaysOfWeekNumber;
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
  /** Whether the calendar is disabled */
  disabled?: boolean;
  /** Whether the calendar is readonly */
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
  /** The controlled checked state of the calendar */
  modelValue?: DateValue | DateValue[] | undefined;
  /** Whether multiple dates can be selected */
  multiple?: boolean;
  /** Whether or not to disable days outside the current view. */
  disableDaysOutsideCurrentView?: boolean;
}

export type CalendarRootPropsWithPrimitive = CalendarRootProps & PrimitiveProps;

// Calendar Cell
export interface CalendarCellProps extends ClassValueProp {
  /** The date value for the cell */
  date: DateValue;
}
export type CalendarCellPropsWithPrimitive = CalendarCellProps & PrimitiveProps;

// Calendar Cell Trigger
export interface CalendarCellTriggerProps extends ClassValueProp {
  /** The date value provided to the cell trigger */
  day: DateValue;
  /** The month in which the cell is rendered */
  month: DateValue;
}
export type CalendarCellTriggerPropsWithPrimitive = CalendarCellTriggerProps & PrimitiveProps;

// Calendar Grid
export interface CalendarGridProps extends ClassValueProp {}
export type CalendarGridPropsWithPrimitive = CalendarGridProps & PrimitiveProps;

export interface CalendarGridBodyProps extends ClassValueProp {}
export type CalendarGridBodyPropsWithPrimitive = CalendarGridBodyProps & PrimitiveProps;

export interface CalendarGridHeadProps extends ClassValueProp {}
export type CalendarGridHeadPropsWithPrimitive = CalendarGridHeadProps & PrimitiveProps;

export interface CalendarGridRowProps extends ClassValueProp {}
export type CalendarGridRowPropsWithPrimitive = CalendarGridRowProps & PrimitiveProps;

// Calendar Head
export interface CalendarHeadCellProps extends ClassValueProp {}
export type CalendarHeadCellPropsWithPrimitive = CalendarHeadCellProps & PrimitiveProps;

export interface CalendarHeaderProps extends ClassValueProp {}
export type CalendarHeaderPropsWithPrimitive = CalendarHeaderProps & PrimitiveProps;

export interface CalendarHeadingProps extends ClassValueProp {}
export type CalendarHeadingPropsWithPrimitive = CalendarHeadingProps & PrimitiveProps;

// Navigation
export interface CalendarNextProps extends ClassValueProp {
  /** The function to be used for the next page. Overwrites the `nextPage` function set on the `CalendarRoot`. */
  nextPage?: (placeholder: DateValue) => DateValue;
}
export type CalendarNextPropsWithPrimitive = CalendarNextProps & PrimitiveProps;

export interface CalendarPrevProps extends ClassValueProp {
  /** The function to be used for the prev page. Overwrites the `prevPage` function set on the `CalendarRoot`. */
  prevPage?: (placeholder: DateValue) => DateValue;
}
export type CalendarPrevPropsWithPrimitive = CalendarPrevProps & PrimitiveProps;

export type CalendarRootEmits = {
  'update:modelValue': [date: DateValue | undefined];
  'update:placeholder': [date: DateValue];
};

export interface CalendarRootContext {
  locale: Ref<string>;
  modelValue: Ref<DateValue | DateValue[] | undefined>;
  placeholder: Ref<DateValue>;
  pagedNavigation: Ref<boolean>;
  preventDeselect: Ref<boolean>;
  grid: Ref<Grid<DateValue>[]>;
  weekDays: Ref<string[]>;
  weekStartsOn: Ref<DaysOfWeekNumber>;
  weekdayFormat: Ref<WeekDayFormat>;
  fixedWeeks: Ref<boolean>;
  multiple: Ref<boolean>;
  numberOfMonths: Ref<number>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  initialFocus: Ref<boolean>;
  onDateChange: (date: DateValue) => void;
  onPlaceholderChange: (date: DateValue) => void;
  fullCalendarLabel: Ref<string>;
  parentElement: Ref<HTMLElement | undefined>;
  headingValue: Ref<string>;
  isInvalid: Ref<boolean>;
  isDateDisabled: Matcher;
  isDateSelected: Matcher;
  isDateUnavailable?: Matcher;
  isOutsideVisibleView: (date: DateValue) => boolean;
  prevPage: (prevPageFunc?: (date: DateValue) => DateValue) => void;
  nextPage: (nextPageFunc?: (date: DateValue) => DateValue) => void;
  isNextButtonDisabled: (nextPageFunc?: (date: DateValue) => DateValue) => boolean;
  isPrevButtonDisabled: (prevPageFunc?: (date: DateValue) => DateValue) => boolean;
  formatter: DateFormatter;
  dir: Ref<Direction>;
  disableDaysOutsideCurrentView: Ref<boolean>;
}
