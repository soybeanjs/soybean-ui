<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn } from '../../shared';
import type { CardHeaderProps } from './types';

defineOptions({
  name: 'SCardHeader'
});

const props = withDefaults(defineProps<CardHeaderProps>(), {
  as: 'div'
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('flex-y-center justify-between px-6 pt-6', props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
