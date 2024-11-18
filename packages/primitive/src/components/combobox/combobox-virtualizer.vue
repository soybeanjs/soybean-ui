<script setup lang="ts"></script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import type { VirtualItem, Virtualizer } from '@tanstack/vue-virtual';
import ListboxVirtualizer, { type ListboxVirtualizerProps } from '../listbox/listbox-virtualizer.vue';
import type { AcceptableValue } from '../../composables/types';
import { injectComboboxRootContext } from './combobox-root.vue';
export interface ComboboxVirtualizerProps<T extends AcceptableValue = AcceptableValue>
  extends ListboxVirtualizerProps<T> {}

const props = defineProps<ComboboxVirtualizerProps<T>>();

defineSlots<{
  default: (props: { option: T; virtualizer: Virtualizer<Element | Window, Element>; virtualItem: VirtualItem }) => any;
}>();

const rootContext = injectComboboxRootContext();
// set virtual true when this component mounted
rootContext.isVirtual.value = true;
</script>

<template>
  <ListboxVirtualizer v-slot="slotProps" v-bind="props">
    <slot v-bind="slotProps" />
  </ListboxVirtualizer>
</template>
