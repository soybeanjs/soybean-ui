<script setup lang="ts">
import { computed } from 'vue';
import { ProgressIndicator } from 'radix-vue';
import { cn, progressVariants } from '@soybean-ui/variants';
import type { ProgressIndicatorProps } from './types';

defineOptions({
  name: 'SProgressIndicator'
});

const props = defineProps<ProgressIndicatorProps>();

const cls = computed(() => {
  const { indicator } = progressVariants();

  return cn(indicator({ color: props.color }), props.class);
});

const style = computed(() => `transform: translateX(-${100 - (props.modelValue || 0)}%);`);
</script>

<template>
  <ProgressIndicator :class="cls" :style="style" />
</template>

<style scoped></style>
