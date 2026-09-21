<script setup lang="ts">
import { SAutocomplete } from '@vean/ui';
import type { AutocompleteOptionData } from '@vean/ui';

const items: AutocompleteOptionData[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' }
];
</script>

<template>
  <SAutocomplete disabled :items="items" placeholder="Disabled autocomplete" class="w-72 lt-md:w-auto" />
</template>
