<script lang="ts"></script>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { Presence } from '../presence';
import { useStateMachine } from '../../_shared/use-state-machine';
import { useForwardExpose } from '../../composables';
import { injectScrollAreaRootContext } from './scroll-area-root.vue';
import { injectScrollAreaScrollbarContext } from './scroll-area-scrollbar.vue';
import ScrollAreaScrollbarVisible from './scroll-area-scrollbar-visible.vue';
export interface ScrollAreaScrollbarScrollProps {
  forceMount?: boolean;
}

defineProps<ScrollAreaScrollbarScrollProps>();

const rootContext = injectScrollAreaRootContext();
const scrollbarContext = injectScrollAreaScrollbarContext();

const { forwardRef } = useForwardExpose();

const { state, dispatch } = useStateMachine('hidden', {
  hidden: {
    SCROLL: 'scrolling'
  },
  scrolling: {
    SCROLL_END: 'idle',
    POINTER_ENTER: 'interacting'
  },
  interacting: {
    SCROLL: 'interacting',
    POINTER_LEAVE: 'idle'
  },
  idle: {
    HIDE: 'hidden',
    SCROLL: 'scrolling',
    POINTER_ENTER: 'interacting'
  }
});

watchEffect(onCleanup => {
  if (state.value === 'idle') {
    const timeId = window.setTimeout(() => dispatch('HIDE'), rootContext.scrollHideDelay.value);

    onCleanup(() => {
      window.clearTimeout(timeId);
    });
  }
});

const debounceScrollEnd = useDebounceFn(() => dispatch('SCROLL_END'), 100);

watchEffect(onCleanup => {
  const viewport = rootContext.viewport.value;
  const scrollDirection = scrollbarContext.isHorizontal.value ? 'scrollLeft' : 'scrollTop';

  if (viewport) {
    let prevScrollPos = viewport[scrollDirection];
    const handleScroll = () => {
      const scrollPos = viewport[scrollDirection];
      const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
      if (hasScrollInDirectionChanged) {
        dispatch('SCROLL');
        debounceScrollEnd();
      }
      prevScrollPos = scrollPos;
    };
    viewport.addEventListener('scroll', handleScroll);

    onCleanup(() => {
      viewport.removeEventListener('scroll', handleScroll);
    });
  }
});
</script>

<template>
  <Presence :present="forceMount || state !== 'hidden'">
    <ScrollAreaScrollbarVisible v-bind="$attrs" :ref="forwardRef">
      <slot />
    </ScrollAreaScrollbarVisible>
  </Presence>
</template>
