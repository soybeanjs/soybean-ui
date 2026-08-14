<script setup lang="ts">
import type { ThoughtChainItem } from '@soybeanjs/ui-x/types';
import { SxThoughtChain } from '@soybeanjs/ui-x';

const items: ThoughtChainItem[] = [
  { key: '1', title: 'Parse user query', status: 'success', content: 'Extracted keywords and intent from the input.' },
  { key: '2', title: 'Search knowledge base', status: 'loading', content: 'Looking up relevant documents...' },
  { key: '3', title: 'Generate response', status: 'error', content: 'Failed to reach the generation service.' },
  { key: '4', title: 'Format output', status: 'pending', content: 'Waiting for previous steps to complete.' }
];
</script>

<template>
  <SxThoughtChain :items="items" :default-expand="true" />
</template>
