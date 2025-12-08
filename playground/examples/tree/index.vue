<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoTreeBase from './base.vue';
import DemoTreeVirtualizer from './virtualizer.vue';
</script>

<template>
  <SCard title="Tree" :ui="{ content: 'flex-c gap-3' }">
    <DemoTreeBase />
    <DemoTreeVirtualizer />
  </SCard>
</template>
