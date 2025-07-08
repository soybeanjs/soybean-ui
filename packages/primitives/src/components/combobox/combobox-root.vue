<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed, getCurrentInstance, nextTick, onMounted, ref, toRefs } from 'vue';
import type { Ref } from 'vue';
import { createEventHook, useVModel } from '@vueuse/core';
import { useDirection, useFilter, usePrimitiveElement } from '../../composables';
import type { AcceptableValue, GenericComponentInstance } from '../../types';
import { ListboxRoot } from '../listbox';
import { PopperRoot } from '../popper';
import { provideComboboxRootContext } from './context';
import type { ComboboxRootEmits, ComboboxRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ComboboxRootPropsWithPrimitive<T>>(), {
  modelValue: undefined,
  open: undefined,
  resetSearchTermOnBlur: true,
  resetSearchTermOnSelect: true
});

const emit = defineEmits<ComboboxRootEmits<T>>();

type Slots = {
  default: (props: { modelValue: T | T[] | undefined; open: boolean }) => any;
};

defineSlots<Slots>();

const { primitiveElement, currentElement: parentElement } =
  usePrimitiveElement<GenericComponentInstance<typeof ListboxRoot>>();
const { multiple, disabled, ignoreFilter, resetSearchTermOnSelect, dir: propDir } = toRefs(props);

const dir = useDirection(propDir);

const modelValue = useVModel<ComboboxRootPropsWithPrimitive<T>, 'modelValue', 'update:modelValue'>(
  props,
  'modelValue',
  emit,
  {
    defaultValue: props.defaultValue ?? (multiple.value ? [] : undefined),
    passive: (props.modelValue === undefined) as false
  }
) as Ref<T | T[]>;

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

const resetSearchTerm = createEventHook();
const isUserInputted = ref(false);
const isVirtual = ref(false);
const inputElement = ref<HTMLInputElement>();
const triggerElement = ref<HTMLElement>();

const highlightedElement = computed(() => primitiveElement.value?.highlightedElement ?? undefined);

const allItems = ref<Map<string, string>>(new Map());
const allGroups = ref<Map<string, Set<string>>>(new Map());

const { contains } = useFilter({ sensitivity: 'base' });

const filterSearch = ref('');

const filterState = computed<{
  count: number;
  items: Map<string, number>;
  groups: Set<string>;
}>(oldValue => {
  if (!filterSearch.value || props.ignoreFilter || isVirtual.value) {
    // Do nothing, each item will know to show itself because search is empty
    return {
      count: allItems.value.size,
      items: oldValue?.items ?? new Map(),
      groups: oldValue?.groups ?? new Set(allGroups.value.keys())
    };
  }

  let itemCount = 0;
  const filteredItems = new Map<string, number>();
  const filteredGroups = new Set<string>();

  // Check which items should be included
  for (const [id, value] of allItems.value) {
    const score = contains(value, filterSearch.value);
    filteredItems.set(id, score ? 1 : 0);
    if (score) itemCount++;
  }

  // Check which groups have at least 1 item shown
  for (const [groupId, group] of allGroups.value) {
    for (const itemId of group) {
      if (filteredItems.get(itemId)! > 0) {
        filteredGroups.add(groupId);
        break;
      }
    }
  }

  return {
    count: itemCount,
    items: filteredItems,
    groups: filteredGroups
  };
});

async function onOpenChange(val: boolean) {
  open.value = val;
  filterSearch.value = '';

  if (val) {
    // make sure dom is ready then only highlight the selected
    await nextTick();
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

const inst = getCurrentInstance();
onMounted(() => {
  if (inst?.exposed) {
    inst.exposed.highlightItem = primitiveElement.value?.highlightItem;
    inst.exposed.highlightFirstItem = primitiveElement.value?.highlightFirstItem;
    inst.exposed.highlightSelected = primitiveElement.value?.highlightSelected;
  }
});

defineExpose({
  filtered: filterState,
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
  onInputElementChange: val => {
    inputElement.value = val;
  },
  triggerElement,
  onTriggerElementChange: val => {
    triggerElement.value = val;
  },
  parentElement,
  resetSearchTermOnSelect,
  onResetSearchTerm: resetSearchTerm.on,
  allItems,
  allGroups,
  filterSearch,
  filterState,
  ignoreFilter
});
</script>

<template>
  <PopperRoot>
    <ListboxRoot
      v-bind="$attrs"
      ref="primitiveElement"
      v-model="modelValue"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :dir="dir"
      :disabled="disabled"
      :multiple="multiple"
      :name="name"
      :required="required"
      highlight-on-hover
      :by="by"
      :style="{
        pointerEvents: open ? 'auto' : undefined
      }"
      @highlight="emit('highlight', $event as any)"
    >
      <slot :open="open" :model-value="modelValue" />
    </ListboxRoot>
  </PopperRoot>
</template>
