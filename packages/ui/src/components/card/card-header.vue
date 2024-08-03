<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { type CardSplit, cardVariants } from '@soybean-unify/ui-variants';
import { cn } from '../../shared';
import type { CardHeaderProps } from './types';

defineOptions({
  name: 'SCardHeader'
});

const props = withDefaults(defineProps<CardHeaderProps>(), {
  as: 'div',
  split: false
});

const cardSplit = computed<CardSplit>(() => (props.split ? 'header' : 'none'));

const cls = computed(() =>
  cn('flex-y-center justify-between', cardVariants({ size: props.size, split: cardSplit.value }), props.class)
);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
