<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardSplit } from '@soybean-ui/variants';
import type { CardFooterProps } from './types';

defineOptions({
  name: 'SCardFooter'
});

const { class: cls, size, split } = defineProps<CardFooterProps>();

const mergedCls = computed(() => {
  const footerSplit: CardSplit = split ? 'footer' : 'none';

  const { footer } = cardVariants({ size, split: footerSplit });

  return cn(footer(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
