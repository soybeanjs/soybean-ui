<script setup lang="ts">
import { SCard, SRadioGroup } from '@ui';
import type { RadioGroupOptionData, ThemeColor } from '@ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];

const items: RadioGroupOptionData<string>[] = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' }
];
</script>

<template>
  <SCard title="Color" :ui="{ content: 'flex-c gap-2' }">
    <SRadioGroup v-for="color in colors" :key="color" :items="items" :color="color" />
  </SCard>
</template>
