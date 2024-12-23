<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardRootProps } from './types';

defineOptions({
  name: 'SCardRoot'
});

const { class: cls, size, split } = defineProps<CardRootProps>();

const mergedCls = computed(() => {
  const { root } = cardVariants({ size, split });

  return cn(root(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
