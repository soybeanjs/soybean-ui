<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useForwardExpose } from '../../composables';
import { Presence } from '../presence';
import { injectScrollAreaRootContext } from './context';
import ScrollAreaScrollbarAuto from './scroll-area-scrollbar-auto.vue';
import type { ScrollAreaScrollbarHoverProps } from './types';

defineOptions({
  name: 'ScrollAreaScrollbarHover',
  inheritAttrs: false
});

defineProps<ScrollAreaScrollbarHoverProps>();

const rootContext = injectScrollAreaRootContext();

const { forwardRef } = useForwardExpose();

let timeout: ReturnType<typeof setTimeout> | undefined | number;
const visible = ref(false);

function handlePointerEnter() {
  window.clearTimeout(timeout);
  visible.value = true;
}
function handlePointerLeave() {
  timeout = window.setTimeout(() => {
    visible.value = false;
  }, rootContext.scrollHideDelay.value);
}

onMounted(() => {
  const scrollArea = rootContext.scrollArea.value;

  if (scrollArea) {
    scrollArea.addEventListener('pointerenter', handlePointerEnter);
    scrollArea.addEventListener('pointerleave', handlePointerLeave);
  }
});

onUnmounted(() => {
  const scrollArea = rootContext.scrollArea.value;
  if (scrollArea) {
    window.clearTimeout(timeout);
    scrollArea.removeEventListener('pointerenter', handlePointerEnter);
    scrollArea.removeEventListener('pointerleave', handlePointerLeave);
  }
});
</script>

<template>
  <Presence :present="forceMount || visible">
    <ScrollAreaScrollbarAuto v-bind="$attrs" :ref="forwardRef" :data-state="visible ? 'visible' : 'hidden'">
      <slot />
    </ScrollAreaScrollbarAuto>
  </Presence>
</template>
