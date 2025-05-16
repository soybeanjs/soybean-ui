<script setup lang="ts">
import { computed } from 'vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardHeaderProps } from '../types';

defineOptions({
  name: 'SCardHeader'
});

const { class: cls, size } = defineProps<CardHeaderProps>();

const mergedCls = computed(() => {
  const { header } = cardVariants({ size });

  return cn(header(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
