<script setup lang="ts">
import { SButton, SDrawer } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Scrollable</h3>
    <SDrawer title="Drawer Title" description="Drawer Description">
      <template #trigger>
        <SButton variant="pure">Scrollable</SButton>
      </template>
      <div v-for="i in 100" :key="i" class="h-10">Item {{ i }}</div>

      <template #footer="{ close }">
        <SButton @click="close">Confirm</SButton>
      </template>
    </SDrawer>
  </div>
</template>
