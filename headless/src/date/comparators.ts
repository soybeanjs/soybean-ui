import type { DateValue } from '@internationalized/date';
import type { CalendarIdentifier } from '@internationalized/date';

import type { Granularity, Matcher } from './types';

import {
  CalendarDate,
  CalendarDateTime,
  createCalendar,
  DateFormatter,
  getDayOfWeek,
  getLocalTimeZone,
  parseDate,
  parseDateTime,
  parseZonedDateTime,
  Time,
  toCalendar,
  ZonedDateTime
} from '@internationalized/date';

export type TimeValue = Time | CalendarDateTime | ZonedDateTime;

export function parseStringToDateValue(dateStr: string, referenceValue: DateValue): DateValue {
  let dateValue: DateValue;

  if (isZonedDateTime(referenceValue)) {
    dateValue = parseZonedDateTime(dateStr);
  } else if (isCalendarDateTime(referenceValue)) {
    dateValue = parseDateTime(dateStr);
  } else {
    dateValue = parseDate(dateStr);
  }

  if (dateValue.calendar !== referenceValue.calendar) {
    return toCalendar(dateValue, referenceValue.calendar);
  }

  return dateValue;
}

export function isTime(dateValue: DateValue | TimeValue): dateValue is Time {
  return dateValue instanceof Time;
}

export function toDate(dateValue: DateValue | TimeValue, tz: string = getLocalTimeZone()) {
  if (isTime(dateValue)) {
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      dateValue.hour,
      dateValue.minute,
      dateValue.second,
      dateValue.millisecond
    );
  }

  if (isZonedDateTime(dateValue)) {
    return dateValue.toDate();
  }

  return dateValue.toDate(tz);
}

export function isCalendarDateTime(dateValue: DateValue | TimeValue): dateValue is CalendarDateTime {
  return dateValue instanceof CalendarDateTime;
}

export function isZonedDateTime(dateValue: DateValue | TimeValue): dateValue is ZonedDateTime {
  return dateValue instanceof ZonedDateTime;
}

export function hasTime(dateValue: DateValue | TimeValue) {
  return isTime(dateValue) || isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}

export function getDaysInMonth(date: Date | DateValue) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return new Date(year, month, 0).getDate();
  }

  return date.set({ day: 100 }).day;
}

export function getDefaultDate(props: {
  defaultValue?: DateValue | DateValue[];
  defaultPlaceholder?: DateValue;
  granularity?: Granularity;
  locale?: string;
}): DateValue {
  const { defaultValue, defaultPlaceholder, granularity = 'day', locale = 'en' } = props;

  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue.at(-1)!.copy();
  }

  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue.copy();
  }

  if (defaultPlaceholder) {
    return defaultPlaceholder.copy();
  }

  const now = new Date();
  const formatter = new DateFormatter(locale);
  const calendar = createCalendar(formatter.resolvedOptions().calendar as CalendarIdentifier);
  const timeGranularities = ['hour', 'minute', 'second'];

  if (timeGranularities.includes(granularity)) {
    return toCalendar(new CalendarDateTime(now.getFullYear(), now.getMonth() + 1, now.getDate(), 0, 0, 0), calendar);
  }

  return toCalendar(new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate()), calendar);
}

export function getDefaultTime(props: { defaultValue?: TimeValue; defaultPlaceholder?: TimeValue }): TimeValue {
  if (props.defaultValue) {
    return props.defaultValue.copy();
  }

  if (props.defaultPlaceholder) {
    return props.defaultPlaceholder.copy();
  }

  return new Time(0, 0, 0);
}

export function isBefore(dateToCompare: DateValue | TimeValue, referenceDate: DateValue | TimeValue) {
  if (isTime(dateToCompare) && isTime(referenceDate)) {
    return dateToCompare.compare(referenceDate) < 0;
  }

  return (dateToCompare as DateValue).compare(referenceDate as DateValue) < 0;
}

export function isAfter(dateToCompare: DateValue | TimeValue, referenceDate: DateValue | TimeValue) {
  if (isTime(dateToCompare) && isTime(referenceDate)) {
    return dateToCompare.compare(referenceDate) > 0;
  }

  return (dateToCompare as DateValue).compare(referenceDate as DateValue) > 0;
}

export function isBeforeOrSame(dateToCompare: DateValue | TimeValue, referenceDate: DateValue | TimeValue) {
  if (isTime(dateToCompare) && isTime(referenceDate)) {
    return dateToCompare.compare(referenceDate) <= 0;
  }

  return (dateToCompare as DateValue).compare(referenceDate as DateValue) <= 0;
}

export function isAfterOrSame(dateToCompare: DateValue | TimeValue, referenceDate: DateValue | TimeValue) {
  if (isTime(dateToCompare) && isTime(referenceDate)) {
    return dateToCompare.compare(referenceDate) >= 0;
  }

  return (dateToCompare as DateValue).compare(referenceDate as DateValue) >= 0;
}

export function isEqualValue(a: DateValue | TimeValue, b: DateValue | TimeValue) {
  return a.toString() === b.toString();
}

export function isBetweenInclusive(date: DateValue, start: DateValue, end: DateValue) {
  return isAfterOrSame(date, start) && isBeforeOrSame(date, end);
}

export function isBetween(date: DateValue, start: DateValue, end: DateValue) {
  return isAfter(date, start) && isBefore(date, end);
}

export function getLastFirstDayOfWeek<T extends DateValue = DateValue>(date: T, firstDayOfWeek: number, locale: string): T {
  const day = getDayOfWeek(date, locale, 'sun');

  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek }) as T;
  }

  if (firstDayOfWeek === day) {
    return date as T;
  }

  return date.subtract({ days: day - firstDayOfWeek }) as T;
}

export function getNextLastDayOfWeek<T extends DateValue = DateValue>(date: T, firstDayOfWeek: number, locale: string): T {
  const day = getDayOfWeek(date, locale, 'sun');
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  if (day === lastDayOfWeek) {
    return date as T;
  }

  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek }) as T;
  }

  return date.add({ days: lastDayOfWeek - day }) as T;
}

export function isSameYearMonth(a: DateValue, b: DateValue): boolean {
  return a.year === b.year && a.month === b.month;
}

export function isSameYear(a: DateValue, b: DateValue): boolean {
  return a.year === b.year;
}

export function areAllDaysBetweenValid(
  start: DateValue,
  end: DateValue,
  isUnavailable: Matcher | undefined,
  isDisabled: Matcher | undefined,
  isHighlightable?: Matcher | undefined
) {
  if (isUnavailable === undefined && isDisabled === undefined && isHighlightable === undefined) {
    return true;
  }

  let current = start.add({ days: 1 });
  const isInvalidDay = (date: DateValue) => (isDisabled?.(date) || isUnavailable?.(date)) && !isHighlightable?.(date);

  while (current.compare(end) < 0) {
    if (isInvalidDay(current)) {
      return false;
    }

    current = current.add({ days: 1 });
  }

  return true;
}

export function compareYearMonth(a: DateValue, b: DateValue): number {
  if (a.year !== b.year) {
    return a.year - b.year;
  }

  return a.month - b.month;
}

export function isMonthBetweenInclusive(date: DateValue, start: DateValue, end: DateValue): boolean {
  return compareYearMonth(date, start) >= 0 && compareYearMonth(date, end) <= 0;
}

export function isYearBetweenInclusive(date: DateValue, start: DateValue, end: DateValue): boolean {
  return date.year >= start.year && date.year <= end.year;
}

export function getMonthsBetween(start: DateValue, end: DateValue): number {
  return (end.year - start.year) * 12 + (end.month - start.month) + 1;
}
