<script setup lang="ts">
import { SButton, SDialog } from '@vean/ui';
</script>

<template>
  <SDialog title="Dialog Title" description="Dialog Description">
    <template #trigger>
      <SButton variant="pure">Open</SButton>
    </template>
    <div>Dialog Content</div>
  </SDialog>
</template>
