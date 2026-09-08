<script setup lang="ts">
import { SCombobox } from '@soybeanjs/ui';
import type { ComboboxOptionData } from '@soybeanjs/ui';

const items: ComboboxOptionData[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Completed', value: 'completed' }
];
</script>

<template>
  <SCombobox disabled :items="items" model-value="processing" placeholder="Status" class="w-80 lt-md:w-auto" />
</template>
