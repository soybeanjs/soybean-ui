import { CalendarDate, CalendarDateTime, parseDate } from '@internationalized/date';
import {
  areAllDaysBetweenValid,
  chunk,
  compareYearMonth,
  createDecade,
  createDateRange,
  createMonth,
  createYear,
  createYearGrid,
  getWeekNumber,
  getWeekStartsOn,
  isMonthBetweenInclusive,
  parseStringToDateValue
} from '@soybeanjs/headless/date';
import { describe, expect, it } from 'vitest';

describe('shared date helpers', () => {
  it('creates a fixed six-week month grid', () => {
    const month = createMonth({
      dateObj: new CalendarDate(2026, 2, 1),
      weekStartsOn: 0,
      fixedWeeks: true,
      locale: 'en-US'
    });

    expect(month.rows).toHaveLength(6);
    expect(month.cells).toHaveLength(42);
    expect(month.value.month).toBe(2);
  });

  it('builds an inclusive date range', () => {
    const dates = createDateRange({
      start: new CalendarDate(2026, 4, 18),
      end: new CalendarDate(2026, 4, 20)
    });

    expect(dates.map(date => date.day)).toEqual([18, 19, 20]);
  });

  it('throws when chunk size is not positive', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow(RangeError);
    expect(() => chunk([1, 2, 3], -1)).toThrow('chunk size must be greater than 0');
  });

  it('parses strings to the same date value kind as the reference value', () => {
    const dateValue = parseStringToDateValue('2026-04-18', new CalendarDate(2026, 1, 1));
    const dateTimeValue = parseStringToDateValue('2026-04-18T08:30:00', new CalendarDateTime(2026, 1, 1, 9));

    expect(dateValue).toMatchObject(parseDate('2026-04-18'));
    expect(dateTimeValue).toBeInstanceOf(CalendarDateTime);
  });

  it('validates all intermediate dates unless explicitly highlightable', () => {
    const start = new CalendarDate(2026, 4, 18);
    const end = new CalendarDate(2026, 4, 21);

    expect(areAllDaysBetweenValid(start, end, undefined, date => date.day === 19)).toBe(false);
    expect(
      areAllDaysBetweenValid(
        start,
        end,
        undefined,
        date => date.day === 19,
        date => date.day === 19
      )
    ).toBe(true);
  });

  it('keeps year-month comparisons inclusive', () => {
    const start = new CalendarDate(2026, 4, 1);
    const current = new CalendarDate(2026, 5, 15);
    const end = new CalendarDate(2026, 6, 1);

    expect(compareYearMonth(start, current)).toBeLessThan(0);
    expect(isMonthBetweenInclusive(current, start, end)).toBe(true);
  });

  it('detects locale week rules and creates decade-aligned year grids', () => {
    expect(getWeekStartsOn('en-US')).toBe(0);
    expect(getWeekStartsOn('de-DE')).toBe(1);
    expect(getWeekNumber(new CalendarDate(2023, 1, 1), 'en-US', 'mon')).toBe(1);

    const yearGrid = createYearGrid({ dateObj: new CalendarDate(2026, 4, 18) });

    expect(yearGrid.rows).toHaveLength(3);
    // createYearGrid is decade-aligned by default, so a 2026 date renders the 2020-2031 page.
    expect(yearGrid.cells[0]?.year).toBe(2020);
    expect(yearGrid.cells.at(-1)?.year).toBe(2031);
  });

  it('creates a contiguous decade range when start and end indexes are provided', () => {
    const years = createDecade({
      dateObj: new CalendarDate(2026, 4, 18),
      startIndex: -1,
      endIndex: 10
    });

    expect(years.map(year => year.year)).toEqual([
      2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036
    ]);
  });

  it('keeps trailing months reachable in paged year navigation', () => {
    const months = createYear({
      dateObj: new CalendarDate(2026, 4, 18),
      numberOfMonths: 5,
      pagedNavigation: true
    });

    expect(months.map(month => month.month)).toEqual([1, 6, 11]);
  });
});
