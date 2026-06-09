import { computed, shallowRef, watch } from 'vue';
import type { ShallowRef } from 'vue';
import { isEqualMonth, isSameDay, isSameMonth } from '@internationalized/date';
import type { DateFields, DateValue } from '@internationalized/date';
import { createMonths, getDaysInMonth, isAfter, isBefore, toDate, useDateFormatter } from '../../date';
import type { DateFormatterOptions, DateMatcher, DateGrid, WeekDayFormat, WeekStartsOn } from '../../date';

export interface UseCalendarOptions {
  locale: ShallowRef<string>;
  placeholder: ShallowRef<DateValue>;
  weekStartsOn: ShallowRef<WeekStartsOn>;
  fixedWeeks: ShallowRef<boolean>;
  numberOfMonths: ShallowRef<number>;
  minValue: ShallowRef<DateValue | undefined>;
  maxValue: ShallowRef<DateValue | undefined>;
  disabled: ShallowRef<boolean>;
  weekdayFormat: ShallowRef<WeekDayFormat>;
  pagedNavigation: ShallowRef<boolean>;
  isDateDisabled?: DateMatcher;
  isDateUnavailable?: DateMatcher;
  calendarLabel: ShallowRef<string | undefined>;
  nextPage: ShallowRef<((placeholder: DateValue) => DateValue) | undefined>;
  prevPage: ShallowRef<((placeholder: DateValue) => DateValue) | undefined>;
}

export interface UseCalendarStateOptions {
  isDateDisabled: DateMatcher;
  isDateUnavailable: DateMatcher;
  date: ShallowRef<DateValue | DateValue[] | undefined>;
}

export function useCalendarState(options: UseCalendarStateOptions) {
  const { date, isDateDisabled, isDateUnavailable } = options;

  function isDateSelected(dateObj: DateValue) {
    if (Array.isArray(date.value)) {
      return date.value.some(item => isSameDay(item, dateObj));
    }

    if (!date.value) {
      return false;
    }

    return isSameDay(date.value, dateObj);
  }

  const isInvalid = computed(() => {
    if (Array.isArray(date.value)) {
      if (!date.value.length) {
        return false;
      }

      return date.value.some(dateObj => isDateDisabled?.(dateObj) || isDateUnavailable?.(dateObj));
    }

    if (!date.value) {
      return false;
    }

    return Boolean(isDateDisabled?.(date.value) || isDateUnavailable?.(date.value));
  });

  const hasSelectedDate = computed(() => {
    return Array.isArray(date.value) ? date.value.length > 0 : Boolean(date.value);
  });

  const isSelectedDateDisabled = computed(() => {
    if (Array.isArray(date.value)) {
      if (!date.value.length) {
        return false;
      }

      return date.value.some(dateObj => isDateDisabled?.(dateObj));
    }

    if (!date.value) {
      return false;
    }

    return Boolean(isDateDisabled?.(date.value));
  });

  return {
    isDateSelected,
    isInvalid,
    hasSelectedDate,
    isSelectedDateDisabled
  };
}

function handleNextDisabled(lastPeriodInView: DateValue, nextPageFunc: (date: DateValue) => DateValue): DateValue {
  const firstPeriodOfNextPage = nextPageFunc(lastPeriodInView);
  const diff = firstPeriodOfNextPage.compare(lastPeriodInView);
  const duration: DateFields = {};

  if (diff >= 7) {
    duration.day = 1;
  }
  if (diff >= getDaysInMonth(lastPeriodInView)) {
    duration.month = 1;
  }

  return firstPeriodOfNextPage.set({ ...duration });
}

function handlePrevDisabled(firstPeriodInView: DateValue, prevPageFunc: (date: DateValue) => DateValue): DateValue {
  const lastPeriodOfPrevPage = prevPageFunc(firstPeriodInView);
  const diff = firstPeriodInView.compare(lastPeriodOfPrevPage);
  const duration: DateFields = {};

  if (diff >= 7) {
    duration.day = 35;
  }
  if (diff >= getDaysInMonth(firstPeriodInView)) {
    duration.month = 13;
  }

  return lastPeriodOfPrevPage.set({ ...duration });
}

export function useCalendar(options: UseCalendarOptions) {
  const {
    locale,
    placeholder,
    weekStartsOn,
    fixedWeeks,
    numberOfMonths,
    minValue,
    maxValue,
    disabled,
    weekdayFormat,
    pagedNavigation,
    nextPage,
    prevPage,
    calendarLabel
  } = options;

  const formatter = useDateFormatter(locale.value);

  const headingFormatOptions = computed<DateFormatterOptions>(() => {
    const opts: DateFormatterOptions = {
      calendar: placeholder.value.calendar.identifier
    };

    if (placeholder.value.calendar.identifier === 'gregory' && placeholder.value.era === 'BC') {
      opts.era = 'short';
    }

    return opts;
  });

  const grid = shallowRef<DateGrid<DateValue>[]>(
    createMonths({
      dateObj: placeholder.value,
      weekStartsOn: weekStartsOn.value,
      locale: locale.value,
      fixedWeeks: fixedWeeks.value,
      numberOfMonths: numberOfMonths.value
    })
  );

  const visibleView = computed(() => grid.value.map(month => month.value));

  function isOutsideVisibleView(date: DateValue) {
    return !visibleView.value.some(month => isEqualMonth(date, month));
  }

  const isNextButtonDisabled = (nextPageFunc?: (date: DateValue) => DateValue) => {
    if (!maxValue.value || !grid.value.length) {
      return false;
    }
    if (disabled.value) {
      return true;
    }

    const lastPeriodInView = grid.value.at(-1)!.value;

    if (!nextPageFunc && !nextPage.value) {
      const firstPeriodOfNextPage = lastPeriodInView.add({ months: 1 }).set({ day: 1 });
      return isAfter(firstPeriodOfNextPage, maxValue.value);
    }

    const firstPeriodOfNextPage = handleNextDisabled(lastPeriodInView, nextPageFunc || nextPage.value!);
    return isAfter(firstPeriodOfNextPage, maxValue.value);
  };

  const isPrevButtonDisabled = (prevPageFunc?: (date: DateValue) => DateValue) => {
    if (!minValue.value || !grid.value.length) {
      return false;
    }
    if (disabled.value) {
      return true;
    }

    const firstPeriodInView = grid.value[0].value;

    if (!prevPageFunc && !prevPage.value) {
      const lastPeriodOfPrevPage = firstPeriodInView.subtract({ months: 1 }).set({ day: 35 });
      return isBefore(lastPeriodOfPrevPage, minValue.value);
    }

    const lastPeriodOfPrevPage = handlePrevDisabled(firstPeriodInView, prevPageFunc || prevPage.value!);
    return isBefore(lastPeriodOfPrevPage, minValue.value);
  };

  function isDateDisabled(dateObj: DateValue) {
    if (options.isDateDisabled?.(dateObj) || disabled.value) {
      return true;
    }
    if (maxValue.value && isAfter(dateObj, maxValue.value)) {
      return true;
    }
    if (minValue.value && isBefore(dateObj, minValue.value)) {
      return true;
    }

    return false;
  }

  const isDateUnavailable = (date: DateValue) => Boolean(options.isDateUnavailable?.(date));

  const weekdays = computed(() => {
    if (!grid.value.length) {
      return [];
    }

    return grid.value[0].rows[0].map(date => formatter.dayOfWeek(toDate(date), weekdayFormat.value));
  });

  const handleNextPage = (nextPageFunc?: (date: DateValue) => DateValue) => {
    const firstDate = grid.value[0].value;

    if (!nextPageFunc && !nextPage.value) {
      const newDate = firstDate.add({ months: pagedNavigation.value ? numberOfMonths.value : 1 });
      const newGrid = createMonths({
        dateObj: newDate,
        weekStartsOn: weekStartsOn.value,
        locale: locale.value,
        fixedWeeks: fixedWeeks.value,
        numberOfMonths: numberOfMonths.value
      });

      grid.value = newGrid;
      placeholder.value = newGrid[0].value.set({ day: 1 });
      return;
    }

    const newDate = (nextPageFunc || nextPage.value!)(firstDate);
    const newGrid = createMonths({
      dateObj: newDate,
      weekStartsOn: weekStartsOn.value,
      locale: locale.value,
      fixedWeeks: fixedWeeks.value,
      numberOfMonths: numberOfMonths.value
    });

    grid.value = newGrid;

    const duration: DateFields = {};

    if (!nextPageFunc) {
      const diff = newGrid[0].value.compare(firstDate);
      if (diff >= getDaysInMonth(firstDate)) {
        duration.day = 1;
      }
      if (diff >= 365) {
        duration.month = 1;
      }
    }

    placeholder.value = newGrid[0].value.set({ ...duration });
  };

  const handlePrevPage = (prevPageFunc?: (date: DateValue) => DateValue) => {
    const firstDate = grid.value[0].value;

    if (!prevPageFunc && !prevPage.value) {
      const newDate = firstDate.subtract({ months: pagedNavigation.value ? numberOfMonths.value : 1 });
      const newGrid = createMonths({
        dateObj: newDate,
        weekStartsOn: weekStartsOn.value,
        locale: locale.value,
        fixedWeeks: fixedWeeks.value,
        numberOfMonths: numberOfMonths.value
      });

      grid.value = newGrid;
      placeholder.value = newGrid[0].value.set({ day: 1 });
      return;
    }

    const newDate = (prevPageFunc || prevPage.value!)(firstDate);
    const newGrid = createMonths({
      dateObj: newDate,
      weekStartsOn: weekStartsOn.value,
      locale: locale.value,
      fixedWeeks: fixedWeeks.value,
      numberOfMonths: numberOfMonths.value
    });

    grid.value = newGrid;

    const duration: DateFields = {};

    if (!prevPageFunc) {
      const diff = firstDate.compare(newGrid[0].value);
      if (diff >= getDaysInMonth(firstDate)) {
        duration.day = 1;
      }
      if (diff >= 365) {
        duration.month = 1;
      }
    }

    placeholder.value = newGrid[0].value.set({ ...duration });
  };

  watch(placeholder, value => {
    if (visibleView.value.some(month => isEqualMonth(month, value))) {
      return;
    }

    grid.value = createMonths({
      dateObj: value,
      weekStartsOn: weekStartsOn.value,
      locale: locale.value,
      fixedWeeks: fixedWeeks.value,
      numberOfMonths: numberOfMonths.value
    });
  });

  watch([locale, weekStartsOn, fixedWeeks, numberOfMonths], () => {
    grid.value = createMonths({
      dateObj: placeholder.value,
      weekStartsOn: weekStartsOn.value,
      locale: locale.value,
      fixedWeeks: fixedWeeks.value,
      numberOfMonths: numberOfMonths.value
    });
  });

  const headingValue = computed(() => {
    if (!grid.value.length) {
      return '';
    }

    if (locale.value !== formatter.getLocale()) {
      formatter.setLocale(locale.value);
    }

    if (grid.value.length === 1) {
      return formatter.fullMonthAndYear(toDate(grid.value[0].value), headingFormatOptions.value);
    }

    const startMonth = toDate(grid.value[0].value);
    const endMonth = toDate(grid.value.at(-1)!.value);
    const startMonthName = formatter.fullMonth(startMonth, headingFormatOptions.value);
    const endMonthName = formatter.fullMonth(endMonth, headingFormatOptions.value);
    const startMonthYear = formatter.fullYear(startMonth, headingFormatOptions.value);
    const endMonthYear = formatter.fullYear(endMonth, headingFormatOptions.value);

    if (startMonthYear === endMonthYear) {
      return `${startMonthName} - ${endMonthName} ${endMonthYear}`;
    }

    return `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
  });

  const fullCalendarLabel = computed(() => `${calendarLabel.value ?? 'Event Date'}, ${headingValue.value}`);

  const isPlaceholderFocusable = computed(() => {
    return !(
      isDateDisabled(placeholder.value) ||
      isDateUnavailable?.(placeholder.value) ||
      isOutsideVisibleView(placeholder.value)
    );
  });

  const firstFocusableDate = computed(() => {
    for (const month of grid.value) {
      if (minValue.value && isBefore(month.value, minValue.value)) {
        continue;
      }

      const daysInMonth = getDaysInMonth(month.value);
      const startDay = minValue.value && isSameMonth(minValue.value, month.value) ? minValue.value.day : 1;

      for (let day = startDay; day <= daysInMonth; day += 1) {
        const date = month.value.set({ day });
        if (isDateDisabled(date) || isDateUnavailable?.(date)) {
          continue;
        }

        return date;
      }
    }

    return undefined;
  });

  return {
    isDateDisabled,
    isDateUnavailable,
    isNextButtonDisabled,
    isPrevButtonDisabled,
    grid,
    weekdays,
    visibleView,
    isOutsideVisibleView,
    formatter,
    nextPage: handleNextPage,
    prevPage: handlePrevPage,
    headingValue,
    fullCalendarLabel,
    isPlaceholderFocusable,
    firstFocusableDate
  };
}
