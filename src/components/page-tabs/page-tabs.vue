<script setup lang="ts" generic="T extends PageTabsOptionData">
import { computed, shallowRef, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { PageTabsRoot, PageTabsItem, PageTabsClose, PageTabsPin, providePageTabsUi } from '@soybeanjs/headless';
import { useOmitProps, useControllableState } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { pageTabsVariants } from '@/variants/page-tabs';
import Icon from '../icon/icon.vue';
import ContextMenu from '../context-menu/context-menu.vue';
import { usePageTabsState } from './hooks';
import type { PageTabsProps, PageTabsEmits, PageTabsOptionData, PageTabsContextMenuOptionData } from './types';

defineOptions({
  name: 'SPageTabs'
});

const props = withDefaults(defineProps<PageTabsProps<T>>(), {
  variant: 'chrome',
  beforeClose: () => true
});

const emit = defineEmits<PageTabsEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'variant',
  'ui',
  'modelValue',
  'items',
  'menuFactory',
  'beforeClose'
]);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? '');
  },
  ''
) as ShallowRef<string>;

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

const contextMenus = computed(() => {
  if (!currentTab.value || !props.menuFactory) return [];

  const state = getState(currentTab.value);

  return props.menuFactory(currentTab.value, state);
});

const onCloseTab = (tab: T) => {
  closeTab(tab.value, () => {
    emit('close', tab);
  });
};

const onPinTab = (tab: T, pinned: boolean) => {
  pinTab(tab, pinned);

  emit('pin', tab);
};

const onPointerEnter = (event: PointerEvent, tab: T) => {
  reference.value = event.currentTarget as HTMLElement;
  currentTab.value = tab;

  emit('contextmenu', tab);
};

const handleSelect = async (menu: PageTabsContextMenuOptionData) => {
  if (!currentTab.value) return;

  await menu.action?.();
  emit('select-context-menu', menu, currentTab.value);
};

const ui = computed(() => {
  const variants = pageTabsVariants({
    size: props.size,
    variant: props.variant
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

watchEffect(() => {
  sortTabs();
});

providePageTabsUi(ui);
</script>

<template>
  <PageTabsRoot ref="root" v-bind="forwardedProps" v-model="modelValue">
    <PageTabsItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :pinned="item.pinned"
      @click="emit('click', item)"
      @close="onCloseTab(item)"
      @pin="onPinTab(item, $event)"
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

    <ContextMenu
      v-if="contextMenus.length"
      :modal="false"
      :items="contextMenus"
      :trigger-props="{ reference }"
      @select="handleSelect"
    />
  </PageTabsRoot>
</template>
