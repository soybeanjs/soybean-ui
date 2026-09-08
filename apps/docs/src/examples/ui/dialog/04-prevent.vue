<script setup lang="ts">
import { SButton, SDialog } from '@soybeanjs/ui';
</script>

<template>
  <SDialog
    title="Dialog Title"
    @pointer-down-outside="e => e.preventDefault()"
    @escape-key-down="e => e.preventDefault()"
  >
    <template #trigger>
      <SButton variant="pure">Open</SButton>
    </template>
    <div>Dialog Content</div>
  </SDialog>
</template>
