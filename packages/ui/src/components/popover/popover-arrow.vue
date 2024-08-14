<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { PopoverArrow, useForwardProps } from 'radix-vue';
import { cn, popoverVariants } from '@soybean-unify/ui-variants';
import type { PopoverArrowProps } from './types';

defineOptions({
  name: 'SPopoverArrow'
});

const props = defineProps<PopoverArrowProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { arrow } = popoverVariants();
</script>

<template>
  <PopoverArrow v-bind="forwardedProps" as-child>
    <div :class="cn(arrow(), props.class)"></div>
  </PopoverArrow>
</template>

<style scoped></style>
