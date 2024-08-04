<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-unify/ui-variants';
import type { CardTitleRootProps } from './types';

defineOptions({
  name: 'SCardTitleRoot'
});

const props = withDefaults(defineProps<CardTitleRootProps>(), {
  as: 'div'
});

const cls = computed(() => {
  const { titleRoot } = cardVariants({ size: props.size });

  return cn(titleRoot(), props.class);
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
