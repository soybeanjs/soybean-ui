<script setup lang="ts">
import { ListboxVirtualizer } from '../listbox';
import { useComboboxRootContext } from './context';
import type { ComboboxVirtualizerProps } from './types';

defineOptions({
  name: 'ComboboxVirtualizer'
});

const props = defineProps<ComboboxVirtualizerProps>();

const { isVirtual } = useComboboxRootContext('ComboboxVirtualizer');

isVirtual.value = true;
</script>

<template>
  <ListboxVirtualizer v-slot="slotProps" v-bind="props" data-slot="virtualizer">
    <slot v-bind="slotProps" />
  </ListboxVirtualizer>
</template>
