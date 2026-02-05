<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { SPageTabs, SSelect } from '@soybeanjs/ui';
import type {
  PageTabsOptionData,
  SelectOptionData,
  PageTabsVariant,
  PageTabsState,
  PageTabsContextMenuOptionData,
  SButton
} from '@soybeanjs/ui';

const variant = ref<PageTabsVariant>('chrome');

const variants: SelectOptionData<PageTabsVariant>[] = [
  { value: 'chrome', label: 'Chrome' },
  { value: 'card', label: 'Card' },
  { value: 'slider', label: 'Slider' }
];

const modelValue = ref<string>('home');

const items: Ref<PageTabsOptionData[]> = ref([
  { value: 'home', label: 'Home', icon: 'lucide:house', pinned: true, hidePinnedIcon: true },
  { value: 'profile', label: 'Profile', icon: 'lucide:user' },
  { value: 'manage', label: 'Manage', icon: 'lucide:settings', pinned: true },
  { value: 'doc', label: 'Doc', icon: 'lucide:file-text' },
  { value: 'about', label: 'About', icon: 'lucide:info' }
]);

const addTab = () => {
  const newTab: PageTabsOptionData = {
    value: `new-tab-${items.value.length + 1}`,
    label: `New Tab ${items.value.length + 1}`,
    icon: 'lucide:file-plus'
  };
  items.value.push(newTab);
  modelValue.value = newTab.value;
};

const menuFactory = (tab: PageTabsOptionData, state: PageTabsState) => {
  const {
    closeTab,
    pinTab,
    unpinTab,
    closeLeftTabs,
    closeRightTabs,
    closeOtherTabs,
    closeAllTabs,
    canCloseTab,
    canCloseLeftTabs,
    canCloseRightTabs,
    canCloseOtherTabs,
    canCloseAllTabs
  } = state;

  const menus: PageTabsContextMenuOptionData[] = [
    {
      label: 'Close',
      value: 'close',
      icon: 'lucide:x',
      disabled: !canCloseTab,
      action: closeTab
    }
  ];

  if (tab.pinned) {
    menus.push({
      label: 'Unpin',
      value: 'unpin',
      icon: 'lucide:pin-off',
      action: unpinTab
    });
  } else {
    menus.push({
      label: 'Pin',
      value: 'pin',
      icon: 'lucide:pin',
      action: pinTab
    });
  }

  menus.push(
    {
      label: 'Close Left',
      value: 'closeLeft',
      icon: 'lucide:arrow-left-to-line',
      disabled: !canCloseLeftTabs,
      action: closeLeftTabs
    },
    {
      label: 'Close Right',
      value: 'closeRight',
      icon: 'lucide:arrow-right-to-line',
      disabled: !canCloseRightTabs,
      action: closeRightTabs
    },
    {
      label: 'Close Others',
      value: 'closeOther',
      icon: 'lucide:fold-horizontal',
      disabled: !canCloseOtherTabs,
      action: closeOtherTabs
    },
    {
      label: 'Close All',
      value: 'closeAll',
      icon: 'lucide:arrow-right-left',
      disabled: !canCloseAllTabs,
      action: closeAllTabs
    }
  );

  return menus;
};
</script>

<template>
  <div>
    <div class="flex-y-center justify-between">
      <h3 class="playground-title">Base</h3>
      <SSelect v-model="variant" :items="variants" class="w-30" />
    </div>
    <SPageTabs
      v-model="modelValue"
      v-model:items="items"
      :variant="variant"
      :menu-factory="menuFactory"
      class="h-12 px-2 border rounded-sm"
    />
    <SButton variant="pure" class="mt-4" @click="addTab">Add Tab</SButton>
  </div>
</template>
