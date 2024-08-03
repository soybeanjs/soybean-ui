<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cardVariants } from '@soybean-unify/ui-variants';
import { cn } from '../../shared';
import type { CardContentProps } from './types';

defineOptions({
  name: 'SCardContent'
});

const props = withDefaults(defineProps<CardContentProps>(), {
  as: 'div',
  topGap: true,
  bottomGap: true
});

const cls = computed(() =>
  cn(
    'flex-grow overflow-hidden',
    cardVariants({ size: props.size, split: 'none' }),
    props.topGap ? '' : 'pt-0',
    props.bottomGap ? '' : 'pb-0',
    props.class
  )
);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls">
    <div class="h-full">
      <slot />
    </div>
  </Primitive>
</template>

<style scoped></style>
