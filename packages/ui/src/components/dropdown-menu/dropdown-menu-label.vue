<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuLabel } from 'radix-vue';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuLabelProps } from './types';

defineOptions({
  name: 'SDropdownMenuLabel'
});

const props = defineProps<DropdownMenuLabelProps>();

const cls = computed(() => {
  const { label } = dropdownMenuVariants({ size: props.size });

  return cn(label(), props.class);
});
</script>

<template>
  <DropdownMenuLabel :class="cls">
    <slot />
  </DropdownMenuLabel>
</template>

<style scoped></style>
