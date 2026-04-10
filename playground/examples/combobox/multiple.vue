<script setup lang="ts">
import { ref } from 'vue';
import { SCombobox } from '@soybeanjs/ui';
import type { ComboboxOptionData } from '@soybeanjs/ui';

const value = ref(['design', 'engineering']);

const items: ComboboxOptionData[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Operations', value: 'operations' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Multiple</h3>
    <div class="w-96 lt-md:w-auto flex-c gap-2">
      <SCombobox v-model="value" multiple :items="items" placeholder="Select teams" search-placeholder="Search teams" />
      <p class="text-sm text-muted-foreground">{{ value.join(', ') }}</p>
    </div>
  </div>
</template>
