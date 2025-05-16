<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxEmpty } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxEmptyProps } from '../types';

defineOptions({
  name: 'SComboboxEmpty'
});

const { class: cls, size } = defineProps<ComboboxEmptyProps>();

const mergedCls = computed(() => {
  const { empty } = comboboxVariants({ size });

  return cn(empty(), cls);
});
</script>

<template>
  <ComboboxEmpty :class="mergedCls">
    <slot />
  </ComboboxEmpty>
</template>
