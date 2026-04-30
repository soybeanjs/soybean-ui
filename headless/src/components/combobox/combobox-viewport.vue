<script setup lang="ts">
import { ListboxContent } from '../listbox';
import type { ComboboxViewportProps } from './types';

defineOptions({
  name: 'ComboboxViewport'
});

defineProps<ComboboxViewportProps>();
</script>

<template>
  <ListboxContent class="soybean-headless-scrollbar-hidden" data-slot="viewport">
    <slot />
  </ListboxContent>
</template>
