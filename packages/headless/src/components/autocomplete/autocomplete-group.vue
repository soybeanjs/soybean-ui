<script setup lang="ts">
import { ComboboxGroup } from '../combobox';
import type { AutocompleteGroupProps } from './types';

defineOptions({
  name: 'AutocompleteGroup'
});

const props = defineProps<AutocompleteGroupProps>();
</script>

<template>
  <ComboboxGroup v-bind="props" data-soybean-autocomplete-group>
    <slot />
  </ComboboxGroup>
</template>
