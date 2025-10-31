<script setup lang="ts" generic="T extends TreeItemData, U extends MaybeArray<string> | undefined, M extends boolean">
import { computed, nextTick, shallowRef, useTemplateRef } from 'vue';
import type { ComputedRef, ShallowRef } from 'vue';
import { createEventHook } from '@vueuse/core';
import { useControllableState, useTypeahead } from '../../composables';
import { flattenChildren, getActiveElement, isNullish, transformPropsToContext } from '../../shared';
import { MAP_KEY_TO_FOCUS_INTENT } from '../../constants';
import type { MaybeArray, NavigationKey } from '../../types';
import { Primitive } from '../primitive';
import RovingFocusGroup from '../roving-focus/roving-focus-group.vue';
import { provideTreeRootContext, useTreeThemeContext } from './context';
import { useSelectionBehavior } from './hooks';
import { flattenItems } from './shared';
import type { FlattenedItem, TreeItemData, TreeRootEmits, TreeRootProps } from './types';

defineOptions({
  name: 'TreeRoot'
});

const props = withDefaults(defineProps<TreeRootProps<T, U, M>>(), {
  as: 'ul',
  selectionBehavior: 'toggle'
});

const emit = defineEmits<TreeRootEmits<TreeRootProps<T, U, M>['multiple']>>();

const rovingFocusGroupRef = useTemplateRef('rovingFocusGroupRef');
const { handleTypeaheadSearch } = useTypeahead();

const theme = useTreeThemeContext();
const cls = computed(() => theme?.ui?.value?.root);

// Virtualizer
const isVirtual = shallowRef(false);
const virtualKeydownHook = createEventHook<KeyboardEvent>();

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    // @ts-expect-error ignore type
    emit('update:modelValue', value);
  },
  getDefaultValue()
);

const selectedKeys = computed(() => {
  if (props.multiple && Array.isArray(modelValue.value)) {
    return modelValue.value;
  }

  return [modelValue.value];
}) as ComputedRef<string[]>;

const { onSelectItem, handleMultipleReplace } = useSelectionBehavior(
  modelValue,
  () => props.multiple,
  () => props.selectionBehavior
);

function getDefaultValue(): U {
  if (!isNullish(props.defaultValue)) {
    return props.defaultValue as U;
  }

  return (props.multiple ? [] : undefined) as U;
}

const expanded = useControllableState(
  () => props.expanded,
  value => {
    emit('update:expanded', value ?? []);
  },
  props.defaultExpanded ?? []
) as ShallowRef<string[]>;

const expandedItems = computed(() => flattenItems(props.items, expanded.value));

const onKeydown = (event: KeyboardEvent) => {
  if (isVirtual.value) {
    virtualKeydownHook.trigger(event);
  } else {
    const collections = rovingFocusGroupRef.value?.getItems() ?? [];
    handleTypeaheadSearch(event.key, collections);
  }
};

const onKeydownNavigation = (event: KeyboardEvent) => {
  if (isVirtual.value) return;

  const intent = MAP_KEY_TO_FOCUS_INTENT[event.key as NavigationKey];
  nextTick(() => {
    handleMultipleReplace(
      intent,
      getActiveElement(),
      expandedItems.value.map(item => item.value),
      rovingFocusGroupRef.value?.getItems
    );
  });
};

const onBubbleSelect = (item: FlattenedItem<T>) => {
  if (!item.parent || !props.multiple || !Array.isArray(modelValue.value)) return;

  const parentItem = expandedItems.value.find(i => {
    return item.parent && i.value === item.parent.value;
  });

  if (!parentItem) return;

  const mValue = modelValue.value as string[];

  const isAllSelected = parentItem.data.children?.every(i => mValue.find(v => v === i.value));

  if (isAllSelected) {
    modelValue.value = [...mValue, parentItem.data.value] as U;
  } else {
    modelValue.value = mValue.filter(v => v !== parentItem.data.value) as U;
  }

  onBubbleSelect(parentItem);
};

const onSelect = (value: string) => {
  onSelectItem(value);

  if (props.bubbleSelect && props.multiple && Array.isArray(modelValue.value)) {
    const item = expandedItems.value.find(i => i.value === value);
    if (item) {
      onBubbleSelect(item);
    }
  }

  if (props.propagateSelect && props.multiple && Array.isArray(modelValue.value)) {
    const item = expandedItems.value.find(i => i.value === value);
    if (!item) return;

    const children = flattenChildren(item.data.children);

    const exist = modelValue.value.includes(value);
    if (exist) {
      modelValue.value = modelValue.value.filter(v => !children.some(child => child.value === v)) as U;
    } else {
      modelValue.value = [...modelValue.value, ...children] as U;
    }
  }
};

const onToggle = (value: string) => {
  const item = expandedItems.value.find(i => i.value === value);

  if (!item?.data?.children) return;

  if (expanded.value.includes(value)) {
    expanded.value = expanded.value.filter(v => v !== value);
  } else {
    expanded.value = [...expanded.value, value];
  }
};

provideTreeRootContext({
  modelValue,
  expanded,
  selectedKeys,
  onSelect,
  onToggle,
  expandedItems,
  isVirtual,
  virtualKeydownHook,
  getItems: () => rovingFocusGroupRef.value?.getItems() ?? [],
  handleMultipleReplace,
  ...transformPropsToContext(props, [
    'items',
    'multiple',
    'disabled',
    'selectionBehavior',
    'propagateSelect',
    'bubbleSelect',
    'dir'
  ])
});
</script>

<template>
  <RovingFocusGroup ref="rovingFocusGroupRef" as-child orientation="vertical" :dir="dir">
    <Primitive
      :class="cls"
      :as="as"
      :as-child="asChild"
      :aria-multiselectable="multiple ? true : undefined"
      role="tree"
      @keydown="onKeydown"
      @keydown.up.down.shift="onKeydownNavigation"
    >
      <slot :flatten-items="expandedItems" :model-value="modelValue" :expanded="expanded" />
    </Primitive>
  </RovingFocusGroup>
</template>
