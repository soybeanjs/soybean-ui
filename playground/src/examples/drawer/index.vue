<script setup lang="ts">
import { SCard } from '@ui';
import DemoDrawerSide from './side.vue';
import DemoDrawerScroll from './scroll.vue';
</script>

<template>
  <SCard title="Drawer" :ui="{ content: 'flex-c gap-3' }">
    <DemoDrawerSide />
    <DemoDrawerScroll />
  </SCard>
</template>
