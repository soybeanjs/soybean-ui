<script setup lang="ts" generic="T extends PageTabsOptionData = PageTabsOptionData">
import { computed, shallowRef, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import ContextMenuCompact from '../context-menu/context-menu-compact.vue';
import type { MenuOptionData } from '../menu/types';
import { usePageTabsUi } from './context';
import { usePageTabsState } from './hooks';
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

const getItemSlotProps = (item: T, index: number): PageTabsCompactItemSlotProps<T> => ({
  item,
  index,
  active: modelValue.value === item.value,
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
  <PageTabsRoot v-bind="forwardedProps" v-model="modelValue">
    <PageTabsItem
      v-for="(item, index) in items"
      v-bind="props.itemProps"
      :key="item.value"
      :value="item.value"
      :pinned="item.pinned"
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
</template>
