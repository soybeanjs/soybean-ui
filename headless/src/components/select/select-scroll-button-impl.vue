<script setup lang="ts">
import { onBeforeUnmount, watchEffect } from 'vue';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import { useCollectionContext, useSelectContentContext } from './context';
import type { SelectScrollButtonImplEmits, SelectScrollButtonImplProps } from './types';

defineOptions({
  name: 'SelectScrollButtonImpl'
});

defineProps<SelectScrollButtonImplProps>();

const emit = defineEmits<SelectScrollButtonImplEmits>();

const { getOrderedItems } = useCollectionContext('SelectScrollButtonImpl');

const { onItemElementLeave } = useSelectContentContext('SelectScrollButtonImpl');

let autoScrollTimerRef: number | null = null;

const clearAutoScrollTimer = () => {
  if (autoScrollTimerRef !== null) {
    window.clearInterval(autoScrollTimerRef);
    autoScrollTimerRef = null;
  }
};

const onPointerDown = () => {
  if (autoScrollTimerRef === null) {
    autoScrollTimerRef = window.setInterval(() => {
      emit('autoScroll');
    }, 50);
  }
};

const onPointerMove = () => {
  onItemElementLeave();
  if (autoScrollTimerRef === null) {
    autoScrollTimerRef = window.setInterval(() => {
      emit('autoScroll');
    }, 50);
  }
};

const onPointerLeave = () => {
  clearAutoScrollTimer();
};

watchEffect(() => {
  const activeItem = getOrderedItems()
    .map(i => i.element)
    .find(item => item === getActiveElement());

  activeItem?.scrollIntoView({ block: 'nearest' });
});

onBeforeUnmount(() => {
  clearAutoScrollTimer();
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    aria-hidden="true"
    style="flex-shrink: 0"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <slot />
  </Primitive>
</template>
