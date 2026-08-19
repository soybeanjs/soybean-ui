<script setup lang="ts">
import { STreeSelect } from '@soybeanjs/ui';

const items = [
  { value: 'a', label: 'Option A', children: [{ value: 'a1', label: 'Option A1' }] },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' }
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <STreeSelect class="w-56" :items="items" placeholder="Small" size="sm" />
    <STreeSelect class="w-56" :items="items" placeholder="Medium (default)" size="md" />
    <STreeSelect class="w-56" :items="items" placeholder="Large" size="lg" color="info" />
    <STreeSelect class="w-56" :items="items" placeholder="Disabled" disabled />
  </div>
</template>
