<script setup lang="ts">
import { ListboxGroup } from '../listbox';
import type { AutocompleteGroupProps } from './types';

defineOptions({
  name: 'AutocompleteGroup'
});

const props = defineProps<AutocompleteGroupProps>();
</script>

<template>
  <ListboxGroup v-bind="props">
    <slot />
  </ListboxGroup>
</template>
