<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoDialogBase from './base.vue';
import DemoDialogFooter from './footer.vue';
import DemoDialogState from './state.vue';
import DemoDialogPrevent from './prevent.vue';
import DemoDialogPure from './pure.vue';
import DemoDialogApi from './dialog-api.vue';
</script>

<template>
  <SCard title="Dialog" split :ui="{ content: 'flex-c gap-4' }">
    <DemoDialogBase />
    <DemoDialogFooter />
    <DemoDialogState />
    <DemoDialogPrevent />
    <DemoDialogPure />
    <DemoDialogApi />
  </SCard>
</template>
