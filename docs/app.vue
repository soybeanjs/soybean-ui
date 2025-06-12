<script setup lang="ts">
import { ConfigProvider } from '@headless';
import { Link } from '@ui';
</script>

<template>
  <ConfigProvider nuxt>
    <div>
      <h3>Hello World Nuxt 3</h3>
      <Link href="https://soybeanjs.cn" target="_blank" rel="noopener noreferrer">SoybeanJS</Link>
      <Link to="/demo" disabled>Demo</Link>
    </div>
  </ConfigProvider>
</template>
