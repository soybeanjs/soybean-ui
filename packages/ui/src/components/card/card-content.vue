<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardContentProps } from './types';

defineOptions({
  name: 'SCardContent'
});

const props = withDefaults(defineProps<CardContentProps>(), {
  as: 'div'
});

const cls = computed(() => {
  const { content } = cardVariants({ size: props.size });

  return cn(content(), props.class);
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls">
    <div class="h-full">
      <slot />
    </div>
  </Primitive>
</template>

<style scoped></style>
