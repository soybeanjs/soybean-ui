<script setup lang="ts">
import { ListboxContent } from '../listbox';
import type { ComboboxViewportProps } from './types';

defineOptions({
  name: 'ComboboxViewport'
});

defineProps<ComboboxViewportProps>();
</script>

<template>
  <ListboxContent data-soybean-combobox-viewport class="soybean-headless-scrollbar-hidden">
    <slot />
  </ListboxContent>
</template>
