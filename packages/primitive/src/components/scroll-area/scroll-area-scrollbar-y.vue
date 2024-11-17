<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useForwardExpose } from '../../composables';
import { injectScrollAreaScrollbarVisibleContext } from './scroll-area-scrollbar-visible.vue';
import { injectScrollAreaRootContext } from './scroll-area-root.vue';
import ScrollAreaScrollbarImpl from './scroll-area-scrollbar-impl.vue';
import { getThumbSize } from './utils';

const rootContext = injectScrollAreaRootContext();
const scrollbarVisibleContext = injectScrollAreaScrollbarVisibleContext();

const { forwardRef, currentElement: scrollbarElement } = useForwardExpose();

onMounted(() => {
  if (scrollbarElement.value) rootContext.onScrollbarYChange(scrollbarElement.value);
});

const sizes = computed(() => scrollbarVisibleContext.sizes.value);
</script>

<template>
  <ScrollAreaScrollbarImpl
    :ref="forwardRef"
    :is-horizontal="false"
    data-orientation="vertical"
    :style="{
      top: 0,
      right: rootContext.dir.value === 'ltr' ? 0 : undefined,
      left: rootContext.dir.value === 'rtl' ? 0 : undefined,
      bottom: 'var(--soybean-scroll-area-corner-height)',
      ['--soybean-scroll-area-thumb-height' as any]: sizes ? `${getThumbSize(sizes)}px` : undefined
    }"
    @on-drag-scroll="scrollbarVisibleContext.onDragScroll($event.y)"
  >
    <slot />
  </ScrollAreaScrollbarImpl>
</template>
