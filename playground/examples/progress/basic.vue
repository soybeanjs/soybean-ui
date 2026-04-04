<script setup lang="ts">
import { SProgress } from '@soybeanjs/ui';

const values = [0, 35, 65, 100];
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex-c gap-3">
      <SProgress v-for="value in values" :key="value" :model-value="value" />
    </div>
  </div>
</template>
