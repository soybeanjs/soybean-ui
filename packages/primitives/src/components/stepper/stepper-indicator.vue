<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectStepperItemContext } from './context';
import type { StepperIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'StepperIndicator'
});

const props = defineProps<StepperIndicatorPropsWithPrimitive>();

const { step } = injectStepperItemContext();

useForwardExpose();
</script>

<template>
  <Primitive v-bind="props">
    <slot :step="step">Step {{ step }}</slot>
  </Primitive>
</template>
