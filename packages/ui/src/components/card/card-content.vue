<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn } from '../../shared';
import type { CardContentProps } from './types';

defineOptions({
  name: 'SCardContent'
});

const props = withDefaults(defineProps<CardContentProps>(), {
  as: 'div'
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('flex-grow overflow-hidden px-6 my-6', props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
