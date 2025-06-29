<script setup lang="ts">
import { computed, nextTick } from 'vue';
import { getLocalTimeZone, isSameDay, isSameMonth, isToday } from '@internationalized/date';
import { getDaysInMonth, toDate } from '../../date';
import type { DateValue } from '../../date';
import { useKbd, usePrimitiveElement } from '../../composables';
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './context';
import { getSelectableCells } from './shared';
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

const isUnavailable = computed(() => rootContext.isDateUnavailable?.(props.day) ?? false);
const isDateToday = computed(() => {
  return isToday(props.day, getLocalTimeZone());
});
const isOutsideView = computed(() => {
  return !isSameMonth(props.day, props.month);
});
const isOutsideVisibleView = computed(() => rootContext.isOutsideVisibleView(props.day));

const isDisabled = computed(
  () =>
    rootContext.isDateDisabled(props.day) || (rootContext.disableDaysOutsideCurrentView.value && isOutsideView.value)
);

const isFocusedDate = computed(() => {
  return !rootContext.disabled.value && isSameDay(props.day, rootContext.placeholder.value);
});
const isSelectedDate = computed(() => rootContext.isDateSelected(props.day));

function changeDate(date: DateValue) {
  if (rootContext.readonly.value) return;
  if (rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)) return;

  rootContext.onDateChange(date);
}

function handleClick() {
  if (isDisabled.value) return;
  changeDate(props.day);
}

function handleArrowKey(e: KeyboardEvent) {
  if (isDisabled.value) return;
  e.preventDefault();
  e.stopPropagation();
  const parentElement = rootContext.parentElement.value!;
  const indexIncrementation = 7;
  const sign = rootContext.dir.value === 'rtl' ? -1 : 1;
  // eslint-disable-next-line default-case
  switch (e.code) {
    case kbd.ARROW_RIGHT:
      shiftFocus(currentElement.value, sign);
      break;
    case kbd.ARROW_LEFT:
      shiftFocus(currentElement.value, -sign);
      break;
    case kbd.ARROW_UP:
      shiftFocus(currentElement.value, -indexIncrementation);
      break;
    case kbd.ARROW_DOWN:
      shiftFocus(currentElement.value, indexIncrementation);
      break;
    case kbd.ENTER:
    case kbd.SPACE_CODE:
      changeDate(props.day);
  }

  function shiftFocus(node: HTMLElement, add: number) {
    const allCollectionItems: HTMLElement[] = getSelectableCells(parentElement);
    if (!allCollectionItems.length) return;

    const index = allCollectionItems.indexOf(node);
    const newIndex = index + add;

    if (newIndex >= 0 && newIndex < allCollectionItems.length) {
      if (allCollectionItems[newIndex].hasAttribute('data-disabled')) {
        shiftFocus(allCollectionItems[newIndex], add);
      }
      allCollectionItems[newIndex].focus();
      return;
    }

    if (newIndex < 0) {
      if (rootContext.isPrevButtonDisabled()) return;
      rootContext.prevPage();
      nextTick(() => {
        const newCollectionItems: HTMLElement[] = getSelectableCells(parentElement);
        if (!newCollectionItems.length) return;
        if (!rootContext.pagedNavigation.value && rootContext.numberOfMonths.value > 1) {
          // Placeholder is set to first month of the new page
          const numberOfDays = getDaysInMonth(rootContext.placeholder.value);
          const computedIndex = numberOfDays - Math.abs(newIndex);
          if (newCollectionItems[computedIndex].hasAttribute('data-disabled')) {
            shiftFocus(newCollectionItems[computedIndex], add);
          }
          newCollectionItems[computedIndex].focus();
          return;
        }
        const computedIndex = newCollectionItems.length - Math.abs(newIndex);
        if (newCollectionItems[computedIndex].hasAttribute('data-disabled')) {
          shiftFocus(newCollectionItems[computedIndex], add);
        }
        newCollectionItems[computedIndex].focus();
      });
      return;
    }

    if (newIndex >= allCollectionItems.length) {
      if (rootContext.isNextButtonDisabled()) return;
      rootContext.nextPage();
      nextTick(() => {
        const newCollectionItems: HTMLElement[] = getSelectableCells(parentElement);
        if (!newCollectionItems.length) return;

        if (!rootContext.pagedNavigation.value && rootContext.numberOfMonths.value > 1) {
          // Placeholder is set to first month of the new page
          const numberOfDays = getDaysInMonth(
            rootContext.placeholder.value.add({ months: rootContext.numberOfMonths.value - 1 })
          );

          const computedIndex = newIndex - allCollectionItems.length + (newCollectionItems.length - numberOfDays);

          if (newCollectionItems[computedIndex].hasAttribute('data-disabled')) {
            shiftFocus(newCollectionItems[computedIndex], add);
          }
          newCollectionItems[computedIndex].focus();
          return;
        }

        const computedIndex = newIndex - allCollectionItems.length;
        if (newCollectionItems[computedIndex].hasAttribute('data-disabled')) {
          shiftFocus(newCollectionItems[computedIndex], add);
        }

        newCollectionItems[computedIndex].focus();
      });
    }
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
    :aria-disabled="isDisabled || isUnavailable ? true : undefined"
    :data-selected="isSelectedDate ? true : undefined"
    :data-value="day.toString()"
    :data-disabled="isDisabled ? '' : undefined"
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
    <slot
      :day-value="dayValue"
      :disabled="isDisabled"
      :today="isDateToday"
      :selected="isSelectedDate"
      :outside-view="isOutsideView"
      :outside-visible-view="isOutsideVisibleView"
      :unavailable="isUnavailable"
    >
      {{ dayValue }}
    </slot>
  </Primitive>
</template>
