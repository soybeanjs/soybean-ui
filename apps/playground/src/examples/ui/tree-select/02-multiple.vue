<script setup lang="ts">
import { computed, ref } from 'vue';
import { STreeSelect } from '@soybeanjs/ui';
import type { TreeSelectModelValue } from '@soybeanjs/ui';

const value = ref<TreeSelectModelValue>([]);

const selectedText = computed(() => (Array.isArray(value.value) ? value.value.join(', ') : value.value));

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
      { value: 'go', label: 'Go' }
    ]
  }
];
</script>

<template>
  <div class="w-80">
    <STreeSelect
      v-model="value"
      :items="items"
      multiple
      placeholder="Select technologies"
      :default-expanded="['frontend', 'backend']"
      propagate-select
      bubble-select
    />
    <p class="mt-2 text-xs text-muted-foreground">Selected: {{ selectedText || '—' }}</p>
  </div>
</template>
