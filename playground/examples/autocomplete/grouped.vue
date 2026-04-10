<script setup lang="ts">
import { SAutocomplete } from '@soybeanjs/ui';
import type { AutocompleteOptionData } from '@soybeanjs/ui';

const items: AutocompleteOptionData[] = [
  {
    label: 'Fruits',
    items: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'blueberry', label: 'Blueberry' }
    ]
  },
  {
    label: 'Vegetables',
    items: [
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'carrot', label: 'Carrot' },
      { value: 'cucumber', label: 'Cucumber' }
    ]
  }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Grouped</h3>
    <div class="w-72 lt-md:w-auto">
      <SAutocomplete :items="items" placeholder="Search foods" />
    </div>
  </div>
</template>
