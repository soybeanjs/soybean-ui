<script setup lang="ts">
import { SConfigProvider } from '@ui';
import DemoHome from '../playground/src/views/home.vue';
</script>

<template>
  <SConfigProvider nuxt>
    <DemoHome />
  </SConfigProvider>
</template>
