<script setup lang="ts">
import { SCard } from '@ui';
import DemoAlertDialogDestructive from './destructive.vue';
import DemoAlertDialogInfo from './info.vue';
import DemoAlertDialogSuccess from './success.vue';
import DemoAlertDialogWarning from './warning.vue';
import DemoAlertDialogAction from './action.vue';

defineOptions({
  name: 'DemoAlertDialog'
});
</script>

<template>
  <SCard title="Alert Dialog" split :ui="{ content: 'flex-c gap-3' }">
    <DemoAlertDialogDestructive />
    <DemoAlertDialogInfo />
    <DemoAlertDialogSuccess />
    <DemoAlertDialogWarning />
    <DemoAlertDialogAction />
  </SCard>
</template>
