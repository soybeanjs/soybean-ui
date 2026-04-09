<script setup lang="ts">
import { ref } from 'vue';

const container = ref<HTMLElement>();
const rows = Array.from({ length: 14 }, (_, index) => `Action item ${index + 1}`);
</script>

<template>
  <div>
    <h3 class="playground-title">Offset bottom</h3>
    <div ref="container" class="relative h-72 overflow-y-auto rounded-md border bg-muted/20 p-4">
      <div class="flex-c gap-3 pb-18">
        <div v-for="row in rows" :key="row" class="rounded-md border bg-background px-4 py-3 text-sm">
          {{ row }}
        </div>
      </div>
      <SAffix :target="() => container" :offset-bottom="16">
        <div class="rounded-md border bg-background px-4 py-3 shadow-sm">
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm font-medium">Pinned bottom actions</span>
            <SButton size="sm">Confirm</SButton>
          </div>
        </div>
      </SAffix>
    </div>
  </div>
</template>
