import type { DateValue, Time, CalendarDateTime, CalendarIdentifier, ZonedDateTime } from '@internationalized/date';

export type TimeValue = Time | CalendarDateTime | ZonedDateTime;

export type DayOfWeek = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export type DateMatcher = (date: DateValue) => boolean;

export type TimeMatcher = (time: TimeValue) => boolean;

export interface DateRange {
  start?: DateValue;
  end?: DateValue;
}

export interface TimeRange {
  start?: TimeValue;
  end?: TimeValue;
}

export interface DateGrid<T> {
  value: DateValue;
  rows: T[][];
  cells: T[];
}

export interface DateStep {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
}

export type HourCycle = 12 | 24 | undefined;
export type DateSegmentPart = 'day' | 'month' | 'year';
export type TimeSegmentPart = 'hour' | 'minute' | 'second' | 'dayPeriod';
export type EditableSegmentPart = DateSegmentPart | TimeSegmentPart;
export type NonEditableSegmentPart = 'literal' | 'timeZoneName';
export type SegmentPart = EditableSegmentPart | NonEditableSegmentPart;
export type AnyExceptLiteral = Exclude<SegmentPart, 'literal'>;

export type DayPeriod = 'AM' | 'PM' | null;
export type WeekDayFormat = 'narrow' | 'short' | 'long';
export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DateSegmentObj = {
  [K in DateSegmentPart]: number | null;
};

export type TimeSegmentObj = {
  [K in TimeSegmentPart]: K extends 'dayPeriod' ? DayPeriod : number | null;
};

export type DateAndTimeSegmentObj = DateSegmentObj & TimeSegmentObj;
export type SegmentValueObj = DateSegmentObj | DateAndTimeSegmentObj;
export type SegmentContentObj = Record<EditableSegmentPart, string>;

export type DateInputType = 'date' | 'datetime-local';
export type TimeInputType = 'time';
export type TimeGranularity = 'hour' | 'minute' | 'second';
export type Granularity = 'day' | TimeGranularity;

export type { DateValue, CalendarIdentifier };
