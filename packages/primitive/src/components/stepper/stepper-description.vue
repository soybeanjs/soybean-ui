<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';

import { injectStepperItemContext } from './stepper-item.vue';

export interface StepperDescriptionProps extends PrimitiveProps {}

const props = withDefaults(defineProps<StepperDescriptionProps>(), { as: 'p' });

useForwardExpose();
const itemContext = injectStepperItemContext();
</script>

<template>
  <Primitive v-bind="props" :id="itemContext.descriptionId">
    <slot />
  </Primitive>
</template>
