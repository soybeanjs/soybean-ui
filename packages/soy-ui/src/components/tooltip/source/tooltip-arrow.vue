<script setup lang="ts">
import { computed } from 'vue';
import { TooltipArrow } from '@soybean-ui/primitives';
import { cn, tooltipVariants } from '@soybean-ui/variants';
import type { TooltipArrowProps } from '../types';

defineOptions({
  name: 'STooltipArrow'
});

const { class: cls, size, width, height, rounded } = defineProps<TooltipArrowProps>();

const mergedCls = computed(() => {
  const { arrow } = tooltipVariants({ size });

  return cn(cls, arrow());
});
</script>

<template>
  <TooltipArrow :class="mergedCls" :width="width" :height="height" :rounded="rounded" />
</template>
