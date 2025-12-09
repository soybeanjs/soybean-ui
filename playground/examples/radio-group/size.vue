<script setup lang="ts">
import { SRadioGroup } from '@soybeanjs/ui';
import type { RadioGroupOptionData } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';

const items: RadioGroupOptionData<string>[] = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex-c gap-3">
      <SRadioGroup v-for="size in themeSizeOptions" :key="size.value" :items="items" :size="size.value" />
    </div>
  </div>
</template>
