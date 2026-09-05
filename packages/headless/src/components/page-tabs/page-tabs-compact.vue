<script setup lang="ts" generic="T extends PageTabsOptionData = PageTabsOptionData">
import { computed, shallowRef, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { PointerActivationConstraints } from '@dnd-kit/dom';
import { DragDropProvider, KeyboardSensor, PointerSensor } from '@dnd-kit/vue';
import type { DragEndEvent, DragMoveEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/vue';
import { isSortable } from '@dnd-kit/vue/sortable';
import { arrayMove } from '../../shared';
import { useControllableState, useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import ContextMenuCompact from '../context-menu/context-menu-compact.vue';
import type { MenuOptionData } from '../menu/types';
import { usePageTabsUi } from './context';
import { usePageTabsState, getPageTabZone } from './hooks';
import PageTabsClose from './page-tabs-close.vue';
import PageTabsItem from './page-tabs-item.vue';
import PageTabsPin from './page-tabs-pin.vue';
import PageTabsRoot from './page-tabs-root.vue';
import type {
  PageTabsCompactItemSlotProps,
  PageTabsCompactProps,
  PageTabsCompactEmits,
  PageTabsCompactSlots,
  PageTabsContextMenuOptionData,
  PageTabsDragEvent,
  PageTabsOptionData
} from './types';

defineOptions({
  name: 'PageTabsCompact'
});

const props = withDefaults(defineProps<PageTabsCompactProps<T>>(), {
  modelValue: undefined,
  beforeClose: () => true
});

const emit = defineEmits<PageTabsCompactEmits<T>>();

defineSlots<PageTabsCompactSlots<T>>();

const forwardedProps = useOmitProps(props, ['items', 'menuFactory', 'beforeClose']);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  ''
);

const items = useControllableState(
  () => props.items,
  value => {
    emit('update:items', value);
  },
  []
);

const { closeTab, pinTab, sortTabs, getState } = usePageTabsState<T>({
  items,
  modelValue,
  beforeClose: props.beforeClose
});

const currentTab: ShallowRef<T | null> = shallowRef(null);
const reference = shallowRef<HTMLElement | null>(null);

const ui = usePageTabsUi();

const contextMenus = computed(() => {
  if (!currentTab.value || !props.menuFactory) {
    return [];
  }

  return props.menuFactory(currentTab.value, getState(currentTab.value));
});

// Pointer drags only start after a small movement so a plain click on a tab
// (activate / close / pin) is never swallowed.
const sensors = [
  PointerSensor.configure({
    activationConstraints: [new PointerActivationConstraints.Distance({ value: 4 })]
  }),
  KeyboardSensor
];

// Horizontal sorting via @dnd-kit/vue.  The OptimisticSortingPlugin (bundled
// by default) already reorders the DOM in real time while dragging; here we
// commit the projected order into the `items` ref so the Vue state matches.
function onDragEnd(event: DragEndEvent) {
  if (event.canceled) return;

  const { source, target } = event.operation;

  if (!source || !target || !isSortable(source) || !isSortable(target)) return;
  if (source.sortable === target.sortable) return;

  const current = items.value;
  const from = source.sortable.initialIndex;
  const to = source.sortable.index;

  if (from === to) return;

  items.value = arrayMove(current, from, to);

  const item = items.value[to];

  if (item) {
    emit('tabDragReorder', { item, index: to });
  }
}

// Zone-restricted sorting (browser tab bar behavior): tabs may only reorder
// within their own zone — pinned first, then unpinned — so the pinned group
// always stays aggregated at the front. Calling preventDefault() on the
// dragover event makes the OptimisticSortingPlugin
// skip its real-time reorder, so the dragged tab halts at the zone boundary
// instead of snapping back after drop.
function handleDragOver(event: DragOverEvent) {
  const { source, target } = event.operation;

  if (!source || !target || !isSortable(source) || !isSortable(target)) return;
  if (source.sortable === target.sortable) return;

  const sourceItem = items.value.find(tab => tab.value === String(source.id));
  const targetItem = items.value.find(tab => tab.value === String(target.id));

  if (!sourceItem || !targetItem) return;

  if (getPageTabZone(sourceItem) !== getPageTabZone(targetItem)) {
    event.preventDefault();
  }
}

const getDragPayload = (event: { operation: { source?: unknown } }): PageTabsDragEvent<T> | null => {
  const source = event.operation.source as { id?: unknown; sortable?: { index?: number } } | undefined;

  if (!source) return null;

  const item = items.value.find(tab => tab.value === String(source.id));

  if (!item) return null;

  // Live projected index while dragging; falls back to the committed index
  // once the sortable projection is no longer available (after drag end).
  const index = source.sortable?.index ?? items.value.findIndex(tab => tab.value === item.value);

  return { item, index };
};

const handleDragStart = (event: DragStartEvent) => {
  const payload = getDragPayload(event);

  if (payload) {
    emit('tabDragStart', payload);
  }
};

const handleDragMove = (event: DragMoveEvent) => {
  const payload = getDragPayload(event);

  if (payload) {
    emit('tabDragMove', payload);
  }
};

const handleDragEnd = (event: DragEndEvent) => {
  onDragEnd(event);

  const payload = getDragPayload(event);

  if (payload) {
    emit('tabDragEnd', payload);
  }
};

const getItemSlotProps = (item: T, index: number): PageTabsCompactItemSlotProps<T> => ({
  item,
  index,
  selected: modelValue.value === item.value,
  closable: !item.pinned
});

const handleItemClick = (item: T) => {
  emit('click', item);
};

const handleItemClose = (item: T) => {
  closeTab(item.value, () => {
    emit('close', item);
  });
};

const handleItemPin = (item: T, pinned: boolean) => {
  pinTab(item, pinned);
  emit('pin', item);
};

const handleItemPointerEnter = (event: PointerEvent, item: T) => {
  reference.value = event.currentTarget as HTMLElement;
  currentTab.value = item;

  emit('contextmenu', item);
};

const handleSelect = async (menu: MenuOptionData<string | number>, _event: Event) => {
  if (!currentTab.value) {
    return;
  }

  const item = menu as PageTabsContextMenuOptionData;

  await item.action?.();

  emit('selectContextMenu', item, currentTab.value);
};

watchEffect(() => {
  sortTabs();
});
</script>

<template>
  <DragDropProvider
    :sensors="sensors"
    @drag-over="handleDragOver"
    @drag-start="handleDragStart"
    @drag-move="handleDragMove"
    @drag-end="handleDragEnd"
  >
    <PageTabsRoot v-bind="forwardedProps" v-model="modelValue">
      <PageTabsItem
        v-for="(item, index) in items"
        v-bind="props.itemProps"
        :key="item.value"
        :value="item.value"
        :pinned="item.pinned"
        :draggable="props.draggable && item.draggable !== false"
        :index="index"
        @click="handleItemClick(item)"
        @close="handleItemClose(item)"
        @pin="handleItemPin(item, $event)"
        @pointerenter="handleItemPointerEnter($event, item)"
      >
        <slot name="item" v-bind="getItemSlotProps(item, index)">
          <slot name="icon" v-bind="getItemSlotProps(item, index)">
            <Icon v-if="item.icon" :icon="item.icon" />
          </slot>
          <slot name="label" v-bind="getItemSlotProps(item, index)">
            <span :class="ui.itemText">{{ item.label }}</span>
          </slot>
          <PageTabsPin v-if="!item.hidePinnedIcon" v-bind="props.pinProps">
            <slot name="pin-icon">
              <Icon icon="lucide:pin" />
            </slot>
          </PageTabsPin>
          <PageTabsClose v-bind="props.closeProps">
            <slot name="close-icon">
              <Icon icon="lucide:x" />
            </slot>
          </PageTabsClose>
          <slot name="indicator" v-bind="getItemSlotProps(item, index)" />
        </slot>
      </PageTabsItem>

      <ContextMenuCompact
        v-if="contextMenus.length"
        v-bind="contextMenuProps"
        :modal="false"
        :items="contextMenus"
        :trigger-props="{ reference }"
        @select="handleSelect"
      >
        <template #trigger />
      </ContextMenuCompact>
    </PageTabsRoot>
  </DragDropProvider>
</template>
