<script setup lang="ts">
import type { DateValue } from '@internationalized/date';

import { getLocalTimeZone, isSameDay, isSameMonth, isToday } from '@internationalized/date';
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
const rootContext = useRangeCalendarRootContext('RangeCalendarCellTrigger');
const [_, setElement] = useForwardElement();

const dayValue = computed(() => props.day.day.toLocaleString(rootContext.locale.value));
const labelText = computed(() => {
  return rootContext.formatter.custom(toDate(props.day), {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
});
const isUnavailable = computed(() => rootContext.isDateUnavailable?.(props.day) ?? false);
const isDateToday = computed(() => isToday(props.day, getLocalTimeZone()));
const isOutsideView = computed(() => !isSameMonth(props.day, props.month));
const isOutsideVisibleView = computed(() => rootContext.isOutsideVisibleView(props.day));
const isDisabled = computed(() => rootContext.isDateDisabled(props.day) || (rootContext.disableDaysOutsideCurrentView.value && isOutsideView.value));
const isSelectedDate = computed(() => rootContext.isDateSelected(props.day));
const isSelectionStart = computed(() => rootContext.isSelectionStart(props.day));
const isSelectionEnd = computed(() => rootContext.isSelectionEnd(props.day));
const isHighlightedStart = computed(() => rootContext.isHighlightedStart(props.day));
const isHighlightedEnd = computed(() => rootContext.isHighlightedEnd(props.day));
const isHighlighted = computed(() => {
  if (!rootContext.highlightedRange.value?.start || !rootContext.highlightedRange.value?.end) {
    return false;
  }

  return isBetweenInclusive(props.day, rootContext.highlightedRange.value.start, rootContext.highlightedRange.value.end);
});
const isFocusedDate = computed(() => {
  if (isOutsideView.value || isDisabled.value) {
    return false;
  }
  if (!rootContext.disabled.value && rootContext.isPlaceholderFocusable.value && isSameDay(props.day, rootContext.placeholder.value)) {
    return true;
  }
  if ((!rootContext.hasSelectedDate.value || rootContext.isSelectedDateDisabled.value) && !rootContext.isPlaceholderFocusable.value) {
    return Boolean(rootContext.firstFocusableDate.value && isSameDay(props.day, rootContext.firstFocusableDate.value));
  }
  if (rootContext.selectedFocusableDate.value && !rootContext.isPlaceholderFocusable.value) {
    return isSameDay(props.day, rootContext.selectedFocusableDate.value);
  }

  return false;
});

const shiftFocus = (day: DateValue, add: number) => {
  const candidateDayValue = day.add({ days: add });

  if (
    (rootContext.minValue.value && candidateDayValue.compare(rootContext.minValue.value) < 0)
    || (rootContext.maxValue.value && candidateDayValue.compare(rootContext.maxValue.value) > 0)
  ) {
    return;
  }

  const candidateDay = rootContext.parentElement.value?.querySelector<HTMLElement>(
    `[data-value='${candidateDayValue.toString()}']:not([data-outside-view])`
  );

  if (!candidateDay) {
    if (add > 0) {
      if (rootContext.isNextButtonDisabled()) {
        return;
      }
      rootContext.nextPage();
    } else {
      if (rootContext.isPrevButtonDisabled()) {
        return;
      }
      rootContext.prevPage();
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

  rootContext.onPlaceholderChange(candidateDayValue);
  rootContext.setHoveredDate(candidateDayValue);
  candidateDay.focus();
};

const handleClick = () => {
  if (isDisabled.value || isUnavailable.value) {
    return;
  }

  rootContext.onDateChange(props.day);
};

const handlePointerEnter = () => {
  if (isDisabled.value || isUnavailable.value) {
    return;
  }

  rootContext.setHoveredDate(props.day);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (isDisabled.value) {
    return;
  }

  const sign = rootContext.dir.value === 'rtl' ? -1 : 1;

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
      rootContext.onDateChange(props.day);
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
    :data-highlighted-end="isHighlightedEnd ? '' : undefined"
    :data-highlighted-start="isHighlightedStart ? '' : undefined"
    :data-outside-view="isOutsideView ? '' : undefined"
    :data-outside-visible-view="isOutsideVisibleView ? '' : undefined"
    :data-selected="isSelectedDate ? '' : undefined"
    :data-selection-end="isSelectionEnd ? '' : undefined"
    :data-selection-start="isSelectionStart ? '' : undefined"
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
    @mouseleave="rootContext.setHoveredDate(undefined)"
    @mouseenter="handlePointerEnter"
  >
    <slot
      :day-value="dayValue"
      :disabled="Boolean(isDisabled)"
      :highlighted="isHighlighted"
      :highlighted-end="isHighlightedEnd"
      :highlighted-start="isHighlightedStart"
      :outside-view="isOutsideView"
      :outside-visible-view="isOutsideVisibleView"
      :selected="isSelectedDate"
      :selection-end="isSelectionEnd"
      :selection-start="isSelectionStart"
      :today="isDateToday"
      :unavailable="isUnavailable"
    >
      {{ dayValue }}
    </slot>
  </Primitive>
</template>
