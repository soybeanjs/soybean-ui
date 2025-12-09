<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel, SButton } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Warning</h3>
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
  </div>
</template>
