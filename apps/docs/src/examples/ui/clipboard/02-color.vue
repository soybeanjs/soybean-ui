<script setup lang="ts">
import { SClipboard } from '@vean/ui';
import type { ThemeColor } from '@vean/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SClipboard
      v-for="color in colors"
      :key="color"
      :value="`copy-${color}`"
      :color="color"
      variant="soft"
      :copy-text="color"
      :copied-text="`${color} copied`"
    />
  </div>
</template>
