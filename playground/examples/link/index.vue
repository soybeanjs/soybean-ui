<script setup lang="ts">
import { SCard, SLink } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Link" :ui="{ content: 'flex-c gap-3' }">
    <SCard title="Router Link or Nuxt Link">
      <div class="flex flex-col gap-2">
        <SLink to="/demo">Demo</SLink>
        <SLink to="/demo" disabled>Disabled</SLink>
        <SLink to="/demo" external target="_blank">External</SLink>
      </div>
    </SCard>
    <SCard title="Normal Link: href">
      <SLink href="https://soybeanjs.cn" target="_blank" rel="noopener noreferrer">SoybeanJS</SLink>
    </SCard>
  </SCard>
</template>
