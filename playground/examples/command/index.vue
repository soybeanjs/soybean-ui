<script setup lang="ts">
import { SCard } from '@ui';
import DemoCommandBase from './base.vue';
import DemoCommandDialog from './dialog.vue';
</script>

<template>
  <SCard title="Command" :ui="{ content: 'flex-c gap-3' }">
    <DemoCommandBase />
    <DemoCommandDialog />
  </SCard>
</template>
