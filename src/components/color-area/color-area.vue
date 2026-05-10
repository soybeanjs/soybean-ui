<script setup lang="ts">
import { computed } from 'vue';
import { ColorAreaCompact, provideColorAreaUi } from '@soybeanjs/headless/color-area';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { colorAreaVariants } from './variants';
import type { ColorAreaEmits, ColorAreaProps } from './types';

defineOptions({
  name: 'SColorArea'
});

const props = defineProps<ColorAreaProps>();

const emit = defineEmits<ColorAreaEmits>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const ui = computed(() => {
  const variants = colorAreaVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideColorAreaUi(ui);
</script>

<template>
  <ColorAreaCompact v-bind="forwardedProps" v-on="listeners" />
</template>
