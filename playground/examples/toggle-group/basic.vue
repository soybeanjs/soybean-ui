<script setup lang="ts">
import { ref } from 'vue';
import { SToggleGroup, SToggleGroupItem } from '@soybeanjs/ui';

const value = ref('bold');
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex flex-col items-start gap-3">
      <SToggleGroup v-model="value">
        <SToggleGroupItem value="bold">Bold</SToggleGroupItem>
        <SToggleGroupItem value="italic">Italic</SToggleGroupItem>
        <SToggleGroupItem value="underline">Underline</SToggleGroupItem>
      </SToggleGroup>
      <div class="text-sm text-muted-foreground">Value: {{ value || 'none' }}</div>
    </div>
  </div>
</template>
