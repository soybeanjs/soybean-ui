<script setup lang="ts">
// Imported explicitly: page components are registered by file name too, so an
// auto-imported `<ThemeEditor />` here would resolve to this page itself.
import ThemeEditor from '~/components/theme-editor/index.vue';

definePage({ layout: 'default' });
</script>

<template>
  <ThemeEditor />
</template>
