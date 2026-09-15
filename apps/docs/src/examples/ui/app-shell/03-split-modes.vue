<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { SAppShell, SIcon, SSelect, SSwitch } from '@soybeanjs/ui';
import type { AppShellMode, SelectOptionData } from '@soybeanjs/ui';
import { appShellItems } from './menu';

const modes: SelectOptionData<AppShellMode>[] = [
  { value: 'dual-vertical', label: 'dual-vertical' },
  { value: 'vertical-horizontal', label: 'vertical-horizontal' },
  { value: 'horizontal-vertical', label: 'horizontal-vertical' },
  { value: 'horizontal-dual-vertical', label: 'horizontal-dual-vertical' }
];

// The four split modes are `SplitNavMode` literals: one menu tree renders across
// independent panes, and the shell decides which region each pane mounts into.
const mode = shallowRef<AppShellMode>('dual-vertical');

const active = ref('soybean-ui');

// Collapsing a split mode keeps the first-level rail and shows the nested pane
// as an overlay, so the sidebar never reserves an empty column.
const open = ref(true);
</script>

<template>
  <div class="space-y-4">
    <div class="flex-y-center flex-wrap gap-4">
      <SSelect v-model="mode" :items="modes" class="w-60" />
      <div class="flex-y-center gap-2">
        <span>open:</span>
        <SSwitch v-model="open" class="items-center" />
      </div>
    </div>
    <div class="h-120 w-full border border-border border-solid rounded-md overflow-hidden">
      <SAppShell v-model="active" v-model:open="open" :mode="mode" :items="appShellItems">
        <template #logo="{ collapsed }">
          <SIcon icon="lucide:hexagon" class="size-6 shrink-0 text-primary" />
          <span v-if="!collapsed" class="truncate font-semibold">Soybean UI</span>
        </template>
        <template #header-end>
          <SIcon icon="lucide:bell" class="size-4.5 text-muted-foreground" />
        </template>
        <div class="p-4">
          <p class="text-muted-foreground">Active menu: {{ active }}</p>
        </div>
      </SAppShell>
    </div>
  </div>
</template>
