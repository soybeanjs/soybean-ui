<script setup lang="ts">
import { SCard } from '@ui';
import DemoListBase from './base.vue';
</script>

<template>
  <SCard title="List" :ui="{ content: 'flex-c gap-3' }">
    <DemoListBase />
  </SCard>
</template>
