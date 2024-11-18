<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed, nextTick, reactive, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { createEventHook, useVModel } from '@vueuse/core';
import { useDirection, useFilter, usePrimitiveElement } from '../../composables';
import { PopperRoot } from '../popper';
import { ListboxRoot } from '../listbox';
import type { AcceptableValue, GenericComponentInstance } from '../../types';
import { provideComboboxRootContext } from './context';
import type { ComboboxRootEmits, ComboboxRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ComboboxRootPropsWithPrimitive<T>>(), {
  open: undefined,
  resetSearchTermOnBlur: true
});

const emit = defineEmits<ComboboxRootEmits<T>>();

const { primitiveElement, currentElement: parentElement } =
  usePrimitiveElement<GenericComponentInstance<typeof ListboxRoot>>();
const { multiple, disabled, ignoreFilter, dir: propDir } = toRefs(props);

const dir = useDirection(propDir);

const modelValue = defineModel<T | T[]>('modelValue', {
  default: (props.defaultValue ?? multiple.value) ? [] : undefined
});

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

const resetSearchTerm = createEventHook();
const isUserInputted = ref(false);
const isVirtual = ref(false);
const inputElement = ref<HTMLInputElement>();

const highlightedElement = computed(() => primitiveElement.value?.highlightedElement ?? undefined);

const allItems = ref<Map<string, string>>(new Map());
const allGroups = ref<Map<string, Set<string>>>(new Map());

const { contains } = useFilter({ sensitivity: 'base' });

const filterState = reactive({
  search: '',
  filtered: {
    /** The count of all visible items. */
    count: 0,
    /** Map from visible item id to its search score. */
    items: new Map() as Map<string, number>,
    /** Set of groups with at least one visible item. */
    groups: new Set() as Set<string>
  }
});

async function onOpenChange(val: boolean) {
  open.value = val;
  filterState.search = '';

  if (val) {
    primitiveElement.value?.highlightSelected();
    isUserInputted.value = true;
  } else {
    isUserInputted.value = false;
  }

  inputElement.value?.focus();
  setTimeout(() => {
    if (!val && props.resetSearchTermOnBlur) resetSearchTerm.trigger();
  }, 1);
}

function filterItems() {
  if (!filterState.search || props.ignoreFilter || isVirtual.value) {
    filterState.filtered.count = allItems.value.size;
    // Do nothing, each item will know to show itself because search is empty
    return;
  }

  // Reset the groups
  filterState.filtered.groups = new Set();
  let itemCount = 0;

  // Check which items should be included
  for (const [id, value] of allItems.value) {
    const score = contains(value, filterState.search);
    filterState.filtered.items.set(id, score ? 1 : 0);
    if (score) itemCount++;
  }

  // Check which groups have at least 1 item shown
  for (const [groupId, group] of allGroups.value) {
    for (const itemId of group) {
      if (filterState.filtered.items.get(itemId)! > 0) {
        filterState.filtered.groups.add(groupId);
        break;
      }
    }
  }

  filterState.filtered.count = itemCount;
}

watch(
  () => filterState.search,
  () => {
    filterItems();
  },
  { immediate: true }
);

watch(
  () => open.value,
  () => {
    // nextTick to allow multiple items to be mounted first
    nextTick(() => {
      if (open.value) filterItems();
    });
  },
  { flush: 'post' }
);

defineExpose({
  highlightedElement,
  highlightItem: primitiveElement.value?.highlightItem,
  highlightFirstItem: primitiveElement.value?.highlightFirstItem,
  highlightSelected: primitiveElement.value?.highlightSelected
});

provideComboboxRootContext({
  modelValue,
  multiple,
  disabled,
  open,
  onOpenChange,
  contentId: '',
  isUserInputted,
  isVirtual,
  inputElement,
  highlightedElement,
  onInputElementChange: val => (inputElement.value = val),
  parentElement,
  onResetSearchTerm: resetSearchTerm.on,
  allItems,
  allGroups,
  filterState,
  ignoreFilter
});
</script>

<template>
  <PopperRoot>
    <ListboxRoot
      ref="primitiveElement"
      v-bind="$attrs"
      v-model="modelValue"
      :style="{
        pointerEvents: open ? 'auto' : undefined
      }"
      :as
      :as-child
      :dir="dir"
      :multiple="multiple"
      :name="name"
      :required="required"
      :disabled="disabled"
      @highlight="emit('highlight', $event as any)"
    >
      <slot :open="open" :model-value="modelValue" />
    </ListboxRoot>
  </PopperRoot>
</template>
