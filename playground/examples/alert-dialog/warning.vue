<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel, SButton, SCard } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Warning" split>
    <SAlertDialog title="Warning" type="warning">
      <template #trigger>
        <SButton color="warning" variant="outline">Show Dialog</SButton>
      </template>
      <p>Be careful with this action</p>
      <template #footer>
        <SAlertDialogCancel />
        <SAlertDialogAction />
      </template>
    </SAlertDialog>
  </SCard>
</template>
