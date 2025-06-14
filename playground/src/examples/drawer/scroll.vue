<script setup lang="ts">
import { SButton, SCard, SDrawer } from '@ui';
</script>

<template>
  <SCard title="Drawer Scroll">
    <SDrawer title="Drawer Title" description="Drawer Description">
      <template #trigger>
        <SButton variant="pure">Open</SButton>
      </template>
      <div>
        <div v-for="i in 100" :key="i" class="h-10">Item {{ i }}</div>
      </div>
      <template #footer="{ close }">
        <SButton @click="close">Confirm</SButton>
      </template>
    </SDrawer>
  </SCard>
</template>
