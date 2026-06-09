<script setup lang="ts">
import ColorSwatchCompact from '../color-swatch/color-swatch-compact.vue';
import { useColorSwatchPickerItemContext } from './context.js';
import type { ColorSwatchPickerItemSwatchProps } from './types.js';

defineOptions({
  name: 'ColorSwatchPickerItemSwatch'
});

const props = defineProps<ColorSwatchPickerItemSwatchProps>();

const { color } = useColorSwatchPickerItemContext('ColorSwatchPickerItemSwatch');
</script>

<template>
  <ColorSwatchCompact v-bind="props" data-soybean-color-swatch-picker-item-swatch :color="color">
    <slot />
  </ColorSwatchCompact>
</template>
