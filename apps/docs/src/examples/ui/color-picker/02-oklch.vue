<script setup lang="ts">
import { ref } from 'vue';
import { SColorPicker } from '@soybeanjs/ui';

const color = ref('oklch(62% 0.22 312)');
</script>

<template>
  <SColorPicker v-model="color" placement="bottom-start" color-space="oklch" default-format="oklch" />
</template>
