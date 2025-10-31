<script setup lang="ts">
import { computed } from 'vue';
import { flattenChildren, getActiveElement, handleAndDispatchCustomEvent } from '../../shared';
import type { HorizontalSide, TreeSelectEvent, TreeToggleEvent } from '../../types';
import { Primitive } from '../primitive';
import RovingFocusItem from '../roving-focus/roving-focus-item.vue';
import { useTreeRootContext, useTreeThemeContext } from './context';
import { TREE_SELECT, TREE_TOGGLE } from './shared';
import type { TreeItemEmits, TreeItemProps } from './types';

const props = withDefaults(defineProps<TreeItemProps>(), {
  as: 'li'
});

const emit = defineEmits<TreeItemEmits>();

const {
  modelValue,
  dir,
  selectedKeys,
  expanded,
  expandedItems,
  propagateSelect,
  bubbleSelect,
  onSelect,
  onToggle,
  getItems
} = useTreeRootContext('TreeItem');

const theme = useTreeThemeContext();

const cls = computed(() => theme?.ui?.value?.item);

const itemData = computed(() => ({
  value: props.value
}));

const currentItem = computed(() => expandedItems.value.find(item => item.value === props.value));

const hasChildren = computed(() => Boolean(currentItem.value?.hasChildren));

const isExpanded = computed(() => expanded.value?.includes(props.value) ?? false);

const isSelected = computed(() => selectedKeys.value.includes(props.value));

const isIndeterminate = computed(() => {
  if (!currentItem.value || !hasChildren.value || !Array.isArray(modelValue.value)) return undefined;

  const children = flattenChildren(currentItem.value.data.children);

  if (bubbleSelect.value) {
    return (
      children.some(child => selectedKeys.value.includes(child.value)) &&
      !children.every(child => selectedKeys.value.includes(child.value))
    );
  } else if (propagateSelect.value && isSelected.value) {
    return !children.every(child => selectedKeys.value.includes(child.value));
  }

  return undefined;
});

const onKeydownRight = (event: KeyboardEvent) => {
  if (!hasChildren.value) return;

  if (isExpanded.value) {
    const nextElement = getNextElement('right');
    nextElement?.focus?.();
  } else {
    handleToggleCustomEvent(event);
  }
};

const onKeydownLeft = (event: KeyboardEvent) => {
  if (isExpanded.value) {
    handleToggleCustomEvent(event);
  } else {
    const nextElement = getNextElement('left');
    nextElement?.focus?.();
  }
};

const onKeydown = (event: KeyboardEvent, direction: HorizontalSide) => {
  if (direction === 'right') {
    if (dir.value === 'ltr') {
      onKeydownRight(event);
    } else {
      onKeydownLeft(event);
    }

    return;
  }

  if (dir.value === 'ltr') {
    onKeydownLeft(event);
  } else {
    onKeydownRight(event);
  }
};

function getNextElement(direction: HorizontalSide) {
  const collection = getItems?.()?.map(item => item.element) ?? [];
  const currentElement = getActiveElement() as HTMLElement;
  const currentIndex = collection.indexOf(currentElement);
  let list = [...collection];
  if (direction === 'left') {
    list = list.slice(0, currentIndex).reverse();
  } else {
    list = list.slice(currentIndex);
  }

  const nextLevel = direction === 'left' ? props.level - 1 : props.level + 1;

  const nextElement = list.find(el => Number(el.getAttribute('data-indent')) === nextLevel);

  return nextElement;
}

async function handleSelect(event: TreeSelectEvent<string>) {
  emit('select', event);
  if (event?.defaultPrevented) return;

  onSelect(props.value);
}

function handleToggle(event: TreeToggleEvent<string>) {
  emit('toggle', event);
  if (event?.defaultPrevented) return;

  onToggle(props.value);
}

async function handleSelectCustomEvent(event?: PointerEvent | KeyboardEvent) {
  if (!event) return;

  const eventDetail = {
    originalEvent: event,
    value: props.value,
    isExpanded: isExpanded.value,
    isSelected: isSelected.value
  };
  handleAndDispatchCustomEvent(TREE_SELECT, handleSelect, eventDetail);
}

function handleToggleCustomEvent(event?: PointerEvent | KeyboardEvent) {
  if (!event) return;

  const eventDetail = {
    originalEvent: event,
    value: props.value,
    isExpanded: isExpanded.value,
    isSelected: isSelected.value
  };
  handleAndDispatchCustomEvent(TREE_TOGGLE, handleToggle, eventDetail);
}

const onClick = (event: PointerEvent) => {
  handleSelectCustomEvent(event);
  handleToggleCustomEvent(event);
};

const select = () => {
  onSelect(props.value);
};

const toggle = () => {
  onToggle(props.value);
};
</script>

<template>
  <RovingFocusItem as-child :item-data="itemData" allow-shift-key>
    <Primitive
      :class="cls"
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
      @keydown.right.prevent="onKeydown($event, 'right')"
      @keydown.left.prevent="onKeydown($event, 'left')"
      @click.stop="onClick"
    >
      <slot
        :is-expanded="isExpanded"
        :is-selected="isSelected"
        :is-indeterminate="isIndeterminate"
        :select="select"
        :toggle="toggle"
      />
    </Primitive>
  </RovingFocusItem>
</template>
