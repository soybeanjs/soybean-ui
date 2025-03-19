<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardHeaderProps } from './types';

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
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>
