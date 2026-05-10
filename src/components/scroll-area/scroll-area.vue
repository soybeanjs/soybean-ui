<script setup lang="ts">
import { computed } from 'vue';
import { ScrollAreaCompact, provideScrollAreaUi } from '@soybeanjs/headless/scroll-area';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants } from '@/theme';
import { scrollAreaVariants } from './variants';
import type { ScrollAreaProps } from './types';

defineOptions({
  name: 'SScrollArea'
});

const props = defineProps<ScrollAreaProps>();

const forwardedProps = useOmitProps(props, ['class', 'ui']);

const ui = computed(() => {
  const variants = scrollAreaVariants();

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideScrollAreaUi(ui);
</script>

<template>
  <ScrollAreaCompact v-bind="forwardedProps">
    <slot />
  </ScrollAreaCompact>
</template>
