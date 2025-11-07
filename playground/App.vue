<script setup lang="ts">
import { RouterView } from 'vue-router';
import { SConfigProvider } from '@ui';
import { provideThemeContext } from './theme';

defineOptions({
  name: 'App'
});

const { configProviderProps } = provideThemeContext();
</script>

<template>
  <SConfigProvider v-bind="configProviderProps">
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
