<script setup lang="ts">
import { PopoverArrow, useForwardProps } from 'radix-vue';
import { cn, popoverVariants } from '@soybean-unify/ui-variants';
import { computedOmit } from '../../shared';
import type { PopoverArrowProps } from './types';

defineOptions({
  name: 'SPopoverArrow'
});

const props = withDefaults(defineProps<PopoverArrowProps>(), {
  asChild: true
});

const delegatedProps = computedOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { arrow } = popoverVariants();
</script>

<template>
  <PopoverArrow v-bind="forwardedProps">
    <div :class="cn(arrow(), props.class)"></div>
  </PopoverArrow>
</template>

<style scoped></style>
