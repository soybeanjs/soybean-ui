<script setup lang="ts">
import { computed, watch } from 'vue';
import { ListboxFilter } from '../listbox';
import { useListboxRootContext } from '../listbox/context';
import { usePopoverRootContext } from '../popover/context';
import type { InputControlProps } from '../input/types';
import { useComboboxRootContext } from './context';
import type { ComboboxInputEmits, ComboboxInputProps } from './types';

defineOptions({
  name: 'ComboboxInput'
});

const props = defineProps<ComboboxInputProps>();

const emit = defineEmits<ComboboxInputEmits>();

const { highlightFirstItem } = useListboxRootContext('ComboboxInput');
const { filterSearch, onInputElementChange, open } = useComboboxRootContext('ComboboxInput');
const { popupId } = usePopoverRootContext('ComboboxInput');

const controlProps = computed<InputControlProps>(() => ({
  ...props.controlProps,
  role: 'combobox',
  'aria-autocomplete': 'list',
  autocomplete: 'off',
  'aria-controls': popupId.value,
  'aria-expanded': open.value || false
}));

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
    :control-props="controlProps"
    :input-ref="onInputElementChange"
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
