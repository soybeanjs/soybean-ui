<script setup lang="ts">
import { TooltipArrow, useForwardProps } from 'radix-vue';
import { cn, tooltipVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { TooltipArrowProps } from './types';

defineOptions({
  name: 'STooltipArrow'
});

const props = defineProps<TooltipArrowProps>();

const delegatedProps = computedOmit(props, ['class', 'asChild']);

const forwardedProps = useForwardProps(delegatedProps);

const { arrow } = tooltipVariants();
</script>

<template>
  <TooltipArrow as-child v-bind="forwardedProps">
    <div :class="cn(arrow(), props.class)"></div>
  </TooltipArrow>
</template>

<style scoped></style>
