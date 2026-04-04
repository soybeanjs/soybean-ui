<script setup lang="ts">
import { SSkeleton } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex-c gap-3">
      <div v-for="size in sizes" :key="size" class="flex items-center gap-3">
        <span class="w-8 text-xs text-muted-foreground uppercase">{{ size }}</span>
        <SSkeleton :size="size" />
      </div>
    </div>
  </div>
</template>
