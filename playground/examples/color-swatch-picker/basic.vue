<script setup lang="ts">
import { ref } from 'vue';
import { SColorSwatch, SColorSwatchPicker } from '@soybeanjs/ui';

const colors = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#0f172a'];
const value = ref(colors[0]);
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex flex-col gap-3">
      <SColorSwatchPicker v-model="value" :colors="colors" />
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <SColorSwatch :color="value" />
        <span>{{ value }}</span>
      </div>
    </div>
  </div>
</template>
