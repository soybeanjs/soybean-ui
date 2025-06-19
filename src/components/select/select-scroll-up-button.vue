<script setup lang="ts">
import { onWatcherCleanup, shallowRef, watchEffect } from 'vue';
import { useForwardElement } from '../../composables';
import { useSelectContentContext, useSelectItemAlignedPositionContext } from './context';
import SelectScrollButtonImpl from './select-scroll-button-impl.vue';
import type { SelectScrollUpButtonProps } from './types';

defineOptions({
  name: 'SelectScrollUpButton'
});

const props = defineProps<SelectScrollUpButtonProps>();

const { selectedItemElement, viewportElement, isPositioned } = useSelectContentContext('SelectScrollDownButton');
const alignedPositionContext = useSelectItemAlignedPositionContext();

const [_, setButtonElement] = useForwardElement(node => {
  alignedPositionContext?.onScrollButtonChange(node);
});

const onAutoScroll = () => {
  if (viewportElement.value && selectedItemElement.value) {
    viewportElement.value.scrollTop -= selectedItemElement.value.offsetHeight;
  }
};

const canScrollUp = shallowRef(false);

watchEffect(() => {
  if (!viewportElement.value || !isPositioned.value) return;

  const viewport = viewportElement.value;

  function handleScroll() {
    canScrollUp.value = viewport.scrollTop > 0;
  }
  handleScroll();
  viewport.addEventListener('scroll', handleScroll);

  onWatcherCleanup(() => {
    viewport.removeEventListener('scroll', handleScroll);
  });
});
</script>

<template>
  <SelectScrollButtonImpl v-if="canScrollUp" v-bind="props" :ref="setButtonElement" @auto-scroll="onAutoScroll">
    <slot />
  </SelectScrollButtonImpl>
</template>
