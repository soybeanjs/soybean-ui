<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardContentProps } from './types';

defineOptions({
  name: 'SCardContent'
});

const props = defineProps<CardContentProps>();

const cls = computed(() => {
  const { content } = cardVariants({ size: props.size });

  return cn(content(), props.class);
});
</script>

<template>
  <Primitive as="div" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
