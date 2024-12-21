<script setup lang="ts">
import { computed } from 'vue';
import { PopoverArrow, useForwardProps } from '@soybean-ui/primitive';
import { cn, popoverVariants } from '@soybean-ui/variants';
import type { PopoverArrowProps } from './types';

defineOptions({
  name: 'SPopoverArrow'
});

const { class: cls, ...delegatedProps } = defineProps<PopoverArrowProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { arrow } = popoverVariants();

const mergedCls = computed(() => cn(arrow(), cls));
</script>

<template>
  <PopoverArrow v-bind="forwardedProps" :class="mergedCls" />
</template>

<style scoped></style>
