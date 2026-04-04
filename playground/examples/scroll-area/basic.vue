<script setup lang="ts">
import { SScrollArea } from '@soybeanjs/ui';

const tags = Array.from({ length: 30 }, (_, index) => `Tag ${index + 1}`);
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SScrollArea class="h-56 w-80 rounded-md border">
      <div class="p-4 pr-6">
        <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
        <div class="flex-c gap-2">
          <div v-for="tag in tags" :key="tag" class="rounded-sm border px-3 py-2 text-sm">
            {{ tag }}
          </div>
        </div>
      </div>
    </SScrollArea>
  </div>
</template>
