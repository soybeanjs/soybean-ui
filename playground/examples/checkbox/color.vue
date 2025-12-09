<script setup lang="ts">
import { SCheckbox } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div>
    <h3 class="playground-title">Color</h3>
    <div class="flex flex-wrap gap-3">
      <SCheckbox v-for="color in colors" :key="color" :default-value="true" :color="color" :label="color" />
    </div>
  </div>
</template>
