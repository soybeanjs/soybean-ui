<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import { computed, nextTick, useId, watch } from 'vue';
import { useForwardElement } from '../../composables';
import { compareYearMonth, toDate } from '../../date';
import { Primitive } from '../primitive';
import { useMonthRangePickerRootContext, useMonthRangePickerUi } from './context';
import type { MonthRangePickerPopupProps } from './types';

defineOptions({
  name: 'MonthRangePickerPopup'
});

withDefaults(defineProps<MonthRangePickerPopupProps>(), {
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
    highlighted: boolean;
    rangeEnd: boolean;
    rangeStart: boolean;
    selected: boolean;
  }) => any;
}>();

const cls = useMonthRangePickerUi('popup');
const headerCls = useMonthRangePickerUi('header');
const headingCls = useMonthRangePickerUi('heading');
const prevCls = useMonthRangePickerUi('prev');
const nextCls = useMonthRangePickerUi('next');
const gridCls = useMonthRangePickerUi('grid');
const cellTriggerCls = useMonthRangePickerUi('cellTrigger');
const {
  dir,
  formatter,
  focusedMonth,
  headingValue,
  isMonthDisabled,
  isMonthHighlighted,
  isMonthSelected,
  isNextButtonDisabled,
  isPrevButtonDisabled,
  isRangeEnd,
  isRangeStart,
  modelValue,
  nextPage,
  onRangeChange,
  open,
  placeholder,
  popupId,
  prevPage,
  setFocusedMonth,
  setHoveredMonth
} = useMonthRangePickerRootContext('MonthRangePickerPopup');
const [popupElement, setPopupElement] = useForwardElement();
const headingId = useId();

const months = computed(() => {
  return Array.from({ length: 12 }, (_, index) => placeholder.value.set({ month: index + 1, day: 1 }));
});

const focusMonth = (date: DateValue) => {
  const monthElement = popupElement.value?.querySelector<HTMLElement>(`[data-month-value='${date.toString()}']`);
  monthElement?.focus();
};

const focusIndex = (index: number, direction: 1 | -1) => {
  let nextIndex = index;

  while (nextIndex >= 0 && nextIndex < months.value.length) {
    const nextMonth = months.value[nextIndex];

    if (!isMonthDisabled(nextMonth)) {
      setFocusedMonth(nextMonth);
      nextTick(() => {
        focusMonth(nextMonth);
      });
      return true;
    }

    nextIndex += direction;
  }

  return false;
};

const focusClosestMonth = (date: DateValue) => {
  const currentIndex = months.value.findIndex(month => compareYearMonth(month, date) === 0);
  const nextIndex = currentIndex === -1 ? 0 : currentIndex;

  if (focusIndex(nextIndex, 1)) {
    return;
  }

  focusIndex(nextIndex, -1);
};

const focusAcrossYear = (targetIndex: number, direction: 1 | -1) => {
  if (direction > 0) {
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
  if (isPrevButtonDisabled()) {
    return;
  }

  prevPage();
  nextTick(() => {
    focusClosestMonth(focusedMonth.value);
  });
};

const handleNextClick = () => {
  if (isNextButtonDisabled()) {
    return;
  }

  nextPage();
  nextTick(() => {
    focusClosestMonth(focusedMonth.value);
  });
};

const handleMonthFocus = (date: DateValue) => {
  setFocusedMonth(date);
};

const handleMonthHover = (date: DateValue) => {
  if (modelValue.value.start && !modelValue.value.end && !isMonthDisabled(date)) {
    setHoveredMonth(date);
  }
};

const handleMonthClick = (date: DateValue) => {
  if (isMonthDisabled(date)) {
    return;
  }

  onRangeChange(date);
};

const handleMonthKeydown = (date: DateValue, index: number, event: KeyboardEvent) => {
  if (isMonthDisabled(date)) {
    return;
  }

  const sign = dir.value === 'rtl' ? -1 : 1;

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
      focusIndex(index + (2 - (index % 3)), -1);
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
      onRangeChange(date);
      break;
    }
    default:
      break;
  }
};

watch(
  () => open.value,
  value => {
    if (!value) {
      return;
    }

    nextTick(() => {
      focusClosestMonth(focusedMonth.value);
    });
  }
);
</script>

<template>
  <Primitive
    v-if="open"
    :id="popupId"
    :ref="setPopupElement"
    :as="as"
    :as-child="asChild"
    :aria-labelledby="headingId"
    :class="cls"
    data-slot="popup"
    role="dialog"
    @mouseleave="setHoveredMonth(undefined)"
  >
    <div :class="headerCls" data-slot="header">
      <button
        aria-label="Previous year"
        :class="prevCls"
        :data-disabled="isPrevButtonDisabled() ? '' : undefined"
        data-slot="prev"
        :disabled="isPrevButtonDisabled()"
        type="button"
        @click="handlePrevClick"
      >
        <slot name="prev" :disabled="isPrevButtonDisabled()">Prev</slot>
      </button>
      <div :id="headingId" :class="headingCls" data-slot="heading">
        <slot name="heading" :heading-value="headingValue">
          {{ headingValue }}
        </slot>
      </div>
      <button
        aria-label="Next year"
        :class="nextCls"
        :data-disabled="isNextButtonDisabled() ? '' : undefined"
        data-slot="next"
        :disabled="isNextButtonDisabled()"
        type="button"
        @click="handleNextClick"
      >
        <slot name="next" :disabled="isNextButtonDisabled()">Next</slot>
      </button>
    </div>
    <div :class="gridCls" data-slot="grid">
      <button
        v-for="(month, index) in months"
        :key="month.toString()"
        :aria-label="formatter.fullMonthAndYear(toDate(month))"
        :aria-pressed="isMonthSelected(month) ? true : undefined"
        :class="cellTriggerCls"
        :data-disabled="isMonthDisabled(month) ? '' : undefined"
        :data-focused="compareYearMonth(month, focusedMonth) === 0 ? '' : undefined"
        :data-highlighted="isMonthHighlighted(month) ? '' : undefined"
        :data-month-value="month.toString()"
        :data-range-end="isRangeEnd(month) ? '' : undefined"
        :data-range-start="isRangeStart(month) ? '' : undefined"
        :data-selected="isMonthSelected(month) ? '' : undefined"
        data-slot="cell-trigger"
        :disabled="isMonthDisabled(month)"
        :tabindex="compareYearMonth(month, focusedMonth) === 0 && !isMonthDisabled(month) ? 0 : -1"
        type="button"
        @click="handleMonthClick(month)"
        @focus="handleMonthFocus(month)"
        @keydown="handleMonthKeydown(month, index, $event)"
        @mouseenter="handleMonthHover(month)"
      >
        <slot
          name="month"
          :date="month"
          :disabled="isMonthDisabled(month)"
          :focused="compareYearMonth(month, focusedMonth) === 0"
          :highlighted="isMonthHighlighted(month)"
          :label="formatter.custom(toDate(month), { month: 'short' })"
          :range-end="isRangeEnd(month)"
          :range-start="isRangeStart(month)"
          :selected="isMonthSelected(month)"
        >
          {{ formatter.custom(toDate(month), { month: 'short' }) }}
        </slot>
      </button>
    </div>
  </Primitive>
</template>
