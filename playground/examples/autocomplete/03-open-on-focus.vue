<script setup lang="ts">
import { SAutocomplete } from '@soybeanjs/ui';
import type { AutocompleteOptionData } from '@soybeanjs/ui';

const items: AutocompleteOptionData[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' }
];
</script>

<template>
  <SAutocomplete :items="items" open-on-focus placeholder="Focus to browse frameworks" class="w-72 lt-md:w-auto" />
</template>
