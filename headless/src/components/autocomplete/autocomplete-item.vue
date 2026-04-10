<script setup lang="ts">
import type { SelectEvent } from '../../types';
import { ListboxItem } from '../listbox';
import { useAutocompleteRootContext } from './context';
import type { AutocompleteItemEmits, AutocompleteItemProps } from './types';

defineOptions({
  name: 'AutocompleteItem'
});

withDefaults(defineProps<AutocompleteItemProps>(), {
  as: 'div'
});

const emit = defineEmits<AutocompleteItemEmits>();

const { onOpenChange } = useAutocompleteRootContext('AutocompleteItem');

const onSelect = (event: SelectEvent<string>) => {
  emit('select', event);

  if (event.defaultPrevented) return;

  onOpenChange(false);
};
</script>

<template>
  <ListboxItem
    :as="as"
    :as-child="asChild"
    :value="value"
    :disabled="disabled"
    @select="onSelect"
  >
    <slot />
  </ListboxItem>
</template>
