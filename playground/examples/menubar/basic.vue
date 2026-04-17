<script setup lang="ts">
import { SMenubar } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';

const items: MenuOptionData<string>[] = [
  {
    value: 'file',
    label: 'File',
    children: [
      { value: 'new-tab', label: 'New Tab', shortcut: '⌘T' },
      { value: 'new-window', label: 'New Window', shortcut: '⌘N', separator: true },
      {
        value: 'share',
        label: 'Share',
        children: [
          { value: 'mail', label: 'Email Link' },
          { value: 'notes', label: 'Notes' }
        ]
      },
      { value: 'print', label: 'Print', shortcut: '⌘P' }
    ]
  },
  {
    value: 'edit',
    label: 'Edit',
    children: [
      { value: 'undo', label: 'Undo', shortcut: '⌘Z' },
      { value: 'redo', label: 'Redo', shortcut: '⇧⌘Z' },
      {
        value: 'find',
        label: 'Find',
        children: [
          { value: 'search-web', label: 'Search the Web' },
          { value: 'find-next', label: 'Find Next' }
        ]
      },
      { value: 'paste', label: 'Paste' }
    ]
  },
  {
    value: 'view',
    label: 'View',
    children: [
      { value: 'reload', label: 'Reload', shortcut: '⌘R' },
      { value: 'fullscreen', label: 'Toggle Fullscreen' },
      { value: 'sidebar', label: 'Hide Sidebar', disabled: true }
    ]
  },
  {
    value: 'github',
    label: 'GitHub',
    href: 'https://github.com/soybeanjs/soybean-ui'
  }
];
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Basic</h3>
    <SMenubar :items="items" show-arrow />
  </div>
</template>
