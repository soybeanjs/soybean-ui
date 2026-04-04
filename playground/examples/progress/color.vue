<script setup lang="ts">
import { SProgress } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div>
    <h3 class="playground-title">Color</h3>
    <div class="flex-c gap-3">
      <SProgress v-for="(color, index) in colors" :key="color" :model-value="(index + 1) * 10" :color="color" />
    </div>
  </div>
</template>
