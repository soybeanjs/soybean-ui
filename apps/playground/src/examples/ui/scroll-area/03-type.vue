<script setup lang="ts">
import { SScrollArea } from '@soybeanjs/ui';
import type { ScrollAreaType } from '@soybeanjs/ui';

const types: ScrollAreaType[] = ['auto', 'always', 'hover', 'scroll', 'glimpse'];
const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 space-y-2">
    <div v-for="item in types" :key="item">
      <p class="text-sm font-medium capitalize">{{ item }}</p>
      <SScrollArea :type="item" class="h-40 rounded-md border">
        <div class="flex-c gap-2 p-4 pe-6 text-sm">
          <div v-for="value in items" :key="`${item}-${value}`">{{ value }}</div>
        </div>
      </SScrollArea>
    </div>
  </div>
</template>
