<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn } from '../../shared';
import type { CardDescriptionProps } from './types';

defineOptions({
  name: 'SCardDescription'
});

const props = withDefaults(defineProps<CardDescriptionProps>(), {
  as: 'div'
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
