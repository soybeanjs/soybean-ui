<script setup lang="ts">
import { ref } from 'vue';
import { SCombobox } from '@soybeanjs/ui';
import type { ComboboxOptionData } from '@soybeanjs/ui';

const value = ref<string>();

const items: ComboboxOptionData[] = [
  { label: 'Apple', value: 'apple', icon: 'lucide:apple' },
  { label: 'Banana', value: 'banana', icon: 'lucide:banana' },
  { label: 'Orange', value: 'orange', icon: 'lucide:citrus' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="w-80 lt-md:w-auto flex-c gap-2">
      <SCombobox v-model="value" :items="items" placeholder="Select a fruit" search-placeholder="Search fruits" />
      <p class="text-sm text-muted-foreground">Selected: {{ value || 'None' }}</p>
    </div>
  </div>
</template>
