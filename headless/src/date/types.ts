import type { DateValue } from '@internationalized/date';

import type { TimeValue } from './comparators';
import type { DATE_SEGMENT_PARTS, EDITABLE_SEGMENT_PARTS, NON_EDITABLE_SEGMENT_PARTS, TIME_SEGMENT_PARTS } from './parts';

export type { DateValue };

export type DayOfWeek = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export type Matcher = (date: DateValue) => boolean;
export type TimeMatcher = (time: TimeValue) => boolean;

export interface DateRange {
  start?: DateValue;
  end?: DateValue;
}

export interface TimeRange {
  start?: TimeValue;
  end?: TimeValue;
}

export interface Grid<T> {
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
export type DateSegmentPart = (typeof DATE_SEGMENT_PARTS)[number];
export type TimeSegmentPart = (typeof TIME_SEGMENT_PARTS)[number];
export type EditableSegmentPart = (typeof EDITABLE_SEGMENT_PARTS)[number];
export type NonEditableSegmentPart = (typeof NON_EDITABLE_SEGMENT_PARTS)[number];
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

export type DateInputType = 'date' | 'datetime-local';
export type TimeInputType = 'time';
export type Granularity = 'day' | 'hour' | 'minute' | 'second';
export type TimeGranularity = 'hour' | 'minute' | 'second';
