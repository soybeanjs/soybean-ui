<script setup lang="ts">
import { nextTick, watch } from 'vue';
import type { TimeValue } from '../../date';
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
const {
  focusedTime,
  isRangeEnd,
  isRangeStart,
  isTimeDisabled,
  isTimeHighlighted,
  isTimeSelected,
  modelValue,
  onRangeChange,
  open,
  options,
  popupId,
  setFocusedTime,
  setHoveredTime
} = useTimeRangePickerRootContext('TimeRangePickerPopup');
const [popupElement, setPopupElement] = useForwardElement();

const focusTime = (key: string) => {
  const timeElement = popupElement.value?.querySelector<HTMLElement>(`[data-time-key='${key}']`);
  timeElement?.focus();
  timeElement?.scrollIntoView({ block: 'nearest' });
};

const focusIndex = (index: number, direction: 1 | -1) => {
  const opts = options.value;
  let nextIndex = index;

  while (nextIndex >= 0 && nextIndex < opts.length) {
    const nextOption = opts[nextIndex];

    if (!isTimeDisabled(nextOption.value)) {
      setFocusedTime(nextOption.value);
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
    options.value,
    modelValue.value.end ?? modelValue.value.start ?? focusedTime.value
  );

  if (!matchedOption) {
    return;
  }

  const matchedIndex = options.value.findIndex(option => option.key === matchedOption.key);
  focusIndex(matchedIndex === -1 ? 0 : matchedIndex, 1);
};

const moveFocus = (currentIndex: number, delta: number) => {
  const targetIndex = currentIndex + delta;
  const direction = delta >= 0 ? 1 : -1;

  if (targetIndex < 0 || targetIndex >= options.value.length) {
    return;
  }

  focusIndex(targetIndex, direction);
};

const handleTimeClick = (time: TimeValue) => {
  if (isTimeDisabled(time)) {
    return;
  }

  onRangeChange(time);
};

const handleTimeFocus = (time: TimeValue) => {
  setFocusedTime(time);
};

const handleTimeHover = (time: TimeValue) => {
  if (modelValue.value.start && !modelValue.value.end && !isTimeDisabled(time)) {
    setHoveredTime(time);
  }
};

const handleTimeKeydown = (time: TimeValue, index: number, event: KeyboardEvent) => {
  if (isTimeDisabled(time)) {
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
      focusIndex(options.value.length - 1, -1);
      break;
    case 'Enter':
    case ' ': {
      event.preventDefault();
      onRangeChange(time);
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
      focusCurrentTime();
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
    aria-label="Time range picker"
    :class="cls"
    data-slot="popup"
    role="dialog"
    @mouseleave="setHoveredTime(undefined)"
  >
    <div :class="listCls" data-slot="list">
      <button
        v-for="(option, index) in options"
        :key="option.key"
        :aria-label="option.label"
        :aria-pressed="isTimeSelected(option.value) ? true : undefined"
        :class="cellTriggerCls"
        :data-disabled="isTimeDisabled(option.value) ? '' : undefined"
        :data-focused="option.value.toString() === focusedTime.toString() ? '' : undefined"
        :data-highlighted="isTimeHighlighted(option.value) ? '' : undefined"
        :data-range-end="isRangeEnd(option.value) ? '' : undefined"
        :data-range-start="isRangeStart(option.value) ? '' : undefined"
        :data-selected="isTimeSelected(option.value) ? '' : undefined"
        data-slot="cell-trigger"
        :data-time-key="option.key"
        :disabled="isTimeDisabled(option.value)"
        :tabindex="option.value.toString() === focusedTime.toString() && !isTimeDisabled(option.value) ? 0 : -1"
        type="button"
        @click="handleTimeClick(option.value)"
        @focus="handleTimeFocus(option.value)"
        @keydown="handleTimeKeydown(option.value, index, $event)"
        @mouseenter="handleTimeHover(option.value)"
      >
        <slot
          name="time"
          :disabled="isTimeDisabled(option.value)"
          :focused="option.value.toString() === focusedTime.toString()"
          :highlighted="isTimeHighlighted(option.value)"
          :label="option.label"
          :range-end="isRangeEnd(option.value)"
          :range-start="isRangeStart(option.value)"
          :selected="isTimeSelected(option.value)"
          :time="option.value"
        >
          {{ option.label }}
        </slot>
      </button>
    </div>
  </Primitive>
</template>
