<script setup lang="ts">
import { ref } from 'vue';
import { SxSuggestion } from '@soybeanjs/ui-x';

const suggestions = [
  { key: 'continue', label: 'Continue', icon: '▶️' },
  { key: 'regenerate', label: 'Regenerate', icon: '🔄' },
  { key: 'explain', label: 'Explain', icon: '❓' }
];

const selected = ref('');
</script>

<template>
  <div class="space-y-3">
    <SxSuggestion :suggestions="suggestions" @select="selected = $event.label" />
    <p v-if="selected" class="text-sm text-muted-foreground">Suggestion selected: {{ selected }}</p>
  </div>
</template>
