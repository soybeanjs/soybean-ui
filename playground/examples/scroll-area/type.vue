<script setup lang="ts">
import { SScrollArea } from '@soybeanjs/ui';
import type { ScrollAreaType } from '@soybeanjs/ui';

const types: ScrollAreaType[] = ['auto', 'always', 'hover', 'scroll', 'glimpse'];
const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);
</script>

<template>
  <div>
    <h3 class="playground-title">Type</h3>
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="item in types" :key="item" class="space-y-2">
        <p class="text-sm font-medium capitalize">{{ item }}</p>
        <SScrollArea :type="item" class="h-40 rounded-md border">
          <div class="flex-c gap-2 p-4 pr-6 text-sm">
            <div v-for="value in items" :key="`${item}-${value}`">{{ value }}</div>
          </div>
        </SScrollArea>
      </div>
    </div>
  </div>
</template>
