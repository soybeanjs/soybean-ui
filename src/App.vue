<script setup lang="ts">
import UiPage from './views/ui/index.vue';

defineOptions({
  name: 'App'
});
</script>

<template>
  <UiPage />
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
