<script setup lang="ts">
import { computed, onMounted, onUnmounted, useId } from 'vue';
import type { SelectEvent } from '../../types';
import { useExposedElement, useOmitProps } from '../../composables';
import { ListboxItem } from '../listbox';
import { useListboxGroupContext, useListboxRootContext } from '../listbox/context';
import { useComboboxRootContext } from './context';
import type { ComboboxItemEmits, ComboboxItemProps } from './types';

defineOptions({
  name: 'ComboboxItem'
});

const props = defineProps<ComboboxItemProps>();

const emit = defineEmits<ComboboxItemEmits>();

const forwardedProps = useOmitProps(props, ['textValue']);

const { isMultiple } = useListboxRootContext('ComboboxItem');
const {
  disabled: rootDisabled,
  isVirtual,
  ignoreFilter,
  filterSearch,
  filterState,
  allItems,
  allGroups,
  inputElement,
  resetSearchTermOnSelect,
  onOpenChange
} = useComboboxRootContext('ComboboxItem');
const groupContext = useListboxGroupContext();

const itemId = `soybean-combobox-item-${useId()}`;

const [itemElement, setItemElement] = useExposedElement();

if (props.value === '') {
  throw new Error('A <ComboboxItem /> must have a value prop that is not an empty string.');
}

const text = computed(() => props.textValue ?? itemElement.value?.textContent?.trim() ?? props.value);

const disabled = computed(() => rootDisabled.value ?? props.disabled);

const visible = computed(() => {
  if (isVirtual.value || ignoreFilter.value || !filterSearch.value) {
    return true;
  }

  const matched = filterState.value.items.get(itemId);

  if (matched === undefined) {
    return true;
  }

  return matched > 0;
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
</script>

<template>
  <ListboxItem
    v-if="visible"
    v-bind="forwardedProps"
    :ref="setItemElement"
    :value="value"
    :disabled="disabled"
    data-slot="item"
    @select="onSelect"
  >
    <slot />
  </ListboxItem>
</template>
