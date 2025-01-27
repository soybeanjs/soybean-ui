<script setup lang="ts">
import { ScrollAreaCorner, useForwardProps } from '@soybean-ui/primitives';
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
    <SScrollAreaViewport :class="viewportClass" :nonce="nonce">
      <slot />
    </SScrollAreaViewport>
    <SScrollAreaScrollbar :class="scrollbarClass" :orientation="orientation" :force-mount="forceMount">
      <SScrollAreaThumb :class="thumbClass" />
    </SScrollAreaScrollbar>
    <ScrollAreaCorner />
  </SScrollAreaRoot>
</template>
