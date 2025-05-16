<script setup lang="ts">
import { computed } from 'vue';
import { HoverCardArrow } from '@soybean-ui/primitives';
import { cn, popoverVariants } from '@soybean-ui/variants';
import type { HoverCardArrowProps } from '../types';

defineOptions({
  name: 'SHoverCardArrow'
});

const { class: cls, size, width, height, rounded } = defineProps<HoverCardArrowProps>();

const mergedCls = computed(() => {
  const { arrow } = popoverVariants({ size });

  return cn(cls, arrow());
});
</script>

<template>
  <HoverCardArrow :class="mergedCls" :width="width" :height="height" :rounded="rounded" />
</template>
