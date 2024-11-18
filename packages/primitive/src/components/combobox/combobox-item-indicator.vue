<script setup lang="ts">
import { ListboxItemIndicator } from '../listbox';
import type { ComboboxItemIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxItemIndicator'
});

const props = withDefaults(defineProps<ComboboxItemIndicatorPropsWithPrimitive>(), {
  as: 'span'
});
</script>

<template>
  <ListboxItemIndicator v-bind="props">
    <slot />
  </ListboxItemIndicator>
</template>
