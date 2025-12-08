<script setup lang="ts">
import { SButton, SCard, SDrawer } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Scrollable">
    <SDrawer title="Drawer Title" description="Drawer Description">
      <template #trigger>
        <SButton variant="pure">Scrollable</SButton>
      </template>
      <div v-for="i in 100" :key="i" class="h-10">Item {{ i }}</div>
      <template #footer="{ close }">
        <SButton @click="close">Confirm</SButton>
      </template>
    </SDrawer>

    <SDrawer title="Drawer Title" description="Drawer Description" :scrollable="false">
      <template #trigger>
        <SButton variant="pure" class="ml-3">Disabled Scrollable</SButton>
      </template>
      <div v-for="i in 100" :key="i" class="h-10">Item {{ i }}</div>
      <template #footer="{ close }">
        <SButton @click="close">Confirm</SButton>
      </template>
    </SDrawer>
  </SCard>
</template>
