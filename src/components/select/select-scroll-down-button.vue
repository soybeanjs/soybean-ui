<script setup lang="ts">
import { onWatcherCleanup, shallowRef, watchEffect } from 'vue';
import { useForwardElement } from '../../composables';
import { useSelectContentContext, useSelectItemAlignedPositionContext } from './context';
import SelectScrollButtonImpl from './select-scroll-button-impl.vue';
import type { SelectScrollDownButtonProps } from './types';

defineOptions({
  name: 'SelectScrollDownButton'
});

const props = defineProps<SelectScrollDownButtonProps>();

const { selectedItemElement, viewportElement, isPositioned } = useSelectContentContext('SelectScrollDownButton');
const alignedPositionContext = useSelectItemAlignedPositionContext();

const [_, setButtonElement] = useForwardElement(node => {
  alignedPositionContext?.onScrollButtonChange(node);
});

const onAutoScroll = () => {
  if (viewportElement.value && selectedItemElement.value) {
    viewportElement.value.scrollTop += selectedItemElement.value.offsetHeight;
  }
};

const canScrollDown = shallowRef(false);

watchEffect(() => {
  if (!viewportElement.value || !isPositioned.value) return;

  const viewport = viewportElement.value;

  function handleScroll() {
    const maxScroll = viewport.scrollHeight - viewport.clientHeight;
    // we use Math.ceil here because if the UI is zoomed-in
    // `scrollTop` is not always reported as an integer
    canScrollDown.value = Math.ceil(viewport.scrollTop) < maxScroll;
  }

  handleScroll();

  viewport.addEventListener('scroll', handleScroll);

  onWatcherCleanup(() => {
    viewport.removeEventListener('scroll', handleScroll);
  });
});
</script>

<template>
  <SelectScrollButtonImpl v-if="canScrollDown" v-bind="props" :ref="setButtonElement" @auto-scroll="onAutoScroll">
    <slot />
  </SelectScrollButtonImpl>
</template>
