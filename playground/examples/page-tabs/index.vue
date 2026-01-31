<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoPageTabsBase from './base.vue';
</script>

<template>
  <SCard title="Page Tabs" split :ui="{ content: 'flex-c gap-4' }">
    <DemoPageTabsBase />
  </SCard>
</template>
