<script setup lang="ts">
import { provideThemeContext } from '../../playground/theme';

const { configProviderProps } = provideThemeContext();
</script>

<template>
  <SConfigProvider v-bind="configProviderProps">
    <RouterView />
  </SConfigProvider>
</template>
