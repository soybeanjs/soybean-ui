<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoDrawerSide from './side.vue';
import DemoDrawerScroll from './scroll.vue';
import DemoDrawerBasic from './basic.vue';
</script>

<template>
  <SCard title="Drawer" split :ui="{ content: 'flex-c gap-4' }">
    <DemoDrawerBasic />
    <DemoDrawerSide />
    <DemoDrawerScroll />
  </SCard>
</template>
