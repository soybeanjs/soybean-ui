<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { SPageTabs, SSelect } from '@soybeanjs/ui';
import type { PageTabsOptionData, SelectOptionData, PageTabsVariant, MenuOptionData } from '@soybeanjs/ui';

const variant = ref<PageTabsVariant>('chrome');

const variants: SelectOptionData<PageTabsVariant>[] = [
  { value: 'chrome', label: 'Chrome' },
  { value: 'card', label: 'Card' },
  { value: 'slider', label: 'Slider' }
];

const items: Ref<PageTabsOptionData[]> = ref([
  { value: 'home', label: 'Home', icon: 'lucide:house', closable: false },
  { value: 'tab2', label: 'Tab 2', icon: 'lucide:file-text' },
  { value: 'tab3', label: 'Tab 3', icon: 'lucide:file-text' }
]);

const pins = ref<string[]>(['tab2']);

const enterValue = ref<string>('');

const setEnterValue = (value: string) => {
  enterValue.value = value;
};

const pinned = computed(() => {
  return pins.value.includes(enterValue.value);
});

type Action = 'close' | 'closeAll' | 'pin' | 'unpin';

const menus = computed(() => {
  const items: MenuOptionData<Action>[] = [
    { value: 'close', label: 'Close Tab', icon: 'lucide:x', disabled: pinned.value },
    { value: 'closeAll', label: 'Close All Tabs', icon: 'lucide:trash' },
    pinned.value
      ? { value: 'unpin', label: 'Unpin Tab', icon: 'lucide:pin-off' }
      : { value: 'pin', label: 'Pin Tab', icon: 'lucide:pin' }
  ];

  return items;
});

const actions: Record<Action, () => void> = {
  close: () => {
    onClose(enterValue.value);
  },
  closeAll: () => {
    items.value = items.value.filter(item => pins.value.includes(item.value) || item.closable === false);
  },
  pin: () => {
    if (!pins.value.includes(enterValue.value)) {
      pins.value.push(enterValue.value);
    }
  },
  unpin: () => {
    pins.value = pins.value.filter(value => value !== enterValue.value);
  }
};

const onClose = (value: string) => {
  items.value = items.value.filter(item => item.value !== value);
};

const onSelect = (menu: MenuOptionData<Action>) => {
  actions[menu.value]();
};
</script>

<template>
  <div>
    <div class="flex-y-center justify-between">
      <h3 class="playground-title">Base</h3>
      <SSelect v-model="variant" :items="variants" class="w-30" />
    </div>
    <SPageTabs
      default-value="home"
      v-model:pins="pins"
      :variant="variant"
      :items="items"
      :context-menus="menus"
      class="h-12 px-2 border rounded-sm"
      @close="onClose"
      @enter-item="setEnterValue"
      @select-context-menu="onSelect"
    />
  </div>
</template>
