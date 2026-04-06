<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { type ColorValue, formatColor, toColorObject } from '../../shared';
import { isFormControl } from '../../shared';
import { Primitive } from '../primitive';
import { VisuallyHiddenInput } from '../visually-hidden';
import type { ColorPickerRootEmits, ColorPickerRootProps } from './types';

defineOptions({
  name: 'ColorPickerRoot'
});

const props = withDefaults(defineProps<ColorPickerRootProps>(), {
  as: 'div',
  modelValue: undefined,
  defaultValue: '#000000',
  format: 'hex',
  disabled: false
});

const emit = defineEmits<ColorPickerRootEmits>();

const [rootElement, setRootElement] = useForwardElement();

const modelValue = useControllableState<string | ColorValue | undefined>(
  () => props.modelValue,
  value => {
    emit('update:modelValue', typeof value === 'string' ? value : formatColor(value, props.format));
  },
  props.defaultValue
);

const lastEmittedFormattedValue = shallowRef<string>();
const currentColor = shallowRef<ColorValue>(props.modelValue ?? props.defaultValue);
const color = computed(() => currentColor.value);
const formattedValue = computed(() => formatColor(currentColor.value, props.format));
const formControl = computed(() => isFormControl(rootElement.value));

watch(
  () => props.modelValue,
  value => {
    if (value == null) {
      return;
    }

    if (typeof value === 'string' && value === lastEmittedFormattedValue.value) {
      return;
    }

    currentColor.value = value;
  },
  { immediate: true }
);

function setColor(nextColor: ColorValue) {
  const formatted = formatColor(nextColor, props.format);

  currentColor.value = nextColor;
  lastEmittedFormattedValue.value = formatted;
  modelValue.value = formatted;
  emit('update:color', toColorObject(nextColor, 'rgb'));
  emit('change', formatted);
}
</script>

<template>
  <Primitive :ref="setRootElement" :as="as" :as-child="asChild" role="group" :data-disabled="disabled ? '' : undefined">
    <slot :color="color" :formatted-value="formattedValue" :set-color="setColor" />

    <VisuallyHiddenInput
      v-if="formControl && name"
      type="text"
      :value="formattedValue"
      :name="name"
      :disabled="disabled"
      :required="required"
    />
  </Primitive>
</template>
