<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectStepperItemContext } from './context';
import type { StepperIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'StepperIndicator'
});

const props = defineProps<StepperIndicatorPropsWithPrimitive>();

useForwardExpose();
const itemContext = injectStepperItemContext();
</script>

<template>
  <Primitive v-bind="props">
    <slot>Step {{ itemContext.step.value }}</slot>
  </Primitive>
</template>
