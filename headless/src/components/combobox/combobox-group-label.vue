<script setup lang="ts">
import { ListboxGroupLabel } from '../listbox';
import type { ComboboxGroupLabelProps } from './types';

defineOptions({
  name: 'ComboboxGroupLabel'
});

const props = defineProps<ComboboxGroupLabelProps>();
</script>

<template>
  <ListboxGroupLabel v-bind="props" data-slot="group-label">
    <slot />
  </ListboxGroupLabel>
</template>
