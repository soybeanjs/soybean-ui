<script setup lang="ts">
import { computed, nextTick } from 'vue';
import { getLocalTimeZone, isSameDay, isSameMonth, isToday } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
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
const {
  locale,
  formatter,
  isDateUnavailable,
  isOutsideVisibleView: checkOutsideVisibleView,
  isDateDisabled,
  disableDaysOutsideCurrentView,
  isDateSelected,
  disabled,
  isPlaceholderFocusable,
  placeholder,
  hasSelectedDate,
  isSelectedDateDisabled,
  firstFocusableDate,
  readonly,
  onDateChange,
  minValue,
  maxValue,
  parentElement,
  isNextButtonDisabled,
  nextPage,
  isPrevButtonDisabled,
  prevPage,
  onPlaceholderChange,
  dir
} = useCalendarRootContext('CalendarCellTrigger');
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
const isDisabled = computed(() => {
  return isDateDisabled(props.day) || (disableDaysOutsideCurrentView.value && isOutsideView.value);
});
const isSelectedDate = computed(() => isDateSelected(props.day));
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

  return false;
});

const changeDate = (date: DateValue) => {
  if (readonly.value) {
    return;
  }
  if (isDateDisabled(date) || isDateUnavailable?.(date)) {
    return;
  }

  onDateChange(date);
};

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
