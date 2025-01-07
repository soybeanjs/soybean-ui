<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Separator } from '../separator';
import { injectStepperItemContext, injectStepperRootContext } from './context';
import type { StepperSeparatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'StepperSeparator'
});

const props = withDefaults(defineProps<StepperSeparatorPropsWithPrimitive>(), {});

useForwardExpose();
const rootContext = injectStepperRootContext();
const itemContext = injectStepperItemContext();
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
