<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardSplit } from '@soybean-ui/variants';
import type { CardHeaderProps } from './types';

defineOptions({
  name: 'SCardHeader'
});

const props = withDefaults(defineProps<CardHeaderProps>(), {
  as: 'div',
  split: false
});

const cls = computed(() => {
  const split: CardSplit = props.split ? 'header' : 'none';

  const { header } = cardVariants({ size: props.size, split });

  return cn(header(), props.class);
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
