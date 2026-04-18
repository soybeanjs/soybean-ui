import type { DateValue } from '@internationalized/date';

import type { Matcher } from './types';

import {
  CalendarDateTime,
  getDayOfWeek,
  getLocalTimeZone,
  parseDate,
  parseDateTime,
  parseZonedDateTime,
  toCalendar,
  ZonedDateTime
} from '@internationalized/date';

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

export function toDate(dateValue: DateValue, tz: string = getLocalTimeZone()) {
  if (isZonedDateTime(dateValue)) {
    return dateValue.toDate();
  }

  return dateValue.toDate(tz);
}

export function isCalendarDateTime(dateValue: DateValue): dateValue is CalendarDateTime {
  return dateValue instanceof CalendarDateTime;
}

export function isZonedDateTime(dateValue: DateValue): dateValue is ZonedDateTime {
  return dateValue instanceof ZonedDateTime;
}

export function hasTime(dateValue: DateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}

export function getDaysInMonth(date: Date | DateValue) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return new Date(year, month, 0).getDate();
  }

  return date.set({ day: 100 }).day;
}

export function isBefore(dateToCompare: DateValue, referenceDate: DateValue) {
  return dateToCompare.compare(referenceDate) < 0;
}

export function isAfter(dateToCompare: DateValue, referenceDate: DateValue) {
  return dateToCompare.compare(referenceDate) > 0;
}

export function isBeforeOrSame(dateToCompare: DateValue, referenceDate: DateValue) {
  return dateToCompare.compare(referenceDate) <= 0;
}

export function isAfterOrSame(dateToCompare: DateValue, referenceDate: DateValue) {
  return dateToCompare.compare(referenceDate) >= 0;
}

export function isBetweenInclusive(date: DateValue, start: DateValue, end: DateValue) {
  return isAfterOrSame(date, start) && isBeforeOrSame(date, end);
}

export function isBetween(date: DateValue, start: DateValue, end: DateValue) {
  return isAfter(date, start) && isBefore(date, end);
}

export function getLastFirstDayOfWeek<T extends DateValue = DateValue>(
  date: T,
  firstDayOfWeek: number,
  locale: string
): T {
  const day = getDayOfWeek(date, locale, 'sun');

  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek }) as T;
  }

  if (firstDayOfWeek === day) {
    return date as T;
  }

  return date.subtract({ days: day - firstDayOfWeek }) as T;
}

export function getNextLastDayOfWeek<T extends DateValue = DateValue>(
  date: T,
  firstDayOfWeek: number,
  locale: string
): T {
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

export function getYearsBetween(start: DateValue, end: DateValue): number {
  return end.year - start.year + 1;
}

export function areAllMonthsBetweenValid(
  start: DateValue,
  end: DateValue,
  isUnavailable: Matcher | undefined,
  isDisabled: Matcher | undefined
): boolean {
  if (isUnavailable === undefined && isDisabled === undefined) {
    return true;
  }

  let current = start.set({ day: 1 });
  const endMonth = end.set({ day: 1 });

  while (compareYearMonth(current, endMonth) <= 0) {
    if (isDisabled?.(current) || isUnavailable?.(current)) {
      return false;
    }

    current = current.add({ months: 1 });
  }

  return true;
}

export function areAllYearsBetweenValid(
  start: DateValue,
  end: DateValue,
  isUnavailable: Matcher | undefined,
  isDisabled: Matcher | undefined
): boolean {
  if (isUnavailable === undefined && isDisabled === undefined) {
    return true;
  }

  let current = start.set({ day: 1, month: 1 });
  const endYear = end.set({ day: 1, month: 1 });

  while (current.year <= endYear.year) {
    if (isDisabled?.(current) || isUnavailable?.(current)) {
      return false;
    }

    current = current.add({ years: 1 });
  }

  return true;
}
