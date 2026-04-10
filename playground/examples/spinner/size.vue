<script setup lang="ts">
import { SSpinner } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';

const sizes = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl'
] satisfies ThemeSize[];
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex-c gap-3">
      <div v-for="size in sizes" :key="size" class="flex items-center gap-3">
        <span class="w-8 text-xs text-muted-foreground">{{ size }}</span>
        <SSpinner :size="size" />
      </div>
    </div>
  </div>
</template>
