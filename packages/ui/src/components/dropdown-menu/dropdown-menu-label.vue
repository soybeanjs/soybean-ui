<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuLabel } from '@soybean-ui/primitive';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuLabelProps } from './types';

defineOptions({
  name: 'SDropdownMenuLabel'
});

const { class: cls, size } = defineProps<DropdownMenuLabelProps>();

const mergedCls = computed(() => {
  const { label } = dropdownMenuVariants({ size });

  return cn(label(), cls);
});
</script>

<template>
  <DropdownMenuLabel :class="mergedCls">
    <slot />
  </DropdownMenuLabel>
</template>

<style scoped></style>
