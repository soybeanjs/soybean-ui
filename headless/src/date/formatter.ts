import type { DateValue, ZonedDateTime } from '@internationalized/date';

import type { TimeValue } from './comparators';

import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
import { ref } from 'vue';

import { hasTime, isZonedDateTime, toDate } from './comparators';

export interface DateFormatterOptions extends Intl.DateTimeFormatOptions {
  calendar?: string;
}

export interface Formatter {
  getLocale: () => string;
  setLocale: (newLocale: string) => void;
  custom: (date: Date, options: DateFormatterOptions) => string;
  selectedDate: (date: DateValue | TimeValue, includeTime?: boolean) => string;
  dayOfWeek: (date: Date, length?: DateFormatterOptions['weekday']) => string;
  fullMonthAndYear: (date: Date, options?: DateFormatterOptions) => string;
  fullMonth: (date: Date, options?: DateFormatterOptions) => string;
  fullYear: (date: Date, options?: DateFormatterOptions) => string;
  dayPeriod: (date: Date) => string;
  part: (dateObj: DateValue | TimeValue, type: Intl.DateTimeFormatPartTypes, options?: DateFormatterOptions) => string;
  toParts: (date: DateValue | TimeValue, options?: DateFormatterOptions) => Intl.DateTimeFormatPart[];
  getMonths: () => { label: string; value: number }[];
}

export function useDateFormatter(initialLocale: string, opts: DateFormatterOptions = {}): Formatter {
  const locale = ref(initialLocale);

  function getLocale() {
    return locale.value;
  }

  function setLocale(newLocale: string) {
    locale.value = newLocale;
  }

  function custom(date: Date, options: DateFormatterOptions) {
    return new DateFormatter(locale.value, { ...opts, ...options }).format(date);
  }

  function selectedDate(date: DateValue | TimeValue, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), {
        dateStyle: 'long',
        timeStyle: 'long'
      });
    }

    return custom(toDate(date), {
      dateStyle: 'long'
    });
  }

  function fullMonthAndYear(date: Date, options: DateFormatterOptions = {}) {
    return new DateFormatter(locale.value, { ...opts, month: 'long', year: 'numeric', ...options }).format(date);
  }

  function fullMonth(date: Date, options: DateFormatterOptions = {}) {
    return new DateFormatter(locale.value, { ...opts, month: 'long', ...options }).format(date);
  }

  function getMonths() {
    const defaultDate = today(getLocalTimeZone());
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return months.map(item => ({ label: fullMonth(toDate(defaultDate.set({ month: item }))), value: item }));
  }

  function fullYear(date: Date, options: DateFormatterOptions = {}) {
    return new DateFormatter(locale.value, { ...opts, year: 'numeric', ...options }).format(date);
  }

  function toParts(date: DateValue | TimeValue, options?: DateFormatterOptions) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale.value, {
        ...opts,
        ...options,
        timeZone: (date as ZonedDateTime).timeZone
      }).formatToParts(toDate(date));
    }

    return new DateFormatter(locale.value, { ...opts, ...options }).formatToParts(toDate(date));
  }

  function dayOfWeek(date: Date, length: DateFormatterOptions['weekday'] = 'narrow') {
    return new DateFormatter(locale.value, { ...opts, weekday: length }).format(date);
  }

  function dayPeriod(date: Date) {
    const parts = new DateFormatter(locale.value, {
      ...opts,
      hour: 'numeric',
      minute: 'numeric'
    }).formatToParts(date);
    const value = parts.find(item => item.type === 'dayPeriod')?.value;

    if (value === 'PM' || value === 'pm' || value === 'p.m.') {
      return 'PM';
    }

    return 'AM';
  }

  const defaultPartOptions: DateFormatterOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  function part(dateObj: DateValue | TimeValue, type: Intl.DateTimeFormatPartTypes, options: DateFormatterOptions = {}) {
    const parts = toParts(dateObj, { ...defaultPartOptions, ...options });
    const segment = parts.find(item => item.type === type);

    return segment?.value ?? '';
  }

  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek,
    getMonths
  };
}
