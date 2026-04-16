<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoMenubarBasic from './basic.vue';
import DemoMenubarControlled from './controlled.vue';
</script>

<template>
  <SCard title="Menubar" split :ui="{ content: 'flex-c gap-4' }">
    <DemoMenubarBasic />
    <DemoMenubarControlled />
  </SCard>
</template>
