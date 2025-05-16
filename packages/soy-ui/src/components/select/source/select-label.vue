<script setup lang="ts">
import { computed } from 'vue';
import { SelectLabel } from '@soybean-ui/primitives';
import { cn, selectVariants } from '@soybean-ui/variants';
import type { SelectLabelProps } from '../types';

defineOptions({
  name: 'SSelectLabel'
});

const { class: cls, size, for: id } = defineProps<SelectLabelProps>();

const mergedCls = computed(() => {
  const { groupLabel } = selectVariants({ size });

  return cn(groupLabel(), cls);
});
</script>

<template>
  <SelectLabel :class="mergedCls" :for="id">
    <slot />
  </SelectLabel>
</template>
