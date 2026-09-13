<script setup lang="ts">
import { ref } from 'vue';
import { SAppShell, SButtonIcon, SIcon } from '@vean/ui';
import type { PageTabsOptionData } from '@vean/ui';
import { appShellItems } from './menu';

const active = ref('overview');

const tabs: PageTabsOptionData[] = [
  {
    value: 'overview',
    label: 'Overview',
    icon: 'lucide:layout-dashboard',
    pinned: true,
    hidePinnedIcon: true
  },
  {
    value: 'projects',
    label: 'Projects',
    icon: 'lucide:folder-kanban'
  }
];
</script>

<template>
  <div class="h-120 w-full border border-border border-solid rounded-md overflow-hidden">
    <SAppShell v-model="active" mode="sidebar" :items="appShellItems" :tabs="tabs">
      <template #logo>
        <SIcon icon="lucide:hexagon" class="size-6 text-primary" />
      </template>
      <template #title>
        <span class="truncate font-semibold">Soybean UI</span>
      </template>
      <template #header-end>
        <SButtonIcon icon="lucide:bell" />
        <SButtonIcon icon="lucide:sun-medium" />
      </template>
      <template #footer>© 2026 Soybean UI</template>
      <div class="p-4">
        <p class="text-muted-foreground">Active menu: {{ active }}</p>
      </div>
    </SAppShell>
  </div>
</template>
