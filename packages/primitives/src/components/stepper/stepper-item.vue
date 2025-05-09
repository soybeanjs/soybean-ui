<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useForwardExpose, useId } from '../../composables';
import { Primitive } from '../primitive';
import { injectStepperRootContext, provideStepperItemContext } from './context';
import type { StepperItemPropsWithPrimitive, StepperState } from './types';

defineOptions({
  name: 'StepperItem'
});

const props = withDefaults(defineProps<StepperItemPropsWithPrimitive>(), {
  completed: false,
  disabled: false
});

const { disabled, step, completed } = toRefs(props);

const { forwardRef } = useForwardExpose();

const rootContext = injectStepperRootContext();

const titleId = useId(undefined, 'soybean-stepper-item-title');
const descriptionId = useId(undefined, 'soybean-stepper-item-description');

const itemState = computed<StepperState>(() => {
  if (completed.value) return 'completed';
  if (rootContext.modelValue.value === step.value) return 'active';
  if (rootContext.modelValue.value! > step.value) return 'completed';
  return 'inactive';
});

const isFocusable = computed(() => {
  if (disabled.value) return false;
  if (rootContext.linear.value)
    return step.value <= rootContext.modelValue.value! || step.value === rootContext.modelValue.value! + 1;

  return true;
});

provideStepperItemContext({
  titleId,
  descriptionId,
  state: itemState,
  disabled,
  step,
  isFocusable
});
</script>

<template>
  <Primitive
    :ref="forwardRef"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :aria-current="itemState === 'active' ? 'true' : undefined"
    :data-disabled="disabled || !isFocusable ? '' : undefined"
    :data-orientation="rootContext.orientation.value"
    :data-state="itemState"
    :disabled="disabled || !isFocusable ? '' : undefined"
  >
    <slot :state="itemState" />
  </Primitive>
</template>
