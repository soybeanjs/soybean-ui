<script setup lang="ts">
import { computed } from 'vue';
import { TooltipArrow } from 'reka-ui';
import { cn, tooltipVariants } from '@soybean-ui/variants';
import type { TooltipArrowProps } from './types';

defineOptions({
  name: 'STooltipArrow'
});

const { class: cls, width, height } = defineProps<TooltipArrowProps>();

const { arrow } = tooltipVariants();

const mergedCls = computed(() => cn(cls, arrow()));
</script>

<template>
  <TooltipArrow as-child :width :height>
    <div :class="mergedCls"></div>
  </TooltipArrow>
</template>

<style scoped></style>
