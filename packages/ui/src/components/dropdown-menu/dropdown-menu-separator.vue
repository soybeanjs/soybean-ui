<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuSeparator } from '@soybean-ui/primitive';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuSeparatorProps } from './types';

defineOptions({
  name: 'SDropdownMenuSeparator'
});

const { class: cls } = defineProps<DropdownMenuSeparatorProps>();

const { separator } = dropdownMenuVariants();

const mergedCls = computed(() => cn(separator(), cls));
</script>

<template>
  <DropdownMenuSeparator :class="mergedCls" />
</template>

<style scoped></style>
