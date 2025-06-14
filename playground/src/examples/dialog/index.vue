<script setup lang="ts">
import { SCard } from '@ui';
import DemoDialogDefault from './default.vue';
import DemoDialogFooter from './footer.vue';
import DemoDialogState from './state.vue';
import DemoDialogPrevent from './prevent.vue';

defineOptions({
  name: 'DemoDialog'
});
</script>

<template>
  <SCard title="Dialog" :ui="{ content: 'flex flex-col gap-3' }">
    <DemoDialogDefault />
    <DemoDialogFooter />
    <DemoDialogState />
    <DemoDialogPrevent />
  </SCard>
</template>
