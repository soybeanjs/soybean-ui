<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel, SButton } from '@soybean-unify/ui';

defineOptions({
  name: 'UiAlertDialog'
});

function handleAction() {
  console.log('1');
}
</script>

<template>
  <SAlertDialog title="Are you absolutely sure?">
    <template #trigger>
      <SButton variant="outline">Show Dialog</SButton>
    </template>
    <template #footer>
      <SAlertDialogCancel />
      <SAlertDialogAction @click="handleAction" />
    </template>
  </SAlertDialog>
</template>

<style scoped></style>
