<script setup lang="ts">
import { ref } from 'vue';
import { SAppShell, SButtonIcon, SIcon } from '@vean/ui';
import { appShellItems } from './menu';

const active = ref('overview');
</script>

<template>
  <div class="space-y-4">
    <div class="h-120 w-full border border-border border-solid rounded-md overflow-hidden">
      <SAppShell v-model="active" mode="top" :items="appShellItems">
        <template #logo>
          <SIcon icon="lucide:hexagon" class="size-6 text-primary" />
        </template>
        <template #title>
          <span class="truncate font-semibold">Soybean UI</span>
        </template>
        <template #header-end>
          <SButtonIcon icon="lucide:bell" />
        </template>
        <template #footer>© 2026 Soybean UI</template>
        <div class="p-4">
          <p class="text-muted-foreground">Active menu: {{ active }}</p>
        </div>
      </SAppShell>
    </div>
  </div>
</template>
