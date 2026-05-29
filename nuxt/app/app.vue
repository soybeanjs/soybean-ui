<script setup lang="ts">
import '@soybeanjs/ui/styles.css';
import PlaygroundHome from '../../playground/pages/index.vue';
import { provideThemeContext } from '../../playground/theme';

const { configProviderProps } = provideThemeContext();
</script>

<template>
  <SConfigProvider v-bind="configProviderProps">
    <PlaygroundHome />
  </SConfigProvider>
</template>
