<script setup lang="ts">
import { computed } from 'vue';
import { ProgressProvider, provideProgressProviderUi } from '@soybeanjs/headless';
import { mergeSlotVariants } from '@/theme';
import { progressProviderVariants } from './variants';
import type { ProgressProviderProps } from './types';

defineOptions({
  name: 'SProgressProvider'
});

const props = defineProps<ProgressProviderProps>();

const ui = computed(() => {
  const variants = progressProviderVariants();

  return mergeSlotVariants(variants);
});

provideProgressProviderUi(ui);
</script>

<template>
  <ProgressProvider v-bind="props" />
</template>
