<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoDrawerSide from './side.vue';
import DemoDrawerScroll from './scroll.vue';
</script>

<template>
  <SCard title="Drawer" split :ui="{ content: 'flex-c gap-4' }">
    <DemoDrawerSide />
    <DemoDrawerScroll />
  </SCard>
</template>
