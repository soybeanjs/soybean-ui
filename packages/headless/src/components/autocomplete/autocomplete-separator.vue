<script setup lang="ts">
import { ComboboxSeparator } from '../combobox';
import type { AutocompleteSeparatorProps } from './types';

defineOptions({
  name: 'AutocompleteSeparator'
});

const props = defineProps<AutocompleteSeparatorProps>();
</script>

<template>
  <ComboboxSeparator v-bind="props" data-soybean-autocomplete-separator>
    <slot />
  </ComboboxSeparator>
</template>
