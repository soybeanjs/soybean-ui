<script setup lang="ts">
import { ref } from 'vue';
import { SMenubar } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';

const trigger = ref<'click' | 'hover'>('hover');

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
  <div class="space-y-2">
    <div class="flex items-center gap-2 text-muted-foreground">
      <span>Trigger</span>
      <span
        v-for="option in ['click', 'hover'] as const"
        :key="option"
        class="cursor-pointer rounded-sm px-1.5 py-0.5 text-sm transition"
        :class="trigger === option ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'"
        @click="trigger = option"
      >
        {{ option }}
      </span>
    </div>
    <SMenubar :trigger="trigger" :items="items" />
  </div>
</template>
