<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoPageTabsBasic from './basic.vue';
</script>

<template>
  <SCard title="Page Tabs" split :ui="{ content: 'flex-c gap-4' }">
    <DemoPageTabsBasic />
  </SCard>
</template>
