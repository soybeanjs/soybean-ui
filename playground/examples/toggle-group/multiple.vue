<script setup lang="ts">
import { ref } from 'vue';
import { SToggleGroup, SToggleGroupItem } from '@soybeanjs/ui';

const value = ref(['left']);
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <SToggleGroup v-model="value" multiple>
      <SToggleGroupItem value="left">Left</SToggleGroupItem>
      <SToggleGroupItem value="center">Center</SToggleGroupItem>
      <SToggleGroupItem value="right">Right</SToggleGroupItem>
    </SToggleGroup>
    <div class="text-sm text-muted-foreground">Value: {{ value.join(', ') || 'none' }}</div>
  </div>
</template>
