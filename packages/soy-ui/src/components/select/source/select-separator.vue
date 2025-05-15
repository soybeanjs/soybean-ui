<script setup lang="ts">
import { computed } from 'vue';
import { SelectSeparator } from '@soybean-ui/primitives';
import { cn, selectVariants } from '@soybean-ui/variants';
import type { SelectSeparatorProps } from '../types';

defineOptions({
  name: 'SSelectSeparator'
});

const { class: cls, size } = defineProps<SelectSeparatorProps>();

const mergedCls = computed(() => {
  const { separator } = selectVariants({ size });

  return cn(separator(), cls);
});
</script>

<template>
  <SelectSeparator :class="mergedCls" />
</template>
