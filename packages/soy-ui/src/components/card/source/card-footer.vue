<script setup lang="ts">
import { computed } from 'vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardFooterProps } from '../types';

defineOptions({
  name: 'SCardFooter'
});

const { class: cls, size } = defineProps<CardFooterProps>();

const mergedCls = computed(() => {
  const { footer } = cardVariants({ size });

  return cn(footer(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
