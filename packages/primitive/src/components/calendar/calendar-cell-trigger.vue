<script setup lang="ts">
import { computed, nextTick } from 'vue';
import { getLocalTimeZone, isSameDay, isSameMonth, isToday } from '@internationalized/date';
import { toDate } from '../../date';
import type { DateValue } from '../../date';
import { useKbd, usePrimitiveElement } from '../../composables';
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './context';
import type { CalendarCellTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarCellTrigger'
});

const props = defineProps<CalendarCellTriggerPropsWithPrimitive>();

const kbd = useKbd();
const { primitiveElement, currentElement } = usePrimitiveElement();

const rootContext = injectCalendarRootContext();

const dayValue = computed(() => props.day.day.toLocaleString(rootContext.locale.value));

const labelText = computed(() => {
  return rootContext.formatter.custom(toDate(props.day), {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
});

const isDisabled = computed(() => rootContext.isDateDisabled(props.day));
const isUnavailable = computed(() => rootContext.isDateUnavailable?.(props.day));
const isDateToday = computed(() => {
  return isToday(props.day, getLocalTimeZone());
});
const isOutsideView = computed(() => {
  return !isSameMonth(props.day, props.month);
});
const isOutsideVisibleView = computed(() => rootContext.isOutsideVisibleView(props.day));

const isFocusedDate = computed(() => {
  return !rootContext.disabled.value && isSameDay(props.day, rootContext.placeholder.value);
});
const isSelectedDate = computed(() => rootContext.isDateSelected(props.day));

const SELECTOR =
  '[data-soybean-calendar-cell-trigger]:not([data-disabled]):not([data-outside-month]):not([data-outside-visible-months])';

function changeDate(date: DateValue) {
  if (rootContext.readonly.value) return;
  if (rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)) return;

  rootContext.onDateChange(date);
}

function handleClick() {
  changeDate(props.day);
}

function handleArrowKey(e: KeyboardEvent) {
  e.preventDefault();
  e.stopPropagation();
  const parentElement = rootContext.parentElement.value!;
  const allCollectionItems: HTMLElement[] = parentElement ? Array.from(parentElement.querySelectorAll(SELECTOR)) : [];
  const index = allCollectionItems.indexOf(currentElement.value);
  let newIndex = index;
  const indexIncrementation = 7;
  const sign = rootContext.dir.value === 'rtl' ? -1 : 1;
  switch (e.code) {
    case kbd.ARROW_RIGHT:
      newIndex += sign;
      break;
    case kbd.ARROW_LEFT:
      newIndex -= sign;
      break;
    case kbd.ARROW_UP:
      newIndex -= indexIncrementation;
      break;
    case kbd.ARROW_DOWN:
      newIndex += indexIncrementation;
      break;
    case kbd.ENTER:
    case kbd.SPACE_CODE:
      changeDate(props.day);
      return;
    default:
      return;
  }

  if (newIndex >= 0 && newIndex < allCollectionItems.length) {
    allCollectionItems[newIndex].focus();
    return;
  }

  if (newIndex < 0) {
    if (rootContext.isPrevButtonDisabled()) return;
    rootContext.prevPage();
    nextTick(() => {
      const newCollectionItems: HTMLElement[] = parentElement
        ? Array.from(parentElement.querySelectorAll(SELECTOR))
        : [];
      newCollectionItems[newCollectionItems.length - Math.abs(newIndex)].focus();
    });
    return;
  }

  if (newIndex >= allCollectionItems.length) {
    if (rootContext.isNextButtonDisabled()) return;
    rootContext.nextPage();
    nextTick(() => {
      const newCollectionItems: HTMLElement[] = parentElement
        ? Array.from(parentElement.querySelectorAll(SELECTOR))
        : [];
      newCollectionItems[newIndex - allCollectionItems.length].focus();
    });
  }
}
</script>

<template>
  <Primitive
    ref="primitiveElement"
    v-bind="props"
    role="button"
    :aria-label="labelText"
    data-soybean-calendar-cell-trigger
    :aria-disabled="isOutsideView || isDisabled || isUnavailable ? true : undefined"
    :data-selected="isSelectedDate ? true : undefined"
    :data-value="day.toString()"
    :data-disabled="isDisabled || isOutsideView ? '' : undefined"
    :data-unavailable="isUnavailable ? '' : undefined"
    :data-today="isDateToday ? '' : undefined"
    :data-outside-view="isOutsideView ? '' : undefined"
    :data-outside-visible-view="isOutsideVisibleView ? '' : undefined"
    :data-focused="isFocusedDate ? '' : undefined"
    :tabindex="isFocusedDate ? 0 : isOutsideView || isDisabled ? undefined : -1"
    @click="handleClick"
    @keydown.up.down.left.right.space.enter="handleArrowKey"
    @keydown.enter.prevent
  >
    <slot :day-value="dayValue">
      {{ dayValue }}
    </slot>
  </Primitive>
</template>
