<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxLabel } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxGroupLabelProps } from '../types';

defineOptions({
  name: 'SComboboxGroupLabel'
});

const { class: cls, size } = defineProps<ComboboxGroupLabelProps>();

const mergedCls = computed(() => {
  const { groupLabel } = comboboxVariants({ size });

  return cn(groupLabel(), cls);
});
</script>

<template>
  <ComboboxLabel :class="mergedCls">
    <slot />
  </ComboboxLabel>
</template>
