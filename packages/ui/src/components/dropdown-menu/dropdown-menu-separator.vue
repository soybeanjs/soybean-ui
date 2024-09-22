<script setup lang="ts">
import { DropdownMenuSeparator } from 'radix-vue';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuSeparatorProps } from './types';

defineOptions({
  name: 'SDropdownMenuSeparator'
});

const props = defineProps<DropdownMenuSeparatorProps>();

const { separator } = dropdownMenuVariants();
</script>

<template>
  <DropdownMenuSeparator :class="cn(separator(), props.class)" />
</template>

<style scoped></style>
