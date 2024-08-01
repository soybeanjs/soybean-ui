<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn } from '../../shared';
import type { CardRootProps } from './types';

defineOptions({
  name: 'SCardRoot'
});

const props = withDefaults(defineProps<CardRootProps>(), {
  as: 'div'
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('flex-col-stretch rounded-md border bg-card text-card-foreground shadow-sm', props.class)"
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>
