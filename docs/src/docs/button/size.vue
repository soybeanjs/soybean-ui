<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3>尺寸变体</h3>
      <div class="flex items-center gap-2 flex-wrap">
        <SButton v-for="size in sizes" :key="size" :size="size">{{ size }}</SButton>
      </div>
    </div>
  </div>
</template>
