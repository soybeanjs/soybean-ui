<script setup lang="ts">
import { SxSources } from '@soybeanjs/ui-x';

const sources = [
  { key: '1', title: 'Internal knowledge base', author: 'Team Wiki' },
  { key: '2', title: 'Meeting notes', author: 'Alice' },
  { key: '3', title: 'Vue 3 Documentation', url: 'https://vuejs.org', author: 'Vue.js' }
];
</script>

<template>
  <SxSources :sources="sources" />
</template>
