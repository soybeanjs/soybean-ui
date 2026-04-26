<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoLayoutBase from './base.vue';
import DemoLayoutClassic from './classic.vue';
</script>

<template>
  <SCard title="Layout" split :ui="{ content: 'flex-c gap-4' }">
    <DemoLayoutBase />
    <DemoLayoutClassic />
  </SCard>
</template>
