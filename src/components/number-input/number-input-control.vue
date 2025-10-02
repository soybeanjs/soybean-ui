<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { getActiveElement } from '../../shared';
import type { NumberInputControlProps } from './types';
import { useNumberInputRootContext, useNumberInputThemeContext } from './context';

defineOptions({
  name: 'NumberInputControl'
});

defineProps<NumberInputControlProps>();

const themeContext = useNumberInputThemeContext();

const cls = computed(() => themeContext?.ui?.value?.control);

const {
  id,
  placeholder,
  autoFocus,
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

  // if on a trackpad, users can scroll in both X and Y at once, check the magnitude of the change
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
    role="spinbutton"
    type="text"
    tabindex="0"
    :value="inputValue"
    :inputmode="inputMode"
    :placeholder="placeholder"
    :autofocus="autoFocus ? true : undefined"
    :disabled="disabled ? true : undefined"
    :data-disabled="disabled ? '' : undefined"
    :readonly="readonly ? true : undefined"
    :data-readonly="readonly ? '' : undefined"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    aria-roledescription="Number Input"
    :aria-valuenow="modelValue ?? undefined"
    :aria-valuemin="min"
    :aria-valuemax="max"
    @keydown.up.prevent="onIncrease"
    @keydown.down.prevent="onDecrease"
    @keydown.page-up.prevent="onIncrease(10)"
    @keydown.page-down.prevent="onDecrease(10)"
    @keydown.home.prevent="onMinMaxValue('min')"
    @keydown.end.prevent="onMinMaxValue('max')"
    @wheel="onWheelEvent"
    @beforeinput="onBeforeInput"
    @input="onInput"
    @change="onChange"
    @keydown.enter="onKeydownEnter"
    @blur="onBlur"
  />
</template>
