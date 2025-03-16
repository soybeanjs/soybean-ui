<script setup lang="ts">
import { onBeforeUnmount, ref, watchEffect } from 'vue';
import { useCollection } from '../../composables';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import { injectSelectContentContext } from './context';
import type { SelectScrollButtonImplEmits } from './types';

defineOptions({
  name: 'SelectScrollButtonImpl'
});

const emit = defineEmits<SelectScrollButtonImplEmits>();

const { getItems } = useCollection();

const contentContext = injectSelectContentContext();
const autoScrollTimerRef = ref<number | null>(null);

function clearAutoScrollTimer() {
  if (autoScrollTimerRef.value !== null) {
    window.clearInterval(autoScrollTimerRef.value);
    autoScrollTimerRef.value = null;
  }
}

watchEffect(() => {
  const activeItem = getItems()
    .map(i => i.ref)
    .find(item => item === getActiveElement());
  activeItem?.scrollIntoView({ block: 'nearest' });
});

function handlePointerDown() {
  if (autoScrollTimerRef.value === null) {
    autoScrollTimerRef.value = window.setInterval(() => {
      emit('autoScroll');
    }, 50);
  }
}

function handlePointerMove() {
  contentContext.onItemLeave?.();
  if (autoScrollTimerRef.value === null) {
    autoScrollTimerRef.value = window.setInterval(() => {
      emit('autoScroll');
    }, 50);
  }
}

onBeforeUnmount(() => clearAutoScrollTimer());
</script>

<template>
  <Primitive
    v-bind="$parent?.$props"
    aria-hidden="true"
    :style="{
      flexShrink: 0
    }"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerleave="
      () => {
        clearAutoScrollTimer();
      }
    "
  >
    <slot />
  </Primitive>
</template>
