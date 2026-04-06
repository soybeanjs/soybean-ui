<script setup lang="ts">
import { ColorSwatch } from '../color-swatch';
import { useColorSwatchPickerItemContext, useColorSwatchPickerUi } from './context';
import type { ColorSwatchPickerItemSwatchProps } from './types';

defineOptions({
  name: 'ColorSwatchPickerItemSwatch'
});

defineProps<ColorSwatchPickerItemSwatchProps>();

const cls = useColorSwatchPickerUi('swatch');

const { color } = useColorSwatchPickerItemContext('ColorSwatchPickerItemSwatch');
</script>

<template>
  <ColorSwatch :as="as" :as-child="asChild" :class="cls" :color="color" :label="label">
    <slot />
  </ColorSwatch>
</template>
