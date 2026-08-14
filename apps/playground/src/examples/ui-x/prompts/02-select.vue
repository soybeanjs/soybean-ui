<script setup lang="ts">
import { ref } from 'vue';
import { SxPrompts } from '@soybeanjs/ui-x';

const prompts = [
  { key: 'summary', label: 'Summarize text', icon: '📝' },
  { key: 'translate', label: 'Translate content', icon: '🌐' },
  { key: 'debug', label: 'Debug my code', icon: '🐛' }
];

const selected = ref('');
</script>

<template>
  <div class="space-y-3">
    <SxPrompts :prompts="prompts" @select="selected = $event.label" />
    <p v-if="selected" class="text-sm text-muted-foreground">Prompt selected: {{ selected }}</p>
  </div>
</template>
