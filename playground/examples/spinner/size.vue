<script setup lang="ts">
import { SSpinner } from '@soybeanjs/ui';

const sizes = [
  { label: 'sm', value: '1rem' },
  { label: 'md', value: '1.25rem' },
  { label: 'lg', value: '1.5rem' },
  { label: 'xl', value: '2rem' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex-c gap-3">
      <div v-for="size in sizes" :key="size.label" class="flex items-center gap-3">
        <span class="w-8 text-xs text-muted-foreground">{{ size.label }}</span>
        <SSpinner :width="size.value" :height="size.value" />
      </div>
    </div>
  </div>
</template>
