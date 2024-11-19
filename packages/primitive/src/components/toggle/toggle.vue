<script setup lang="ts">
import { computed } from 'vue';
import VisuallyHiddenInput from '../visually-hidden/visually-hidden-input.vue';
import { injectToggleGroupRootContext } from '../toggle-group/context';
import { Primitive } from '../primitive';
import { useFormControl, useForwardExpose } from '../../composables';
import type { DataState } from '../../types';
import type { TogglePropsWithPrimitive } from './types';

const props = withDefaults(defineProps<TogglePropsWithPrimitive>(), {
  modelValue: undefined,
  disabled: false,
  as: 'button'
});

const { forwardRef, currentElement } = useForwardExpose();
const toggleGroupContext = injectToggleGroupRootContext(null);

const modelValue = defineModel<boolean>({
  default: props.defaultValue
});

function togglePressed() {
  modelValue.value = !modelValue.value;
}

const dataState = computed<DataState>(() => {
  return modelValue.value ? 'on' : 'off';
});

const isFormControl = useFormControl(currentElement);
</script>

<template>
  <Primitive
    :ref="forwardRef"
    :type="as === 'button' ? 'button' : undefined"
    :as-child="props.asChild"
    :as
    :aria-pressed="modelValue"
    :data-state="dataState"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    @click="togglePressed"
  >
    <slot :model-value="modelValue" />

    <VisuallyHiddenInput
      v-if="isFormControl && name && !toggleGroupContext"
      type="checkbox"
      :name="name"
      :value="modelValue"
      :required="required"
    />
  </Primitive>
</template>
