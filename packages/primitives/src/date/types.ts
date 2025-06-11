/*
 * Implementation ported from https://github.com/melt-ui/melt-ui/blob/develop/src/lib/internal/helpers/date/types.ts
 */

import type { CalendarDateTime, DateValue, Time, ZonedDateTime } from '@internationalized/date';

export type Matcher = (date: DateValue) => boolean;

export type Grid<T> = {
  /**
   * A `DateValue` used to represent the month. Since days from the previous and next months may be included in the
   * calendar grid, we need a source of truth for the value the grid is representing.
   */
  value: DateValue;

  /**
   * An array of arrays representing the weeks in the calendar. Each sub-array represents a week, and contains the dates
   * for each day in that week. This structure is useful for rendering the calendar grid using a table, where each row
   * represents a week and each cell represents a day.
   */
  rows: T[][];

  /**
   * An array of all the dates in the current month, including dates from the previous and next months that are used to
   * fill out the calendar grid. This array is useful for rendering the calendar grid in a customizable way, as it
   * provides all the dates that should be displayed in the grid in a flat array.
   */
  cells: T[];
};

export type TimeValue = Time | CalendarDateTime | ZonedDateTime;

export type Granularity = 'day' | 'hour' | 'minute' | 'second';

export type TimeGranularity = 'hour' | 'minute' | 'second';

export interface DateFormatterOptions extends Intl.DateTimeFormatOptions {
  calendar?: string;
}

export type DateFormatter = {
  getLocale: () => string;
  setLocale: (newLocale: string) => void;
  custom: (date: Date, options: DateFormatterOptions) => string;
  selectedDate: (date: DateValue, includeTime?: boolean) => string;
  dayOfWeek: (date: Date, length?: DateFormatterOptions['weekday']) => string;
  fullMonthAndYear: (date: Date, options?: DateFormatterOptions) => string;
  fullMonth: (date: Date, options?: DateFormatterOptions) => string;
  fullYear: (date: Date, options?: DateFormatterOptions) => string;
  dayPeriod: (date: Date) => string;
  part: (dateObj: DateValue, type: Intl.DateTimeFormatPartTypes, options?: DateFormatterOptions) => string;
  toParts: (date: DateValue, options?: DateFormatterOptions) => Intl.DateTimeFormatPart[];
  getMonths: () => { label: string; value: number }[];
};

export type DaysOfWeekNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DayOfWeek = {
  daysOfWeek: DaysOfWeekNumber[];
};

export type DateStep = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
};

export type DateRange = {
  start: DateValue | undefined;
  end: DateValue | undefined;
};
export type DateRangeType = keyof DateRange;

export type HourCycle = 12 | 24 | undefined;

export type DateSegmentPart = 'day' | 'month' | 'year';
export type TimeSegmentPart = 'hour' | 'minute' | 'second' | 'dayPeriod';
export type NonEditableSegmentPart = 'literal' | 'timeZoneName';
export type EditableSegmentPart = DateSegmentPart | TimeSegmentPart;
export type SegmentPart = EditableSegmentPart | NonEditableSegmentPart;

export type AnyExceptLiteral = Exclude<SegmentPart, 'literal'>;

export type DayPeriod = 'AM' | 'PM' | null;
export type DateSegmentObj = {
  [K in DateSegmentPart]: number | null;
};
export type TimeSegmentObj = {
  [K in TimeSegmentPart]: K extends 'dayPeriod' ? DayPeriod : number | null;
};
export type DateAndTimeSegmentObj = DateSegmentObj & TimeSegmentObj;
export type SegmentValueObj = DateSegmentObj | DateAndTimeSegmentObj;
export type SegmentContentObj = Record<EditableSegmentPart, string>;

export type WeekDayFormat = 'narrow' | 'short' | 'long';

export type CreateSelectProps = {
  /** The date object representing the date (usually the first day of the month/year). */
  dateObj: DateValue;
};

export type CreateMonthProps = {
  /** The date object representing the month's date (usually the first day of the month). */
  dateObj: DateValue;

  /** The day of the week to start the calendar on (0 for Sunday, 1 for Monday, etc.). */
  weekStartsOn: number;

  /** Whether to always render 6 weeks in the calendar, even if the month doesn't span 6 weeks. */
  fixedWeeks: boolean;

  /** The locale to use when creating the calendar month. */
  locale: string;
};

export type RangeCalendarFixedDatePart = 'start' | 'end';

export type { DateValue };
