<script setup lang="ts">
import { SAutocomplete } from '@soybeanjs/ui';
import type { AutocompleteOptionData } from '@soybeanjs/ui';

const items: AutocompleteOptionData[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grape', label: 'Grape' },
  { value: 'pineapple', label: 'Pineapple' }
];
</script>

<template>
  <SAutocomplete :items="items" placeholder="Search a fruit" class="w-72 lt-md:w-auto" />
</template>
