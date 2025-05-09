<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { Primitive } from '../primitive';
import { injectScrollAreaRootContext } from './context';
import type { ScrollAreaCornerPropsWithPrimitive } from './types';

defineOptions({
  name: 'ScrollAreaCornerImpl'
});

defineProps<ScrollAreaCornerPropsWithPrimitive>();

const rootContext = injectScrollAreaRootContext();

const width = ref(0);
const height = ref(0);

const hasSize = computed(() => Boolean(width.value) && Boolean(height.value));

function setCornerHeight() {
  const offsetHeight = rootContext.scrollbarX.value?.offsetHeight || 0;
  rootContext.onCornerHeightChange(offsetHeight);
  height.value = offsetHeight;
}

function setCornerWidth() {
  const offsetWidth = rootContext.scrollbarY.value?.offsetWidth || 0;
  rootContext.onCornerWidthChange(offsetWidth);
  width.value = offsetWidth;
}

useResizeObserver(rootContext.scrollbarX.value, setCornerHeight);
useResizeObserver(rootContext.scrollbarY.value, setCornerWidth);

// because we are not remounting the component, useResizeObserver doesn't trigger, thus using watcher here
watch(() => rootContext.scrollbarX.value, setCornerHeight);
watch(() => rootContext.scrollbarY.value, setCornerWidth);
</script>

<template>
  <Primitive
    v-if="hasSize"
    v-bind="$parent?.$props"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      position: 'absolute',
      right: rootContext.dir.value === 'ltr' ? 0 : undefined,
      left: rootContext.dir.value === 'rtl' ? 0 : undefined,
      bottom: 0
    }"
  >
    <slot />
  </Primitive>
</template>
