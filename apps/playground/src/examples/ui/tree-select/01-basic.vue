<script setup lang="ts">
import { ref } from 'vue';
import { STreeSelect } from '@soybeanjs/ui';
import type { TreeSelectModelValue } from '@soybeanjs/ui';

const value = ref<TreeSelectModelValue>('');

const items = [
  {
    value: 'frontend',
    label: 'Frontend',
    children: [
      { value: 'vue', label: 'Vue' },
      { value: 'react', label: 'React' },
      { value: 'svelte', label: 'Svelte' }
    ]
  },
  {
    value: 'backend',
    label: 'Backend',
    children: [
      { value: 'node', label: 'Node.js' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' }
    ]
  },
  { value: 'database', label: 'Database' }
];
</script>

<template>
  <div class="w-72">
    <STreeSelect
      v-model="value"
      :items="items"
      placeholder="Select a technology"
      :default-expanded="['frontend', 'backend']"
    />
    <p class="mt-2 text-xs text-muted-foreground">Selected: {{ value || '—' }}</p>
  </div>
</template>
