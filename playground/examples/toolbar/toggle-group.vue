<script setup lang="ts">
import { ref } from 'vue';
import { SToolbar, SToolbarSeparator, SToolbarToggleGroup, SToolbarToggleItem } from '@soybeanjs/ui';

const value = ref('bold');
</script>

<template>
  <SToolbar>
    <SToolbarToggleGroup v-model="value">
      <SToolbarToggleItem value="bold">Bold</SToolbarToggleItem>
      <SToolbarToggleItem value="italic">Italic</SToolbarToggleItem>
      <SToolbarToggleItem value="underline">Underline</SToolbarToggleItem>
    </SToolbarToggleGroup>
    <SToolbarSeparator />
    <span class="text-sm text-muted-foreground">{{ value }}</span>
  </SToolbar>
</template>
