<script setup lang="ts">
import { SCard, SRadioGroup } from '@ui';
import type { RadioGroupOptionData } from '@ui';
import { themeSizeOptions } from '../../constants/theme';

const items: RadioGroupOptionData<string>[] = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' }
];
</script>

<template>
  <SCard title="Size" :ui="{ content: 'flex-c gap-2' }">
    <SRadioGroup v-for="size in themeSizeOptions" :key="size.value" :items="items" :size="size.value" />
  </SCard>
</template>
