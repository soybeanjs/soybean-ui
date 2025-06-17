<script setup lang="ts">
import { SCard, SRadioGroup } from '@ui';
import type { RadioGroupOptionData, ThemeSize } from '@ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const items: RadioGroupOptionData<string>[] = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' }
];
</script>

<template>
  <SCard title="Size" :ui="{ content: 'flex-c gap-2' }">
    <SRadioGroup v-for="size in sizes" :key="size" :items="items" :size="size" />
  </SCard>
</template>
