<script setup lang="ts">
import { SProgress } from '@vean/ui';
import type { ThemeColor } from '@vean/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div class="flex-c gap-3">
    <SProgress v-for="(color, index) in colors" :key="color" :model-value="(index + 1) * 10" :color="color" />
  </div>
</template>
