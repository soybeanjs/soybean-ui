<script setup lang="ts">
import { computed, onUnmounted, toRefs, watch } from 'vue';
import { useForwardExpose } from '../../composables';
import { injectScrollAreaRootContext, provideScrollAreaScrollbarContext } from './context';
import ScrollAreaScrollbarHover from './scroll-area-scrollbar-hover.vue';
import ScrollAreaScrollbarScroll from './scroll-area-scrollbar-scroll.vue';
import ScrollAreaScrollbarAuto from './scroll-area-scrollbar-auto.vue';
import ScrollAreaScrollbarVisible from './scroll-area-scrollbar-visible.vue';
import type { ScrollAreaScrollbarPropsWithPrimitive } from './types';

defineOptions({
  name: 'ScrollAreaScrollbar',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ScrollAreaScrollbarPropsWithPrimitive>(), {
  orientation: 'vertical',
  as: 'div'
});

const { forwardRef } = useForwardExpose();
const rootContext = injectScrollAreaRootContext();

const isHorizontal = computed(() => props.orientation === 'horizontal');

watch(
  isHorizontal,
  () => {
    if (isHorizontal.value) rootContext.onScrollbarXEnabledChange(true);
    else rootContext.onScrollbarYEnabledChange(true);
  },
  { immediate: true }
);

onUnmounted(() => {
  rootContext.onScrollbarXEnabledChange(false);
  rootContext.onScrollbarYEnabledChange(false);
});

const { orientation, forceMount, asChild, as } = toRefs(props);
provideScrollAreaScrollbarContext({
  orientation,
  forceMount,
  isHorizontal,
  as,
  asChild
});
</script>

<template>
  <ScrollAreaScrollbarHover
    v-if="rootContext.type.value === 'hover'"
    v-bind="$attrs"
    :ref="forwardRef"
    :force-mount="forceMount"
  >
    <slot />
  </ScrollAreaScrollbarHover>
  <ScrollAreaScrollbarScroll
    v-else-if="rootContext.type.value === 'scroll'"
    v-bind="$attrs"
    :ref="forwardRef"
    :force-mount="forceMount"
  >
    <slot />
  </ScrollAreaScrollbarScroll>
  <ScrollAreaScrollbarAuto
    v-else-if="rootContext.type.value === 'auto'"
    v-bind="$attrs"
    :ref="forwardRef"
    :force-mount="forceMount"
  >
    <slot />
  </ScrollAreaScrollbarAuto>
  <ScrollAreaScrollbarVisible
    v-else-if="rootContext.type.value === 'always'"
    v-bind="$attrs"
    :ref="forwardRef"
    data-state="visible"
  >
    <slot />
  </ScrollAreaScrollbarVisible>
</template>
