<script setup lang="ts">
import { ref } from 'vue';
import { SBreadcrumb, SIcon, SLayout, SLayoutTrigger, STreeMenu } from '@soybeanjs/ui';
import type { BreadcrumbOptionData } from '@soybeanjs/ui';
import { appShellItems } from './menu';

const open = ref(true);

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
</script>

<template>
  <div class="h-120 w-full border border-border border-solid rounded-md overflow-hidden">
    <!--
 The same shell assembled by hand: layout regions, trigger, menu, breadcrumb,
         widths, and region classes are all composed by the caller. 
-->
    <SLayout
      v-model:open="open"
      :sidebar-width="240"
      :collapsed-sidebar-width="50"
      :ui="{
        header: 'bg-background border-b border-border',
        content: 'bg-background'
      }"
    >
      <template #sidebar="{ open: sidebarOpen, collapsedSidebarWidth }">
        <div class="flex h-[--soybean-layout-header-height] shrink-0 items-center gap-2 px-[--sl-spacing]">
          <SIcon icon="lucide:hexagon" class="size-6 shrink-0 text-primary" />
          <span v-if="sidebarOpen" class="truncate font-semibold">Soybean UI</span>
        </div>
        <STreeMenu
          v-model="active"
          side="left"
          :items="appShellItems"
          :collapsed="!sidebarOpen"
          :collapsed-width="collapsedSidebarWidth"
        />
      </template>
      <template #header>
        <div class="flex w-full items-center gap-2 px-[--sl-spacing]">
          <SLayoutTrigger />
          <SBreadcrumb :items="breadcrumbs" />
        </div>
      </template>
      <div class="p-4">
        <p class="text-muted-foreground">Active menu: {{ active }}</p>
      </div>
    </SLayout>
  </div>
</template>
