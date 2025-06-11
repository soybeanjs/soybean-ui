<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from 'vue';
import { useCollection } from '../../composables';
import { flatten, getActiveElement, handleAndDispatchCustomEvent } from '../../shared';
import type { TreeSelectEvent, TreeToggleEvent } from '../../types';
import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { injectTreeRootContext } from './context';
import type { TreeItemEmits, TreeItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'TreeItem',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TreeItemPropsWithPrimitive<T>>(), {
  as: 'li'
});

const emit = defineEmits<TreeItemEmits<T>>();

type Slots = {
  default: (props: {
    isExpanded: boolean;
    isSelected: boolean;
    isIndeterminate: boolean | undefined;
    handleToggle: () => void;
    handleSelect: () => void;
  }) => any;
};

defineSlots<Slots>();

const rootContext = injectTreeRootContext();
const { getItems } = useCollection();

const hasChildren = computed(() => Boolean(rootContext.getChildren(props.value)));

const isExpanded = computed(() => {
  const key = rootContext.getKey(props.value);
  return rootContext.expanded.value.includes(key);
});

const isSelected = computed(() => {
  const key = rootContext.getKey(props.value);
  return rootContext.selectedKeys.value.includes(key);
});

const isIndeterminate = computed(() => {
  if (rootContext.bubbleSelect.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) {
    const children = flatten<T, any>(rootContext.getChildren(props.value) || []);

    return (
      children.some(child =>
        rootContext.modelValue.value.find((v: any) => rootContext.getKey(v) === rootContext.getKey(child))
      ) &&
      !children.every(child =>
        rootContext.modelValue.value.find((v: any) => rootContext.getKey(v) === rootContext.getKey(child))
      )
    );
  } else if (
    rootContext.propagateSelect.value &&
    isSelected.value &&
    hasChildren.value &&
    Array.isArray(rootContext.modelValue.value)
  ) {
    const children = flatten<T, any>(rootContext.getChildren(props.value) || []);

    return !children.every(child =>
      rootContext.modelValue.value.find((v: any) => rootContext.getKey(v) === rootContext.getKey(child))
    );
  }

  return undefined;
});

function handleKeydownRight(ev: KeyboardEvent) {
  if (!hasChildren.value) return;

  if (isExpanded.value) {
    // go to first child
    const collection = getItems().map(i => i.ref);
    const currentElement = getActiveElement() as HTMLElement;
    const currentIndex = collection.indexOf(currentElement);
    const list = [...collection].slice(currentIndex);
    const nextElement = list.find(el => Number(el.getAttribute('data-indent')) === props.level + 1);

    if (nextElement) nextElement.focus();
  } else {
    //  open expanded
    handleToggleCustomEvent(ev);
  }
}

function handleKeydownLeft(ev: KeyboardEvent) {
  if (isExpanded.value) {
    //  close expanded
    handleToggleCustomEvent(ev);
  } else {
    // go back to parent
    const collection = getItems().map(i => i.ref);
    const currentElement = getActiveElement() as HTMLElement;
    const currentIndex = collection.indexOf(currentElement);
    const list = [...collection].slice(0, currentIndex).reverse();
    const parentElement = list.find(el => Number(el.getAttribute('data-indent')) === props.level - 1);

    if (parentElement) parentElement.focus();
  }
}

async function handleSelect(ev: TreeSelectEvent<T>) {
  emit('select', ev);
  if (ev?.defaultPrevented) return;

  rootContext.onSelect(props.value);
}
async function handleToggle(ev: TreeToggleEvent<T>) {
  emit('toggle', ev);
  if (ev?.defaultPrevented) return;

  rootContext.onToggle(props.value);
}

const TREE_SELECT = 'tree.select';
const TREE_TOGGLE = 'tree.toggle';

async function handleSelectCustomEvent(ev?: PointerEvent | KeyboardEvent) {
  if (!ev) return;

  const eventDetail = {
    originalEvent: ev,
    value: props.value,
    isExpanded: isExpanded.value,
    isSelected: isSelected.value
  };
  handleAndDispatchCustomEvent(TREE_SELECT, handleSelect, eventDetail);
}

async function handleToggleCustomEvent(ev?: PointerEvent | KeyboardEvent) {
  if (!ev) return;

  const eventDetail = {
    originalEvent: ev,
    value: props.value,
    isExpanded: isExpanded.value,
    isSelected: isSelected.value
  };
  handleAndDispatchCustomEvent(TREE_TOGGLE, handleToggle, eventDetail);
}

defineExpose({
  isExpanded,
  isSelected,
  isIndeterminate,
  handleToggle: () => rootContext.onToggle(props.value),
  handleSelect: () => rootContext.onSelect(props.value)
});
</script>

<template>
  <RovingFocusItem as-child :value="value" allow-shift-key>
    <Primitive
      v-bind="$attrs"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :aria-selected="isSelected"
      :aria-expanded="hasChildren ? isExpanded : undefined"
      :aria-level="level"
      :data-indent="level"
      :data-selected="isSelected ? '' : undefined"
      :data-expanded="isExpanded ? '' : undefined"
      role="treeitem"
      @keydown.enter.space.self.prevent="handleSelectCustomEvent"
      @keydown.right.prevent="ev => (rootContext.dir.value === 'ltr' ? handleKeydownRight(ev) : handleKeydownLeft(ev))"
      @keydown.left.prevent="ev => (rootContext.dir.value === 'ltr' ? handleKeydownLeft(ev) : handleKeydownRight(ev))"
      @click.stop="
        ev => {
          handleSelectCustomEvent(ev);
          handleToggleCustomEvent(ev);
        }
      "
    >
      <slot
        :is-expanded="isExpanded"
        :is-selected="isSelected"
        :is-indeterminate="isIndeterminate"
        :handle-select="() => rootContext.onSelect(value)"
        :handle-toggle="() => rootContext.onToggle(value)"
      />
    </Primitive>
  </RovingFocusItem>
</template>
