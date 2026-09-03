<script setup lang="ts">
import { computed } from 'vue';
import { useSortable } from '@dnd-kit/vue/sortable';
import { toContext } from '../../shared';
import { useForwardElement } from '../../composables';
import RovingFocusItem from '../roving-focus/roving-focus-item.vue';
import { usePageTabsUi, usePageTabsRootContext, providePageTabsItemContext } from './context';
import type { PageTabsItemProps, PageTabsItemEmits } from './types';

defineOptions({
  name: 'PageTabsItem'
});

const props = withDefaults(defineProps<PageTabsItemProps>(), {
  as: 'button',
  draggable: false
});

const emit = defineEmits<PageTabsItemEmits>();

const cls = usePageTabsUi('item');
const { middleClickClose, modelValue } = usePageTabsRootContext('PageTabsItem');

const isSelected = computed(() => props.value === modelValue.value);
const closable = computed(() => !props.pinned);

// Drag wiring — enabled only when the compact owns a DragDropProvider.
// A non-draggable tab is fully disabled (boolean form): it cannot be dragged
// AND it is excluded from collision candidates, so no other tab can be
// dropped onto it — the tab is locked in place. Pinned tabs stay sortable
// and reorder within the pinned zone only (cross-zone drops are blocked by
// the compact layer through the dragover hook).
const [itemElement, setItemElement] = useForwardElement<HTMLElement>();

const { isDragging, isDropTarget, isDragSource } = useSortable({
  id: computed(() => props.value),
  index: computed(() => props.index ?? 0),
  disabled: computed(() => !props.draggable),
  element: itemElement
});

const onClick = () => {
  if (isSelected.value) return;

  modelValue.value = props.value;
  emit('click');
};

const onClose = async () => {
  if (!closable.value) return;

  emit('close');
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    onClick();

    return;
  }
  if (event.key === 'Backspace') {
    onClose();
  }
};

const onMouseDown = (event: MouseEvent) => {
  if (event.button === 1 && middleClickClose.value) {
    event.preventDefault();
    onClose();
  }
};

const onPin = () => {
  emit('pin', !props.pinned);
};

providePageTabsItemContext({
  ...toContext(props, ['pinned']),
  closable,
  onClose,
  onPin
});
</script>

<template>
  <RovingFocusItem
    :ref="setItemElement"
    :class="cls"
    data-soybean-page-tabs-item
    :data-value="value"
    :data-selected="isSelected"
    :data-pinned="pinned"
    :data-draggable="draggable"
    :data-dragging="isDragging"
    :data-drop-target="isDropTarget || undefined"
    :data-drag-source="isDragSource || undefined"
    :active="isSelected"
    :focusable="true"
    @click="onClick"
    @mousedown="onMouseDown"
    @keydown.enter.backspace="onKeydown"
  >
    <slot />
  </RovingFocusItem>
</template>
