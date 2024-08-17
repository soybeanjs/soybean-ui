<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn } from '@soybean-unify/ui-variants';
import type { CardTitleRootProps } from './types';

defineOptions({
  name: 'SCardTitleRoot'
});

const props = withDefaults(defineProps<CardTitleRootProps>(), {
  as: 'div'
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('flex-y-center gap-2', props.class)">
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </Primitive>
</template>

<style scoped></style>
