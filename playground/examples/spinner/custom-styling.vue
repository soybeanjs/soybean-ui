<script setup lang="ts">
import { SSpinner } from '@soybeanjs/ui';

const items = [
  { label: 'Primary', class: 'text-primary' },
  { label: 'Success', class: 'text-success' },
  { label: 'Warning', class: 'text-warning' },
  { label: 'Accent', class: 'text-accent drop-shadow-sm' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Custom Styling</h3>
    <div class="flex flex-wrap items-center gap-4">
      <div
        v-for="item in items"
        :key="item.label"
        class="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground"
      >
        <SSpinner :class="item.class" width="1.5rem" height="1.5rem" />
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
