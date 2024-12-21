<script setup lang="ts">
import { computed } from 'vue';
import { TooltipArrow, useForwardProps } from '@soybean-ui/primitive';
import { cn, tooltipVariants } from '@soybean-ui/variants';
import type { TooltipArrowProps } from './types';

defineOptions({
  name: 'STooltipArrow'
});

const { class: cls, ...delegatedProps } = defineProps<TooltipArrowProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { arrow } = tooltipVariants();

const mergedCls = computed(() => cn(cls, arrow()));
</script>

<template>
  <TooltipArrow v-bind="forwardedProps" :class="mergedCls" />
</template>

<style scoped></style>
