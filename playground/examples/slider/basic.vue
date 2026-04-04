<script setup lang="ts">
import { ref } from 'vue';
import { SSlider } from '@soybeanjs/ui';

const value = ref([40]);
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex-c gap-3 max-w-80">
      <SSlider v-model="value" :thumb-props="{ 'aria-label': 'Volume' }" />
      <p class="text-sm text-muted-foreground">{{ value[0] }}</p>
    </div>
  </div>
</template>
