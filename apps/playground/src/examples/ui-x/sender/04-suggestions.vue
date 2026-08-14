<script setup lang="ts">
import { SxSender } from '@soybeanjs/ui-x';

const slashSuggestions = [
  { key: 'summarize', label: 'Summarize', description: 'Summarize the conversation', icon: '📝' },
  { key: 'translate', label: 'Translate', description: 'Translate the last message', icon: '🌐' },
  { key: 'code', label: 'Write code', description: 'Generate code', icon: '💻' }
];

const mentionSuggestions = [
  { key: 'alice', label: 'Alice', description: 'Frontend engineer', icon: '👩‍💻' },
  { key: 'bob', label: 'Bob', description: 'Backend engineer', icon: '👨‍💻' }
];
</script>

<template>
  <SxSender
    class="w-full"
    placeholder="Type / to run a command, or @ to mention someone…"
    :slash-suggestions="slashSuggestions"
    :mention-suggestions="mentionSuggestions"
  />
</template>
