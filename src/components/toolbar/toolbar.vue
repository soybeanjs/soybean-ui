<script setup lang="ts">
import { computed } from 'vue';
import { ToolbarRoot, provideToolbarUi } from '@soybeanjs/headless/toolbar';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants } from '@/theme';
import { toolbarVariants } from './variants';
import type { ToolbarProps } from './types';

defineOptions({
  name: 'SToolbar'
});

const props = defineProps<ToolbarProps>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const ui = computed(() => {
  const variants = toolbarVariants({
    size: props.size
  });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideToolbarUi(ui);
</script>

<template>
  <ToolbarRoot v-bind="forwardedProps">
    <slot />
  </ToolbarRoot>
</template>
