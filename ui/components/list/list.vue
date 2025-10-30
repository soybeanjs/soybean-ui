<script setup lang="ts">
import { computed } from 'vue';
import { ListRoot, provideListThemeContext } from '@headless';
import { mergeSlotVariants } from '@theme';
import { listVariants } from '@variants/list';
import type { ListProps } from './types';

defineOptions({
  name: 'SList'
});

const props = defineProps<ListProps>();

const ui = computed(() => {
  const variants = listVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

provideListThemeContext({
  ui
});
</script>

<template>
  <ListRoot>
    <slot />
  </ListRoot>
</template>
