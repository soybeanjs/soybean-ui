<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import { nextTick, useId, watch } from 'vue';
import { useForwardElement } from '../../composables';
import { Primitive } from '../primitive';
import { useYearPickerRootContext, useYearPickerUi } from './context';
import type { YearPickerPopupProps } from './types';

defineOptions({
  name: 'YearPickerPopup'
});

withDefaults(defineProps<YearPickerPopupProps>(), {
  as: 'div'
});

defineSlots<{
  heading?: (props: { headingValue: string }) => any;
  prev?: (props: { disabled: boolean }) => any;
  next?: (props: { disabled: boolean }) => any;
  year?: (props: { date: DateValue; label: string; disabled: boolean; focused: boolean; selected: boolean }) => any;
}>();

const cls = useYearPickerUi('popup');
const headerCls = useYearPickerUi('header');
const headingCls = useYearPickerUi('heading');
const prevCls = useYearPickerUi('prev');
const nextCls = useYearPickerUi('next');
const gridCls = useYearPickerUi('grid');
const cellTriggerCls = useYearPickerUi('cellTrigger');
const {
  yearGrid,
  isYearDisabled,
  setFocusedYear,
  isNextButtonDisabled,
  nextPage,
  isPrevButtonDisabled,
  prevPage,
  focusedYear,
  onYearChange,
  dir,
  open,
  popupId,
  headingValue,
  formatter,
  isYearSelected
} = useYearPickerRootContext('YearPickerPopup');
const [popupElement, setPopupElement] = useForwardElement();
const headingId = useId();

const years = yearGrid;

const focusYear = (date: DateValue) => {
  const yearElement = popupElement.value?.querySelector<HTMLElement>(`[data-year-value='${date.toString()}']`);
  yearElement?.focus();
};

const focusIndex = (index: number, direction: 1 | -1) => {
  let nextIndex = index;

  while (nextIndex >= 0 && nextIndex < years.value.cells.length) {
    const nextYear = years.value.cells[nextIndex];

    if (!isYearDisabled(nextYear)) {
      setFocusedYear(nextYear);
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

  if (targetIndex >= 0 && targetIndex < years.value.cells.length) {
    focusIndex(targetIndex, direction);
    return;
  }

  const wrappedIndex =
    targetIndex < 0 ? years.value.cells.length + targetIndex : targetIndex - years.value.cells.length;
  focusAcrossPage(wrappedIndex, direction);
};

const handlePrevClick = () => {
  if (isPrevButtonDisabled()) {
    return;
  }

  prevPage();
  nextTick(() => {
    focusClosestYear(focusedYear.value);
  });
};

const handleNextClick = () => {
  if (isNextButtonDisabled()) {
    return;
  }

  nextPage();
  nextTick(() => {
    focusClosestYear(focusedYear.value);
  });
};

const handleYearFocus = (date: DateValue) => {
  setFocusedYear(date);
};

const handleYearClick = (date: DateValue) => {
  if (isYearDisabled(date)) {
    return;
  }

  onYearChange(date);
};

const handleYearKeydown = (date: DateValue, index: number, event: KeyboardEvent) => {
  if (isYearDisabled(date)) {
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
      focusIndex(index + (3 - (index % 4)), -1);
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
      onYearChange(date);
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
      focusClosestYear(focusedYear.value);
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
  >
    <div :class="headerCls" data-slot="header">
      <button
        aria-label="Previous years"
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
        aria-label="Next years"
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
        v-for="(year, index) in years.cells"
        :key="year.toString()"
        :aria-label="formatter.fullYear(new Date(year.year, 0, 1))"
        :aria-pressed="isYearSelected(year) ? true : undefined"
        :class="cellTriggerCls"
        :data-disabled="isYearDisabled(year) ? '' : undefined"
        :data-focused="year.year === focusedYear.year ? '' : undefined"
        :data-selected="isYearSelected(year) ? '' : undefined"
        data-slot="cell-trigger"
        :data-year-value="year.toString()"
        :disabled="isYearDisabled(year)"
        :tabindex="year.year === focusedYear.year && !isYearDisabled(year) ? 0 : -1"
        type="button"
        @click="handleYearClick(year)"
        @focus="handleYearFocus(year)"
        @keydown="handleYearKeydown(year, index, $event)"
      >
        <slot
          name="year"
          :date="year"
          :disabled="isYearDisabled(year)"
          :focused="year.year === focusedYear.year"
          :label="String(year.year)"
          :selected="isYearSelected(year)"
        >
          {{ year.year }}
        </slot>
      </button>
    </div>
  </Primitive>
</template>
