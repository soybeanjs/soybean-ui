<script setup lang="ts">
import { SButton, SDialog } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Base</h3>
    <SDialog title="Dialog Title" description="Dialog Description">
      <template #trigger>
        <SButton variant="pure">Open</SButton>
      </template>
      <div>Dialog Content</div>
    </SDialog>
  </div>
</template>
