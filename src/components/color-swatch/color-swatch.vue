<script setup lang="ts">
import { computed } from 'vue';
import { ColorSwatch } from '@soybeanjs/headless/color-swatch';
import { mergeSlotVariants } from '@/theme';
import { colorSwatchVariants } from './variants';
import type { ColorSwatchProps } from './types';

defineOptions({
  name: 'SColorSwatch'
});

const props = defineProps<ColorSwatchProps>();

const ui = computed(() => {
  const variants = colorSwatchVariants({
    size: props.size,
    shape: props.shape
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});
</script>

<template>
  <ColorSwatch :as="as" :as-child="asChild" :class="ui.root" :color="color" :label="label">
    <span :class="ui.checker" />
    <span :class="ui.fill" />
    <slot />
  </ColorSwatch>
</template>
