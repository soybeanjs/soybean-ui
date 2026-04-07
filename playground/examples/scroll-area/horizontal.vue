<script setup lang="ts">
import { SScrollArea } from '@soybeanjs/ui';

const cards = Array.from({ length: 12 }, (_, index) => ({
  title: `Card ${index + 1}`,
  description: 'Scrollable content'
}));
</script>

<template>
  <div>
    <h3 class="playground-title">Horizontal</h3>
    <SScrollArea class="w-full rounded-md border whitespace-nowrap">
      <div class="flex gap-4 p-4 pb-6">
        <div v-for="card in cards" :key="card.title" class="w-48 shrink-0 rounded-md border p-4">
          <p class="font-medium">{{ card.title }}</p>
          <p class="mt-2 text-sm text-muted-foreground">{{ card.description }}</p>
        </div>
      </div>
    </SScrollArea>
  </div>
</template>
