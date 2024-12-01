<script setup lang="ts" generic="T extends Record<string, any>, U extends Record<string, any>">
import { computed, nextTick, ref, toRefs } from 'vue';
import type { Ref } from 'vue';
import { createEventHook, useVModel } from '@vueuse/core';
import { useDirection, useSelectionBehavior, useTypeAhead } from '../../composables';
import { flatten } from '../../shared';
import type { NavigationKeys } from '../../types';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { MAP_KEY_TO_FOCUS_INTENT } from '../roving-focus/shared';
import { provideTreeRootContext } from './context';
import type { FlattenedItem, TreeRootContext, TreeRootEmits, TreeRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'TreeRoot'
});

const props = withDefaults(defineProps<TreeRootPropsWithPrimitive<T, U>>(), {
  as: 'ul',
  selectionBehavior: 'toggle',
  getChildren: (val: T) => val.children
});

const emit = defineEmits<TreeRootEmits>();

const { items, multiple, disabled, propagateSelect, dir: propDir } = toRefs(props);
const { handleTypeAheadSearch } = useTypeAhead();
const dir = useDirection(propDir);
const rovingFocusGroupRef = ref<InstanceType<typeof RovingFocusGroup>>();

// Virtualizer
const isVirtual = ref(false);
const virtualKeydownHook = createEventHook<KeyboardEvent>();

const modelValue = useVModel<TreeRootPropsWithPrimitive<T, U>, 'modelValue', 'update:modelValue'>(
  props,
  'modelValue',
  emit,
  {
    defaultValue: props.defaultValue ?? (multiple.value ? [] : undefined),
    passive: (props.modelValue === undefined) as false,
    deep: true
  }
) as Ref<U | U[]>;

const expanded = useVModel<TreeRootPropsWithPrimitive<T, U>, 'expanded', 'update:expanded'>(props, 'expanded', emit, {
  defaultValue: props.defaultExpanded ?? [],
  passive: (props.expanded === undefined) as false,
  deep: true
}) as Ref<string[]>;
const { onSelectItem, handleMultipleReplace } = useSelectionBehavior(modelValue, props);

const selectedKeys = computed(() => {
  if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value.map(i => props.getKey(i as any));
  return [props.getKey((modelValue.value as any) ?? {})];
});

// eslint-disable-next-line default-param-last
function flattenItems(_items: T[], level: number = 1, parentItem?: T): FlattenedItem<T>[] {
  return _items.reduce((acc: FlattenedItem<T>[], item: T, index: number) => {
    const key = props.getKey(item);
    const children = props.getChildren(item);
    const isExpanded = expanded.value.includes(key);

    const flattenedItem: FlattenedItem<T> = {
      _id: key,
      value: item,
      index,
      level,
      parentItem,
      hasChildren: Boolean(children),
      bind: {
        value: item,
        level,
        'aria-setsize': _items.length,
        'aria-posinset': index + 1
      }
    };
    acc.push(flattenedItem);

    if (children && isExpanded) acc.push(...flattenItems(children, level + 1, item));

    return acc;
  }, []);
}

const expandedItems = computed(() => {
  const _items = props.items;
  return flattenItems(_items ?? []);
});

function handleKeydown(event: KeyboardEvent) {
  if (isVirtual.value) {
    virtualKeydownHook.trigger(event);
  } else {
    const collections = rovingFocusGroupRef.value?.getItems().map(i => i.ref);
    handleTypeAheadSearch(event.key, collections);
  }
}

function handleKeydownNavigation(event: KeyboardEvent) {
  if (isVirtual.value) return;

  const intent = MAP_KEY_TO_FOCUS_INTENT[event.key as NavigationKeys];
  nextTick(() => {
    handleMultipleReplace(
      intent,
      document.activeElement,
      rovingFocusGroupRef.value?.getItems as () => { ref: HTMLElement; value?: any }[],
      expandedItems.value.map(i => i.value)
    );
  });
}

provideTreeRootContext({
  modelValue,
  selectedKeys,
  onSelect: val => {
    const condition = (baseValue: U) => props.getKey((baseValue as any) ?? {}) === props.getKey(val as T);
    const exist =
      props.multiple && Array.isArray(modelValue.value) ? modelValue.value?.findIndex(condition) !== -1 : undefined;
    onSelectItem(val as U, condition);

    if (props.propagateSelect && props.multiple && Array.isArray(modelValue.value)) {
      const children = flatten<U, any>(props.getChildren(val as T) ?? []);
      if (exist) {
        // remove all child
        modelValue.value = [...modelValue.value].filter(
          i => !children.some(child => props.getKey((i as any) ?? {}) === props.getKey(child as any))
        );
      } else {
        // select all child
        modelValue.value = [...modelValue.value, ...children];
      }
    }
  },
  expanded,
  onToggle(val) {
    const children = val ? props.getChildren(val as T) : undefined;
    if (!children) return;

    const key = props.getKey(val as T) ?? val;
    if (expanded.value.includes(key)) expanded.value = expanded.value.filter(v => v !== key);
    else expanded.value.push(key);
  },
  getKey: props.getKey,
  getChildren: props.getChildren,
  items,
  expandedItems,
  disabled,
  multiple,
  dir,
  propagateSelect,
  isVirtual,
  virtualKeydownHook,
  handleMultipleReplace
} as TreeRootContext);
</script>

<template>
  <RovingFocusGroup ref="rovingFocusGroupRef" as-child orientation="vertical" :dir="dir">
    <Primitive
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :aria-multiselectable="multiple ? true : undefined"
      role="tree"
      @keydown="handleKeydown"
      @keydown.up.down.shift="handleKeydownNavigation"
    >
      <slot :flatten-items="expandedItems" :model-value="modelValue" :expanded="expanded" />
    </Primitive>
  </RovingFocusGroup>
</template>
