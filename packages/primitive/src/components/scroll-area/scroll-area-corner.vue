<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import type { ScrollAreaCornerPropsWithPrimitive } from './types';
import { injectScrollAreaRootContext } from './context';
import ScrollAreaCornerImpl from './scroll-area-corner-impl.vue';

defineOptions({
  name: 'ScrollAreaCorner'
});

const props = defineProps<ScrollAreaCornerPropsWithPrimitive>();

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
