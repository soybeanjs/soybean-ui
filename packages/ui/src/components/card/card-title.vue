<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn } from '../../shared';
import type { CardTitleProps } from './types';

defineOptions({
  name: 'SCardTitle'
});

const props = withDefaults(defineProps<CardTitleProps>(), {
  as: 'div'
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('text-xl font-semibold leading-none tracking-tight', props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
