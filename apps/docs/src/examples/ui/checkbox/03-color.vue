<script setup lang="ts">
import { SCheckbox } from '@vean/ui';
import type { ThemeColor } from '@vean/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SCheckbox v-for="color in colors" :key="color" :default-value="true" :color="color" :label="color" />
  </div>
</template>
