import {
  CalendarDate,
  endOfMonth,
  endOfYear,
  getDayOfWeek,
  startOfMonth,
  startOfWeek,
  startOfYear
} from '@internationalized/date';
import { chunk } from '../shared';
import { getDaysInMonth, getLastFirstDayOfWeek, getNextLastDayOfWeek } from './comparators';
import type { DateValue, DateRange, DayOfWeek, DateGrid, WeekStartsOn } from './types';

export const DEFAULT_DATE_LOCALE = 'en-US';

export interface CreateSelectOptions {
  dateObj: DateValue;
}

export function getDaysBetween(start: DateValue, end: DateValue) {
  const days: DateValue[] = [];
  let current = start.add({ days: 1 });

  while (current.compare(end) < 0) {
    days.push(current);
    current = current.add({ days: 1 });
  }

  return days;
}

export interface CreateMonthOptions {
  dateObj: DateValue;
  weekStartsOn: WeekStartsOn;
  fixedWeeks: boolean;
  locale: string;
}

export function createMonth(options: CreateMonthOptions): DateGrid<DateValue> {
  const { dateObj, weekStartsOn, fixedWeeks, locale } = options;
  const daysInMonth = getDaysInMonth(dateObj);
  const datesArray = Array.from({ length: daysInMonth }, (_, index) => dateObj.set({ day: index + 1 }));
  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);
  const lastWeekStart = getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, locale);
  const nextWeekEnd = getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, locale);
  const lastMonthDays = getDaysBetween(lastWeekStart.subtract({ days: 1 }), firstDayOfMonth);
  const nextMonthDays = getDaysBetween(lastDayOfMonth, nextWeekEnd.add({ days: 1 }));
  const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;

  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;
    const startFrom = nextMonthDays.at(-1) ?? endOfMonth(dateObj);
    const extraDaysArray = Array.from({ length: extraDays }, (_, index) => startFrom.add({ days: index + 1 }));

    nextMonthDays.push(...extraDaysArray);
  }

  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);

  return {
    value: dateObj,
    cells: allDays,
    rows: chunk(allDays, 7)
  };
}

export function startOfDecade(dateObj: DateValue) {
  return startOfYear(
    dateObj.subtract({ years: dateObj.year - Math.floor(dateObj.year / 10) * 10 }).set({ day: 1, month: 1 })
  );
}

export function endOfDecade(dateObj: DateValue) {
  return endOfYear(startOfDecade(dateObj).add({ years: 9 }));
}

interface CreateDecadeOptions extends CreateSelectOptions {
  startIndex?: number;
  endIndex: number;
}

export function createDecade(props: CreateDecadeOptions): DateValue[] {
  const { dateObj, startIndex = 0, endIndex } = props;
  const decadeLength = endIndex - startIndex + 1;

  if (decadeLength <= 0) {
    return [];
  }

  return Array.from({ length: decadeLength }, (_, index) =>
    dateObj.add({ years: startIndex + index }).set({ day: 1, month: 1 })
  );
}

interface CreateYearOptions extends CreateSelectOptions {
  numberOfMonths?: number;
  pagedNavigation?: boolean;
}

export function createYear(props: CreateYearOptions): DateValue[] {
  const { dateObj, numberOfMonths = 1, pagedNavigation = false } = props;

  if (numberOfMonths && pagedNavigation) {
    const months: DateValue[] = [];

    for (let month = 1; month <= 12; month += numberOfMonths) {
      months.push(startOfMonth(dateObj.set({ month })));
    }

    return months;
  }

  return Array.from({ length: 12 }, (_, index) => startOfMonth(dateObj.set({ month: index + 1 })));
}

interface CreateMonthsOptions extends CreateMonthOptions {
  numberOfMonths: number | undefined;
  currentMonths?: DateGrid<DateValue>[];
}

export function createMonths(options: CreateMonthsOptions) {
  const { numberOfMonths, dateObj, ...monthProps } = options;

  if (!numberOfMonths || numberOfMonths === 1) {
    return [
      createMonth({
        ...monthProps,
        dateObj
      })
    ];
  }

  const months = [
    createMonth({
      ...monthProps,
      dateObj
    })
  ];

  for (let index = 1; index < numberOfMonths; index += 1) {
    months.push(
      createMonth({
        ...monthProps,
        dateObj: dateObj.add({ months: index })
      })
    );
  }

  return months;
}

export function createMonthGrid(options: CreateSelectOptions): DateGrid<DateValue> {
  const { dateObj } = options;
  const months = createYear({ dateObj });

  return {
    value: dateObj,
    cells: months,
    rows: chunk(months, 4)
  };
}

export interface CreateYearGridOptions extends CreateSelectOptions {
  yearsPerPage?: number;
  decadeAligned?: boolean;
}

export function createYearGrid(options: CreateYearGridOptions): DateGrid<DateValue> {
  const { dateObj, yearsPerPage = 12, decadeAligned = true } = options;
  const startYear = decadeAligned ? startOfDecade(dateObj).year : dateObj.year;
  const years = Array.from({ length: yearsPerPage }, (_, index) =>
    startOfYear(dateObj.set({ year: startYear + index }))
  );

  return {
    value: years[0],
    cells: years,
    rows: chunk(years, 4)
  };
}

export function createYearRange({ start, end }: DateRange): DateValue[] {
  const years: DateValue[] = [];

  if (!start || !end) {
    return years;
  }

  let current = startOfYear(start);

  while (current.compare(end) <= 0) {
    years.push(current);
    current = startOfYear(current.add({ years: 1 }));
  }

  return years;
}

export function createDateRange({ start, end }: DateRange): DateValue[] {
  const dates: DateValue[] = [];

  if (!start || !end) {
    return dates;
  }

  let current = start;

  while (current.compare(end) <= 0) {
    dates.push(current);
    current = current.add({ days: 1 });
  }

  return dates;
}

export function getWeekStartsOn(locale: string): WeekStartsOn {
  const monday = new CalendarDate(2025, 1, 6);
  const dayOfWeek = getDayOfWeek(monday, locale);

  return ((1 - dayOfWeek + 7) % 7) as WeekStartsOn;
}

export function getWeekNumber(
  date: DateValue,
  locale: string = DEFAULT_DATE_LOCALE,
  firstDayOfWeek?: DayOfWeek
): number {
  const jan1 = new CalendarDate(date.year, 1, 1);
  const usesISOWeek = jan1.toDate('UTC').getUTCDay() !== getDayOfWeek(jan1, locale);
  const weekStartsOn = firstDayOfWeek ?? (usesISOWeek ? 'mon' : 'sun');
  const firstWeekContainsDate = usesISOWeek ? 4 : 1;
  const dayOfWeek = getDayOfWeek(date, locale, weekStartsOn);
  const decidingDay = date.add({ days: 7 - firstWeekContainsDate - dayOfWeek });
  const weekYear = decidingDay.year;
  const week1Ref = new CalendarDate(weekYear, 1, firstWeekContainsDate);
  const week1Start = startOfWeek(week1Ref, locale, weekStartsOn);
  const currentWeekStart = startOfWeek(date, locale, weekStartsOn);
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksDiff = Math.round(
    (currentWeekStart.toDate('UTC').getTime() - week1Start.toDate('UTC').getTime()) / millisecondsPerWeek
  );

  return weeksDiff + 1;
}
