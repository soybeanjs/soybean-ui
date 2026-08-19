<script setup lang="ts">
import { ref } from 'vue';
import { SIcon, STreeSelect } from '@soybeanjs/ui';
import type { TreeSelectModelValue } from '@soybeanjs/ui';

const value = ref<TreeSelectModelValue>('');

const items = [
  {
    value: 'docs',
    label: 'Documentation',
    icon: 'lucide:book-open',
    children: [
      { value: 'getting-started', label: 'Getting Started', icon: 'lucide:rocket' },
      { value: 'components', label: 'Components', icon: 'lucide:blocks' }
    ]
  },
  {
    value: 'resources',
    label: 'Resources',
    icon: 'lucide:folder',
    children: [{ value: 'templates', label: 'Templates', icon: 'lucide:layout-template' }]
  }
];
</script>

<template>
  <div class="w-72">
    <STreeSelect
      v-model="value"
      :items="items"
      placeholder="Browse resources"
      :default-expanded="['docs', 'resources']"
    >
      <template #node="{ item }">
        <SIcon :icon="item.data.icon" class="size-4 shrink-0 text-muted-foreground" />
        <span class="flex-1 truncate text-start">{{ item.data.label }}</span>
      </template>
    </STreeSelect>
  </div>
</template>
