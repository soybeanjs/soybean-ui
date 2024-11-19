<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
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
