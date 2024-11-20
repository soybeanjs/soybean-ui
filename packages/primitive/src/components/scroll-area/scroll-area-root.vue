<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { Primitive } from '../primitive';
import { useDirection, useForwardExpose } from '../../composables';
import type { ScrollAreaRootPropsWithPrimitive } from './types';
import { provideScrollAreaRootContext } from './context';

defineOptions({
  name: 'ScrollAreaRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ScrollAreaRootPropsWithPrimitive>(), {
  type: 'hover',
  scrollHideDelay: 600
});

const cornerWidth = ref(0);
const cornerHeight = ref(0);
const viewport = ref<HTMLElement>();
const content = ref<HTMLElement>();
const scrollbarX = ref<HTMLElement>();
const scrollbarY = ref<HTMLElement>();
const scrollbarXEnabled = ref(false);
const scrollbarYEnabled = ref(false);

const { type, dir: propDir, scrollHideDelay } = toRefs(props);
const dir = useDirection(propDir);

function scrollTop() {
  viewport.value?.scrollTo({
    top: 0
  });
}

function scrollTopLeft() {
  viewport.value?.scrollTo({
    top: 0,
    left: 0
  });
}

defineExpose({
  /** Viewport element within ScrollArea */
  viewport,
  /** Scroll viewport to top */
  scrollTop,
  /** Scroll viewport to top-left */
  scrollTopLeft
});

const { forwardRef, currentElement: scrollArea } = useForwardExpose();

provideScrollAreaRootContext({
  type,
  dir,
  scrollHideDelay,
  scrollArea,
  viewport,
  onViewportChange: el => {
    viewport.value = el || undefined;
  },
  content,
  onContentChange: el => {
    content.value = el;
  },
  scrollbarX,
  scrollbarXEnabled,
  scrollbarY,
  scrollbarYEnabled,
  onScrollbarXChange: scrollbar => {
    scrollbarX.value = scrollbar || undefined;
  },
  onScrollbarYChange: scrollbar => {
    scrollbarY.value = scrollbar || undefined;
  },
  onScrollbarXEnabledChange: rendered => {
    scrollbarXEnabled.value = rendered;
  },
  onScrollbarYEnabledChange: rendered => {
    scrollbarYEnabled.value = rendered;
  },
  onCornerWidthChange: width => {
    cornerWidth.value = width;
  },
  onCornerHeightChange: height => {
    cornerHeight.value = height;
  }
});
</script>

<template>
  <Primitive
    :ref="forwardRef"
    :as-child="props.asChild"
    :as
    :dir="dir"
    :style="{
      position: 'relative',
      // Pass corner sizes as CSS vars to reduce re-renders of context consumers
      ['--soybean-scroll-area-corner-width' as any]: `${cornerWidth}px`,
      ['--soybean-scroll-area-corner-height' as any]: `${cornerHeight}px`
    }"
  >
    <slot />
  </Primitive>
</template>
