<script setup lang="ts">
import { SSlider } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Disabled</h3>
    <div class="flex-c gap-3 max-w-80">
      <SSlider disabled :default-value="[35]" :thumb-props="{ 'aria-label': 'Disabled slider' }" />
      <SSlider disabled :default-value="[20, 70]" />
    </div>
  </div>
</template>
