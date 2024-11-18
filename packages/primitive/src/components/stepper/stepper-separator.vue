<script setup lang="ts">
import { Separator, type SeparatorProps } from '../separator';
import { useForwardExpose } from '../../composables';
import { injectStepperRootContext } from './stepper-root.vue';
import { injectStepperItemContext } from './stepper-item.vue';

export interface StepperSeparatorProps extends SeparatorProps {}

const props = withDefaults(defineProps<StepperSeparatorProps>(), {});

const rootContext = injectStepperRootContext();
const itemContext = injectStepperItemContext();

useForwardExpose();
</script>

<template>
  <Separator
    v-bind="props"
    decorative
    :orientation="rootContext.orientation.value"
    :data-state="itemContext.state.value"
  >
    <slot />
  </Separator>
</template>
