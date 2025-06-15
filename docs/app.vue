<script setup lang="ts">
import { SConfigProvider } from '@ui';
import DemoHome from '../playground/src/views/home.vue';
import { provideThemeContext } from '../playground/src/theme';

const { configProviderProps } = provideThemeContext();
</script>

<template>
  <SConfigProvider v-bind="configProviderProps" nuxt>
    <DemoHome />
  </SConfigProvider>
</template>
