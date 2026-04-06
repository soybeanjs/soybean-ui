<script setup lang="ts">
import { ref } from 'vue';
import { SColorPicker } from '@soybeanjs/ui';

const color = ref('#7c3aed');
const swatches = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#fff', '#0f172a'];
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SColorPicker v-model="color" :swatches="swatches" placement="bottom-start" />
  </div>
</template>
