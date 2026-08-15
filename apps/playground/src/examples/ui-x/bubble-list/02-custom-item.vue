<script setup lang="ts">
import { SxBubbleList, SxMarkdown } from '@soybeanjs/ui-x';
import type { ChatMessage } from '@soybeanjs/ui-x/types';

const items: ChatMessage[] = [
  { id: '1', role: 'user', content: 'What is SoybeanUI?' },
  { id: '2', role: 'ai', content: '**SoybeanUI** is a Vue 3 component library with a **headless + styled** split.' }
];
</script>

<template>
  <SxBubbleList class="h-64" :items="items">
    <template #content="{ message, content }">
      <SxMarkdown v-if="message.role === 'ai'" :content="content" />
      <span v-else>{{ content }}</span>
    </template>
  </SxBubbleList>
</template>
