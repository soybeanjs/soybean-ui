<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import type { AcceptableValue } from '../../types';
import { ListboxVirtualizer } from '../listbox';
import { injectComboboxRootContext } from './context';
import type { ComboboxVirtualizerProps } from './types';

defineOptions({
  name: 'ComboboxVirtualizer'
});

const props = defineProps<ComboboxVirtualizerProps<T>>();

const rootContext = injectComboboxRootContext();
// set virtual true when this component mounted
rootContext.isVirtual.value = true;
</script>

<template>
  <ListboxVirtualizer v-slot="slotProps" v-bind="props">
    <slot v-bind="slotProps" />
  </ListboxVirtualizer>
</template>
