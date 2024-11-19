<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import type { StepperTitlePropsWithPrimitive } from './types';
import { injectStepperItemContext } from './context';

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
