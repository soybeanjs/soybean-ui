<script setup lang="ts">
import { SCard } from '@ui';
import DemoDialogBase from './base.vue';
import DemoDialogFooter from './footer.vue';
import DemoDialogState from './state.vue';
import DemoDialogPrevent from './prevent.vue';
import DemoDialogPure from './pure.vue';
</script>

<template>
  <SCard title="Dialog" :ui="{ content: 'flex-c gap-3' }">
    <DemoDialogBase />
    <DemoDialogFooter />
    <DemoDialogState />
    <DemoDialogPrevent />
    <DemoDialogPure />
  </SCard>
</template>
