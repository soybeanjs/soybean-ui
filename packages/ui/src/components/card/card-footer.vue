<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardSplit } from '@soybean-ui/variants';
import type { CardFooterProps } from './types';

defineOptions({
  name: 'SCardFooter'
});

const props = defineProps<CardFooterProps>();

const cls = computed(() => {
  const split: CardSplit = props.split ? 'footer' : 'none';

  const { footer } = cardVariants({ size: props.size, split });

  return cn(footer(), props.class);
});
</script>

<template>
  <Primitive as="div" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
