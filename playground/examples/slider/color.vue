<script setup lang="ts">
import { SSlider } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div>
    <h3 class="playground-title">Color</h3>
    <div class="grid gap-4 md:grid-cols-2">
      <div v-for="color in colors" :key="color" class="flex-c gap-2">
        <span class="text-sm text-muted-foreground capitalize">{{ color }}</span>
        <SSlider :color="color" :thumb-props="{ 'aria-label': `${color} slider` }" :default-value="[55]" />
      </div>
    </div>
  </div>
</template>
