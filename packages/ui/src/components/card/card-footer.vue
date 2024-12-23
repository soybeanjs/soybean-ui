<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardFooterProps } from './types';

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
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
