<script setup lang="ts">
import { ListboxGroupLabel } from '../listbox';
import type { ComboboxGroupLabelProps } from './types';

defineOptions({
  name: 'ComboboxGroupLabel'
});

defineProps<ComboboxGroupLabelProps>();
</script>

<template>
  <ListboxGroupLabel>
    <slot />
  </ListboxGroupLabel>
</template>
