import type { DateStep, DateValue, Granularity, HourCycle, TimeGranularity, TimeInputType } from './types';

import type { TimeValue } from './comparators';

export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new RangeError('chunk size must be greater than 0');
  }

  const result: T[][] = [];

  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size));
  }

  return result;
}

export function getOptsByGranularity(granularity: Granularity, hourCycle: HourCycle, isTimeValue = false) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    hourCycle: normalizeHourCycle(hourCycle),
    hour12: normalizeHour12(hourCycle)
  };

  if (isTimeValue) {
    delete options.year;
    delete options.month;
    delete options.day;
  }

  if (granularity === 'day') {
    delete options.hour;
    delete options.minute;
    delete options.second;
    delete options.timeZoneName;
  }

  if (granularity === 'hour') {
    delete options.minute;
    delete options.second;
  }

  if (granularity === 'minute') {
    delete options.second;
  }

  return options;
}

export function normalizeDateStep(props?: { step?: DateStep }): DateStep {
  return {
    year: props?.step?.year ?? 1,
    month: props?.step?.month ?? 1,
    day: props?.step?.day ?? 1,
    hour: props?.step?.hour ?? 1,
    minute: props?.step?.minute ?? 1,
    second: props?.step?.second ?? 1,
    millisecond: props?.step?.millisecond ?? 1
  };
}

export function handleCalendarInitialFocus(calendar: HTMLElement) {
  const selectedDay = calendar.querySelector<HTMLElement>('[data-selected]');
  if (selectedDay) {
    selectedDay.focus();
    return;
  }

  const today = calendar.querySelector<HTMLElement>('[data-today]');
  if (today) {
    today.focus();
    return;
  }

  const firstDay = calendar.querySelector<HTMLElement>('[data-slot="cell-trigger"]:not([data-disabled]):not([data-unavailable])');
  firstDay?.focus();
}

export function normalizeHourCycle(hourCycle: HourCycle) {
  if (hourCycle === 24) {
    return 'h23';
  }

  if (hourCycle === 12) {
    return 'h11';
  }

  return undefined;
}

export function normalizeHour12(hourCycle: HourCycle) {
  if (hourCycle === 24) {
    return false;
  }

  if (hourCycle === 12) {
    return true;
  }

  return undefined;
}

export function getInputType(granularity: Granularity) {
  return granularity === 'day' ? 'date' : 'datetime-local';
}

export function normalizeInputValue(date: DateValue | undefined, granularity: Granularity): string {
  if (!date) {
    return '';
  }

  const type = getInputType(granularity);
  const year = String(date.year).padStart(4, '0');
  const month = String(date.month).padStart(2, '0');
  const day = String(date.day).padStart(2, '0');

  if (type === 'date') {
    return `${year}-${month}-${day}`;
  }

  const hour = String('hour' in date ? date.hour : 0).padStart(2, '0');
  const minute = String('minute' in date ? date.minute : 0).padStart(2, '0');

  if (granularity === 'second') {
    const second = String('second' in date ? date.second : 0).padStart(2, '0');
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  }

  return `${year}-${month}-${day}T${hour}:${minute}`;
}


export function getTimeInputType(_granularity: TimeGranularity): TimeInputType {
  return 'time';
}

export function normalizeTimeInputValue(time: TimeValue | undefined, granularity: TimeGranularity): string {
  if (!time) {
    return '';
  }

  const hour = String(time.hour).padStart(2, '0');
  const minute = String(time.minute).padStart(2, '0');

  if (granularity === 'second') {
    const second = String(time.second).padStart(2, '0');
    return `${hour}:${minute}:${second}`;
  }

  return `${hour}:${minute}`;
}
