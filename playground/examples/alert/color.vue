<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div>
    <h3 class="playground-title">Color</h3>
    <div class="flex flex-wrap gap-3">
      <SAlert v-for="color in colors" :key="color" :color="color" :title="color" icon="lucide:terminal" />
    </div>
  </div>
</template>
