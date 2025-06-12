<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ConfigProvider } from '@headless';

defineOptions({
  name: 'App'
});
</script>

<template>
  <ConfigProvider>
    <RouterView />
  </ConfigProvider>
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
