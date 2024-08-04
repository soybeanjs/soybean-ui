<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-unify/ui-variants';
import type { CardDescriptionProps } from './types';

defineOptions({
  name: 'SCardDescription'
});

const props = withDefaults(defineProps<CardDescriptionProps>(), {
  as: 'div'
});

const cls = computed(() => {
  const { description } = cardVariants({ size: props.size });

  return cn(description(), props.class);
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
