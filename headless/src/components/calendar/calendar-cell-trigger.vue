<script setup lang="ts">
import type { DateValue } from '@internationalized/date';

import { getLocalTimeZone, isSameDay, isSameMonth, isToday } from '@internationalized/date';
import { computed, nextTick } from 'vue';

import { useForwardElement } from '../../composables';
import { toDate } from '../../date';
import { Primitive } from '../primitive';

import { useCalendarRootContext, useCalendarUi } from './context';
import type { CalendarCellTriggerProps } from './types';

defineOptions({
  name: 'CalendarCellTrigger'
});

const props = withDefaults(defineProps<CalendarCellTriggerProps>(), {
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
  }) => any;
}>();

const cls = useCalendarUi('cellTrigger');
const rootContext = useCalendarRootContext('CalendarCellTrigger');
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
const isDisabled = computed(() => {
  return rootContext.isDateDisabled(props.day) || (rootContext.disableDaysOutsideCurrentView.value && isOutsideView.value);
});
const isSelectedDate = computed(() => rootContext.isDateSelected(props.day));
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

  return false;
});

const changeDate = (date: DateValue) => {
  if (rootContext.readonly.value) {
    return;
  }
  if (rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)) {
    return;
  }

  rootContext.onDateChange(date);
};

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
  candidateDay.focus();
};

const handleClick = () => {
  if (isDisabled.value || isUnavailable.value) {
    return;
  }

  changeDate(props.day);
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
      changeDate(props.day);
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
    :class="cls"
    :data-disabled="isDisabled ? '' : undefined"
    :data-focused="isFocusedDate ? '' : undefined"
    :data-outside-view="isOutsideView ? '' : undefined"
    :data-outside-visible-view="isOutsideVisibleView ? '' : undefined"
    :data-selected="isSelectedDate ? '' : undefined"
    :data-today="isDateToday ? '' : undefined"
    :data-unavailable="isUnavailable ? '' : undefined"
    :data-value="day.toString()"
    :disabled="as === 'button' ? isDisabled || isUnavailable : undefined"
    :role="as === 'button' ? undefined : 'button'"
    :tabindex="isFocusedDate ? 0 : isOutsideView || isDisabled ? undefined : -1"
    :type="as === 'button' ? 'button' : undefined"
    data-slot="cell-trigger"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot
      :day-value="dayValue"
      :disabled="Boolean(isDisabled)"
      :outside-view="isOutsideView"
      :outside-visible-view="isOutsideVisibleView"
      :selected="isSelectedDate"
      :today="isDateToday"
      :unavailable="isUnavailable"
    >
      {{ dayValue }}
    </slot>
  </Primitive>
</template>
