<script setup lang="ts">
import { SButton, SBottomSheet } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Base</h3>
    <SBottomSheet title="Bottom Sheet Title" description="Bottom Sheet Description">
      <template #trigger>
        <SButton variant="pure">Open</SButton>
      </template>
      <div>Bottom Sheet Content</div>
    </SBottomSheet>
  </div>
</template>
