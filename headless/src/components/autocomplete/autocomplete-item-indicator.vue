<script setup lang="ts">
import { ListboxItemIndicator } from '../listbox';
import type { AutocompleteItemIndicatorProps } from './types';

defineOptions({
  name: 'AutocompleteItemIndicator'
});

const props = defineProps<AutocompleteItemIndicatorProps>();
</script>

<template>
  <ListboxItemIndicator v-bind="props">
    <slot />
  </ListboxItemIndicator>
</template>
