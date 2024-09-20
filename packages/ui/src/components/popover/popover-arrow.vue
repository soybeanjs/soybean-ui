<script setup lang="ts">
import { PopoverArrow, useForwardProps } from 'radix-vue';
import { cn, popoverVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { PopoverArrowProps } from './types';

defineOptions({
  name: 'SPopoverArrow'
});

const props = defineProps<PopoverArrowProps>();

const delegatedProps = computedOmit(props, ['class', 'asChild']);

const forwardedProps = useForwardProps(delegatedProps);

const { arrow } = popoverVariants();
</script>

<template>
  <PopoverArrow as-child v-bind="forwardedProps">
    <div :class="cn(arrow(), props.class)"></div>
  </PopoverArrow>
</template>

<style scoped></style>
