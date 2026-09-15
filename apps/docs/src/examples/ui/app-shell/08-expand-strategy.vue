<script setup lang="ts">
import { shallowRef } from 'vue';
import { SAppShell, SIcon, SSelect } from '@soybeanjs/ui';
import type { TreeMenuExpandStrategy } from '@soybeanjs/ui';
import { appShellItems } from './menu';

const active = shallowRef('soybean-ui');
const expandStrategy = shallowRef<TreeMenuExpandStrategy>('selected');
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-end">
      <SSelect
        v-model="expandStrategy"
        :items="[
          { label: 'keep', value: 'keep' },
          { label: 'selected', value: 'selected' }
        ]"
        :ui="{ trigger: 'w-32' }"
      />
    </div>
    <div class="h-120 w-full border border-border border-solid rounded-md overflow-hidden">
      <SAppShell v-model="active" mode="sidebar" :expand-strategy="expandStrategy" :items="appShellItems">
        <template #logo>
          <SIcon icon="lucide:hexagon" class="size-6 text-primary" />
        </template>
        <template #title>
          <span class="truncate font-semibold">Soybean UI</span>
        </template>
        <div class="p-4">
          <p class="text-muted-foreground">Active menu: {{ active }}</p>
        </div>
      </SAppShell>
    </div>
  </div>
</template>
