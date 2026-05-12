<script setup lang="ts">
import { ref } from 'vue';
import { SMenubar } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';

const currentMenu = ref('');

const items: MenuOptionData<string>[] = [
  {
    value: 'project',
    label: 'Project',
    children: [
      { value: 'open', label: 'Open Project' },
      {
        value: 'recent',
        label: 'Recent Projects',
        children: [
          { value: 'alpha', label: 'Alpha' },
          { value: 'beta', label: 'Beta' }
        ]
      }
    ]
  },
  {
    value: 'edit',
    label: 'Edit',
    children: [
      { value: 'cut', label: 'Cut' },
      { value: 'copy', label: 'Copy' },
      { value: 'paste', label: 'Paste' }
    ]
  },
  {
    value: 'help',
    label: 'Help',
    children: [
      { value: 'docs', label: 'Documentation' },
      { value: 'issues', label: 'Report an Issue' }
    ]
  }
];
</script>

<template>
  <div>
    <div class="pb-2 text-muted-foreground">Active menu: {{ currentMenu }}</div>
    <SMenubar v-model="currentMenu" :items="items" />
  </div>
</template>
