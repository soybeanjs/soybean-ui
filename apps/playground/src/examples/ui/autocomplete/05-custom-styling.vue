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
  <SAutocomplete
    :items="items"
    placeholder="Custom styled"
    :ui="{
      anchor: 'border-primary/40 bg-primary/5',
      popup: 'border-primary/30',
      item: 'data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground'
    }"
    class="w-72 lt-md:w-auto"
  />
</template>
