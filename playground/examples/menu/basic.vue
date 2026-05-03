<script setup lang="ts">
import { SMenuOptions } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';

const items: MenuOptionData<string>[] = [
  { label: 'My Account', value: 'my-account', isGroupLabel: true },
  { label: 'Profile', value: 'profile', icon: 'lucide:user', shortcut: '⇧⌘P' },
  { label: 'Settings', value: 'settings', icon: 'lucide:settings', shortcut: '⌘S' },
  {
    label: 'Theme',
    value: 'theme',
    children: [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' }
    ]
  }
];

function handleSelect(item: MenuOptionData<string>) {
  console.log('Selected:', item.value);
}
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="w-72">
      <SMenuOptions :items="items" @select="handleSelect" />
    </div>
  </div>
</template>
