<script setup lang="ts">
import { ScrollAreaCorner } from 'radix-vue';
import SScrollAreaRoot from './scroll-area-root.vue';
import SScrollAreaViewport from './scroll-area-viewport.vue';
import SScrollAreaScrollbar from './scroll-area-scrollbar.vue';
import SScrollAreaThumb from './scroll-area-thumb.vue';
import type { ScrollAreaProps } from './types';

defineOptions({
  name: 'SScrollArea'
});

const {
  class: rootClass,
  type,
  dir,
  scrollHideDelay,
  viewportClass,
  nonce,
  scrollbarClass,
  orientation,
  forceMount,
  thumbClass
} = defineProps<ScrollAreaProps>();
</script>

<template>
  <SScrollAreaRoot :class="rootClass" :type="type" :dir="dir" :scroll-hide-delay="scrollHideDelay">
    <SScrollAreaViewport :class="viewportClass" :nonce="nonce">
      <slot />
    </SScrollAreaViewport>
    <SScrollAreaScrollbar :class="scrollbarClass" :orientation="orientation" :force-mount="forceMount">
      <SScrollAreaThumb :class="thumbClass" />
    </SScrollAreaScrollbar>
    <ScrollAreaCorner />
  </SScrollAreaRoot>
</template>

<style scoped></style>
