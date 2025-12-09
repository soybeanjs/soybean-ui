<script setup lang="ts">
import { provideThemeContext } from './theme';

const { configProviderProps } = provideThemeContext();
</script>

<template>
  <SConfigProvider v-bind="configProviderProps">
    <RouterView />
  </SConfigProvider>
</template>
