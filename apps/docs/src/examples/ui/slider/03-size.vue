<script setup lang="ts">
import { SSlider } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <div class="flex-c gap-4">
    <div v-for="size in sizes" :key="size" class="max-w-96 flex-c gap-2">
      <span class="text-sm text-muted-foreground">{{ size }}</span>
      <SSlider :size="size" :thumb-props="{ 'aria-label': `${size} slider` }" :default-value="[40]" />
    </div>
  </div>
</template>
