<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxSeparator } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxSeparatorProps } from '../types';

defineOptions({
  name: 'SComboboxSeparator'
});

const { class: cls, size } = defineProps<ComboboxSeparatorProps>();

const mergedCls = computed(() => {
  const { separator } = comboboxVariants({ size });

  return cn(separator(), cls);
});
</script>

<template>
  <ComboboxSeparator :class="mergedCls">
    <slot />
  </ComboboxSeparator>
</template>
