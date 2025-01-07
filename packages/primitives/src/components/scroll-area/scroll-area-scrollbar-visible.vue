<script setup lang="ts">
import { computed, ref } from 'vue';
import { useForwardExpose } from '../../composables';
import type { Direction } from '../../types';
import {
  injectScrollAreaRootContext,
  injectScrollAreaScrollbarContext,
  provideScrollAreaScrollbarVisibleContext
} from './context';
import {
  getScrollPositionFromPointer,
  getThumbOffsetFromScroll,
  getThumbRatio,
  isScrollingWithinScrollbarBounds
} from './shared';
import ScrollAreaScrollbarX from './scroll-area-scrollbar-x.vue';
import ScrollAreaScrollbarY from './scroll-area-scrollbar-y.vue';
import type { ScrollAreaSizes } from './types';

defineOptions({
  name: 'ScrollAreaScrollbarVisible',
  inheritAttrs: false
});

const rootContext = injectScrollAreaRootContext();
const scrollbarContext = injectScrollAreaScrollbarContext();
const { forwardRef } = useForwardExpose();

const sizes = ref<ScrollAreaSizes>({
  content: 0,
  viewport: 0,
  scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
});

const hasThumb = computed(() => {
  const thumbRatio = getThumbRatio(sizes.value.viewport, sizes.value.content);
  return Boolean(thumbRatio > 0 && thumbRatio < 1);
});

const thumbRef = ref<HTMLElement>();
const pointerOffset = ref(0);

const isShowingScrollbarX = computed(() => scrollbarContext.isHorizontal.value);

function handleWheelScroll(event: WheelEvent, payload: number) {
  if (isShowingScrollbarX.value) {
    const scrollPos = rootContext.viewport.value!.scrollLeft + event.deltaY;

    rootContext.viewport.value!.scrollLeft = scrollPos;
    // prevent window scroll when wheeling on scrollbar
    if (isScrollingWithinScrollbarBounds(scrollPos, payload)) event.preventDefault();
  } else {
    const scrollPos = rootContext.viewport.value!.scrollTop + event.deltaY;

    rootContext.viewport.value!.scrollTop = scrollPos;
    // prevent window scroll when wheeling on scrollbar
    if (isScrollingWithinScrollbarBounds(scrollPos, payload)) event.preventDefault();
  }
}

function handleThumbDown(_event: MouseEvent, payload: { x: number; y: number }) {
  if (isShowingScrollbarX.value) pointerOffset.value = payload.x;
  else pointerOffset.value = payload.y;
}

function handleThumbUp(_event: MouseEvent) {
  pointerOffset.value = 0;
}

function handleSizeChange(payload: ScrollAreaSizes) {
  sizes.value = payload;
}

function getScrollPosition(pointerPos: number, dir?: Direction) {
  return getScrollPositionFromPointer(pointerPos, pointerOffset.value, sizes.value, dir);
}

function onDragScroll(payload: number) {
  if (isShowingScrollbarX.value) {
    rootContext.viewport.value!.scrollLeft = getScrollPosition(payload, rootContext.dir.value);
  } else {
    rootContext.viewport.value!.scrollTop = getScrollPosition(payload);
  }
}

function onThumbPositionChange() {
  if (isShowingScrollbarX.value) {
    if (rootContext.viewport.value && thumbRef.value) {
      const scrollPos = rootContext.viewport.value.scrollLeft;
      const offset = getThumbOffsetFromScroll(scrollPos, sizes.value, rootContext.dir.value);
      thumbRef.value.style.transform = `translate3d(${offset}px, 0, 0)`;
    }
  } else if (rootContext.viewport.value && thumbRef.value) {
    const scrollPos = rootContext.viewport.value.scrollTop;
    const offset = getThumbOffsetFromScroll(scrollPos, sizes.value);
    thumbRef.value.style.transform = `translate3d(0, ${offset}px, 0)`;
  }
}

function onThumbChange(element: HTMLElement) {
  thumbRef.value = element;
}

provideScrollAreaScrollbarVisibleContext({
  sizes,
  hasThumb,
  handleWheelScroll,
  handleThumbDown,
  handleThumbUp,
  handleSizeChange,
  onThumbPositionChange,
  onThumbChange,
  onDragScroll
});
</script>

<template>
  <ScrollAreaScrollbarX v-if="isShowingScrollbarX" v-bind="$attrs" :ref="forwardRef">
    <slot />
  </ScrollAreaScrollbarX>
  <ScrollAreaScrollbarY v-else v-bind="$attrs" :ref="forwardRef">
    <slot />
  </ScrollAreaScrollbarY>
</template>
