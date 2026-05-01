<script setup lang="ts">
import { SAutocomplete } from '@soybeanjs/ui';
import type { AutocompleteOptionData } from '@soybeanjs/ui';

const items: AutocompleteOptionData[] = [
  { value: 'alpine', label: 'Alpine' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'soybean', label: 'Soybean' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Custom Styling</h3>
    <div class="w-72 lt-md:w-auto">
      <SAutocomplete
        :items="items"
        placeholder="Custom styled"
        :ui="{
          anchor: 'border-primary/40 bg-primary/5',
          popup: 'border-primary/30',
          item: 'data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground'
        }"
      />
    </div>
  </div>
</template>
