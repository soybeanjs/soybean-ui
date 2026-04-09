<script setup lang="ts">
import { ref } from 'vue';

const container = ref<HTMLElement>();
const rows = Array.from({ length: 12 }, (_, index) => `Row ${index + 1}`);
</script>

<template>
  <div>
    <h3 class="playground-title">Target</h3>
    <div ref="container" class="relative h-72 overflow-y-auto rounded-md border bg-muted/20 p-4">
      <SAffix :target="() => container" :offset-top="12">
        <div class="rounded-md border bg-background px-4 py-3 shadow-sm">
          <span class="text-sm font-medium">Sticky header inside the scroll container</span>
        </div>
      </SAffix>
      <div class="mt-4 flex-c gap-3">
        <div v-for="row in rows" :key="row" class="rounded-md border bg-background px-4 py-3 text-sm">
          {{ row }}
        </div>
      </div>
    </div>
  </div>
</template>
