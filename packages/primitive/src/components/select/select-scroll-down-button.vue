<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { useForwardExpose } from '../../composables';

import { injectSelectContentContext } from './select-content-impl.vue';
import SelectScrollButtonImpl from './select-scroll-button-impl.vue';
import { injectSelectItemAlignedPositionContext } from './select-item-aligned-position.vue';

export interface SelectScrollDownButtonProps extends PrimitiveProps {}

defineProps<SelectScrollDownButtonProps>();

const contentContext = injectSelectContentContext();
const alignedPositionContext =
  contentContext.position === 'item-aligned' ? injectSelectItemAlignedPositionContext() : undefined;

const { forwardRef, currentElement } = useForwardExpose();

const canScrollDown = ref(false);

watchEffect(cleanupFn => {
  if (contentContext.viewport?.value && contentContext.isPositioned?.value) {
    const viewport = contentContext.viewport.value;

    function handleScroll() {
      const maxScroll = viewport.scrollHeight - viewport.clientHeight;
      // we use Math.ceil here because if the UI is zoomed-in
      // `scrollTop` is not always reported as an integer
      canScrollDown.value = Math.ceil(viewport.scrollTop) < maxScroll;
    }
    handleScroll();
    viewport.addEventListener('scroll', handleScroll);

    cleanupFn(() => viewport.removeEventListener('scroll', handleScroll));
  }
});

watch(currentElement, () => {
  if (currentElement.value) alignedPositionContext?.onScrollButtonChange(currentElement.value);
});
</script>

<template>
  <SelectScrollButtonImpl
    v-if="canScrollDown"
    :ref="forwardRef"
    @auto-scroll="
      () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport?.value && selectedItem?.value) {
          viewport.value.scrollTop = viewport.value.scrollTop + selectedItem.value.offsetHeight;
        }
      }
    "
  >
    <slot />
  </SelectScrollButtonImpl>
</template>
