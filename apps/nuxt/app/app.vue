<script setup lang="ts">
import PlaygroundHome from '../../playground/src/pages/index.vue';
import { provideThemeContext } from '../../playground/src/theme';

const { configProviderProps } = provideThemeContext();
</script>

<template>
  <SConfigProvider v-bind="configProviderProps">
    <PlaygroundHome />
  </SConfigProvider>
</template>
