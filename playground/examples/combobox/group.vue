<script setup lang="ts">
import { ref } from 'vue';
import { SCombobox } from '@soybeanjs/ui';
import type { ComboboxOptionData } from '@soybeanjs/ui';

const value = ref('vue');

const items: ComboboxOptionData[] = [
  {
    label: 'Frontend',
    value: 'frontend',
    items: [
      { label: 'Vue', value: 'vue', icon: 'logos:vue' },
      { label: 'React', value: 'react', icon: 'logos:react' },
      { label: 'Svelte', value: 'svelte', icon: 'logos:svelte-icon' }
    ]
  },
  {
    label: 'Backend',
    value: 'backend',
    separator: true,
    items: [
      { label: 'Node.js', value: 'node', icon: 'logos:nodejs-icon' },
      { label: 'Go', value: 'go', icon: 'logos:go' }
    ]
  }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Group</h3>
    <div class="w-80 lt-md:w-auto">
      <SCombobox v-model="value" :items="items" placeholder="Choose a stack" search-placeholder="Search stacks" />
    </div>
  </div>
</template>
