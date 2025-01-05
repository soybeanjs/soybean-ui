<script setup lang="ts">
import { computed } from 'vue';
import { SelectSeparator } from '@soybean-ui/primitive';
import { cn, selectVariants } from '@soybean-ui/variants';
import type { SelectSeparatorProps } from './types';

defineOptions({
  name: 'SSelectSeparator'
});

const { class: cls } = defineProps<SelectSeparatorProps>();

const { separator } = selectVariants();

const mergedCls = computed(() => cn(separator(), cls));
</script>

<template>
  <SelectSeparator :class="mergedCls" />
</template>
