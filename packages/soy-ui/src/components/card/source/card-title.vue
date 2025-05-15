<script setup lang="ts">
import { computed } from 'vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardTitleProps } from '../types';

defineOptions({
  name: 'SCardTitle'
});

const { class: cls, size } = defineProps<CardTitleProps>();

const mergedCls = computed(() => {
  const { title } = cardVariants({ size });

  return cn(title(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
