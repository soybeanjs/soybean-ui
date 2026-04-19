<script setup lang="ts">
import type { TimeValue } from '../../date';

import { nextTick, watch } from 'vue';

import { useForwardElement } from '../../composables';
import { findClosestTimeOption } from '../../shared/time-picker';
import { Primitive } from '../primitive';

import { useTimePickerRootContext, useTimePickerUi } from './context';
import type { TimePickerPopupProps } from './types';

defineOptions({
  name: 'TimePickerPopup'
});

withDefaults(defineProps<TimePickerPopupProps>(), {
  as: 'div'
});

defineSlots<{
  time?: (props: {
    disabled: boolean;
    focused: boolean;
    label: string;
    selected: boolean;
    time: TimeValue;
  }) => any;
}>();

const cls = useTimePickerUi('popup');
const listCls = useTimePickerUi('list');
const cellTriggerCls = useTimePickerUi('cellTrigger');
const rootContext = useTimePickerRootContext('TimePickerPopup');
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
  const matchedOption = findClosestTimeOption(rootContext.options.value, rootContext.modelValue.value ?? rootContext.focusedTime.value);

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

  rootContext.onTimeChange(time);
};

const handleTimeFocus = (time: TimeValue) => {
  rootContext.setFocusedTime(time);
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
      rootContext.onTimeChange(time);
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
    aria-label="Time picker"
    :class="cls"
    data-slot="popup"
    role="dialog"
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
        :data-selected="rootContext.isTimeSelected(option.value) ? '' : undefined"
        data-slot="cell-trigger"
        :data-time-key="option.key"
        :disabled="rootContext.isTimeDisabled(option.value)"
        :tabindex="option.value.toString() === rootContext.focusedTime.value.toString() && !rootContext.isTimeDisabled(option.value) ? 0 : -1"
        type="button"
        @click="handleTimeClick(option.value)"
        @focus="handleTimeFocus(option.value)"
        @keydown="handleTimeKeydown(option.value, index, $event)"
      >
        <slot
          name="time"
          :disabled="rootContext.isTimeDisabled(option.value)"
          :focused="option.value.toString() === rootContext.focusedTime.value.toString()"
          :label="option.label"
          :selected="rootContext.isTimeSelected(option.value)"
          :time="option.value"
        >
          {{ option.label }}
        </slot>
      </button>
    </div>
  </Primitive>
</template>
