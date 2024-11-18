<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import type { PopperAnchorProps } from '../popper';
import { PopperAnchor } from '../popper';
import { useForwardExpose } from '../../composables';

import { injectPopoverRootContext } from './popover-root.vue';

export interface PopoverAnchorProps extends PopperAnchorProps {}

const props = defineProps<PopoverAnchorProps>();

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
