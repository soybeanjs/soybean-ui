<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoCommandBasic from './basic.vue';
import DemoCommandDialog from './dialog.vue';
</script>

<template>
  <SCard title="Command" split :ui="{ content: 'flex-c gap-4' }">
    <DemoCommandBasic />
    <DemoCommandDialog />
  </SCard>
</template>
