<script setup lang="ts">
import { SCommand } from '@soybeanjs/ui';
import type { CommandOptionData, SelectEvent } from '@soybeanjs/ui';

const items: CommandOptionData[] = [
  {
    label: 'Suggestions',
    value: 'suggestions',
    separator: true,
    items: [
      {
        label: 'Calendar',
        value: 'calendar',
        icon: 'lucide:calendar'
      },
      {
        label: 'Search Emoji',
        value: 'search-emoji',
        icon: 'lucide:smile'
      },
      {
        label: 'Launch',
        value: 'launch',
        icon: 'lucide:rocket'
      }
    ]
  },
  {
    label: 'Settings',
    value: 'settings',
    separator: true,
    items: [
      {
        label: 'Profile',
        value: 'profile',
        icon: 'lucide:user',
        shortcut: ['command', 'p']
      },
      {
        label: 'Mail',
        value: 'mail',
        icon: 'lucide:mail',
        shortcut: ['command', 'm']
      },
      {
        label: 'Settings',
        value: 'settings',
        icon: 'lucide:settings',
        shortcut: ['command', 's']
      }
    ]
  },
  {
    label: 'Help',
    value: 'help',
    icon: 'lucide:help-circle',
    shortcut: ['command', 'h']
  }
];

function handleSelect(item: SelectEvent<string>) {
  console.log(item.detail.value);
}
</script>

<template>
  <div>
    <h3 class="playground-title">Base</h3>
    <div class="w-80 lt-md:w-auto">
      <SCommand class="border rounded-lg shadow-md" :items="items" @select="handleSelect" />
    </div>
  </div>
</template>
