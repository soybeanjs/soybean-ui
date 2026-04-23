<script setup lang="ts">
import { ref } from 'vue';
import { SColorField } from '@soybeanjs/ui';

const color = ref('#0ea5e9');
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="w-120 lt-md:w-auto grid gap-3 sm:grid-cols-3">
      <SColorField v-model="color" format="hex" />
      <SColorField v-model="color" format="rgb" />
      <SColorField v-model="color" format="oklch" />
      <SColorField v-model="color" channel="hue" color-space="hsl" />
      <SColorField v-model="color" channel="saturation" color-space="hsl" />
      <SColorField v-model="color" channel="lightness" color-space="hsl" />
    </div>
  </div>
</template>
