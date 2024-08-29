<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardRootProps } from './types';

defineOptions({
  name: 'SCardRoot'
});

const props = withDefaults(defineProps<CardRootProps>(), {
  as: 'div'
});

const { root } = cardVariants();
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(root(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
