<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardBodyProps } from './types';

defineOptions({
  name: 'SCardBody'
});

const { class: cls, size } = defineProps<CardBodyProps>();

const mergedCls = computed(() => {
  const { body } = cardVariants({ size });

  return cn(body(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
