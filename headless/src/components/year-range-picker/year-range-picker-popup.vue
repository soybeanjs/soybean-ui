<script setup lang="ts">
import type { DateValue } from '@internationalized/date';

import { nextTick, useId, watch } from 'vue';

import { useForwardElement } from '../../composables';
import { Primitive } from '../primitive';

import { useYearRangePickerRootContext, useYearRangePickerUi } from './context';
import type { YearRangePickerPopupProps } from './types';

defineOptions({
  name: 'YearRangePickerPopup'
});

withDefaults(defineProps<YearRangePickerPopupProps>(), {
  as: 'div'
});

defineSlots<{
  heading?: (props: { headingValue: string }) => any;
  prev?: (props: { disabled: boolean }) => any;
  next?: (props: { disabled: boolean }) => any;
  year?: (props: {
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

const cls = useYearRangePickerUi('popup');
const headerCls = useYearRangePickerUi('header');
const headingCls = useYearRangePickerUi('heading');
const prevCls = useYearRangePickerUi('prev');
const nextCls = useYearRangePickerUi('next');
const gridCls = useYearRangePickerUi('grid');
const cellTriggerCls = useYearRangePickerUi('cellTrigger');
const rootContext = useYearRangePickerRootContext('YearRangePickerPopup');
const [popupElement, setPopupElement] = useForwardElement();
const headingId = useId();

const years = rootContext.yearGrid;

const focusYear = (date: DateValue) => {
  const yearElement = popupElement.value?.querySelector<HTMLElement>(`[data-year-value='${date.toString()}']`);
  yearElement?.focus();
};

const focusIndex = (index: number, direction: 1 | -1) => {
  let nextIndex = index;

  while (nextIndex >= 0 && nextIndex < years.value.cells.length) {
    const nextYear = years.value.cells[nextIndex];

    if (!rootContext.isYearDisabled(nextYear)) {
      rootContext.setFocusedYear(nextYear);
      nextTick(() => {
        focusYear(nextYear);
      });
      return true;
    }

    nextIndex += direction;
  }

  return false;
};

const focusClosestYear = (date: DateValue) => {
  const currentIndex = years.value.cells.findIndex(year => year.year === date.year);
  const nextIndex = currentIndex === -1 ? 0 : currentIndex;

  if (focusIndex(nextIndex, 1)) {
    return;
  }

  focusIndex(nextIndex, -1);
};

const focusAcrossPage = (targetIndex: number, direction: 1 | -1) => {
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

  if (targetIndex >= 0 && targetIndex < years.value.cells.length) {
    focusIndex(targetIndex, direction);
    return;
  }

  const wrappedIndex = targetIndex < 0 ? years.value.cells.length + targetIndex : targetIndex - years.value.cells.length;
  focusAcrossPage(wrappedIndex, direction);
};

const handlePrevClick = () => {
  if (rootContext.isPrevButtonDisabled()) {
    return;
  }

  rootContext.prevPage();
  nextTick(() => {
    focusClosestYear(rootContext.focusedYear.value);
  });
};

const handleNextClick = () => {
  if (rootContext.isNextButtonDisabled()) {
    return;
  }

  rootContext.nextPage();
  nextTick(() => {
    focusClosestYear(rootContext.focusedYear.value);
  });
};

const handleYearFocus = (date: DateValue) => {
  rootContext.setFocusedYear(date);
};

const handleYearHover = (date: DateValue) => {
  if (rootContext.modelValue.value.start && !rootContext.modelValue.value.end && !rootContext.isYearDisabled(date)) {
    rootContext.setHoveredYear(date);
  }
};

const handleYearClick = (date: DateValue) => {
  if (rootContext.isYearDisabled(date)) {
    return;
  }

  rootContext.onRangeChange(date);
};

const handleYearKeydown = (date: DateValue, index: number, event: KeyboardEvent) => {
  if (rootContext.isYearDisabled(date)) {
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
      moveFocus(index, 4);
      break;
    case 'ArrowUp':
      event.preventDefault();
      moveFocus(index, -4);
      break;
    case 'Home':
      event.preventDefault();
      focusIndex(index - (index % 4), 1);
      break;
    case 'End':
      event.preventDefault();
      focusIndex(index + (3 - index % 4), -1);
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
      rootContext.onRangeChange(date);
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
      focusClosestYear(rootContext.focusedYear.value);
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
    @mouseleave="rootContext.setHoveredYear(undefined)"
  >
    <div :class="headerCls" data-slot="header">
      <button
        aria-label="Previous years"
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
        aria-label="Next years"
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
        v-for="(year, index) in years.cells"
        :key="year.toString()"
        :aria-label="rootContext.formatter.fullYear(new Date(year.year, 0, 1))"
        :aria-pressed="rootContext.isYearSelected(year) ? true : undefined"
        :class="cellTriggerCls"
        :data-disabled="rootContext.isYearDisabled(year) ? '' : undefined"
        :data-focused="year.year === rootContext.focusedYear.value.year ? '' : undefined"
        :data-highlighted="rootContext.isYearHighlighted(year) ? '' : undefined"
        :data-range-end="rootContext.isRangeEnd(year) ? '' : undefined"
        :data-range-start="rootContext.isRangeStart(year) ? '' : undefined"
        :data-selected="rootContext.isYearSelected(year) ? '' : undefined"
        data-slot="cell-trigger"
        :data-year-value="year.toString()"
        :disabled="rootContext.isYearDisabled(year)"
        :tabindex="year.year === rootContext.focusedYear.value.year && !rootContext.isYearDisabled(year) ? 0 : -1"
        type="button"
        @click="handleYearClick(year)"
        @focus="handleYearFocus(year)"
        @keydown="handleYearKeydown(year, index, $event)"
        @mouseenter="handleYearHover(year)"
      >
        <slot
          name="year"
          :date="year"
          :disabled="rootContext.isYearDisabled(year)"
          :focused="year.year === rootContext.focusedYear.value.year"
          :highlighted="rootContext.isYearHighlighted(year)"
          :label="String(year.year)"
          :range-end="rootContext.isRangeEnd(year)"
          :range-start="rootContext.isRangeStart(year)"
          :selected="rootContext.isYearSelected(year)"
        >
          {{ year.year }}
        </slot>
      </button>
    </div>
  </Primitive>
</template>
