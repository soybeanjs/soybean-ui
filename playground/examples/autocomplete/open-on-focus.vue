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
  <div>
    <h3 class="playground-title">Open On Focus</h3>
    <div class="w-72 lt-md:w-auto">
      <SAutocomplete :items="items" open-on-focus placeholder="Focus to browse frameworks" />
    </div>
  </div>
</template>
