<script setup lang="ts">
import { watch } from 'vue';
import { ListboxFilter } from '../listbox';
import { useListboxRootContext } from '../listbox/context';
import { useComboboxRootContext } from './context';
import type { ComboboxInputEmits, ComboboxInputProps } from './types';

defineOptions({
  name: 'ComboboxInput'
});

const props = defineProps<ComboboxInputProps>();

const emit = defineEmits<ComboboxInputEmits>();

const { highlightFirstItem } = useListboxRootContext('ComboboxInput');
const { filterSearch, onInputElementChange, open } = useComboboxRootContext('ComboboxInput');

watch(open, value => {
  if (value) {
    highlightFirstItem();
  }
});
</script>

<template>
  <ListboxFilter
    v-bind="props"
    v-model="filterSearch"
    :input-ref="onInputElementChange"
    role="combobox"
    aria-autocomplete="list"
    autocomplete="off"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template #leading="slotProps">
      <slot name="leading" v-bind="slotProps" />
    </template>
    <template #trailing="slotProps">
      <slot name="trailing" v-bind="slotProps" />
    </template>
  </ListboxFilter>
</template>
