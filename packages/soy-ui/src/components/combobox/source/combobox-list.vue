<script setup lang="ts">
import { computed } from 'vue';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxListProps } from '../types';

defineOptions({
  name: 'SComboboxList'
});

const { class: cls, size } = defineProps<ComboboxListProps>();

const mergedCls = computed(() => {
  const { list } = comboboxVariants({ size });

  return cn(list(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
