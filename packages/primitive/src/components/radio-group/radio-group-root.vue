<script setup lang="ts">
import { toRefs } from 'vue';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { useDirection, useFormControl, useForwardExpose } from '../../composables';
import type { AcceptableValue } from '../../types';
import type { RadioGroupRootPropsWithPrimitive } from './types';
import { provideRadioGroupRootContext } from './context';

defineOptions({
  name: 'RadioGroupRoot'
});

const props = withDefaults(defineProps<RadioGroupRootPropsWithPrimitive>(), {
  disabled: false,
  required: false,
  orientation: undefined,
  loop: true
});

const { forwardRef, currentElement } = useForwardExpose();

const modelValue = defineModel<AcceptableValue | undefined>({ default: props.defaultValue });

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
      role="radiogroup"
      :data-disabled="disabled ? '' : undefined"
      :as-child
      :as
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
