<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardTitleProps } from './types';

defineOptions({
  name: 'SCardTitle'
});

const props = defineProps<CardTitleProps>();

const cls = computed(() => {
  const { title } = cardVariants({ size: props.size });

  return cn(title(), props.class);
});
</script>

<template>
  <Primitive as="div" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
