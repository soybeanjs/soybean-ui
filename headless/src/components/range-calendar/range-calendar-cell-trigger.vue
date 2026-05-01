<script setup lang="ts">
import { getLocalTimeZone, isSameDay, isSameMonth, isToday } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import { computed, nextTick } from 'vue';
import { useForwardElement } from '../../composables';
import { isBetweenInclusive, toDate } from '../../date';
import { Primitive } from '../primitive';
import { useRangeCalendarRootContext, useRangeCalendarUi } from './context';
import type { RangeCalendarCellTriggerProps } from './types';

defineOptions({
  name: 'RangeCalendarCellTrigger'
});

const props = withDefaults(defineProps<RangeCalendarCellTriggerProps>(), {
  as: 'button'
});

defineSlots<{
  default?: (props: {
    dayValue: string;
    disabled: boolean;
    selected: boolean;
    today: boolean;
    outsideView: boolean;
    outsideVisibleView: boolean;
    unavailable: boolean;
    highlighted: boolean;
    highlightedStart: boolean;
    highlightedEnd: boolean;
    selectionStart: boolean;
    selectionEnd: boolean;
  }) => any;
}>();

const cls = useRangeCalendarUi('cellTrigger');
const {
  locale,
  formatter,
  isDateUnavailable,
  isOutsideVisibleView: checkOutsideVisibleView,
  isDateDisabled,
  disableDaysOutsideCurrentView,
  isDateSelected,
  isSelectionStart,
  isSelectionEnd,
  isHighlightedStart,
  isHighlightedEnd,
  highlightedRange,
  disabled,
  isPlaceholderFocusable,
  placeholder,
  hasSelectedDate,
  isSelectedDateDisabled,
  firstFocusableDate,
  selectedFocusableDate,
  minValue,
  maxValue,
  parentElement,
  isNextButtonDisabled,
  nextPage,
  isPrevButtonDisabled,
  prevPage,
  onPlaceholderChange,
  setHoveredDate,
  onDateChange,
  dir
} = useRangeCalendarRootContext('RangeCalendarCellTrigger');
const [_, setElement] = useForwardElement();

const dayValue = computed(() => props.day.day.toLocaleString(locale.value));
const labelText = computed(() => {
  return formatter.custom(toDate(props.day), {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
});
const isUnavailable = computed(() => isDateUnavailable?.(props.day) ?? false);
const isDateToday = computed(() => isToday(props.day, getLocalTimeZone()));
const isOutsideView = computed(() => !isSameMonth(props.day, props.month));
const isOutsideVisibleView = computed(() => checkOutsideVisibleView(props.day));
const isDisabled = computed(
  () => isDateDisabled(props.day) || (disableDaysOutsideCurrentView.value && isOutsideView.value)
);
const isSelectedDate = computed(() => isDateSelected(props.day));
const isSelectionStartResult = computed(() => isSelectionStart(props.day));
const isSelectionEndResult = computed(() => isSelectionEnd(props.day));
const isHighlightedStartResult = computed(() => isHighlightedStart(props.day));
const isHighlightedEndResult = computed(() => isHighlightedEnd(props.day));
const isHighlighted = computed(() => {
  if (!highlightedRange.value?.start || !highlightedRange.value?.end) {
    return false;
  }

  return isBetweenInclusive(props.day, highlightedRange.value.start, highlightedRange.value.end);
});
const isFocusedDate = computed(() => {
  if (isOutsideView.value || isDisabled.value) {
    return false;
  }
  if (!disabled.value && isPlaceholderFocusable.value && isSameDay(props.day, placeholder.value)) {
    return true;
  }
  if ((!hasSelectedDate.value || isSelectedDateDisabled.value) && !isPlaceholderFocusable.value) {
    return Boolean(firstFocusableDate.value && isSameDay(props.day, firstFocusableDate.value));
  }
  if (selectedFocusableDate.value && !isPlaceholderFocusable.value) {
    return isSameDay(props.day, selectedFocusableDate.value);
  }

  return false;
});

const shiftFocus = (day: DateValue, add: number) => {
  const candidateDayValue = day.add({ days: add });

  if (
    (minValue.value && candidateDayValue.compare(minValue.value) < 0) ||
    (maxValue.value && candidateDayValue.compare(maxValue.value) > 0)
  ) {
    return;
  }

  const candidateDay = parentElement.value?.querySelector<HTMLElement>(
    `[data-value='${candidateDayValue.toString()}']:not([data-outside-view])`
  );

  if (!candidateDay) {
    if (add > 0) {
      if (isNextButtonDisabled()) {
        return;
      }
      nextPage();
    } else {
      if (isPrevButtonDisabled()) {
        return;
      }
      prevPage();
    }

    nextTick(() => {
      shiftFocus(day, add);
    });
    return;
  }

  if (candidateDay.hasAttribute('data-disabled') || candidateDay.hasAttribute('data-unavailable')) {
    shiftFocus(candidateDayValue, add);
    return;
  }

  onPlaceholderChange(candidateDayValue);
  setHoveredDate(candidateDayValue);
  candidateDay.focus();
};

const handleClick = () => {
  if (isDisabled.value || isUnavailable.value) {
    return;
  }

  onDateChange(props.day);
};

const handlePointerEnter = () => {
  if (isDisabled.value || isUnavailable.value) {
    return;
  }

  setHoveredDate(props.day);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (isDisabled.value) {
    return;
  }

  const sign = dir.value === 'rtl' ? -1 : 1;

  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault();
      shiftFocus(props.day, sign);
      break;
    case 'ArrowLeft':
      event.preventDefault();
      shiftFocus(props.day, -sign);
      break;
    case 'ArrowUp':
      event.preventDefault();
      shiftFocus(props.day, -7);
      break;
    case 'ArrowDown':
      event.preventDefault();
      shiftFocus(props.day, 7);
      break;
    case 'Enter':
    case ' ':
      event.preventDefault();
      onDateChange(props.day);
      break;
    default:
      break;
  }
};
</script>

<template>
  <Primitive
    :ref="setElement"
    :as="as"
    :as-child="asChild"
    :aria-disabled="as === 'button' ? undefined : isDisabled || isUnavailable ? true : undefined"
    :aria-label="labelText"
    :aria-pressed="isSelectedDate ? true : undefined"
    :class="cls"
    :data-disabled="isDisabled ? '' : undefined"
    :data-focused="isFocusedDate ? '' : undefined"
    :data-highlighted="isHighlighted ? '' : undefined"
    :data-highlighted-end="isHighlightedEndResult ? '' : undefined"
    :data-highlighted-start="isHighlightedStartResult ? '' : undefined"
    :data-outside-view="isOutsideView ? '' : undefined"
    :data-outside-visible-view="isOutsideVisibleView ? '' : undefined"
    :data-selected="isSelectedDate ? '' : undefined"
    :data-selection-end="isSelectionEndResult ? '' : undefined"
    :data-selection-start="isSelectionStartResult ? '' : undefined"
    :data-today="isDateToday ? '' : undefined"
    :data-unavailable="isUnavailable ? '' : undefined"
    :data-value="day.toString()"
    :disabled="as === 'button' ? isDisabled || isUnavailable : undefined"
    :role="as === 'button' ? undefined : 'button'"
    :tabindex="isFocusedDate ? 0 : isOutsideView || isDisabled ? undefined : -1"
    :type="as === 'button' ? 'button' : undefined"
    data-slot="cell-trigger"
    @click="handleClick"
    @focusin="handlePointerEnter"
    @keydown="handleKeydown"
    @mouseleave="setHoveredDate(undefined)"
    @mouseenter="handlePointerEnter"
  >
    <slot
      :day-value="dayValue"
      :disabled="Boolean(isDisabled)"
      :highlighted="isHighlighted"
      :highlighted-end="isHighlightedEndResult"
      :highlighted-start="isHighlightedStartResult"
      :outside-view="isOutsideView"
      :outside-visible-view="isOutsideVisibleView"
      :selected="isSelectedDate"
      :selection-end="isSelectionEndResult"
      :selection-start="isSelectionStartResult"
      :today="isDateToday"
      :unavailable="isUnavailable"
    >
      {{ dayValue }}
    </slot>
  </Primitive>
</template>
