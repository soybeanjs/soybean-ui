<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import type { StepperDescriptionPropsWithPrimitive } from './types';
import { injectStepperItemContext } from './context';

defineOptions({
  name: 'StepperDescription'
});

const props = withDefaults(defineProps<StepperDescriptionPropsWithPrimitive>(), {
  as: 'p'
});

useForwardExpose();
const itemContext = injectStepperItemContext();
</script>

<template>
  <Primitive v-bind="props" :id="itemContext.descriptionId">
    <slot />
  </Primitive>
</template>
