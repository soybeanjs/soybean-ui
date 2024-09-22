<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuItemIndicator, useForwardProps } from 'radix-vue';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { DropdownMenuItemIndicatorProps } from './types';

defineOptions({
  name: 'SDropdownMenuItemIndicator'
});

const props = defineProps<DropdownMenuItemIndicatorProps>();

const delegatedProps = computedOmit(props, ['class', 'size']);

const forwarded = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { checkboxItemIndicator } = dropdownMenuVariants({ size: props.size });

  return cn(checkboxItemIndicator(), props.class);
});
</script>

<template>
  <DropdownMenuItemIndicator :class="cls" v-bind="forwarded">
    <slot></slot>
  </DropdownMenuItemIndicator>
</template>

<style scoped></style>
