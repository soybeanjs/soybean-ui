<script setup lang="ts">
import { ref } from 'vue';
import { SSlider } from '@soybeanjs/ui';

const value = ref([20, 80]);
</script>

<template>
  <div>
    <h3 class="playground-title">Range</h3>
    <div class="flex-c gap-3 max-w-80">
      <SSlider v-model="value" />
      <p class="text-sm text-muted-foreground">{{ value.join(' - ') }}</p>
    </div>
  </div>
</template>
