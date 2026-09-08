<script setup lang="ts">
import { SxWelcome } from '@soybeanjs/ui-x';
</script>

<template>
  <SxWelcome>
    <template #title>
      <span class="text-primary">Custom</span>
      welcome title
    </template>
    <template #description>
      Replace the default description with anything you want, including
      <code>inline</code>
      markup.
    </template>
  </SxWelcome>
</template>
