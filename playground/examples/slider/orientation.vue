<script setup lang="ts">
import { ref } from 'vue';
import { SSlider } from '@soybeanjs/ui';

const horizontalValue = ref([45]);
const verticalValue = ref([25, 70]);
</script>

<template>
  <div>
    <h3 class="playground-title">Orientation</h3>
    <div class="flex flex-wrap gap-8 items-start">
      <div class="flex-c gap-3 w-72">
        <SSlider v-model="horizontalValue" :thumb-props="{ 'aria-label': 'Horizontal slider' }" />
        <p class="text-sm text-muted-foreground">Horizontal: {{ horizontalValue[0] }}</p>
      </div>
      <div class="flex-c gap-3 items-center">
        <SSlider v-model="verticalValue" orientation="vertical" class="h-40" />
        <p class="text-sm text-muted-foreground">Vertical: {{ verticalValue.join(' - ') }}</p>
      </div>
    </div>
  </div>
</template>
