<script setup lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { useForwardExpose } from '../../composables';

import { injectScrollAreaRootContext } from './scroll-area-root.vue';
import ScrollAreaCornerImpl from './scroll-area-corner-impl.vue';

export interface ScrollAreaCornerProps extends PrimitiveProps {}

const props = defineProps<ScrollAreaCornerProps>();

const { forwardRef } = useForwardExpose();
const rootContext = injectScrollAreaRootContext();

const hasBothScrollbarsVisible = computed(
  () => Boolean(rootContext.scrollbarX.value) && Boolean(rootContext.scrollbarY.value)
);
const hasCorner = computed(() => rootContext.type.value !== 'scroll' && hasBothScrollbarsVisible.value);
</script>

<template>
  <ScrollAreaCornerImpl v-if="hasCorner" v-bind="props" :ref="forwardRef">
    <slot />
  </ScrollAreaCornerImpl>
</template>
