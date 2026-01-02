<script setup lang="ts">
import { onWatcherCleanup, shallowRef, watchEffect } from 'vue';
import { useForwardElement } from '../../composables';
import { useSelectContentContext, useSelectItemAlignedPositionContext, useSelectUi } from './context';
import SelectScrollButtonImpl from './select-scroll-button-impl.vue';
import type { SelectScrollUpButtonProps } from './types';

defineOptions({
  name: 'SelectScrollUpButton'
});

defineProps<SelectScrollUpButtonProps>();

const { selectedItemElement, viewportElement, isPositioned } = useSelectContentContext('SelectScrollDownButton');
const alignedPositionContext = useSelectItemAlignedPositionContext();

const [_, setButtonElement] = useForwardElement(node => {
  alignedPositionContext?.onScrollButtonChange(node);
});

const cls = useSelectUi('scrollUpButton');

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
  <SelectScrollButtonImpl
    v-if="canScrollUp"
    :ref="setButtonElement"
    :as="as"
    :as-child="asChild"
    :class="cls"
    @auto-scroll="onAutoScroll"
  >
    <slot />
  </SelectScrollButtonImpl>
</template>
