<script setup lang="ts">
import { computed } from 'vue';
import { cn, separatorVariants } from '@soybean-ui/variants';
import type { SeparatorLabelProps } from '../types';

defineOptions({
  name: 'SSeparatorLabel'
});

const { class: cls, size, align, orientation } = defineProps<SeparatorLabelProps>();

const mergedCls = computed(() => {
  const { label } = separatorVariants({ size, align, orientation });

  return cn(label(), cls);
});
</script>

<template>
  <span :class="mergedCls">
    <slot />
  </span>
</template>
