import type { DateValue } from '@internationalized/date';
import { computed } from 'vue';
import type { ComputedRef, ShallowRef } from 'vue';
import { areAllDaysBetweenValid, isBefore, isBetweenInclusive } from '../../date';
import type { DateRange, Matcher } from '../../date';

export interface UseRangeCalendarStateProps {
  start: ComputedRef<DateValue | undefined>;
  end: ComputedRef<DateValue | undefined>;
  hoveredDate: ShallowRef<DateValue | undefined>;
  isDateDisabled: Matcher;
  isDateUnavailable: Matcher;
  isDateHighlightable?: Matcher;
  allowNonContiguousRanges: ComputedRef<boolean>;
  maximumDays: ComputedRef<number | undefined>;
}

function sortRange(a: DateValue, b: DateValue): DateRange {
  if (isBefore(b, a)) {
    return { start: b.copy(), end: a.copy() };
  }

  return { start: a.copy(), end: b.copy() };
}

function getInclusiveRangeDays(start: DateValue, end: DateValue) {
  const startTime = start.toDate('UTC').getTime();
  const endTime = end.toDate('UTC').getTime();

  return Math.floor((endTime - startTime) / 86400000) + 1;
}

export function useRangeCalendarState(props: UseRangeCalendarStateProps) {
  const highlightedRange = computed<DateRange | null>(() => {
    if (!props.start.value || props.end.value || !props.hoveredDate.value) {
      return null;
    }

    return sortRange(props.start.value, props.hoveredDate.value);
  });

  const isDateSelected = (date: DateValue) => {
    if (!props.start.value) {
      return false;
    }

    if (!props.end.value) {
      return props.start.value.compare(date) === 0;
    }

    return isBetweenInclusive(date, props.start.value, props.end.value);
  };

  const isSelectionStart = (date: DateValue) => Boolean(props.start.value && props.start.value.compare(date) === 0);
  const isSelectionEnd = (date: DateValue) => Boolean(props.end.value && props.end.value.compare(date) === 0);
  const isHighlightedStart = (date: DateValue) =>
    Boolean(highlightedRange.value?.start && highlightedRange.value.start.compare(date) === 0);
  const isHighlightedEnd = (date: DateValue) =>
    Boolean(highlightedRange.value?.end && highlightedRange.value.end.compare(date) === 0);

  const hasSelectedDate = computed(() => Boolean(props.start.value));
  const selectedFocusableDate = computed(() => props.start.value?.copy());
  const isSelectedDateDisabled = computed(() => {
    return Boolean(
      (props.start.value && props.isDateDisabled(props.start.value)) ||
      (props.end.value && props.isDateDisabled(props.end.value))
    );
  });

  const isInvalid = computed(() => {
    if (!props.start.value) {
      return false;
    }

    if (props.isDateDisabled(props.start.value) || props.isDateUnavailable(props.start.value)) {
      return true;
    }

    if (!props.end.value) {
      return false;
    }

    if (props.isDateDisabled(props.end.value) || props.isDateUnavailable(props.end.value)) {
      return true;
    }

    if (isBefore(props.end.value, props.start.value)) {
      return true;
    }

    if (
      props.maximumDays.value &&
      getInclusiveRangeDays(props.start.value, props.end.value) > props.maximumDays.value
    ) {
      return true;
    }

    if (props.allowNonContiguousRanges.value) {
      return false;
    }

    return !areAllDaysBetweenValid(
      props.start.value,
      props.end.value,
      props.isDateUnavailable,
      props.isDateDisabled,
      props.isDateHighlightable
    );
  });

  return {
    highlightedRange,
    isDateSelected,
    isSelectionStart,
    isSelectionEnd,
    isHighlightedStart,
    isHighlightedEnd,
    hasSelectedDate,
    isSelectedDateDisabled,
    selectedFocusableDate,
    isInvalid,
    sortRange,
    getInclusiveRangeDays
  };
}
