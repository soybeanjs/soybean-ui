<script setup lang="ts">
import { SxPrompts } from '@soybeanjs/ui-x';

const prompts = [
  { key: 'summary', label: 'Summarize text', icon: '📝' },
  { key: 'translate', label: 'Translate content', icon: '🌐' },
  { key: 'debug', label: 'Debug my code', icon: '🐛' },
  { key: 'rewrite', label: 'Rewrite for clarity', icon: '✨' }
];
</script>

<template>
  <SxPrompts class="grid grid-cols-2 gap-2" :prompts="prompts" />
</template>
