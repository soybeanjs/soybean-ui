<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';

import { injectStepperItemContext } from './stepper-item.vue';

export interface StepperIndicatorProps extends PrimitiveProps {}

const props = defineProps<StepperIndicatorProps>();
const itemContext = injectStepperItemContext();
useForwardExpose();
</script>

<template>
  <Primitive v-bind="props">
    <slot>Step {{ itemContext.step.value }}</slot>
  </Primitive>
</template>
