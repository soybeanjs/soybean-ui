<script setup lang="ts">
import { SSpinner } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div>
    <h3 class="playground-title">Color</h3>
    <div class="flex flex-wrap items-center gap-4">
      <div v-for="color in colors" :key="color" class="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <SSpinner :color="color" size="lg" />
        <span>{{ color }}</span>
      </div>
    </div>
  </div>
</template>
