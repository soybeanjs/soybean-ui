<script setup lang="ts">
import { ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { SAppShell, SIcon, SSwitch } from '@vean/ui';
import { appShellItems } from './menu';

const open = ref(true);

// Mobile detection is declarative: the shell receives it as a prop, so any
// breakpoint strategy (media query, server hint, host state) works.
const isMobile = useMediaQuery('(max-width: 768px)');

const forceMobile = ref(false);

const active = ref('overview');
</script>

<template>
  <div class="space-y-4">
    <div class="flex-y-center flex-wrap gap-4">
      <div class="flex-y-center gap-2">
        <span>open:</span>
        <SSwitch v-model="open" class="items-center" />
      </div>
      <div class="flex-y-center gap-2">
        <span>isMobile:</span>
        <SSwitch v-model="forceMobile" class="items-center" />
      </div>
      <span class="text-muted-foreground">viewport mobile: {{ isMobile }}</span>
    </div>
    <div class="h-120 w-full border border-border border-solid rounded-md overflow-hidden">
      <SAppShell
        v-model="active"
        v-model:open="open"
        mode="sidebar"
        :items="appShellItems"
        :is-mobile="forceMobile || isMobile"
      >
        <template #logo>
          <SIcon icon="lucide:hexagon" class="size-6 text-primary" />
        </template>
        <template #title>
          <span class="truncate font-semibold">Soybean UI</span>
        </template>
        <div class="p-4">
          <p class="text-muted-foreground">
            On mobile the sidebar becomes a drawer; the header trigger opens it instead of collapsing.
          </p>
        </div>
      </SAppShell>
    </div>
  </div>
</template>
