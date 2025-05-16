<script setup lang="ts">
import { ScrollAreaCorner, useForwardProps } from '@soybean-ui/primitives';
import type { ScrollAreaProps } from '../types';
import SScrollAreaRoot from './scroll-area-root.vue';
import SScrollAreaViewport from './scroll-area-viewport.vue';
import SScrollAreaScrollbar from './scroll-area-scrollbar.vue';
import SScrollAreaThumb from './scroll-area-thumb.vue';

defineOptions({
  name: 'SScrollArea'
});

const { class: cls, size, ui, nonce, orientation, forceMount, ...delegatedProps } = defineProps<ScrollAreaProps>();

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SScrollAreaRoot v-bind="forwardedProps" :class="cls || ui?.root">
    <SScrollAreaViewport :class="ui?.viewport" :nonce="nonce">
      <slot />
    </SScrollAreaViewport>
    <SScrollAreaScrollbar :class="ui?.scrollbar" :size="size" :orientation="orientation" :force-mount="forceMount">
      <SScrollAreaThumb :class="ui?.thumb" />
    </SScrollAreaScrollbar>
    <ScrollAreaCorner :class="ui?.corner" />
  </SScrollAreaRoot>
</template>
