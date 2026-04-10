<script setup lang="ts">
import { computed } from 'vue';
import { ToolbarRoot, provideToolbarUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { toolbarVariants } from './variants';
import type { ToolbarProps } from './types';

defineOptions({
  name: 'SToolbar'
});

const props = defineProps<ToolbarProps>();

const forwardedProps = useOmitProps(props, ['class', 'ui']);

const ui = computed(() => {
  const variants = toolbarVariants();

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideToolbarUi(ui);
</script>

<template>
  <ToolbarRoot v-bind="forwardedProps">
    <slot />
  </ToolbarRoot>
</template>
