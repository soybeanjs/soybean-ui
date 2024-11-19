<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { useDismissableLayerState } from './state';
import type { DismissableLayerBranchPropsWithPrimitive } from './types';

defineOptions({
  name: 'DismissableLayerBranch'
});

const state = useDismissableLayerState();

const props = defineProps<DismissableLayerBranchPropsWithPrimitive>();

const { forwardRef, currentElement } = useForwardExpose();

onMounted(() => {
  state.branches.add(currentElement.value);
});

onUnmounted(() => {
  state.branches.delete(currentElement.value);
});
</script>

<template>
  <Primitive :ref="forwardRef" v-bind="props">
    <slot />
  </Primitive>
</template>
