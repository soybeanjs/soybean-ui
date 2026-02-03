<script setup lang="ts" generic="T extends PageTabsOptionData">
import { computed, shallowRef, useTemplateRef, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { PageTabsRoot, PageTabsItem, PageTabsClose, PageTabsPin, providePageTabsUi } from '@soybeanjs/headless';
import { useOmitProps, useControllableState } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { pageTabsVariants } from '@/variants/page-tabs';
import Icon from '../icon/icon.vue';
import ContextMenu from '../context-menu/context-menu.vue';
import type {
  PageTabsProps,
  PageTabsEmits,
  PageTabsOptionData,
  PageTabsState,
  PageTabsContextMenuOptionData
} from './types';

defineOptions({
  name: 'SPageTabs'
});

const props = withDefaults(defineProps<PageTabsProps<T>>(), {
  variant: 'chrome'
});

const emit = defineEmits<PageTabsEmits<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'variant', 'ui', 'items', 'menuFactory']);

const rootRef = useTemplateRef('root');

const items = useControllableState(
  () => props.items,
  value => {
    emit('update:items', value);
  },
  []
);

const values = computed({
  get: () => items.value.map(item => item.value),
  set: (vals: string[]) => {
    const updated = items.value.filter(item => vals.includes(item.value));
    items.value = updated;
  }
});

const pins = computed({
  get: () => items.value.filter(item => item.pinned).map(item => item.value),
  set: (vals: string[]) => {
    const updated = items.value.map(item => ({
      ...item,
      pinned: vals.includes(item.value)
    }));
    items.value = updated;
  }
});

const currentTab: ShallowRef<T | null> = shallowRef(null);

const contextMenus = computed(() => {
  if (!currentTab.value || !rootRef.value?.operations) {
    return [];
  }

  const {
    pinTab,
    unpinTab,
    closeTab,
    closeLeftTabs,
    closeRightTabs,
    closeOtherTabs,
    closeAllTabs,
    canCloseTab,
    canCloseLeftTabs,
    canCloseRightTabs,
    canCloseOtherTabs,
    canCloseAllTabs
  } = rootRef.value.operations;

  const value = currentTab.value.value;

  const state: PageTabsState = {
    pinTab: () => {
      pinTab(value);
    },
    unpinTab: () => {
      unpinTab(value);
    },
    closeTab: async () => {
      await closeTab(value);
    },
    closeLeftTabs: () => {
      closeLeftTabs(value);
    },
    closeRightTabs: () => {
      closeRightTabs(value);
    },
    closeOtherTabs: () => {
      closeOtherTabs(value);
    },
    closeAllTabs: () => {
      closeAllTabs();
    },
    canCloseTab: canCloseTab(value),
    canCloseLeftTabs: canCloseLeftTabs(value),
    canCloseRightTabs: canCloseRightTabs(value),
    canCloseOtherTabs: canCloseOtherTabs(value),
    canCloseAllTabs: canCloseAllTabs()
  };

  return props.menuFactory?.(currentTab.value, state) ?? [];
});

const reference = shallowRef<HTMLElement | null>(null);

const onPointerEnter = (event: PointerEvent, tab: T) => {
  reference.value = event.currentTarget as HTMLElement;
  currentTab.value = tab;
};

const handleSelect = (menu: PageTabsContextMenuOptionData) => {
  if (!currentTab.value) {
    return;
  }

  menu.action();
};

function sortItems(items: T[]) {
  const hidePinnedItems: T[] = [];
  const pinnedItems: T[] = [];
  const normalItems: T[] = [];

  items.forEach(item => {
    if (item.pinned) {
      if (item.hidePinnedIcon) {
        hidePinnedItems.push(item);
      } else {
        pinnedItems.push(item);
      }
    } else {
      normalItems.push(item);
    }
  });

  const result = [...hidePinnedItems, ...pinnedItems, ...normalItems];

  const hasChanged =
    result.length !== items.length ||
    result.some((item, index) => {
      return item.value !== items[index].value;
    });

  return hasChanged ? result : items;
}

const ui = computed(() => {
  const variants = pageTabsVariants({
    size: props.size,
    variant: props.variant
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

watchEffect(() => {
  // Ensure items are sorted when items change
  items.value = sortItems(items.value);
});

providePageTabsUi(ui);

defineExpose({
  operations: rootRef.value?.operations
});
</script>

<template>
  <PageTabsRoot
    ref="root"
    v-bind="forwardedProps"
    v-model:values="values"
    v-model:pins="pins"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <PageTabsItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      @close="emit('close', item)"
      @pin="emit('pin', item)"
      @pointerenter="event => onPointerEnter(event, item)"
    >
      <Icon :icon="item.icon" />
      <span :class="ui.itemText">{{ item.label }}</span>
      <PageTabsPin as-child v-if="!item.hidePinnedIcon">
        <Icon icon="lucide:pin" />
      </PageTabsPin>
      <PageTabsClose as-child>
        <Icon icon="lucide:x" />
      </PageTabsClose>

      <template v-if="variant === 'chrome'">
        <svg height="100%" width="100%" viewBox="0 0 8 8" :class="ui.chromeBgLeft">
          <path d="M 0 8 A 8 8 0 0 0 8 0 L 8 8 Z" />
        </svg>
        <svg height="100%" width="100%" viewBox="0 0 8 8" :class="ui.chromeBgRight">
          <path d="M 0 0 A 8 8 0 0 0 8 8 L 0 8 Z" />
        </svg>
      </template>
      <div v-if="variant === 'slider'" :class="ui.sliderIndicator"></div>
    </PageTabsItem>

    <ContextMenu :modal="false" :items="contextMenus" :trigger-props="{ reference }" @select="handleSelect" />
  </PageTabsRoot>
</template>
