<script setup lang="ts">
import { ref } from 'vue';
import { STreeNav } from '@soybeanjs/ui';
import type { TreeNavOptionData } from '@soybeanjs/ui';

const selected = ref<string>('email');

const items: TreeNavOptionData[] = [
  {
    value: 'contact',
    label: 'Contact',
    children: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' }
    ]
  },
  { value: 'about', label: 'About' }
];

const handleSelect = (item: TreeNavOptionData) => {
  // eslint-disable-next-line no-console
  console.log('selected:', item.value);
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-muted-foreground text-sm">
      Selected:
      <span class="font-medium text-primary">{{ selected }}</span>
      — opening a popup never marks a branch active; only selection does.
    </p>
    <STreeNav v-model="selected" :items="items" @select="handleSelect" />
  </div>
</template>
