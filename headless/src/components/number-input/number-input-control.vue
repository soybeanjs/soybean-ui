<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import { getActiveElement } from '../../shared';
import type { NumberInputControlProps } from './types';
import { useNumberInputRootContext, useNumberInputUi } from './context';

defineOptions({
  name: 'NumberInputControl'
});

defineProps<NumberInputControlProps>();

const cls = useNumberInputUi('control');

const {
  id,
  autofocus,
  maxlength,
  minlength,
  pattern,
  placeholder,
  setInputElement,
  modelValue,
  disabled,
  readonly,
  textValue,
  inputMode,
  min,
  max,
  disableWheelChange,
  invertWheelChange,
  onDecrease,
  onIncrease,
  validate,
  onMinMaxValue,
  applyInputValue
} = useNumberInputRootContext('NumberInputControl');

const inputValue = shallowRef(textValue.value);

const onWheelEvent = (event: WheelEvent) => {
  if (disableWheelChange.value) return;

  // only handle when in focus
  if (event.target !== getActiveElement()) return;

  // if on a track pad, users can scroll in both X and Y at once, check the magnitude of the change
  // if it's mostly in the X direction, then just return, the user probably doesn't mean to inc/dec
  // this isn't perfect, events come in fast with small deltas and a part of the scroll may give a false indication
  // especially if the user is scrolling near 45deg
  if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

  event.preventDefault();

  if (event.deltaY > 0) {
    if (invertWheelChange.value) {
      onDecrease();
    } else {
      onIncrease();
    }

    return;
  }

  if (event.deltaY < 0) {
    if (invertWheelChange.value) {
      onIncrease();
    } else {
      onDecrease();
    }
  }
};

const onBeforeInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  const nextValue =
    target.value.slice(0, target.selectionStart ?? undefined) +
    (event.data ?? '') +
    target.value.slice(target.selectionEnd ?? undefined);

  // validate
  if (!validate(nextValue)) {
    event.preventDefault();
  }
};

const onInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
};

const onChange = () => {
  requestAnimationFrame(() => {
    inputValue.value = textValue.value;
  });
};

const getInputElementValue = (event: KeyboardEvent | FocusEvent) => {
  const element = event.target as HTMLInputElement;
  applyInputValue(element.value);
};

const onKeydownEnter = (event: KeyboardEvent) => {
  getInputElementValue(event);
};

const onBlur = (event: FocusEvent) => {
  getInputElementValue(event);
};

watch(
  () => textValue.value,
  () => {
    inputValue.value = textValue.value;
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <input
    :id="id"
    :ref="setInputElement"
    :class="cls"
    aria-roledescription="Number Input"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="modelValue ?? undefined"
    autocomplete="off"
    autocorrect="off"
    :autofocus="autofocus"
    :data-disabled="disabled ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
    :disabled="disabled"
    :inputmode="inputMode"
    :maxlength="maxlength"
    :minlength="minlength"
    :pattern="pattern"
    :placeholder="placeholder"
    :value="inputValue"
    :readonly="readonly"
    role="spinbutton"
    spellcheck="false"
    tabindex="0"
    type="text"
    @beforeinput="onBeforeInput"
    @blur="onBlur"
    @change="onChange"
    @input="onInput"
    @keydown.down.prevent="onDecrease"
    @keydown.end.prevent="onMinMaxValue('max')"
    @keydown.home.prevent="onMinMaxValue('min')"
    @keydown.page-up.prevent="onIncrease(10)"
    @keydown.page-down.prevent="onDecrease(10)"
    @keydown.up.prevent="onIncrease"
    @keydown.enter="onKeydownEnter"
    @wheel="onWheelEvent"
  />
</template>
