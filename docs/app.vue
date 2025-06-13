<script setup lang="ts">
import { SConfigProvider, SLink } from '@ui';
</script>

<template>
  <SConfigProvider nuxt>
    <div>
      <h3>Hello World Nuxt 3</h3>
      <SLink href="https://soybeanjs.cn" target="_blank" rel="noopener noreferrer">SoybeanJS</SLink>
      <SLink to="/demo" disabled>Demo</SLink>
    </div>
  </SConfigProvider>
</template>
