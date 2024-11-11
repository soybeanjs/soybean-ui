<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuItemIndicator, useForwardProps } from 'reka-ui';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuItemIndicatorProps } from './types';

defineOptions({
  name: 'SDropdownMenuItemIndicator'
});

const { class: cls, size, ...delegatedProps } = defineProps<DropdownMenuItemIndicatorProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { itemIndicator } = dropdownMenuVariants({ size });

  return cn(itemIndicator(), cls);
});
</script>

<template>
  <DropdownMenuItemIndicator v-bind="forwardedProps" :class="mergedCls">
    <slot></slot>
  </DropdownMenuItemIndicator>
</template>

<style scoped></style>
