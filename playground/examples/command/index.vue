<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoCommandBase from './base.vue';
import DemoCommandDialog from './dialog.vue';
</script>

<template>
  <SCard title="Command" split :ui="{ content: 'flex-c gap-4' }">
    <DemoCommandBase />
    <DemoCommandDialog />
  </SCard>
</template>
