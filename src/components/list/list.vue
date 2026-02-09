<script setup lang="ts">
import { computed } from 'vue';
import { ListRoot, provideListUi } from '@soybeanjs/headless';
import { mergeSlotVariants } from '@/theme';
import { listVariants } from './variants';
import type { ListProps } from './types';

defineOptions({
  name: 'SList'
});

const props = defineProps<ListProps>();

const ui = computed(() => {
  const variants = listVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideListUi(ui);
</script>

<template>
  <ListRoot>
    <slot />
  </ListRoot>
</template>
