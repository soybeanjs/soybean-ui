<script setup lang="ts">
import { ref } from 'vue';
import { SRating } from '@soybeanjs/ui';

const readonlyValue = ref(4);
</script>

<template>
  <div class="flex-c-col gap-4">
    <div class="flex-c gap-3">
      <SRating :model-value="readonlyValue" readonly />
      <span class="text-sm text-muted-foreground">readonly: {{ readonlyValue }}</span>
    </div>
    <div class="flex-c gap-3">
      <SRating :model-value="2" disabled />
      <span class="text-sm text-muted-foreground">disabled</span>
    </div>
  </div>
</template>
