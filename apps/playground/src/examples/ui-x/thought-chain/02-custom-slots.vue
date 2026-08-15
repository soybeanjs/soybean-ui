<script setup lang="ts">
import { SxThoughtChain } from '@soybeanjs/ui-x';
import type { ThoughtChainItem } from '@soybeanjs/ui-x/types';

const items: ThoughtChainItem[] = [
  { key: '1', title: 'Parse user query', status: 'success', content: 'Extracted keywords and intent from the input.' },
  { key: '2', title: 'Search knowledge base', status: 'loading', content: 'Looking up relevant documents...' }
];
</script>

<template>
  <SxThoughtChain :items="items" :default-expand="true">
    <template #title="{ item }">
      <span :class="item.status === 'success' ? 'text-success' : 'text-warning'">{{ item.title }}</span>
    </template>
    <template #content="{ item }">
      <code class="text-xs">{{ item.content }}</code>
    </template>
  </SxThoughtChain>
</template>
