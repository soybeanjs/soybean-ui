<script setup lang="ts">
import { computed } from 'vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardContentProps } from '../types';

defineOptions({
  name: 'SCardContent'
});

const { class: cls, size, flexHeight } = defineProps<CardContentProps>();

const mergedCls = computed(() => {
  const { content } = cardVariants({ size, flexHeight });

  return cn(content(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
