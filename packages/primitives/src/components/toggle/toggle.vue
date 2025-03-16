<script setup lang="ts">
import { computed } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useFormControl, useForwardExpose } from '../../composables';
import type { DataState } from '../../types';
import { Primitive } from '../primitive';
import { injectToggleGroupRootContext } from '../toggle-group/context';
import { VisuallyHiddenInput } from '../visually-hidden';
import type { ToggleEmits, TogglePropsWithPrimitive } from './types';

const props = withDefaults(defineProps<TogglePropsWithPrimitive>(), {
  modelValue: undefined,
  disabled: false,
  as: 'button'
});

const emit = defineEmits<ToggleEmits>();

const { forwardRef, currentElement } = useForwardExpose();
const toggleGroupContext = injectToggleGroupRootContext(null);

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false
}) as Ref<boolean>;

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

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
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :type="tag"
    :aria-pressed="modelValue"
    :data-state="dataState"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    @click="togglePressed"
  >
    <slot :model-value="modelValue" :disabled="disabled" :pressed="modelValue" :state="dataState" />

    <VisuallyHiddenInput
      v-if="isFormControl && name && !toggleGroupContext"
      type="checkbox"
      :name="name"
      :value="modelValue"
      :required="required"
    />
  </Primitive>
</template>
