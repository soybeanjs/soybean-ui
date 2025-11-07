<script setup lang="ts">
import { SCard } from '@ui';
import DemoTabsHorizontal from './horizontal.vue';
import DemoTabsVertical from './vertical.vue';
import DemoTabsFill from './fill.vue';
import DemoTabsCustom from './custom.vue';
</script>

<template>
  <SCard title="Tabs" :ui="{ content: 'flex-c gap-3' }">
    <DemoTabsHorizontal />
    <DemoTabsVertical />
    <DemoTabsFill />
    <DemoTabsCustom />
  </SCard>
</template>
