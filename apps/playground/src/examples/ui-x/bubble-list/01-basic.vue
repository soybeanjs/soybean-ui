<script setup lang="ts">
import { SxBubbleList } from '@soybeanjs/ui-x';
import type { ChatMessage } from '@soybeanjs/ui-x/types';

const items: ChatMessage[] = [
  { id: '1', role: 'user', content: 'What is Vue 3?' },
  { id: '2', role: 'ai', content: 'Vue 3 is a progressive JavaScript framework for building user interfaces.' },
  { id: '3', role: 'user', content: 'How does the Composition API work?' },
  {
    id: '4',
    role: 'ai',
    content: 'The Composition API lets you organize component logic by feature using the setup function.'
  },
  { id: '5', role: 'user', content: 'Can you explain reactivity?' },
  {
    id: '6',
    role: 'ai',
    content: 'Reactivity in Vue 3 is powered by Proxies, enabling fine-grained dependency tracking.'
  },
  { id: '7', role: 'user', content: 'Thanks for the explanation!' },
  { id: '8', role: 'ai', content: 'You are welcome! Feel free to ask more questions anytime.' }
];
</script>

<template>
  <SxBubbleList class="h-80" :items="items" scrollable />
</template>
