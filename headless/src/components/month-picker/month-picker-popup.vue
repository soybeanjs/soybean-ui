<script setup lang="ts">
import type { DateValue } from '@internationalized/date';

import { computed, nextTick, useId, watch } from 'vue';

import { useForwardElement } from '../../composables';
import { compareYearMonth, toDate } from '../../date';
import { Primitive } from '../primitive';

import { useMonthPickerRootContext, useMonthPickerUi } from './context';
import type { MonthPickerPopupProps } from './types';

defineOptions({
  name: 'MonthPickerPopup'
});

withDefaults(defineProps<MonthPickerPopupProps>(), {
  as: 'div'
});

defineSlots<{
  heading?: (props: { headingValue: string }) => any;
  prev?: (props: { disabled: boolean }) => any;
  next?: (props: { disabled: boolean }) => any;
  month?: (props: {
    date: DateValue;
    label: string;
    disabled: boolean;
    focused: boolean;
    selected: boolean;
  }) => any;
}>();

const cls = useMonthPickerUi('popup');
const headerCls = useMonthPickerUi('header');
const headingCls = useMonthPickerUi('heading');
const prevCls = useMonthPickerUi('prev');
const nextCls = useMonthPickerUi('next');
const gridCls = useMonthPickerUi('grid');
const cellTriggerCls = useMonthPickerUi('cellTrigger');
const rootContext = useMonthPickerRootContext('MonthPickerPopup');
const [popupElement, setPopupElement] = useForwardElement();
const headingId = useId();

const months = computed(() => {
  return Array.from({ length: 12 }, (_, index) => rootContext.placeholder.value.set({ month: index + 1, day: 1 }));
});

const focusMonth = (date: DateValue) => {
  const monthElement = popupElement.value?.querySelector<HTMLElement>(`[data-month-value='${date.toString()}']`);
  monthElement?.focus();
};

const focusIndex = (index: number, direction: 1 | -1) => {
  let nextIndex = index;

  while (nextIndex >= 0 && nextIndex < months.value.length) {
    const nextMonth = months.value[nextIndex];

    if (!rootContext.isMonthDisabled(nextMonth)) {
      rootContext.setFocusedMonth(nextMonth);
      nextTick(() => {
        focusMonth(nextMonth);
      });
      return;
    }

    nextIndex += direction;
  }
};

const focusAcrossYear = (targetIndex: number, direction: 1 | -1) => {
  if (direction > 0) {
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
    focusIndex(targetIndex, direction);
  });
};

const moveFocus = (currentIndex: number, delta: number) => {
  const targetIndex = currentIndex + delta;
  const direction = delta >= 0 ? 1 : -1;

  if (targetIndex >= 0 && targetIndex < months.value.length) {
    focusIndex(targetIndex, direction);
    return;
  }

  const wrappedIndex = targetIndex < 0 ? months.value.length + targetIndex : targetIndex - months.value.length;
  focusAcrossYear(wrappedIndex, direction);
};

const handlePrevClick = () => {
  if (rootContext.isPrevButtonDisabled()) {
    return;
  }

  rootContext.prevPage();
  nextTick(() => {
    focusMonth(rootContext.focusedMonth.value);
  });
};

const handleNextClick = () => {
  if (rootContext.isNextButtonDisabled()) {
    return;
  }

  rootContext.nextPage();
  nextTick(() => {
    focusMonth(rootContext.focusedMonth.value);
  });
};

const handleMonthFocus = (date: DateValue) => {
  rootContext.setFocusedMonth(date);
};

const handleMonthClick = (date: DateValue) => {
  if (rootContext.isMonthDisabled(date)) {
    return;
  }

  rootContext.onMonthChange(date);
};

const handleMonthKeydown = (date: DateValue, index: number, event: KeyboardEvent) => {
  if (rootContext.isMonthDisabled(date)) {
    return;
  }

  const sign = rootContext.dir.value === 'rtl' ? -1 : 1;

  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault();
      moveFocus(index, sign);
      break;
    case 'ArrowLeft':
      event.preventDefault();
      moveFocus(index, -sign);
      break;
    case 'ArrowDown':
      event.preventDefault();
      moveFocus(index, 3);
      break;
    case 'ArrowUp':
      event.preventDefault();
      moveFocus(index, -3);
      break;
    case 'Home':
      event.preventDefault();
      focusIndex(index - (index % 3), 1);
      break;
    case 'End':
      event.preventDefault();
      focusIndex(index + (2 - index % 3), -1);
      break;
    case 'PageUp':
      event.preventDefault();
      handlePrevClick();
      break;
    case 'PageDown':
      event.preventDefault();
      handleNextClick();
      break;
    case 'Enter':
    case ' ': {
      event.preventDefault();
      rootContext.onMonthChange(date);
      break;
    }
    default:
      break;
  }
};

watch(
  () => rootContext.open.value,
  value => {
    if (!value) {
      return;
    }

    nextTick(() => {
      focusMonth(rootContext.focusedMonth.value);
    });
  }
);
</script>

<template>
  <Primitive
    v-if="rootContext.open.value"
    :id="rootContext.popupId"
    :ref="setPopupElement"
    :as="as"
    :as-child="asChild"
    :aria-labelledby="headingId"
    :class="cls"
    data-slot="popup"
    role="dialog"
  >
    <div :class="headerCls" data-slot="header">
      <button
        aria-label="Previous year"
        :class="prevCls"
        :data-disabled="rootContext.isPrevButtonDisabled() ? '' : undefined"
        data-slot="prev"
        :disabled="rootContext.isPrevButtonDisabled()"
        type="button"
        @click="handlePrevClick"
      >
        <slot name="prev" :disabled="rootContext.isPrevButtonDisabled()">
          Prev
        </slot>
      </button>
      <div :id="headingId" :class="headingCls" data-slot="heading">
        <slot name="heading" :heading-value="rootContext.headingValue.value">
          {{ rootContext.headingValue }}
        </slot>
      </div>
      <button
        aria-label="Next year"
        :class="nextCls"
        :data-disabled="rootContext.isNextButtonDisabled() ? '' : undefined"
        data-slot="next"
        :disabled="rootContext.isNextButtonDisabled()"
        type="button"
        @click="handleNextClick"
      >
        <slot name="next" :disabled="rootContext.isNextButtonDisabled()">
          Next
        </slot>
      </button>
    </div>
    <div :class="gridCls" data-slot="grid">
      <button
        v-for="(month, index) in months"
        :key="month.toString()"
        :aria-label="rootContext.formatter.fullMonthAndYear(toDate(month))"
        :aria-pressed="rootContext.isMonthSelected(month) ? true : undefined"
        :class="cellTriggerCls"
        :data-disabled="rootContext.isMonthDisabled(month) ? '' : undefined"
        :data-focused="compareYearMonth(month, rootContext.focusedMonth.value) === 0 ? '' : undefined"
        :data-month-value="month.toString()"
        :data-selected="rootContext.isMonthSelected(month) ? '' : undefined"
        data-slot="cell-trigger"
        :disabled="rootContext.isMonthDisabled(month)"
        :tabindex="compareYearMonth(month, rootContext.focusedMonth.value) === 0 && !rootContext.isMonthDisabled(month) ? 0 : -1"
        type="button"
        @click="handleMonthClick(month)"
        @focus="handleMonthFocus(month)"
        @keydown="handleMonthKeydown(month, index, $event)"
      >
        <slot
          name="month"
          :date="month"
          :disabled="rootContext.isMonthDisabled(month)"
          :focused="compareYearMonth(month, rootContext.focusedMonth.value) === 0"
          :label="rootContext.formatter.custom(toDate(month), { month: 'short' })"
          :selected="rootContext.isMonthSelected(month)"
        >
          {{ rootContext.formatter.custom(toDate(month), { month: 'short' }) }}
        </slot>
      </button>
    </div>
  </Primitive>
</template>
