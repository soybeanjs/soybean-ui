<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import { chipVariants, cn } from '@soybean-ui/variants';
import type { ChipContentProps } from './types';

defineOptions({
  name: 'SChipContent'
});

const { class: cls, color, size, position } = defineProps<ChipContentProps>();

const mergedCls = computed(() => {
  const { content } = chipVariants();

  return cn(content({ color, size, position }), cls);
});
</script>

<template>
  <Primitive as="span" :class="mergedCls">
    <slot />
  </Primitive>
</template>
