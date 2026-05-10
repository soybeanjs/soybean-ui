<script setup lang="ts">
import { computed } from 'vue';
import { ColorFieldCompact, provideColorFieldUi } from '@soybeanjs/headless/color-field';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants } from '@/theme';
import { colorFieldVariants } from './variants';
import type { ColorFieldEmits, ColorFieldProps } from './types';

defineOptions({
  name: 'SColorField'
});

const props = defineProps<ColorFieldProps>();

const emit = defineEmits<ColorFieldEmits>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const ui = computed(() => {
  const variants = colorFieldVariants({ size: props.size });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideColorFieldUi(ui);
</script>

<template>
  <ColorFieldCompact v-bind="forwardedProps" v-on="listeners" />
</template>
