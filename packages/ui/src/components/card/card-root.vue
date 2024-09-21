<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardRootProps } from './types';

defineOptions({
  name: 'SCardRoot'
});

const props = defineProps<CardRootProps>();

const cls = computed(() => {
  const { root } = cardVariants({ size: props.size });

  return cn(root(), props.class);
});
</script>

<template>
  <Primitive as="div" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
