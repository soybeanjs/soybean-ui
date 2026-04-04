<script setup lang="ts">
import { SSlider } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex-c gap-4 max-w-96">
      <div v-for="size in sizes" :key="size" class="flex-c gap-2">
        <span class="text-sm text-muted-foreground">{{ size }}</span>
        <SSlider :size="size" :thumb-props="{ 'aria-label': `${size} slider` }" :default-value="[40]" />
      </div>
    </div>
  </div>
</template>
