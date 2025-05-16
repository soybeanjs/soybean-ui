<script setup lang="ts">
import { computed } from 'vue';
import { chipVariants, cn } from '@soybean-ui/variants';
import type { ChipContentProps } from '../types';

defineOptions({
  name: 'SChipContent'
});

const { class: cls, color, size, position } = defineProps<ChipContentProps>();

const mergedCls = computed(() => {
  const { content } = chipVariants({ color, size, position });

  return cn(content(), cls);
});
</script>

<template>
  <span :class="mergedCls">
    <slot />
  </span>
</template>
