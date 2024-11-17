import type { Granularity, HourCycle } from './types';

export function getOptsByGranularity(granularity: Granularity, hourCycle: HourCycle, isTimeValue: boolean = false) {
  const opts: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    hourCycle: hourCycle === 24 ? 'h23' : undefined,
    hour12: hourCycle === 24 ? false : undefined
  };
  if (isTimeValue) {
    delete opts.year;
    delete opts.month;
    delete opts.day;
  }

  if (granularity === 'day') {
    delete opts.second;
    delete opts.hour;
    delete opts.minute;
    delete opts.timeZoneName;
  }
  if (granularity === 'hour') {
    delete opts.minute;
    delete opts.second;
  }

  if (granularity === 'minute') delete opts.second;

  return opts;
}

export function handleCalendarInitialFocus(calendar: HTMLElement) {
  const selectedDay = calendar.querySelector<HTMLElement>('[data-selected]');
  if (selectedDay) return selectedDay.focus();

  const today = calendar.querySelector<HTMLElement>('[data-today]');
  if (today) return today.focus();

  const firstDay = calendar.querySelector<HTMLElement>('[data-reka-calendar-day]');
  if (firstDay) return firstDay.focus();
}

/**
 * Splits an array into chunks of a given size.
 *
 * @example
 *   ```ts
 *   const arr = [1, 2, 3, 4, 5, 6, 7, 8];
 *   const chunks = chunk(arr, 3);
 *   // chunks = [[1, 2, 3], [4, 5, 6], [7, 8]]
 *   ```;
 *
 * @param arr The array to split.
 * @param size The size of each chunk.
 * @returns An array of arrays, where each sub-array has `size` elements from the original array.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}
