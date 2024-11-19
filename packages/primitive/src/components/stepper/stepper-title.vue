<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';

import { injectStepperItemContext } from './stepper-item.vue';

export interface StepperTitleProps extends PrimitiveProps {}

const props = withDefaults(defineProps<StepperTitleProps>(), { as: 'h4' });
const itemContext = injectStepperItemContext();
useForwardExpose();
</script>

<template>
  <Primitive v-bind="props" :id="itemContext.titleId">
    <slot />
  </Primitive>
</template>
