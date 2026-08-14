<script setup lang="ts">
import { SLink } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SLink to="/about" disabled>Disabled</SLink>
    <SLink to="/about" external target="_blank">External</SLink>
  </div>
</template>
