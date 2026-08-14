<script setup lang="ts">
import { SxSources } from '@soybeanjs/ui-x';

const sources = [
  { key: '1', title: 'Vue 3 Documentation', url: 'https://vuejs.org', author: 'Vue.js' },
  { key: '2', title: 'MDN Web Docs', url: 'https://developer.mozilla.org', author: 'Mozilla' },
  { key: '3', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs', author: 'Microsoft' }
];
</script>

<template>
  <SxSources :sources="sources" />
</template>
