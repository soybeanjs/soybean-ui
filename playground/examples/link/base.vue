<script setup lang="ts">
import { SLink } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Router Link or Nuxt Link</h3>
    <div class="flex flex-wrap gap-3">
      <SLink :to="{ name: 'About', query: { a: 1 } }">About</SLink>
      <SLink to="/about" disabled>Disabled</SLink>
      <SLink to="/about" external target="_blank">External</SLink>
    </div>
  </div>
</template>
