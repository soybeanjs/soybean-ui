<script setup lang="ts">
import { ScrollAreaCorner, useForwardProps } from 'radix-vue';
import SScrollAreaRoot from './scroll-area-root.vue';
import SScrollAreaViewport from './scroll-area-viewport.vue';
import SScrollAreaScrollbar from './scroll-area-scrollbar.vue';
import SScrollAreaThumb from './scroll-area-thumb.vue';
import type { ScrollAreaProps } from './types';

defineOptions({
  name: 'SScrollArea'
});

const { viewportClass, nonce, scrollbarClass, orientation, forceMount, thumbClass, ...delegatedProps } =
  defineProps<ScrollAreaProps>();

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SScrollAreaRoot v-bind="forwardedProps">
    <SScrollAreaViewport :class="viewportClass" :nonce>
      <slot />
    </SScrollAreaViewport>
    <SScrollAreaScrollbar :class="scrollbarClass" :orientation :force-mount>
      <SScrollAreaThumb :class="thumbClass" />
    </SScrollAreaScrollbar>
    <ScrollAreaCorner />
  </SScrollAreaRoot>
</template>

<style scoped></style>
