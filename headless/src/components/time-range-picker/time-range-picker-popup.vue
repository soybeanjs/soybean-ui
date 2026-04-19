<script setup lang="ts">
import type { TimeValue } from '../../date';

import { nextTick, watch } from 'vue';

import { useForwardElement } from '../../composables';
import { findClosestTimeOption } from '../../shared/time-picker';
import { Primitive } from '../primitive';

import { useTimeRangePickerRootContext, useTimeRangePickerUi } from './context';
import type { TimeRangePickerPopupProps } from './types';

defineOptions({
  name: 'TimeRangePickerPopup'
});

withDefaults(defineProps<TimeRangePickerPopupProps>(), {
  as: 'div'
});

defineSlots<{
  time?: (props: {
    disabled: boolean;
    focused: boolean;
    highlighted: boolean;
    label: string;
    rangeEnd: boolean;
    rangeStart: boolean;
    selected: boolean;
    time: TimeValue;
  }) => any;
}>();

const cls = useTimeRangePickerUi('popup');
const listCls = useTimeRangePickerUi('list');
const cellTriggerCls = useTimeRangePickerUi('cellTrigger');
const rootContext = useTimeRangePickerRootContext('TimeRangePickerPopup');
const [popupElement, setPopupElement] = useForwardElement();

const focusTime = (key: string) => {
  const timeElement = popupElement.value?.querySelector<HTMLElement>(`[data-time-key='${key}']`);
  timeElement?.focus();
  timeElement?.scrollIntoView({ block: 'nearest' });
};

const focusIndex = (index: number, direction: 1 | -1) => {
  const options = rootContext.options.value;
  let nextIndex = index;

  while (nextIndex >= 0 && nextIndex < options.length) {
    const nextOption = options[nextIndex];

    if (!rootContext.isTimeDisabled(nextOption.value)) {
      rootContext.setFocusedTime(nextOption.value);
      nextTick(() => {
        focusTime(nextOption.key);
      });
      return true;
    }

    nextIndex += direction;
  }

  return false;
};

const focusCurrentTime = () => {
  const matchedOption = findClosestTimeOption(
    rootContext.options.value,
    rootContext.modelValue.value.end ?? rootContext.modelValue.value.start ?? rootContext.focusedTime.value
  );

  if (!matchedOption) {
    return;
  }

  const matchedIndex = rootContext.options.value.findIndex(option => option.key === matchedOption.key);
  focusIndex(matchedIndex === -1 ? 0 : matchedIndex, 1);
};

const moveFocus = (currentIndex: number, delta: number) => {
  const targetIndex = currentIndex + delta;
  const direction = delta >= 0 ? 1 : -1;

  if (targetIndex < 0 || targetIndex >= rootContext.options.value.length) {
    return;
  }

  focusIndex(targetIndex, direction);
};

const handleTimeClick = (time: TimeValue) => {
  if (rootContext.isTimeDisabled(time)) {
    return;
  }

  rootContext.onRangeChange(time);
};

const handleTimeFocus = (time: TimeValue) => {
  rootContext.setFocusedTime(time);
};

const handleTimeHover = (time: TimeValue) => {
  if (rootContext.modelValue.value.start && !rootContext.modelValue.value.end && !rootContext.isTimeDisabled(time)) {
    rootContext.setHoveredTime(time);
  }
};

const handleTimeKeydown = (time: TimeValue, index: number, event: KeyboardEvent) => {
  if (rootContext.isTimeDisabled(time)) {
    return;
  }

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      moveFocus(index, 1);
      break;
    case 'ArrowUp':
      event.preventDefault();
      moveFocus(index, -1);
      break;
    case 'Home':
      event.preventDefault();
      focusIndex(0, 1);
      break;
    case 'End':
      event.preventDefault();
      focusIndex(rootContext.options.value.length - 1, -1);
      break;
    case 'Enter':
    case ' ': {
      event.preventDefault();
      rootContext.onRangeChange(time);
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
      focusCurrentTime();
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
    aria-label="Time range picker"
    :class="cls"
    data-slot="popup"
    role="dialog"
    @mouseleave="rootContext.setHoveredTime(undefined)"
  >
    <div :class="listCls" data-slot="list">
      <button
        v-for="(option, index) in rootContext.options.value"
        :key="option.key"
        :aria-label="option.label"
        :aria-pressed="rootContext.isTimeSelected(option.value) ? true : undefined"
        :class="cellTriggerCls"
        :data-disabled="rootContext.isTimeDisabled(option.value) ? '' : undefined"
        :data-focused="option.value.toString() === rootContext.focusedTime.value.toString() ? '' : undefined"
        :data-highlighted="rootContext.isTimeHighlighted(option.value) ? '' : undefined"
        :data-range-end="rootContext.isRangeEnd(option.value) ? '' : undefined"
        :data-range-start="rootContext.isRangeStart(option.value) ? '' : undefined"
        :data-selected="rootContext.isTimeSelected(option.value) ? '' : undefined"
        data-slot="cell-trigger"
        :data-time-key="option.key"
        :disabled="rootContext.isTimeDisabled(option.value)"
        :tabindex="option.value.toString() === rootContext.focusedTime.value.toString() && !rootContext.isTimeDisabled(option.value) ? 0 : -1"
        type="button"
        @click="handleTimeClick(option.value)"
        @focus="handleTimeFocus(option.value)"
        @keydown="handleTimeKeydown(option.value, index, $event)"
        @mouseenter="handleTimeHover(option.value)"
      >
        <slot
          name="time"
          :disabled="rootContext.isTimeDisabled(option.value)"
          :focused="option.value.toString() === rootContext.focusedTime.value.toString()"
          :highlighted="rootContext.isTimeHighlighted(option.value)"
          :label="option.label"
          :range-end="rootContext.isRangeEnd(option.value)"
          :range-start="rootContext.isRangeStart(option.value)"
          :selected="rootContext.isTimeSelected(option.value)"
          :time="option.value"
        >
          {{ option.label }}
        </slot>
      </button>
    </div>
  </Primitive>
</template>
