<script setup lang="ts">
import { SxSuggestion } from '@soybeanjs/ui-x';

const suggestions = [
  { key: 'continue', label: 'Continue', icon: '▶️' },
  { key: 'regenerate', label: 'Regenerate', icon: '🔄' },
  { key: 'explain', label: 'Explain', icon: '❓' }
];
</script>

<template>
  <SxSuggestion :suggestions="suggestions" />
</template>
