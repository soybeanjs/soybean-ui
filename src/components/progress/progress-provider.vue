<script setup lang="ts">
import { computed } from 'vue';
import { ProgressProvider, provideProgressUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { progressVariants } from './variants';
import type { ProgressProviderProps } from './types';

defineOptions({
  name: 'SProgressProvider'
});

const props = withDefaults(defineProps<ProgressProviderProps>(), {
  color: 'primary',
  size: 'xs'
});

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'ui']);

const ui = computed(() => {
  const variants = progressVariants({
    color: props.color,
    size: props.size,
    isFixed: true
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideProgressUi(ui);
</script>

<template>
  <ProgressProvider v-bind="forwardedProps">
    <slot />
  </ProgressProvider>
</template>
