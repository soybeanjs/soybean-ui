<script setup lang="ts">
import { SColorSwatch } from '@soybeanjs/ui';

const colors = ['#7c3aed', '#06b6d4', '#f97316', 'oklch(62% 0.22 312)', 'rgba(15, 23, 42, 0.35)'];
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex flex-wrap gap-3">
      <SColorSwatch v-for="color in colors" :key="color" :color="color" />
      <SColorSwatch color="#0f172a" shape="circle" />
    </div>
  </div>
</template>
