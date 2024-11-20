<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardContentProps } from './types';

defineOptions({
  name: 'SCardContent'
});

const { class: cls, size } = defineProps<CardContentProps>();

const mergedCls = computed(() => {
  const { content } = cardVariants({ size });

  return cn(content(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
