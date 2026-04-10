<script setup lang="ts">
import { SSpinner } from '@soybeanjs/ui';
import type { SpinnerIcon } from '@soybeanjs/ui';

const icons: SpinnerIcon[] = [
  'svg-spinners:270-ring',
  'svg-spinners:3-dots-bounce',
  'svg-spinners:blocks-scale',
  'svg-spinners:ring-resize'
];
</script>

<template>
  <div>
    <h3 class="playground-title">Icon</h3>
    <div class="flex flex-wrap items-center gap-4">
      <div v-for="icon in icons" :key="icon" class="flex items-center gap-2 text-sm text-muted-foreground">
        <SSpinner :icon="icon" width="1.5rem" height="1.5rem" />
        <span>{{ icon }}</span>
      </div>
    </div>
  </div>
</template>
