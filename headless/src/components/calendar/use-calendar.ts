import { isEqualMonth, isSameDay, isSameMonth } from '@internationalized/date';
import type { DateFields, DateValue } from '@internationalized/date';
import { computed, shallowRef, watch } from 'vue';
import type { Ref, ShallowRef } from 'vue';
import { createMonths, getDaysInMonth, isAfter, isBefore, toDate, useDateFormatter } from '../../date';
import type { DateFormatterOptions, Grid, Matcher, WeekDayFormat, WeekStartsOn } from '../../date';

export interface UseCalendarProps {
  locale: Ref<string>;
  placeholder: ShallowRef<DateValue>;
  weekStartsOn: Ref<WeekStartsOn>;
  fixedWeeks: Ref<boolean>;
  numberOfMonths: Ref<number>;
  minValue: Ref<DateValue | undefined>;
  maxValue: Ref<DateValue | undefined>;
  disabled: Ref<boolean>;
  weekdayFormat: Ref<WeekDayFormat>;
  pagedNavigation: Ref<boolean>;
  isDateDisabled?: Matcher;
  isDateUnavailable?: Matcher;
  calendarLabel: Ref<string | undefined>;
  nextPage: Ref<((placeholder: DateValue) => DateValue) | undefined>;
  prevPage: Ref<((placeholder: DateValue) => DateValue) | undefined>;
}

export interface UseCalendarStateProps {
  isDateDisabled: Matcher;
  isDateUnavailable: Matcher;
  date: ShallowRef<DateValue | DateValue[] | undefined>;
}

export function useCalendarState(props: UseCalendarStateProps) {
  function isDateSelected(dateObj: DateValue) {
    if (Array.isArray(props.date.value)) {
      return props.date.value.some(date => isSameDay(date, dateObj));
    }

    if (!props.date.value) {
      return false;
    }

    return isSameDay(props.date.value, dateObj);
  }

  const isInvalid = computed(() => {
    if (Array.isArray(props.date.value)) {
      if (!props.date.value.length) {
        return false;
      }

      return props.date.value.some(dateObj => props.isDateDisabled?.(dateObj) || props.isDateUnavailable?.(dateObj));
    }

    if (!props.date.value) {
      return false;
    }

    return Boolean(props.isDateDisabled?.(props.date.value) || props.isDateUnavailable?.(props.date.value));
  });

  const hasSelectedDate = computed(() => {
    return Array.isArray(props.date.value) ? props.date.value.length > 0 : Boolean(props.date.value);
  });

  const isSelectedDateDisabled = computed(() => {
    if (Array.isArray(props.date.value)) {
      if (!props.date.value.length) {
        return false;
      }

      return props.date.value.some(dateObj => props.isDateDisabled?.(dateObj));
    }

    if (!props.date.value) {
      return false;
    }

    return Boolean(props.isDateDisabled?.(props.date.value));
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

export function useCalendar(props: UseCalendarProps) {
  const formatter = useDateFormatter(props.locale.value);

  const headingFormatOptions = computed<DateFormatterOptions>(() => {
    const options: DateFormatterOptions = {
      calendar: props.placeholder.value.calendar.identifier
    };

    if (props.placeholder.value.calendar.identifier === 'gregory' && props.placeholder.value.era === 'BC') {
      options.era = 'short';
    }

    return options;
  });

  const grid = shallowRef<Grid<DateValue>[]>(
    createMonths({
      dateObj: props.placeholder.value,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value
    })
  );

  const visibleView = computed(() => grid.value.map(month => month.value));

  function isOutsideVisibleView(date: DateValue) {
    return !visibleView.value.some(month => isEqualMonth(date, month));
  }

  const isNextButtonDisabled = (nextPageFunc?: (date: DateValue) => DateValue) => {
    if (!props.maxValue.value || !grid.value.length) {
      return false;
    }
    if (props.disabled.value) {
      return true;
    }

    const lastPeriodInView = grid.value.at(-1)!.value;

    if (!nextPageFunc && !props.nextPage.value) {
      const firstPeriodOfNextPage = lastPeriodInView.add({ months: 1 }).set({ day: 1 });
      return isAfter(firstPeriodOfNextPage, props.maxValue.value);
    }

    const firstPeriodOfNextPage = handleNextDisabled(lastPeriodInView, nextPageFunc || props.nextPage.value!);
    return isAfter(firstPeriodOfNextPage, props.maxValue.value);
  };

  const isPrevButtonDisabled = (prevPageFunc?: (date: DateValue) => DateValue) => {
    if (!props.minValue.value || !grid.value.length) {
      return false;
    }
    if (props.disabled.value) {
      return true;
    }

    const firstPeriodInView = grid.value[0].value;

    if (!prevPageFunc && !props.prevPage.value) {
      const lastPeriodOfPrevPage = firstPeriodInView.subtract({ months: 1 }).set({ day: 35 });
      return isBefore(lastPeriodOfPrevPage, props.minValue.value);
    }

    const lastPeriodOfPrevPage = handlePrevDisabled(firstPeriodInView, prevPageFunc || props.prevPage.value!);
    return isBefore(lastPeriodOfPrevPage, props.minValue.value);
  };

  function isDateDisabled(dateObj: DateValue) {
    if (props.isDateDisabled?.(dateObj) || props.disabled.value) {
      return true;
    }
    if (props.maxValue.value && isAfter(dateObj, props.maxValue.value)) {
      return true;
    }
    if (props.minValue.value && isBefore(dateObj, props.minValue.value)) {
      return true;
    }

    return false;
  }

  const isDateUnavailable = (date: DateValue) => {
    return Boolean(props.isDateUnavailable?.(date));
  };

  const weekdays = computed(() => {
    if (!grid.value.length) {
      return [];
    }

    return grid.value[0].rows[0].map(date => formatter.dayOfWeek(toDate(date), props.weekdayFormat.value));
  });

  const nextPage = (nextPageFunc?: (date: DateValue) => DateValue) => {
    const firstDate = grid.value[0].value;

    if (!nextPageFunc && !props.nextPage.value) {
      const newDate = firstDate.add({ months: props.pagedNavigation.value ? props.numberOfMonths.value : 1 });
      const newGrid = createMonths({
        dateObj: newDate,
        weekStartsOn: props.weekStartsOn.value,
        locale: props.locale.value,
        fixedWeeks: props.fixedWeeks.value,
        numberOfMonths: props.numberOfMonths.value
      });

      grid.value = newGrid;
      props.placeholder.value = newGrid[0].value.set({ day: 1 });
      return;
    }

    const newDate = (nextPageFunc || props.nextPage.value!)(firstDate);
    const newGrid = createMonths({
      dateObj: newDate,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value
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

    props.placeholder.value = newGrid[0].value.set({ ...duration });
  };

  const prevPage = (prevPageFunc?: (date: DateValue) => DateValue) => {
    const firstDate = grid.value[0].value;

    if (!prevPageFunc && !props.prevPage.value) {
      const newDate = firstDate.subtract({ months: props.pagedNavigation.value ? props.numberOfMonths.value : 1 });
      const newGrid = createMonths({
        dateObj: newDate,
        weekStartsOn: props.weekStartsOn.value,
        locale: props.locale.value,
        fixedWeeks: props.fixedWeeks.value,
        numberOfMonths: props.numberOfMonths.value
      });

      grid.value = newGrid;
      props.placeholder.value = newGrid[0].value.set({ day: 1 });
      return;
    }

    const newDate = (prevPageFunc || props.prevPage.value!)(firstDate);
    const newGrid = createMonths({
      dateObj: newDate,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value
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

    props.placeholder.value = newGrid[0].value.set({ ...duration });
  };

  watch(props.placeholder, value => {
    if (visibleView.value.some(month => isEqualMonth(month, value))) {
      return;
    }

    grid.value = createMonths({
      dateObj: value,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value
    });
  });

  watch([props.locale, props.weekStartsOn, props.fixedWeeks, props.numberOfMonths], () => {
    grid.value = createMonths({
      dateObj: props.placeholder.value,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value
    });
  });

  const headingValue = computed(() => {
    if (!grid.value.length) {
      return '';
    }

    if (props.locale.value !== formatter.getLocale()) {
      formatter.setLocale(props.locale.value);
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

  const fullCalendarLabel = computed(() => `${props.calendarLabel.value ?? 'Event Date'}, ${headingValue.value}`);

  const isPlaceholderFocusable = computed(() => {
    return !(
      isDateDisabled(props.placeholder.value) ||
      isDateUnavailable(props.placeholder.value) ||
      isOutsideVisibleView(props.placeholder.value)
    );
  });

  const firstFocusableDate = computed(() => {
    for (const month of grid.value) {
      if (props.minValue.value && isBefore(month.value, props.minValue.value)) {
        continue;
      }

      const daysInMonth = getDaysInMonth(month.value);
      const startDay =
        props.minValue.value && isSameMonth(props.minValue.value, month.value) ? props.minValue.value.day : 1;

      for (let day = startDay; day <= daysInMonth; day += 1) {
        const date = month.value.set({ day });
        if (isDateDisabled(date) || isDateUnavailable(date)) {
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
    nextPage,
    prevPage,
    headingValue,
    fullCalendarLabel,
    isPlaceholderFocusable,
    firstFocusableDate
  };
}
