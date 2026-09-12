<script setup lang="ts">
import { SButton, SDrawer } from '@soybeanjs/ui';
</script>

<template>
  <SDrawer title="Drawer Title" description="Drawer Description">
    <template #trigger>
      <SButton variant="pure">Open</SButton>
    </template>
    <div>Drawer Content</div>
  </SDrawer>
</template>
