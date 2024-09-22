<script setup lang="ts">
import { DropdownMenuArrow } from 'radix-vue';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuArrowProps } from './types';

defineOptions({
  name: 'SDropdownMenuArrow'
});

const props = defineProps<DropdownMenuArrowProps>();

const { arrow } = dropdownMenuVariants();
</script>

<template>
  <DropdownMenuArrow as-child>
    <span :class="cn(arrow(), props.class)"></span>
  </DropdownMenuArrow>
</template>

<style scoped></style>
