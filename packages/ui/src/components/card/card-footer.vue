<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn } from '../../shared';
import type { CardFooterProps } from './types';

defineOptions({
  name: 'SCardFooter'
});

const props = withDefaults(defineProps<CardFooterProps>(), {
  as: 'div'
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('flex justify-between px-6 pb-6', props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
