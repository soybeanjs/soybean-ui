<script setup lang="ts">
import { shallowRef } from 'vue';
import { SAppShell, SIcon, SSelect } from '@vean/ui';
import type { AppShellLogoPlacement, AppShellMode } from '@vean/ui';
import { appShellItems } from './menu';

const active = shallowRef('vean-ui');
const mode = shallowRef<AppShellMode>('sidebar');
const placement = shallowRef<AppShellLogoPlacement>('sidebar-bottom');

const modeOptions = [
  { label: 'sidebar', value: 'sidebar' },
  { label: 'dual-vertical', value: 'dual-vertical' }
];

const placementOptions = [
  { label: 'auto', value: 'auto' },
  { label: 'sidebar', value: 'sidebar' },
  { label: 'sidebar-bottom', value: 'sidebar-bottom' },
  { label: 'header', value: 'header' }
];
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-end gap-2">
      <SSelect v-model="mode" :items="modeOptions" :ui="{ trigger: 'w-36' }" />
      <SSelect v-model="placement" :items="placementOptions" :ui="{ trigger: 'w-36' }" />
    </div>
    <div class="h-120 w-full border border-border border-solid rounded-md overflow-hidden">
      <SAppShell v-model="active" :mode="mode" :logo-placement="placement" :items="appShellItems">
        <template #logo>
          <SIcon icon="lucide:hexagon" class="size-6 text-primary" />
        </template>
        <template #title>
          <span class="truncate font-semibold">Vean UI</span>
        </template>
        <div class="p-4">
          <p class="text-muted-foreground">Active menu: {{ active }}</p>
        </div>
      </SAppShell>
    </div>
  </div>
</template>
