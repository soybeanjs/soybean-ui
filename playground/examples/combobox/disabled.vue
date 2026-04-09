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
  <div>
    <h3 class="playground-title">Disabled</h3>
    <div class="w-80 lt-md:w-auto">
      <SCombobox disabled :items="items" model-value="processing" placeholder="Status" />
    </div>
  </div>
</template>
