<script setup lang="ts">
import { computed } from 'vue';
import { ProgressIndicator } from '@soybean-ui/primitives';
import { cn, progressVariants } from '@soybean-ui/variants';
import type { ProgressIndicatorProps } from '../types';

defineOptions({
  name: 'SProgressIndicator'
});

const { class: cls, color, modelValue } = defineProps<ProgressIndicatorProps>();

const mergedCls = computed(() => {
  const { indicator } = progressVariants();

  return cn(indicator({ color }), cls);
});

const style = computed(() => `transform: translateX(-${100 - (modelValue || 0)}%);`);
</script>

<template>
  <ProgressIndicator :class="mergedCls" :style="style" />
</template>
