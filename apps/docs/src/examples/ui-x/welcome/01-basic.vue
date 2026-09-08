<script setup lang="ts">
import { SxWelcome } from '@soybeanjs/ui-x';

const prompts = [
  { key: 'write', label: 'Write a blog post', icon: '✍️', description: 'Draft an article on a topic of your choice' },
  { key: 'code', label: 'Explain a code snippet', icon: '💻', description: 'Get a detailed walkthrough of code' },
  { key: 'brainstorm', label: 'Brainstorm ideas', icon: '💡', description: 'Generate creative ideas for any project' }
];
</script>

<template>
  <SxWelcome
    title="Hello, I'm AI Assistant"
    description="Ask me anything — I can help you write, code, brainstorm, and more."
    :prompts="prompts"
  />
</template>
