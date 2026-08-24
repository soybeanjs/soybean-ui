<script setup lang="ts">
import { shallowRef } from 'vue';
import type { EpOpenChangeReason } from './headless';
import { SEp } from './ui';

interface HistoryEntry {
  id: number;
  label: string;
}

const open = shallowRef(false);
const history = shallowRef<HistoryEntry[]>([]);

let historyId = 0;

function onOpenChange(value: boolean, reason: EpOpenChangeReason) {
  open.value = value;
  historyId += 1;
  history.value = [
    {
      id: historyId,
      label: `${value ? 'open' : 'closed'} · ${reason}`
    },
    ...history.value
  ].slice(0, 4);
}
</script>

<template>
  <div class="flex flex-wrap items-start gap-4">
    <SEp
      :open="open"
      :positioner-props="{ sideOffset: 8 }"
      :popup-props="{ role: 'dialog' }"
      @update:open="onOpenChange"
    >
      <template #trigger>
        <button type="button" aria-haspopup="dialog">Controlled: {{ open ? 'open' : 'closed' }}</button>
      </template>

      <p class="font-medium">Controlled state</p>
      <p class="mt-1 text-muted-foreground">Every transition reports an explicit reason.</p>
    </SEp>

    <div class="min-w-56 rounded-md border border-border bg-muted/30 p-3 text-xs">
      <p class="font-medium">Transition log</p>
      <p v-if="history.length === 0" class="mt-2 text-muted-foreground">Interact with the trigger to begin.</p>
      <ul v-else class="mt-2 space-y-1 font-mono">
        <li v-for="entry in history" :key="entry.id">{{ entry.label }}</li>
      </ul>
    </div>
  </div>
</template>
