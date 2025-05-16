<script setup lang="ts">
import { computed } from 'vue';
import { PopoverArrow } from '@soybean-ui/primitives';
import { cn, popoverVariants } from '@soybean-ui/variants';
import type { PopoverArrowProps } from '../types';

defineOptions({
  name: 'SPopoverArrow'
});

const { class: cls, size, width, height, rounded } = defineProps<PopoverArrowProps>();

const mergedCls = computed(() => {
  const { arrow } = popoverVariants({ size });

  return cn(cls, arrow());
});
</script>

<template>
  <PopoverArrow :class="mergedCls" :width="width" :height="height" :rounded="rounded" />
</template>
