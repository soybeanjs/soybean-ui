<script setup lang="ts">
import { SCard, SRadioGroup } from '@soybeanjs/ui';
import type { RadioGroupOptionData } from '@soybeanjs/ui';
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
