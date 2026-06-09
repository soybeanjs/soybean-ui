<script setup lang="ts">
import '@soybeanjs/ui/styles.css';
import PlaygroundHome from '../../playground/src/pages/index.vue';
import { provideThemeContext } from '../../playground/src/theme';

const { configProviderProps } = provideThemeContext();
</script>

<template>
  <SConfigProvider v-bind="configProviderProps">
    <PlaygroundHome />
  </SConfigProvider>
</template>
