<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectProgressRootContext } from './context';
import type { ProgressIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'ProgressIndicator'
});

const props = defineProps<ProgressIndicatorPropsWithPrimitive>();

const rootContext = injectProgressRootContext();
useForwardExpose();
</script>

<template>
  <Primitive
    v-bind="props"
    :data-state="rootContext.progressState.value"
    :data-value="rootContext.modelValue?.value ?? undefined"
    :data-max="rootContext.max.value"
  >
    <slot />
  </Primitive>
</template>
