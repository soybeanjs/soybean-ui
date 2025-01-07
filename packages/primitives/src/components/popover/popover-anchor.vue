<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import { useForwardExpose } from '../../composables';
import { PopperAnchor } from '../popper';
import { injectPopoverRootContext } from './context';
import type { PopoverAnchorPropsWithPrimitive } from './types';

defineOptions({
  name: 'PopoverAnchor'
});

const props = defineProps<PopoverAnchorPropsWithPrimitive>();

useForwardExpose();
const rootContext = injectPopoverRootContext();

onBeforeMount(() => {
  rootContext.hasCustomAnchor.value = true;
});
onUnmounted(() => {
  rootContext.hasCustomAnchor.value = false;
});
</script>

<template>
  <PopperAnchor v-bind="props">
    <slot />
  </PopperAnchor>
</template>
