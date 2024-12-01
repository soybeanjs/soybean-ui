<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectStepperItemContext } from './context';
import type { StepperDescriptionPropsWithPrimitive } from './types';

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
