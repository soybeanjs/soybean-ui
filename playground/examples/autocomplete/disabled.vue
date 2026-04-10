<script setup lang="ts">
import { SAutocomplete } from '@soybeanjs/ui';
import type { AutocompleteOptionData } from '@soybeanjs/ui';

const items: AutocompleteOptionData[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Disabled</h3>
    <div class="w-72 lt-md:w-auto">
      <SAutocomplete disabled :items="items" placeholder="Disabled autocomplete" />
    </div>
  </div>
</template>
