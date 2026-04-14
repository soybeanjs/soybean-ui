<script setup lang="ts">
import { computed, onMounted, onUnmounted, useId } from 'vue';
import type { SelectEvent } from '../../types';
import { ListboxItem } from '../listbox';
import { useListboxGroupContext, useListboxRootContext } from '../listbox/context';
import { useComboboxRootContext } from './context';
import type { ComboboxItemEmits, ComboboxItemProps } from './types';

defineOptions({
  name: 'ComboboxItem'
});

const props = defineProps<ComboboxItemProps>();

const emit = defineEmits<ComboboxItemEmits>();

const { isMultiple } = useListboxRootContext('ComboboxItem');
const {
  filterSearch,
  filterState,
  ignoreFilter,
  inputElement,
  onOpenChange,
  allItems,
  allGroups,
  resetSearchTermOnSelect
} = useComboboxRootContext('ComboboxItem');
const groupContext = useListboxGroupContext();

const itemId = `soybean-combobox-item-${useId()}`;

const text = computed(() => props.textValue ?? props.value);
const visible = computed(() => {
  if (!filterSearch.value || ignoreFilter.value) {
    return true;
  }

  return filterState.value.items.get(itemId) ?? true;
});

const removeGroupItem = () => {
  const groupId = groupContext?.id;
  if (!groupId) {
    return;
  }

  const items = allGroups.value.get(groupId);
  if (!items) {
    return;
  }

  items.delete(itemId);
  if (!items.size) {
    allGroups.value.delete(groupId);
  }
};

onMounted(() => {
  allItems.value.set(itemId, text.value);

  const groupId = groupContext?.id;
  if (groupId) {
    const items = allGroups.value.get(groupId) ?? new Set<string>();

    items.add(itemId);
    allGroups.value.set(groupId, items);
  }
});

onUnmounted(() => {
  allItems.value.delete(itemId);
  removeGroupItem();
});

const onSelect = (event: SelectEvent<string>) => {
  emit('select', event);
  if (event.defaultPrevented) {
    return;
  }

  if (resetSearchTermOnSelect.value) {
    filterSearch.value = '';
  }

  if (isMultiple.value) {
    inputElement.value?.focus();
    return;
  }

  onOpenChange(false);
};
</script>

<template>
  <ListboxItem v-if="visible" :as="as" :as-child="asChild" :value="value" :disabled="disabled" @select="onSelect">
    <slot />
  </ListboxItem>
</template>
