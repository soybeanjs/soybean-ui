<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { ColorSwatchCompact, provideColorSwatchUi } from '@soybeanjs/headless/color-swatch';
import { mergeVariants } from '@/theme';
import { colorSwatchVariants } from './variants';
import type { ColorSwatchProps, ColorSwatchSlots } from './types';

defineOptions({
  name: 'SColorSwatch'
});

const props = defineProps<ColorSwatchProps>();

defineSlots<ColorSwatchSlots>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size', 'shape']);

const ui = computed(() => {
  const variants = colorSwatchVariants({
    size: props.size,
    shape: props.shape
  });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideColorSwatchUi(ui);
</script>

<template>
  <ColorSwatchCompact v-slot="slotProps" v-bind="forwardedProps">
    <slot v-bind="slotProps" />
  </ColorSwatchCompact>
</template>
