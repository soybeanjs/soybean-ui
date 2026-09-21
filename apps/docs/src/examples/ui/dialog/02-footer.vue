<script setup lang="ts">
import { SButton, SDialog } from '@vean/ui';
</script>

<template>
  <SDialog title="Dialog Title" show-cancel show-confirm>
    <template #trigger>
      <SButton variant="pure">Open</SButton>
    </template>
    <div>Dialog Content</div>
  </SDialog>
</template>
