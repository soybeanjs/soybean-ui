<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoTabsHorizontal from './horizontal.vue';
import DemoTabsVertical from './vertical.vue';
import DemoTabsFill from './fill.vue';
import DemoTabsCustom from './custom.vue';
</script>

<template>
  <SCard title="Tabs" split :ui="{ content: 'flex-c gap-4' }">
    <DemoTabsHorizontal />
    <DemoTabsVertical />
    <DemoTabsFill />
    <DemoTabsCustom />
  </SCard>
</template>
