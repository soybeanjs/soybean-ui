<script setup lang="ts">
import { ListboxGroupLabel } from '../listbox';
import type { AutocompleteGroupLabelProps } from './types';

defineOptions({
  name: 'AutocompleteGroupLabel'
});

const props = defineProps<AutocompleteGroupLabelProps>();
</script>

<template>
  <ListboxGroupLabel v-bind="props">
    <slot />
  </ListboxGroupLabel>
</template>
