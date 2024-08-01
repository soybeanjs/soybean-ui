<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn } from '../../shared';
import type { CardTitleRootProps } from './types';

defineOptions({
  name: 'SCardTitleRoot'
});

const props = withDefaults(defineProps<CardTitleRootProps>(), {
  as: 'div'
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('flex-col gap-y-1.5', props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
