<script setup lang="ts">
import { computed } from 'vue';
import { ProgressProvider, provideProgressUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeBaseVariants, mergeSlotVariants } from '@/theme';
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
  const variants = mergeBaseVariants(
    progressVariants({
      color: props.color,
      size: props.size
    }),
    {
      root: 'pointer-events-none fixed inset-x-0 top-0 z-100 rounded-none bg-transparent shadow-none transition-opacity data-[state=complete]:opacity-0',
      indicator: 'rounded-none shadow-sm'
    }
  );

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideProgressUi(ui);
</script>

<template>
  <ProgressProvider v-bind="forwardedProps">
    <slot />
  </ProgressProvider>
</template>
