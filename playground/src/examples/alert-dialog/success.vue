<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SButton, SCard } from '@ui';

defineOptions({
  name: 'DemoAlertDialogSuccess'
});
</script>

<template>
  <SCard title="Success" split>
    <SAlertDialog title="Success" type="success">
      <template #trigger>
        <SButton color="success" variant="outline">Show Dialog</SButton>
      </template>
      <p>Here is some success information for you</p>
      <template #footer>
        <SAlertDialogAction />
      </template>
    </SAlertDialog>
  </SCard>
</template>
