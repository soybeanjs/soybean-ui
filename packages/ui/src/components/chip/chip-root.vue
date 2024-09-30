<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { chipVariants, cn } from '@soybean-ui/variants';
import type { ChipRootProps } from './types';

defineOptions({
  name: 'SChipRoot'
});

const props = defineProps<ChipRootProps>();

const cls = computed(() => {
  const { root } = chipVariants();

  return cn(root(), props.class);
});
</script>

<template>
  <Primitive as="div" :class="cls">
    <slot />
  </Primitive>
</template>
