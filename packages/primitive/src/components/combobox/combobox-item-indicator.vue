<script lang="ts">
import type { ListboxItemIndicatorProps } from '../listbox';
</script>

<script setup lang="ts">
import { ListboxItemIndicator } from '../listbox';

export interface ComboboxItemIndicatorProps extends ListboxItemIndicatorProps {}

const props = withDefaults(defineProps<ComboboxItemIndicatorProps>(), {
  as: 'span'
});
</script>

<template>
  <ListboxItemIndicator v-bind="props">
    <slot />
  </ListboxItemIndicator>
</template>
