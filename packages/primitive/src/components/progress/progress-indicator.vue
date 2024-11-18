<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';

import { injectProgressRootContext } from './progress-root.vue';

export interface ProgressIndicatorProps extends PrimitiveProps {}

const props = defineProps<ProgressIndicatorProps>();

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
