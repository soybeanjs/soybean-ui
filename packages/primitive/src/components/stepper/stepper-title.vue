<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectStepperItemContext } from './context';
import type { StepperTitlePropsWithPrimitive } from './types';

defineOptions({
  name: 'StepperTitle'
});

const props = withDefaults(defineProps<StepperTitlePropsWithPrimitive>(), {
  as: 'h4'
});

useForwardExpose();
const itemContext = injectStepperItemContext();
</script>

<template>
  <Primitive v-bind="props" :id="itemContext.titleId">
    <slot />
  </Primitive>
</template>
