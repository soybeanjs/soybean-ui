<script setup lang="ts">
import { SClipboard } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <h3 class="playground-title">Color</h3>
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
