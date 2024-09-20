<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn, radioVariants } from '@soybean-ui/variants';
import type { RadioRootProps } from './types';

defineOptions({
  name: 'SRadioRoot'
});

const props = defineProps<RadioRootProps>();

const { root } = radioVariants();
</script>

<template>
  <Primitive as="div" :class="cn(root(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
