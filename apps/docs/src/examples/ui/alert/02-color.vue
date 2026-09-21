<script setup lang="ts">
import { SAlert } from '@vean/ui';
import type { ThemeColor } from '@vean/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SAlert v-for="color in colors" :key="color" :color="color" :title="color" icon="lucide:terminal" />
  </div>
</template>
