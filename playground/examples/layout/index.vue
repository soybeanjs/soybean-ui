<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoLayoutBasic from './basic.vue';
import DemoLayoutClassic from './classic.vue';
</script>

<template>
  <SCard title="Layout" split :ui="{ content: 'flex-c gap-4' }">
    <DemoLayoutBasic />
    <DemoLayoutClassic />
  </SCard>
</template>
