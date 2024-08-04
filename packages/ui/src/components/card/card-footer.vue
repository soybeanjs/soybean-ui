<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-unify/ui-variants';
import type { CardSplit } from '@soybean-unify/ui-variants';
import type { CardFooterProps } from './types';

defineOptions({
  name: 'SCardFooter'
});

const props = withDefaults(defineProps<CardFooterProps>(), {
  as: 'div',
  split: false
});

const cls = computed(() => {
  const split: CardSplit = props.split ? 'footer' : 'none';

  const { footer } = cardVariants({ size: props.size, split });

  return cn(footer(), props.class);
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
