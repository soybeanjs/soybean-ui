<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';
</script>

<template>
  <SConfigProvider>
    <div
      class="[--app-header-main:3.75rem] [--app-topbar:0rem] [--app-header:var(--app-header-main)] relative h-full text-sm"
    >
      <PageView />
    </div>
  </SConfigProvider>
</template>
