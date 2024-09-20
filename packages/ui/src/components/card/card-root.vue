<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardRootProps } from './types';

defineOptions({
  name: 'SCardRoot'
});

const props = defineProps<CardRootProps>();

const { root } = cardVariants();
</script>

<template>
  <Primitive as="div" :class="cn(root(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
