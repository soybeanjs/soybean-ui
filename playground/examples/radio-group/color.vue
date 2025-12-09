<script setup lang="ts">
import { SRadioGroup } from '@soybeanjs/ui';
import type { RadioGroupOptionData, ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];

const items: RadioGroupOptionData<string>[] = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Color</h3>
    <div class="flex-c gap-3">
      <SRadioGroup v-for="color in colors" :key="color" :items="items" :color="color" />
    </div>
  </div>
</template>
