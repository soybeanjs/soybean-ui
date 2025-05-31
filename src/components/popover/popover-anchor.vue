<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import { PopperAnchor } from '../popper';
import { usePopoverRootContext } from './context';
import type { PopoverAnchorProps } from './types';

defineOptions({
  name: 'PopoverAnchor'
});

const props = defineProps<PopoverAnchorProps>();

const { hasCustomAnchor } = usePopoverRootContext('PopoverAnchor');

onBeforeMount(() => {
  hasCustomAnchor.value = true;
});

onUnmounted(() => {
  hasCustomAnchor.value = false;
});
</script>

<template>
  <PopperAnchor v-bind="props">
    <slot />
  </PopperAnchor>
</template>
