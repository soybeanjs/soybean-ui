<script setup lang="ts">
import { useTemplateRef } from 'vue';

const container = useTemplateRef('container');

const rows = Array.from({ length: 10 }, (_, index) => `Notice ${index + 1}`);
</script>

<template>
  <div>
    <h3 class="playground-title">Custom styling</h3>
    <div ref="container" class="relative h-72 overflow-y-auto rounded-md border bg-muted/20 p-4">
      <SAffix
        :target="container"
        :offset-top="12"
        class="data-[state=fixed]:(px-4 py-3 rounded-md border bg-background shadow-md)"
      >
        <div class="text-sm font-medium">Pinned with custom container styles</div>
      </SAffix>
      <div class="mt-4 flex-c gap-3">
        <div v-for="row in rows" :key="row" class="rounded-md border bg-background px-4 py-3 text-sm">
          {{ row }}
        </div>
      </div>
    </div>
  </div>
</template>
