<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardSplit } from '@soybean-ui/variants';
import type { CardHeaderProps } from './types';

defineOptions({
  name: 'SCardHeader'
});

const props = defineProps<CardHeaderProps>();

const cls = computed(() => {
  const split: CardSplit = props.split ? 'header' : 'none';

  const { header } = cardVariants({ size: props.size, split });

  return cn(header(), props.class);
});
</script>

<template>
  <Primitive as="div" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
