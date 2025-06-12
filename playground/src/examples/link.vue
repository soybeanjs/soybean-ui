<script setup lang="ts">
import { Card, Link } from '@ui';
</script>

<template>
  <Card title="Router Link or Nuxt Link">
    <div class="flex flex-col gap-2">
      <Link to="/demo">Demo</Link>
      <Link to="/demo" disabled>Disabled</Link>
      <Link to="/demo" external target="_blank">External</Link>
    </div>
  </Card>
  <Card title="Normal Link: href">
    <Link href="https://soybeanjs.cn" target="_blank" rel="noopener noreferrer">SoybeanJS</Link>
  </Card>
</template>
