<script setup lang="ts">
import { ref } from 'vue';
import { SAppShell, SButtonIcon, SIcon } from '@soybeanjs/ui';
import type { BreadcrumbOptionData, PageTabsOptionData } from '@soybeanjs/ui';
import { appShellItems } from './menu';

const active = ref('overview');

const breadcrumbs: BreadcrumbOptionData[] = [
  {
    label: 'Home',
    value: 'home',
    icon: 'lucide:house'
  },
  {
    label: 'Overview',
    value: 'overview',
    icon: 'lucide:layout-dashboard'
  }
];

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
    <SAppShell v-model="active" mode="sidebar" :items="appShellItems" :breadcrumbs="breadcrumbs" :tabs="tabs">
      <template #logo="{ collapsed }">
        <SIcon icon="lucide:hexagon" class="size-6 shrink-0 text-primary" />
        <span v-if="!collapsed" class="truncate font-semibold">Soybean UI</span>
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
