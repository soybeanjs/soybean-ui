<script setup lang="ts">
import { SMenubar } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';

const items: MenuOptionData<string>[] = [
  {
    value: 'file',
    label: 'File',
    children: [
      { value: 'new-tab', label: 'New Tab' },
      { value: 'new-window', label: 'New Window' }
    ]
  },
  {
    value: 'edit',
    label: 'Edit',
    children: [
      { value: 'undo', label: 'Undo' },
      { value: 'redo', label: 'Redo' }
    ]
  },
  {
    value: 'view',
    label: 'View',
    children: [
      { value: 'reload', label: 'Reload' },
      { value: 'sidebar', label: 'Show Sidebar' }
    ]
  }
];
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">RTL</h3>
    <SMenubar dir="rtl" :items="items" />
  </div>
</template>
