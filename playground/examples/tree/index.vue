<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoTreeBasic from './basic.vue';
import DemoTreeVirtualizer from './virtualizer.vue';
</script>

<template>
  <SCard title="Tree" split :ui="{ content: 'flex-c gap-4' }">
    <DemoTreeBasic />
    <DemoTreeVirtualizer />
  </SCard>
</template>
