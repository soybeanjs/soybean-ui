<script setup lang="ts">
import { SButton, SBottomSheet } from '@soybeanjs/ui';
</script>

<template>
  <SBottomSheet title="Bottom Sheet Title" description="Bottom Sheet Description">
    <template #trigger>
      <SButton variant="pure">Open</SButton>
    </template>
    <div>Bottom Sheet Content</div>
  </SBottomSheet>
</template>
