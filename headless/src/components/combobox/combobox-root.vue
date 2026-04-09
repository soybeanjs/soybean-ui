<script setup lang="ts" generic="M extends boolean = false">
import { computed, shallowRef, watch } from 'vue';
import { useForwardListeners, useOmitProps, useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { providePopoverRootContext } from '../popover/context';
import { PopperRoot } from '../popper';
import { ListboxRoot } from '../listbox';
import { provideComboboxRootContext } from './context';
import type { ComboboxRootEmits, ComboboxRootProps } from './types';

defineOptions({
  name: 'ComboboxRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ComboboxRootProps<M>>(), {
  open: undefined,
  defaultOpen: false,
  ignoreFilter: false,
  resetSearchTermOnBlur: true,
  resetSearchTermOnSelect: true
});

const emit = defineEmits<ComboboxRootEmits<M>>();

const forwardedProps = useOmitProps(props, [
  'open',
  'defaultOpen',
  'ignoreFilter',
  'resetSearchTermOnBlur',
  'resetSearchTermOnSelect'
]);

const listeners = useForwardListeners(emit);

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const inputElement = shallowRef<HTMLInputElement>();
const filterSearch = shallowRef('');
const allItems = shallowRef<Map<string, string>>(new Map());
const allGroups = shallowRef<Map<string, Set<string>>>(new Map());

const filterState = computed(() => {
  if (!filterSearch.value || props.ignoreFilter) {
    return {
      count: allItems.value.size,
      items: new Map(Array.from(allItems.value.keys(), key => [key, true])),
      groups: new Set(allGroups.value.keys())
    };
  }

  const keyword = filterSearch.value.trim().toLowerCase();
  const items = new Map<string, boolean>();
  const groups = new Set<string>();
  let count = 0;

  for (const [id, text] of allItems.value) {
    const matched = text.toLowerCase().includes(keyword);

    items.set(id, matched);
    if (matched) {
      count += 1;
    }
  }

  for (const [groupId, itemIds] of allGroups.value) {
    for (const itemId of itemIds) {
      if (items.get(itemId)) {
        groups.add(groupId);
        break;
      }
    }
  }

  return {
    count,
    items,
    groups
  };
});

const modal = computed(() => false);

providePopoverRootContext({
  modal,
  open
});

provideComboboxRootContext({
  ...transformPropsToContext(props, ['dir', 'ignoreFilter', 'resetSearchTermOnBlur', 'resetSearchTermOnSelect']),
  open,
  onOpenChange(value) {
    open.value = value;
  },
  inputElement,
  onInputElementChange(node) {
    inputElement.value = node;
  },
  filterSearch,
  allItems,
  allGroups,
  filterState
});

watch(open, value => {
  if (!value && props.resetSearchTermOnBlur) {
    filterSearch.value = '';
  }
});
</script>

<template>
  <PopperRoot>
    <ListboxRoot v-bind="forwardedProps" :dir="dir" v-on="listeners">
      <slot :open="Boolean(open)" :search-term="filterSearch" />
    </ListboxRoot>
  </PopperRoot>
</template>
