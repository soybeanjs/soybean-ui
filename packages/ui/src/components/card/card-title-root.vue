<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardTitleRootProps } from './types';

defineOptions({
  name: 'SCardTitleRoot'
});

const props = defineProps<CardTitleRootProps>();

const { titleRoot } = cardVariants();
</script>

<template>
  <Primitive as="div" :class="cn(titleRoot(), props.class)">
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </Primitive>
</template>

<style scoped></style>
