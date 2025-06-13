<script setup lang="ts">
import { RouterView } from 'vue-router';
import { SConfigProvider } from '@ui';

defineOptions({
  name: 'App'
});
</script>

<template>
  <SConfigProvider>
    <RouterView />
  </SConfigProvider>
</template>

<style>
html,
body,
#app {
  height: 100%;
}

html {
  overflow-x: hidden;
}
</style>
