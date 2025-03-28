<script setup lang="ts">
import { toRefs } from 'vue';
import { useVModel } from '@vueuse/core';
import { useDirection, useFormControl, useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideRadioGroupRootContext } from './context';
import type { RadioGroupRootEmits, RadioGroupRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'RadioGroupRoot'
});

const props = withDefaults(defineProps<RadioGroupRootPropsWithPrimitive>(), {
  disabled: false,
  required: false,
  orientation: undefined,
  loop: true
});

const emit = defineEmits<RadioGroupRootEmits>();

const { forwardRef, currentElement } = useForwardExpose();

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false
});

const { disabled, loop, orientation, name, required, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
const isFormControl = useFormControl(currentElement);

provideRadioGroupRootContext({
  modelValue,
  changeModelValue: value => {
    modelValue.value = value;
  },
  disabled,
  loop,
  orientation,
  name: name?.value,
  required
});
</script>

<template>
  <RovingFocusGroup as-child :orientation="orientation" :dir="dir" :loop="loop">
    <Primitive
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      role="radiogroup"
      :data-disabled="disabled ? '' : undefined"
      :aria-orientation="orientation"
      :aria-required="required"
      :dir="dir"
    >
      <slot :model-value="modelValue" />

      <VisuallyHiddenInput
        v-if="isFormControl && name"
        :required="required"
        :disabled="disabled"
        :value="modelValue"
        :name="name"
      />
    </Primitive>
  </RovingFocusGroup>
</template>
