<script setup lang="ts">
import { RouterView } from 'vue-router';

defineOptions({
  name: 'App'
});
</script>

<template>
  <RouterView />
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
