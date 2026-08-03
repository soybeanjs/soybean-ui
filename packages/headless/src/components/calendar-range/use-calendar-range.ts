import { computed } from 'vue';
import type { ComputedRef, ShallowRef } from 'vue';
import { areAllDaysBetweenValid, isBefore, isBetweenInclusive } from '../../date';
import type { DateValue, DateRange, DateMatcher } from '../../date';

export interface UseCalendarRangeStateProps {
  start: ComputedRef<DateValue | undefined>;
  end: ComputedRef<DateValue | undefined>;
  hoveredDate: ShallowRef<DateValue | undefined>;
  isDateDisabled: DateMatcher;
  isDateUnavailable: DateMatcher;
  isDateHighlightable?: DateMatcher;
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

/**
 * Whether a candidate range is invalid. Computed against the range itself, so
 * it can be used both for the derived `isInvalid` state and to validate a
 * candidate range before committing it in `onDateChange`.
 */
function isRangeInvalid(
  start: DateValue,
  end: DateValue,
  options: Pick<UseCalendarRangeStateProps, 'isDateDisabled' | 'isDateUnavailable' | 'isDateHighlightable'> & {
    allowNonContiguousRanges: boolean;
    maximumDays: number | undefined;
  }
) {
  if (options.isDateDisabled(start) || options.isDateUnavailable(start)) {
    return true;
  }

  if (options.isDateDisabled(end) || options.isDateUnavailable(end)) {
    return true;
  }

  if (isBefore(end, start)) {
    return true;
  }

  if (options.maximumDays && getInclusiveRangeDays(start, end) > options.maximumDays) {
    return true;
  }

  if (options.allowNonContiguousRanges) {
    return false;
  }

  return !areAllDaysBetweenValid(
    start,
    end,
    options.isDateUnavailable,
    options.isDateDisabled,
    options.isDateHighlightable
  );
}

export function useCalendarRangeState(props: UseCalendarRangeStateProps) {
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
    if (!props.start.value || !props.end.value) {
      return false;
    }

    return isRangeInvalid(props.start.value, props.end.value, {
      isDateDisabled: props.isDateDisabled,
      isDateUnavailable: props.isDateUnavailable,
      isDateHighlightable: props.isDateHighlightable,
      allowNonContiguousRanges: props.allowNonContiguousRanges.value,
      maximumDays: props.maximumDays.value
    });
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
    getInclusiveRangeDays,
    isRangeInvalid
  };
}
