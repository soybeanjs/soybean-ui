<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';
</script>

<template>
  <SConfigProvider persist-theme>
    <slot />
  </SConfigProvider>
</template>
