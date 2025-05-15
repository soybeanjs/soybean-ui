<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { cn, paginationVariants } from '@soybean-ui/variants';
import type { PaginationButtonProps } from '../types';

defineOptions({
  name: 'SPaginationButton'
});

const { class: cls, size, variant } = defineProps<PaginationButtonProps>();

const mergedCls = computed(() => {
  const { button } = paginationVariants({ size, variant });

  return cn(button(), cls);
});
</script>

<template>
  <Primitive as="button" :class="mergedCls">
    <slot />
  </Primitive>
</template>
