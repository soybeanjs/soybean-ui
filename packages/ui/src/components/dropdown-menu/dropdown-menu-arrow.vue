<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuArrow } from '@soybean-ui/primitive';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuArrowProps } from './types';

defineOptions({
  name: 'SDropdownMenuArrow'
});

const { class: cls } = defineProps<DropdownMenuArrowProps>();

const { arrow } = dropdownMenuVariants();

const mergedCls = computed(() => cn(arrow(), cls));
</script>

<template>
  <DropdownMenuArrow as-child>
    <span :class="mergedCls"></span>
  </DropdownMenuArrow>
</template>

<style scoped></style>
