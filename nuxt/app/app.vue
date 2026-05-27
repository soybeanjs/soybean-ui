<script setup lang="ts">
import '@soybeanjs/ui/styles.css';
</script>

<template>
  <SConfigProvider>
    <div>
      <SButton>Test</SButton>
      <SDialog title="Title">
        <template #trigger>
          <SButton>Open Dialog</SButton>
        </template>
        <p>This is a dialog content.</p>
      </SDialog>
      <NuxtRouteAnnouncer />
      <NuxtWelcome />
    </div>
  </SConfigProvider>
</template>
