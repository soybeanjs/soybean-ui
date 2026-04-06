<script setup lang="ts">
import { ListboxItemIndicator } from '../listbox';
import type { ColorSwatchPickerItemIndicatorProps } from './types';

defineOptions({
  name: 'ColorSwatchPickerItemIndicator'
});

defineProps<ColorSwatchPickerItemIndicatorProps>();
</script>

<template>
  <ListboxItemIndicator :as="as" :as-child="asChild">
    <slot />
  </ListboxItemIndicator>
</template>
