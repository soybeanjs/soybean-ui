<script setup lang="ts">
import { ListboxItemIndicator } from '../listbox';
import type { ComboboxItemIndicatorProps } from './types';

defineOptions({
  name: 'ComboboxItemIndicator'
});

withDefaults(defineProps<ComboboxItemIndicatorProps>(), {
  as: 'span'
});
</script>

<template>
  <ListboxItemIndicator :as="as" :as-child="asChild" data-slot="item-indicator">
    <slot />
  </ListboxItemIndicator>
</template>
