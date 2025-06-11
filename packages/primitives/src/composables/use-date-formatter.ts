/*
 * Implementation ported from https://github.com/melt-ui/melt-ui/blob/develop/src/lib/internal/helpers/date/formatter.ts
 */

import { ref } from 'vue';
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
import type { DateValue, ZonedDateTime } from '@internationalized/date';
import { hasTime, isZonedDateTime, toDate } from '../date';
import type { DateFormatterOptions, DateFormatter as Formatter } from '../date';

/**
 * Creates a wrapper around the `DateFormatter`, which is an improved version of the {@link Intl.DateTimeFormat} API,
 * that is used internally by the various date builders to easily format dates in a consistent way.
 *
 * @see [DateFormatter](https://react-spectrum.adobe.com/internationalized/date/DateFormatter.html)
 */
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

  function selectedDate(date: DateValue, includeTime = true) {
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

  function toParts(date: DateValue, options?: DateFormatterOptions) {
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
    const value = parts.find(p => p.type === 'dayPeriod')?.value;
    if (value === 'PM') return 'PM';

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

  function part(dateObj: DateValue, type: Intl.DateTimeFormatPartTypes, options: DateFormatterOptions = {}) {
    const $opts = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, $opts);
    const foundPart = parts.find(p => p.type === type);
    return foundPart ? foundPart.value : '';
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
